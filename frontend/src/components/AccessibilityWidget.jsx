import { useState, useEffect } from "react";

const STORAGE_KEY = "jw-a11y";

const defaults = {
  fontSize: "normal",   // normal | lg | xl
  contrast: "none",     // none | light | dark
  dyslexic: false,
};

function loadPrefs() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaults, ...JSON.parse(stored) } : { ...defaults };
  } catch {
    return { ...defaults };
  }
}

function applyPrefs(prefs) {
  const html = document.documentElement;
  html.classList.remove(
    "a11y-text-lg", "a11y-text-xl",
    "a11y-contrast-light", "a11y-contrast-dark",
    "a11y-dyslexic"
  );
  if (prefs.fontSize === "lg") html.classList.add("a11y-text-lg");
  if (prefs.fontSize === "xl") html.classList.add("a11y-text-xl");
  if (prefs.contrast === "light") html.classList.add("a11y-contrast-light");
  if (prefs.contrast === "dark")  html.classList.add("a11y-contrast-dark");
  if (prefs.dyslexic) html.classList.add("a11y-dyslexic");
}

export default function AccessibilityWidget({ open, onClose }) {
  const [prefs, setPrefs] = useState(loadPrefs);

  useEffect(() => {
    applyPrefs(prefs);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch {}
  }, [prefs]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9998 }} />

      {/* Panel */}
      <div className="jw-a11y-panel" role="dialog" aria-modal="true" aria-label="Accessibility options">
        <h3>Accessibility</h3>

        {/* Text size */}
        <OptionGroup label="Text size">
          {[
            { label: "A", size: "normal", style: { fontSize: "0.9rem" } },
            { label: "A", size: "lg",     style: { fontSize: "1.1rem" } },
            { label: "A", size: "xl",     style: { fontSize: "1.3rem" } },
          ].map(({ label, size, style: s }) => (
            <OptionBtn
              key={size}
              active={prefs.fontSize === size}
              onClick={() => setPrefs((p) => ({ ...p, fontSize: size }))}
              style={s}
            >
              {label}
            </OptionBtn>
          ))}
        </OptionGroup>

        {/* Contrast */}
        <OptionGroup label="Contrast">
          <OptionBtn
            active={prefs.contrast === "none"}
            onClick={() => setPrefs((p) => ({ ...p, contrast: "none" }))}
          >
            Normal
          </OptionBtn>
          <OptionBtn
            active={prefs.contrast === "light"}
            onClick={() => setPrefs((p) => ({ ...p, contrast: "light" }))}
          >
            ☀ Light
          </OptionBtn>
          <OptionBtn
            active={prefs.contrast === "dark"}
            onClick={() => setPrefs((p) => ({ ...p, contrast: "dark" }))}
          >
            ☾ Dark
          </OptionBtn>
        </OptionGroup>

        {/* Dyslexic font */}
        <A11yToggle
          label="Dyslexia-friendly font"
          checked={prefs.dyslexic}
          onChange={() => setPrefs((p) => ({ ...p, dyslexic: !p.dyslexic }))}
        />

        {/* Reset */}
        <button
          onClick={() => setPrefs({ ...defaults })}
          style={{
            marginTop: "0.5rem",
            width: "100%",
            padding: "0.4rem",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text-muted)",
            cursor: "pointer",
            fontSize: "0.8rem",
          }}
        >
          Reset to defaults
        </button>
      </div>

      {/* FAB - X to close */}
      <button
        className="jw-a11y-fab"
        aria-label="Close accessibility panel"
        onClick={onClose}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </>
  );
}

/* ---------- shared sub-components ---------- */

function OptionGroup({ label, children }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{
        fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)",
        marginBottom: "0.45rem", textTransform: "uppercase", letterSpacing: "0.06em",
      }}>
        {label}
      </div>
      <div style={{ display: "flex", gap: "0.35rem" }}>
        {children}
      </div>
    </div>
  );
}

function OptionBtn({ active, onClick, children, style: s }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        flex: 1,
        padding: "0.35rem 0.25rem",
        borderRadius: "6px",
        border: "1px solid",
        borderColor: active ? "var(--brand)" : "var(--border)",
        background: active ? "var(--brand-light)" : "transparent",
        color: active ? "var(--brand)" : "var(--text-muted)",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "0.8rem",
        whiteSpace: "nowrap",
        ...s,
      }}
    >
      {children}
    </button>
  );
}

function A11yToggle({ label, checked, onChange }) {
  return (
    <label style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      marginBottom: "0.65rem", cursor: "pointer", fontSize: "0.875rem",
      color: "var(--text-primary)", userSelect: "none",
    }}>
      {label}
      <span
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        style={{
          display: "inline-flex", width: "36px", height: "20px",
          borderRadius: "9999px",
          background: checked ? "var(--brand)" : "var(--border)",
          position: "relative", transition: "background 0.2s",
          cursor: "pointer", flexShrink: 0,
        }}
      >
        <span style={{
          position: "absolute", top: "2px",
          left: checked ? "18px" : "2px",
          width: "16px", height: "16px",
          borderRadius: "50%", background: "#fff",
          transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }} />
      </span>
    </label>
  );
}
