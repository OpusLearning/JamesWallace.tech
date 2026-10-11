import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { recordEnquirySent } from "../lib/analytics";

/**
 * The assistant in the corner of the site.
 *
 * A parent landing on the tuition page at eleven at night has one question — "would he take my child?" — and the honest
 * answer needs James. So this is built to be useful for two minutes and then get out of the way: it answers what the
 * site already says, and the moment the conversation needs a person it hands over a form that goes straight to him.
 *
 * Things it deliberately does:
 *   - says it is an assistant, not James, before the first exchange. On a SEND site that matters.
 *   - never asks for anything about a child. Name and email is all it takes.
 *   - keeps working when the model does not: the server answers with a sentence and the form either way.
 *   - keeps the transcript in sessionStorage, so moving between pages does not wipe the conversation.
 *   - stays out of the way: it hides while a hero or any form is on screen and whenever it would sit
 *     over a link or control, and the page reserves its height so the last line clears it (LOOK-SITE-1).
 */

const OPENERS = [
  "What does it cost?",
  "My child cannot manage school. Can you help?",
  "What is EOTAS?",
  "Do you cover my area?",
];

// The first thing a visitor sees. UK GDPR / ICO AI guidance expects the disclosure at first
// interaction, so it carries all four points before anything is asked of them: that this is an AI
// assistant, that messages go to OpenAI and are stored, how long for, and what not to type in.
// Retention matches the 12-month deletion in server/db.js. Source: sources/legal/README.md item 6.
const GREETING =
  "I'm an AI assistant, not James. Your messages go to OpenAI and are stored for up to 12 months so " +
  "James can see what people ask. Please don't enter a child's name, a diagnosis, or any safeguarding " +
  "detail. I can answer questions about James's tuition — what he does, what it costs, how it starts — " +
  "and if you would rather talk to him, say so and I'll take your details.";

const STORE_KEY = "jw-helper-v1";

// The candidate controls the launcher must never sit over. Kept in one place so the component and
// its test (src/lib/sitehelper-overlap.test.js) agree on what "covers content" means.
const CONTROL_SELECTOR = "a, button, input, select, textarea, label";

export default function SiteHelper() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [showForm, setShowForm] = useState(false);   // the assistant has offered to pass it on
  const [formOpen, setFormOpen] = useState(false);   // they have said yes, so the fields are up
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState("idle"); // idle | sending | sent | error
  const [hidden, setHidden] = useState(false);

  const launcherRef = useRef(null);
  const inputRef = useRef(null);
  const logRef = useRef(null);
  const abortRef = useRef(null);
  const sessionRef = useRef(null);

  if (!sessionRef.current) {
    sessionRef.current =
      (typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID().slice(0, 18)) ||
      Math.random().toString(36).slice(2, 12);
  }

  // The launcher gets out of the way of anything it would cover. A hero or a form on screen keeps it
  // hidden outright; otherwise it hides whenever its own box would intersect a link or control in
  // the viewport. This is deliberately the same rule the item-4 test checks, so the two cannot drift.
  useEffect(() => {
    const update = () => {
      const el = launcherRef.current;
      if (!el) return;
      if (open) { setHidden(false); return; }
      const box = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const onScreen = (r) => r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw;

      for (const section of document.querySelectorAll("[data-hero], form")) {
        if (onScreen(section.getBoundingClientRect())) { setHidden(true); return; }
      }
      for (const control of document.querySelectorAll(CONTROL_SELECTOR)) {
        if (control === el || el.contains(control) || control.contains(el)) continue;
        if (control.closest(".visually-hidden, .jw-skip-link")) continue;
        const style = getComputedStyle(control);
        if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) continue;
        const r = control.getBoundingClientRect();
        if (r.width < 2 || r.height < 2 || !onScreen(r)) continue;
        const overlaps = !(box.right <= r.left || box.left >= r.right || box.bottom <= r.top || box.top >= r.bottom);
        if (overlaps) { setHidden(true); return; }
      }
      // Body text counts too (review of LOOK-SITE-1): hide if the box would sit over any visible glyph.
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.nodeValue.trim()) continue;
        const parent = node.parentElement;
        if (!parent || el.contains(parent) || parent.closest(".visually-hidden, .jw-skip-link, #jw-helper-panel, script, style")) continue;
        const pr = parent.getBoundingClientRect();
        if (pr.bottom <= box.top || pr.top >= box.bottom || pr.right <= box.left || pr.left >= box.right) continue;
        const style = getComputedStyle(parent);
        if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) continue;
        range.selectNodeContents(node);
        for (const r of range.getClientRects()) {
          if (!(box.right <= r.left || box.left >= r.right || box.bottom <= r.top || box.top >= r.bottom)) { setHidden(true); return; }
        }
      }
      setHidden(false);
    };
    update();
    let raf = 0;
    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [open, pathname]);

  // The page reserves the launcher's height, so the last line of content clears it however far you
  // scroll. Cleared again if the component ever unmounts.
  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      const el = launcherRef.current;
      if (!el) return;
      // The launcher's own height plus its bottom offset and a small gap, so the last line of the
      // page clears the button wherever it sits in the viewport.
      root.style.setProperty("--jw-helper-space", `${Math.round(el.offsetHeight + 40)}px`);
    };
    apply();
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("resize", apply);
      root.style.removeProperty("--jw-helper-space");
    };
  }, []);

  // Restore anything from earlier in this visit.
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORE_KEY) || "null");
      if (saved && Array.isArray(saved.messages)) {
        setMessages(saved.messages);
        if (saved.sessionId) sessionRef.current = saved.sessionId;
      }
    } catch {
      /* a private window, or storage turned off — start fresh */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify({ messages, sessionId: sessionRef.current }));
    } catch {
      /* nothing to do; the conversation still works, it just will not survive a reload */
    }
  }, [messages]);

  // Scroll the newest line into view without yanking the whole page.
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, pending, formOpen]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  const close = useCallback(() => {
    abortRef.current?.abort();
    setOpen(false);
    setPending(false);
    launcherRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  async function send(text) {
    const question = (text ?? draft).trim();
    if (!question || pending) return;
    setDraft("");
    const next = [...messages, { role: "user", content: question }];
    setMessages(next);
    setPending(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const timer = setTimeout(() => controller.abort(), 20000);

    try {
      const r = await fetch("/api/helper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          message: question,
          history: next.slice(-10),
          page: pathname,
          sessionId: sessionRef.current,
        }),
      });
      const data = await r.json().catch(() => ({}));
      const reply =
        data.reply ||
        "Something went wrong at my end. Leave your details below and James will come back to you himself.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      if (data.offerForm) setShowForm(true);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I could not get an answer back in time, sorry. Leave your name and email below and James will pick it up, " +
            "or ring him on 07897 021077.",
        },
      ]);
      setShowForm(true);
    } finally {
      clearTimeout(timer);
      setPending(false);
    }
  }

  async function submitForm(e) {
    e.preventDefault();
    if (formState === "sending") return;
    setFormState("sending");
    // Give James the conversation as well as the message — he should not have to ask what it was about.
    const transcript = messages
      .map((m) => `${m.role === "user" ? "Them" : "Assistant"}: ${m.content}`)
      .join("\n");
    const body = [
      form.message.trim() || "(sent from the chat on the website)",
      transcript ? `\n\n--- what they asked the assistant ---\n${transcript}` : "",
    ].join("");

    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: body, page: `chat ${pathname}` }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) throw new Error("send failed");
      // One statistics event per confirmed send from the chat; nothing else from the conversation.
      recordEnquirySent(r.ok, data);
      setFormState("sent");
      setFormOpen(false);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `Thank you. That has gone to James and he will come back to you at ${form.email}.` },
      ]);
      setShowForm(false);
    } catch {
      setFormState("error");
    }
  }

  const shown = messages.length ? messages : [{ role: "assistant", content: GREETING }];

  return (
    <>
      {/* Launcher. The marker and the class are what the item-4 test and the stylesheet key on. */}
      <button
        ref={launcherRef}
        type="button"
        data-sitehelper-launcher=""
        data-open={open ? "true" : "false"}
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls="jw-helper-panel"
        aria-label={open ? "Close the question assistant" : "Ask a question"}
        className="jw-helper-launcher"
        style={{
          position: "fixed",
          right: "1.25rem",
          bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
          zIndex: 9990,
          maxWidth: "calc(100vw - 2.5rem)",
          opacity: hidden && !open ? 0 : 1,
          pointerEvents: hidden && !open ? "none" : "auto",
          transition: "opacity 0.2s ease",
        }}
      >
        {open ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 15.5a2.5 2.5 0 0 1-2.5 2.5H8l-4 3V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5Z" /><path d="M8.5 9.5h7M8.5 12.5h4" /></svg>
        )}
        <span className="jw-helper-launcher-label">{open ? "Close" : "Ask a question"}</span>
      </button>

      {open && (
        <div
          id="jw-helper-panel"
          role="dialog"
          aria-modal="false"
          aria-label="Ask a question about James's tuition"
          style={{
            position: "fixed",
            right: "1.25rem",
            bottom: "5.2rem",
            zIndex: 9991,
            width: "min(24rem, calc(100vw - 2.5rem))",
            maxHeight: "min(34rem, calc(100vh - 8rem))",
            display: "flex",
            flexDirection: "column",
            background: "var(--card-bg)",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            boxShadow: "0 18px 48px rgba(15,23,42,0.22)",
            overflow: "hidden",
          }}
        >
          <header
            style={{
              padding: "0.85rem 1rem",
              background: "var(--brand-light)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div className="jw-helper-title">Ask about the tuition</div>
            <div className="jw-helper-sub">
              An AI assistant, not James. Anything it cannot answer goes straight to him.
            </div>
          </header>

          <div
            ref={logRef}
            aria-live="polite"
            style={{ flex: 1, overflowY: "auto", padding: "0.9rem 1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}
          >
            {shown.map((m, i) => (
              <div
                key={i}
                className="jw-helper-msg"
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "88%",
                  padding: "0.55rem 0.75rem",
                  borderRadius: m.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                  background: m.role === "user" ? "var(--action)" : "var(--surface)",
                  color: m.role === "user" ? "#fff" : "var(--text-primary)",
                }}
              >
                {m.content}
              </div>
            ))}

            {pending && (
              <div className="jw-helper-note" style={{ alignSelf: "flex-start", padding: "0.2rem 0.1rem" }}>
                thinking…
              </div>
            )}

            {messages.length === 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.3rem" }}>
                {OPENERS.map((o) => (
                  <button key={o} type="button" onClick={() => send(o)} className="jw-helper-chip">
                    {o}
                  </button>
                ))}
              </div>
            )}

            {showForm && !formOpen && formState !== "sent" && (
              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "0.6rem 0.7rem",
                  background: "var(--page-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.6rem",
                }}
              >
                <span className="jw-helper-note">Want James to come back to you?</span>
                <button
                  type="button"
                  onClick={() => setFormOpen(true)}
                  style={{
                    background: "var(--action)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.45rem 0.7rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                >
                  Leave my details
                </button>
              </div>
            )}

            {formOpen && formState !== "sent" && (
              <form
                onSubmit={submitForm}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "0.75rem",
                  background: "var(--page-bg)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.45rem",
                }}
              >
                <div className="jw-helper-note">
                  Leave your name and email and James will come back to you himself.
                </div>
                <input
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="jw-helper-input"
                />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="jw-helper-input"
                />
                <textarea
                  rows={2}
                  placeholder="Anything you want him to know (optional)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="jw-helper-input"
                  style={{ resize: "vertical" }}
                />
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  style={{
                    background: "var(--action)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.55rem 0.8rem",
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                    cursor: formState === "sending" ? "default" : "pointer",
                    opacity: formState === "sending" ? 0.7 : 1,
                  }}
                >
                  {formState === "sending" ? "Sending…" : "Send to James"}
                </button>
                {formState === "error" && (
                  <div className="jw-helper-error">
                    That did not go through. Email hello@jameswallace.tech or ring 07897 021077.
                  </div>
                )}
                <div className="jw-helper-note">
                  Your details are used only to reply to you. See the{" "}
                  <a href="/privacy" style={{ color: "var(--brand)" }}>privacy notice</a>.
                </div>
              </form>
            )}
          </div>

          <div style={{ borderTop: "1px solid var(--border)", padding: "0.6rem 0.7rem", display: "flex", gap: "0.45rem" }}>
            <label htmlFor="jw-helper-input" className="visually-hidden">Your question</label>
            <input
              id="jw-helper-input"
              ref={inputRef}
              value={draft}
              maxLength={700}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Type your question…"
              className="jw-helper-input"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => send()}
              disabled={pending || !draft.trim()}
              className="jw-helper-send"
              style={{ cursor: pending || !draft.trim() ? "default" : "pointer", opacity: pending || !draft.trim() ? 0.5 : 1 }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
