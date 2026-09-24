import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const db = new Database(path.join(__dirname, 'orders.db'))

// Every contact form submission is stored before any email is attempted.
// 11 Sep 2026: Postmark is returning "This account is not approved to send email", so a submission that depended on the
// email succeeding would simply have been lost, and the visitor told to email instead. Storage first, notification second.
db.exec(`
  CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    page TEXT,
    emailed INTEGER NOT NULL DEFAULT 0,
    emailError TEXT,
    seenByAgent INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  )
`)

// The /privacy data-protection complaints procedure (DUAA 2025 s103) reuses /api/contact with a hidden
// `topic` field. Databases created before this column existed need it added once; PRAGMA first, so the
// migration is idempotent and safe to run on every start.
if (!db.prepare("PRAGMA table_info(enquiries)").all().some((column) => column.name === "topic")) {
  db.exec("ALTER TABLE enquiries ADD COLUMN topic TEXT")
}

// Every exchange with the site assistant. James wanted to see what people actually ask, and an enquiry that starts in the
// chat should reach him by the same route as one from the form — so the chat writes into `enquiries` too, via /api/contact.
db.exec(`
  CREATE TABLE IF NOT EXISTS helper_chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sessionId TEXT NOT NULL,
    page TEXT,
    question TEXT NOT NULL,
    reply TEXT NOT NULL,
    degraded INTEGER NOT NULL DEFAULT 0,
    seenByAgent INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  )
`)

/**
 * Can the site still record an enquiry?
 *
 * On 11 Sep 2026 orders.db ended up owned by root, and better-sqlite3 had already opened its handle read-only, so every
 * contact form submission failed with a 500 and no one would have known until somebody complained they had heard
 * nothing back. This gives the agent something to check that does not involve posting a fake enquiry.
 */
export function storageHealth() {
  try {
    db.prepare("CREATE TABLE IF NOT EXISTS write_probe (id INTEGER PRIMARY KEY, at TEXT)").run()
    db.prepare("INSERT INTO write_probe (id, at) VALUES (1, datetime('now')) ON CONFLICT(id) DO UPDATE SET at = excluded.at").run()
    const n = db.prepare("SELECT COUNT(*) AS n FROM enquiries").get().n
    const unseen = db.prepare("SELECT COUNT(*) AS n FROM enquiries WHERE seenByAgent = 0").get().n
    return { writable: true, enquiries: n, unseen }
  } catch (err) {
    return { writable: false, error: err.message }
  }
}

export function saveHelperChat({ sessionId, page, question, reply, degraded }) {
  return db.prepare(`
    INSERT INTO helper_chats (sessionId, page, question, reply, degraded)
    VALUES (@sessionId, @page, @question, @reply, @degraded)
  `).run({ sessionId, page: page || null, question, reply, degraded: degraded ? 1 : 0 }).lastInsertRowid
}

export function saveEnquiry({ name, email, message, page, topic }) {
  const stmt = db.prepare(`
    INSERT INTO enquiries (name, email, message, page, topic)
    VALUES (@name, @email, @message, @page, @topic)
  `)
  return stmt.run({ name, email, message, page: page || null, topic: topic || null }).lastInsertRowid
}

/**
 * Retention for the chat assistant: conversations are kept for 12 months, then deleted
 * (sources/legal/README.md). Called once on startup and daily by server/index.js.
 * Returns the number of rows removed.
 */
export function deleteOldHelperChats() {
  return db.prepare("DELETE FROM helper_chats WHERE createdAt < datetime('now', '-12 months')").run().changes
}

export function markEnquiryEmailed(id, ok, error) {
  db.prepare('UPDATE enquiries SET emailed = ?, emailError = ? WHERE id = ?').run(ok ? 1 : 0, error || null, id)
}
