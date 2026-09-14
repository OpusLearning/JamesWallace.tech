import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const STORAGE_KEY = "jw-a11y";
const defaults = {
  fontSize: "normal",
  contrast: "none",
  dyslexic: false,
  reducedMotion: false,
  spacious: false,
};

function loadPrefs() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      fontSize: ["normal", "lg", "xl"].includes(stored?.fontSize) ? stored.fontSize : defaults.fontSize,
      contrast: ["none", "light", "dark"].includes(stored?.contrast) ? stored.contrast : defaults.contrast,
      dyslexic: stored?.dyslexic === true,
      reducedMotion: stored?.reducedMotion === true,
      spacious: stored?.spacious === true,
    };
  } catch {
    return { ...defaults };
  }
}

function applyPrefs(prefs) {
  const classes = {
    "a11y-text-lg": prefs.fontSize === "lg",
    "a11y-text-xl": prefs.fontSize === "xl",
    "a11y-contrast-light": prefs.contrast === "light",
    "a11y-contrast-dark": prefs.contrast === "dark",
    "a11y-dyslexic": prefs.dyslexic,
    "a11y-reduced-motion": prefs.reducedMotion,
    "a11y-spacious": prefs.spacious,
  };
  Object.entries(classes).forEach(([name, enabled]) => document.documentElement.classList.toggle(name, enabled));
}

export default function AccessibilityWidget({ open, onClose }) {
  const [prefs, setPrefs] = useState(loadPrefs);
  const [notice, setNotice] = useState("");
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    applyPrefs(prefs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Preferences still apply for this visit when browser storage is unavailable.
    }
  }, [prefs]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [open]);

  function updatePreference(key, value) {
    setPrefs((current) => ({ ...current, [key]: value }));
    setNotice("");
  }

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="jw-a11y-panel"
      aria-labelledby="a11y-heading"
      aria-describedby="a11y-description"
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = event.currentTarget.querySelectorAll("button:not(:disabled), input:not(:disabled), a[href]");
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }}
    >
      <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
        <h2 id="a11y-heading" className="h5 mb-0">Reading preferences</h2>
        <button ref={closeRef} type="button" className="jw-a11y-fab jw-a11y-close" aria-label="Close reading preferences" onClick={onClose} style={{ position: "static", flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p id="a11y-description" className="small">Adjust how this site looks. Preferences are saved in this browser when storage is available.</p>
      {[
        { key: "fontSize", label: "Text size", options: [["normal", "Default"], ["lg", "Larger"], ["xl", "Largest"]] },
        { key: "contrast", label: "Colour contrast", options: [["none", "Default"], ["light", "Light"], ["dark", "Dark"]] },
      ].map(({ key, label, options }) => (
        <fieldset key={key} className="mb-3">
          <legend className="h6">{label}</legend>
          <div className="d-flex flex-wrap gap-2">
            {options.map(([value, text]) => (
              <button key={value} type="button" className={`jw-a11y-option ${prefs[key] === value ? "jw-btn-primary" : "jw-btn-secondary"}`} aria-pressed={prefs[key] === value} onClick={() => updatePreference(key, value)}>
                {text}
              </button>
            ))}
          </div>
        </fieldset>
      ))}
      {[
        ["dyslexic", "Alternative reading font"],
        ["reducedMotion", "Reduce motion"],
        ["spacious", "More line spacing"],
      ].map(([key, label]) => (
        <label key={key} className="jw-a11y-toggle d-flex align-items-center justify-content-between gap-3 py-2" htmlFor={`a11y-${key}`}>
          <span>{label}</span>
          <input id={`a11y-${key}`} type="checkbox" role="switch" checked={prefs[key]} onChange={(event) => updatePreference(key, event.target.checked)} style={{ width: "1.25rem", height: "1.25rem", flexShrink: 0, accentColor: "var(--brand)" }} />
        </label>
      ))}
      <button type="button" className="jw-btn-secondary w-100 mt-3" onClick={() => {
        setPrefs({ ...defaults });
        setNotice("Reading preferences reset to defaults.");
      }}>Reset to defaults</button>
      <p className="visually-hidden" role="status">{notice}</p>
    </dialog>
  );
}

AccessibilityWidget.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
