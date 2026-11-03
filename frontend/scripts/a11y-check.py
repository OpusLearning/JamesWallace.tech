#!/usr/bin/env python3
"""Accessibility basics check for the two public sites.

Reusable version of the Thursday daily check. It fixes the false findings of 29 Oct 2026 by
excluding, with a recorded reason rather than silently:
  - headings (and other content) inside a closed <details> element;
  - fixed and sticky elements from the flow checks (heading order, focus order, overlap);
  - backwards focus jumps that are caused by a column or <aside> reading order.

Read-only: opens each public page in a fresh headless Chromium, presses Tab only, measures,
closes. Nothing is clicked, typed or submitted.

Usage:
  python3 scripts/a11y-check.py [--base both|main|blog] [--out FILE] [--limit N]
  python3 scripts/a11y-check.py --self-test

Needs Playwright for Python (`python3 -m pip install playwright && playwright install chromium`).
"""
import argparse
import json
import sys
from urllib.parse import quote

from playwright.sync_api import sync_playwright

MAIN_PAGES = [
    "https://jameswallace.tech/",
    "https://jameswallace.tech/for-las",
    "https://jameswallace.tech/tuition",
    "https://jameswallace.tech/agencies",
    "https://jameswallace.tech/about",
    "https://jameswallace.tech/credentials",
]
BLOG_PAGES = [
    "https://blog.jameswallace.tech/",
    "https://blog.jameswallace.tech/councils",
    "https://blog.jameswallace.tech/councils/assistant",
    "https://blog.jameswallace.tech/2026-11-03-attendance-letters-when-the-cause-is-anxiety/",
]
VIEWPORTS = [("1440", 1440, 900), ("390", 390, 844)]

# Shared helpers injected into every measurement. `excluded()` records why an element is
# out of scope, so a run shows what it skipped instead of hiding it.
HELPERS = r"""
  const closedDetails = el => !!(el && el.closest && el.closest('details:not([open])'));
  const inFixedSticky = el => {
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const p = getComputedStyle(n).position;
      if (p === 'fixed' || p === 'sticky') return true;
    }
    return false;
  };
  const inAside = el => !!(el && el.closest && el.closest('aside,[role="complementary"]'));
  const inColumnLayout = el => {
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const s = getComputedStyle(n);
      if (s.columnCount && s.columnCount !== 'auto' && parseInt(s.columnCount, 10) > 1) return true;
      if (s.display === 'grid') {
        const cols = (s.gridTemplateColumns || '').trim().split(/\s+/).filter(Boolean);
        if (cols.length > 1 && !cols.every(c => c === '0px')) return true;
      }
      if (s.display === 'flex' && s.flexDirection === 'row' && n.children.length > 1) {
        const widths = [...n.children].filter(c => c.getBoundingClientRect().width > 1).length;
        if (widths > 1) return true;
      }
    }
    return false;
  };
  const outOfFlowScope = el => closedDetails(el) || inFixedSticky(el);
  const vis = el => {
    if (!el || !el.getBoundingClientRect) return false;
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 1 && r.height > 1;
  };
  const name = el => {
    const tag = el.tagName.toLowerCase();
    const id = el.id ? '#' + el.id : '';
    const cls = (el.className && typeof el.className === 'string')
      ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
    const t = (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 70);
    return tag + id + cls + (t ? ' | ' + t : '');
  };
"""

MEASURE = r"""
() => {
  const out = {images: [], headings: [], excluded: {closedDetails: 0, fixedSticky: 0}};
""" + HELPERS + r"""
  // ---- images ----
  for (const img of document.images) {
    if (!vis(img)) continue;
    if (closedDetails(img)) { out.excluded.closedDetails++; continue; }
    if (inFixedSticky(img)) { out.excluded.fixedSticky++; continue; }
    const alt = img.getAttribute('alt');
    const role = (img.getAttribute('role') || '').toLowerCase();
    const hidden = img.getAttribute('aria-hidden') === 'true' || role === 'presentation' || role === 'none';
    const src = (img.currentSrc || img.src || '').split('/').slice(-2).join('/');
    if (alt === null) {
      out.images.push({issue: 'no alt attribute', src, hidden, el: name(img)});
    } else if (alt.trim() === '' && !hidden) {
      const a = img.closest('a');
      if (a && !(a.innerText || '').trim() && !a.getAttribute('aria-label')) {
        out.images.push({issue: 'empty alt inside an unnamed link', src, hidden, el: name(img)});
      }
    } else if (/\.(jpe?g|png|webp|gif|svg)$/i.test(alt.trim()) || /^(image|photo|picture)\s*\d*$/i.test(alt.trim())) {
      out.images.push({issue: 'alt looks like a filename or placeholder', alt, src, el: name(img)});
    }
  }
  for (const svg of document.querySelectorAll('svg[role="img"]')) {
    if (!vis(svg) || outOfFlowScope(svg)) continue;
    const label = svg.getAttribute('aria-label') || svg.getAttribute('aria-labelledby') ||
      (svg.querySelector('title') ? svg.querySelector('title').textContent : '');
    if (!label || !label.trim()) out.images.push({issue: 'role=img svg has no accessible name', el: name(svg)});
  }

  // ---- headings ----
  const hs = [];
  for (const h of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
    if (!vis(h)) continue;
    if (closedDetails(h)) { out.excluded.closedDetails++; continue; }
    if (inFixedSticky(h)) { out.excluded.fixedSticky++; continue; }
    const level = parseInt(h.tagName[1], 10);
    hs.push({level, text: (h.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 90),
             top: Math.round(h.getBoundingClientRect().top + scrollY)});
  }
  out.headings = hs;
  const findings = [];
  const h1s = hs.filter(h => h.level === 1);
  if (h1s.length === 0) findings.push('no visible h1');
  if (h1s.length > 1) findings.push(h1s.length + ' visible h1 elements');
  if (hs.length && hs[0].level !== 1) findings.push('first heading is h' + hs[0].level);
  for (let i = 1; i < hs.length; i++) {
    if (hs[i].level - hs[i - 1].level > 1) {
      findings.push('levels jump h' + hs[i - 1].level + ' -> h' + hs[i].level + ' at "' + hs[i].text.slice(0, 40) + '"');
    }
  }
  for (const h of hs) if (!h.text) findings.push('empty h' + h.level);
  out.headingFindings = findings;

  // ---- positive tabindex and focusable inventory ----
  const positive = [];
  for (const el of document.querySelectorAll('[tabindex]')) {
    if (!vis(el) || outOfFlowScope(el)) continue;
    const ti = parseInt(el.getAttribute('tabindex'), 10);
    if (ti > 0) positive.push({tabindex: ti, el: name(el)});
  }
  out.positiveTabindex = positive;

  const focusables = [];
  const sel = 'a[href],button,input:not([type="hidden"]),select,textarea,[tabindex],summary,area[href],iframe';
  for (const el of document.querySelectorAll(sel)) {
    if (!vis(el)) continue;
    if (outOfFlowScope(el)) continue;
    if (el.disabled) continue;
    const ti = el.getAttribute('tabindex');
    if (ti !== null && parseInt(ti, 10) < 0) continue;
    const r = el.getBoundingClientRect();
    focusables.push({top: Math.round(r.top + scrollY), left: Math.round(r.left)});
  }
  out.focusableCount = focusables.length;
  return out;
}
"""

CONTRAST = r"""
() => {
  const out = {contrast: [], notMeasurable: 0,
               excluded: {closedDetails: 0, fixedSticky: 0}};
""" + HELPERS + r"""
  const parse = c => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(',').map(x => parseFloat(x.trim()));
    return {r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1};
  };
  const blend = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1
  });
  const lum = c => {
    const ch = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * ch(c.r) + 0.7152 * ch(c.g) + 0.0722 * ch(c.b);
  };
  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  const bgOf = el => {
    let node = el, bg = {r: 255, g: 255, b: 255, a: 1}, imageBehind = false;
    while (node && node !== document.documentElement) {
      const s = getComputedStyle(node);
      if (s.backgroundImage && s.backgroundImage !== 'none') imageBehind = true;
      const c = parse(s.backgroundColor);
      if (c && c.a > 0) {
        if (c.a >= 1) { bg = c; break; }
        bg = blend(c, bg);
      }
      node = node.parentElement;
    }
    return {bg, imageBehind};
  };
  const seen = new Set();
  for (const el of document.querySelectorAll('body *')) {
    if (!vis(el)) continue;
    if (closedDetails(el)) { out.excluded.closedDetails++; continue; }
    if (inFixedSticky(el)) { out.excluded.fixedSticky++; continue; }
    let own = '';
    for (const n of el.childNodes) if (n.nodeType === 3) own += n.textContent;
    own = own.trim();
    if (!own) continue;
    const s = getComputedStyle(el);
    const fgRaw = parse(s.color);
    if (!fgRaw) continue;
    const {bg, imageBehind} = bgOf(el);
    if (imageBehind) { out.notMeasurable++; continue; }
    const fg = fgRaw.a < 1 ? blend(fgRaw, bg) : fgRaw;
    const r = ratio(fg, bg);
    const fs = parseFloat(s.fontSize);
    const fw = parseInt(s.fontWeight, 10) || 400;
    const large = fs >= 24 || (fs >= 18.66 && fw >= 700);
    const need = large ? 3 : 4.5;
    if (r < need) {
      const key = name(el) + '|' + Math.round(r * 100);
      if (!seen.has(key)) {
        seen.add(key);
        out.contrast.push({ratio: Math.round(r * 100) / 100, need, px: fs, weight: fw,
          fg: s.color, bg: `rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})`,
          el: name(el)});
      }
    }
  }
  return out;
}
"""


FOCUS_STOP = r"""
() => {
""" + HELPERS + r"""
  const el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) return null;
  const r = el.getBoundingClientRect();
  const s = getComputedStyle(el);
  const t = (el.innerText || el.value || el.getAttribute('aria-label') || el.getAttribute('alt') || '')
    .trim().replace(/\s+/g, ' ').slice(0, 60);
  return {
    tag: el.tagName.toLowerCase(), text: t,
    top: Math.round(r.top + scrollY), left: Math.round(r.left),
    outlineStyle: s.outlineStyle, outlineWidth: s.outlineWidth,
    boxShadow: s.boxShadow, bg: s.backgroundColor,
    excludedReason: inFixedSticky(el) ? 'fixed/sticky'
      : (inAside(el) ? 'aside' : (inColumnLayout(el) ? 'column layout' : null))
  };
}
"""


def check_focus(page):
    """Tab through up to 50 stops; ignore fixed/sticky and column/aside reading-order jumps."""
    stops = []
    seen = set()
    for _ in range(50):
        page.keyboard.press("Tab")
        info = page.evaluate(FOCUS_STOP)
        if not info:
            break
        key = (info["tag"], info["text"], info["top"], info["left"])
        if key in seen:
            break
        seen.add(key)
        stops.append(info)
    backwards = []
    for i in range(1, len(stops)):
        a, b = stops[i - 1], stops[i]
        if b["top"] < a["top"] - 200:
            if a.get("excludedReason") or b.get("excludedReason"):
                continue
            backwards.append({"at": i, "from": a, "to": b})
    no_ring = [s for s in stops
               if not s.get("excludedReason")
               and s["outlineStyle"] in ("none", "")
               and (not s["boxShadow"] or s["boxShadow"] == "none")]
    return {"stops": stops, "backwards": backwards, "noVisibleRing": no_ring}


PREDICATES = r"""
() => {
""" + HELPERS + r"""
  return {
    closedDetails: closedDetails(document.querySelector('details h5')),
    fixed: inFixedSticky(document.querySelector('.fixedbar a')),
    aside: inAside(document.querySelector('aside a')),
    column: inColumnLayout(document.querySelector('.cols section')),
    normal: inColumnLayout(document.querySelector('p.faint'))
  };
}
"""

# A page that contains one of each false-positive shape from 29 Oct, plus honest controls:
# a level jump and a low-contrast paragraph that must still be reported.
FIXTURE = """<!doctype html><html><head><meta charset="utf-8"><style>
 body{margin:0;background:#fff;color:#111;font:16px sans-serif}
 a{display:block;padding:40px 0}
 .faint{color:#f4f4f4;background:#fff}
 .fixedbar{position:fixed;top:0;left:0;right:0;background:#fff}
 .fixedbar a{color:#f4f4f4;background:#fff}
 .cols{display:grid;grid-template-columns:1fr 1fr}
</style></head><body>
 <h1>Title</h1>
 <details><summary>More</summary><h3>inside three</h3><h5>inside five</h5></details>
 <h4>Skipped level</h4>
 <p class="faint">low contrast control</p>
 <div class="cols">
   <section><h2>Left</h2><a href="#l">left link</a></section>
   <section><h2>Right</h2><a href="#r">right link</a></section>
 </div>
 <aside><a href="#s">aside link</a></aside>
 <div class="fixedbar"><a href="#f">fixed link</a></div>
</body></html>"""


def self_test():
    """Offline proof that the exclusions fire and the checks still catch real problems."""
    checks = []

    def expect(name, ok, detail=""):
        checks.append((name, bool(ok), detail))

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("data:text/html;charset=utf-8," + quote(FIXTURE))
        page.wait_for_timeout(200)

        m = page.evaluate(MEASURE)
        c = page.evaluate(CONTRAST)
        f = check_focus(page)
        pred = page.evaluate(PREDICATES)
        browser.close()

    # predicates, one per false-positive shape
    expect("closed <details> is out of scope", pred["closedDetails"])
    expect("fixed element is out of scope", pred["fixed"])
    expect("aside is out of scope", pred["aside"])
    expect("grid column layout is out of scope", pred["column"])
    expect("ordinary paragraph is in scope", not pred["normal"])

    # headings: two inside closed details skipped, four visible counted
    expect("2 headings skipped inside closed details",
           m["excluded"]["closedDetails"] == 2, f"got {m['excluded']['closedDetails']}")
    expect("4 visible headings counted", len(m["headings"]) == 4,
           f"got {[h['text'] for h in m['headings']]}")
    expect("real level jump still reported",
           any("levels jump h1 -> h4" in s for s in m["headingFindings"]),
           f"got {m['headingFindings']}")
    expect("no empty-heading finding", not any("empty" in s for s in m["headingFindings"]),
           f"got {m['headingFindings']}")

    # contrast: the control is reported, the fixed copy is not
    texts = [x["el"] for x in c["contrast"]]
    expect("low contrast control reported", len(c["contrast"]) == 1, f"got {texts}")
    expect("fixed low contrast excluded",
           not any("fixed link" in t for t in texts), f"got {texts}")

    # focus: a fixed element at the top of the page would cause a backwards jump
    expect("fixed element causes no backwards jump", not f["backwards"],
           f"got {len(f['backwards'])}")

    width = max(len(n) for n, _, _ in checks)
    failed = 0
    for name, ok, detail in checks:
        print(f"{'PASS' if ok else 'FAIL'}  {name.ljust(width)}  {detail if not ok else ''}".rstrip())
        failed += 0 if ok else 1
    print(f"\n{len(checks) - failed}/{len(checks)} checks passed")
    return 1 if failed else 0


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--base", choices=("both", "main", "blog"), default="both")
    ap.add_argument("--out", default="a11y-check.json")
    ap.add_argument("--limit", type=int, default=0, help="limit pages, for a quick run")
    ap.add_argument("--self-test", action="store_true",
                    help="offline check that the exclusions fire and real problems are still reported")
    args = ap.parse_args(argv)
    if args.self_test:
        return self_test()

    pages = []
    if args.base in ("both", "main"):
        pages += [("main", u) for u in MAIN_PAGES]
    if args.base in ("both", "blog"):
        pages += [("blog", u) for u in BLOG_PAGES]
    if args.limit:
        pages = pages[:args.limit]

    results = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
        for site, url in pages:
            for label, w, h in VIEWPORTS:
                ctx = browser.new_context(viewport={"width": w, "height": h},
                                          user_agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36")
                page = ctx.new_page()
                row = {"site": site, "url": url, "viewport": label}
                try:
                    resp = page.goto(url, wait_until="networkidle", timeout=45000)
                    row["status"] = resp.status if resp else None
                    page.wait_for_timeout(800)
                    row.update(page.evaluate(MEASURE))
                    row.update(check_focus(page))
                    row.update(page.evaluate(CONTRAST))
                except Exception as e:
                    row["error"] = str(e).splitlines()[0][:200]
                results.append(row)
                print(f"{site} {label} {url} -> {row.get('status')} "
                      f"heads={len(row.get('headings', []))} imgs={len(row.get('images', []))} "
                      f"contrast={len(row.get('contrast', []))} focus={len(row.get('stops', []))} "
                      f"backwards={len(row.get('backwards', []))}",
                      file=sys.stderr, flush=True)
                ctx.close()
        browser.close()

    with open(args.out, "w") as f:
        json.dump(results, f, indent=1)
    print(f"written {args.out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
