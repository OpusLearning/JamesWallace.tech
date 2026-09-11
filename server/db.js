import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const db = new Database(path.join(__dirname, 'orders.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    tier TEXT NOT NULL,
    amount INTEGER NOT NULL,
    stripeSessionId TEXT UNIQUE NOT NULL,
    stripePaymentId TEXT,
    status TEXT NOT NULL DEFAULT 'paid',
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  )
`)

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

export function saveEnquiry({ name, email, message, page }) {
  const stmt = db.prepare(`
    INSERT INTO enquiries (name, email, message, page) VALUES (@name, @email, @message, @page)
  `)
  return stmt.run({ name, email, message, page: page || null }).lastInsertRowid
}

export function markEnquiryEmailed(id, ok, error) {
  db.prepare('UPDATE enquiries SET emailed = ?, emailError = ? WHERE id = ?').run(ok ? 1 : 0, error || null, id)
}

export function createOrder({ email, name, tier, amount, stripeSessionId, stripePaymentId }) {
  const stmt = db.prepare(`
    INSERT INTO orders (email, name, tier, amount, stripeSessionId, stripePaymentId, status)
    VALUES (@email, @name, @tier, @amount, @stripeSessionId, @stripePaymentId, 'paid')
  `)
  const result = stmt.run({ email, name, tier, amount, stripeSessionId, stripePaymentId: stripePaymentId || null })
  return result.lastInsertRowid
}
