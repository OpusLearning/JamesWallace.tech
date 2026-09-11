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
