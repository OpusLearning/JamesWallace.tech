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

export function createOrder({ email, name, tier, amount, stripeSessionId, stripePaymentId }) {
  const stmt = db.prepare(`
    INSERT INTO orders (email, name, tier, amount, stripeSessionId, stripePaymentId, status)
    VALUES (@email, @name, @tier, @amount, @stripeSessionId, @stripePaymentId, 'paid')
  `)
  const result = stmt.run({ email, name, tier, amount, stripeSessionId, stripePaymentId: stripePaymentId || null })
  return result.lastInsertRowid
}
