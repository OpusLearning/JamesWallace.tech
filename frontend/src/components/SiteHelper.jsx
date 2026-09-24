import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

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

  // Kept off the first screen on phones: the three hero doors are the point of the homepage and the
  // launcher was sitting on top of two of them.
  const [belowHero, setBelowHero] = useState(true);
  useEffect(() => {
    const update = () => {
      const narrow = window.matchMedia("(max-width: 700px)").matches;
      setBelowHero(!narrow || window.scrollY > 260);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

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
      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls="jw-helper-panel"
        style={{
          position: "fixed",
          right: "1.25rem",
          // Sat on top of the hero's "For agencies & schools" button on a 390px screen. The doors are the
          // point of the homepage, so the launcher gets out of their way on small screens.
          bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
          zIndex: 9990,
          maxWidth: "calc(100vw - 2.5rem)",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.7rem 1.1rem",
          borderRadius: "999px",
          border: "1px solid rgba(0,0,0,0.06)",
          background: open ? "var(--text-primary)" : "var(--brand)",
          color: "#fff",
          fontSize: "0.95rem",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(15,23,42,0.18)",
          opacity: belowHero || open ? 1 : 0,
          pointerEvents: belowHero || open ? "auto" : "none",
          transition: "opacity 0.2s ease",
        }}
      >
        <span aria-hidden="true" style={{ fontSize: "1.05rem", lineHeight: 1 }}>{open ? "✕" : "💬"}</span>
        {open ? "Close" : "Ask a question"}
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
            <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.98rem" }}>
              Ask about the tuition
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: "0.15rem" }}>
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
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "88%",
                  padding: "0.55rem 0.75rem",
                  borderRadius: m.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                  background: m.role === "user" ? "var(--action)" : "var(--surface)",
                  color: m.role === "user" ? "#fff" : "var(--text-primary)",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.content}
              </div>
            ))}

            {pending && (
              <div style={{ alignSelf: "flex-start", color: "var(--text-muted)", fontSize: "0.85rem", padding: "0.2rem 0.1rem" }}>
                thinking…
              </div>
            )}

            {messages.length === 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.3rem" }}>
                {OPENERS.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => send(o)}
                    style={{
                      border: "1px solid var(--border)",
                      background: "#fff",
                      color: "var(--brand)",
                      borderRadius: "999px",
                      padding: "0.35rem 0.7rem",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
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
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Want James to come back to you?</span>
                <button
                  type="button"
                  onClick={() => setFormOpen(true)}
                  style={{
                    background: "var(--action)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.4rem 0.7rem",
                    fontWeight: 600,
                    fontSize: "0.82rem",
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
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  Leave your name and email and James will come back to you himself.
                </div>
                <input
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                />
                <textarea
                  rows={2}
                  placeholder="Anything you want him to know (optional)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  style={{
                    background: "var(--action)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.5rem 0.8rem",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    cursor: formState === "sending" ? "default" : "pointer",
                    opacity: formState === "sending" ? 0.7 : 1,
                  }}
                >
                  {formState === "sending" ? "Sending…" : "Send to James"}
                </button>
                {formState === "error" && (
                  <div style={{ color: "#b42318", fontSize: "0.8rem" }}>
                    That did not go through. Email hello@jameswallace.tech or ring 07897 021077.
                  </div>
                )}
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
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
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              type="button"
              onClick={() => send()}
              disabled={pending || !draft.trim()}
              style={{
                background: "var(--brand)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "0 0.85rem",
                fontWeight: 600,
                fontSize: "0.88rem",
                cursor: pending || !draft.trim() ? "default" : "pointer",
                opacity: pending || !draft.trim() ? 0.5 : 1,
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const inputStyle = {
  border: "1px solid var(--border)",
  borderRadius: "8px",
  padding: "0.5rem 0.65rem",
  fontSize: "0.88rem",
  color: "var(--text-primary)",
  background: "#fff",
  width: "100%",
};
