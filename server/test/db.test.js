// Retention test for the site's enquiry database (QUEUE PRIVACY-ALIGN).
//
// The website privacy notice promises that enquiries are kept for "up to 12 months from our last
// contact, then deleted". This proves the deletion actually happens, and that the boundary is not
// off by a month: an 11-month-old row survives, a 13-month-old row goes.
//
// db.js opens its database when it is imported, so point it at a throwaway file first. The live
// server/orders.db is never opened by this test.
import { test, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "jw-privacy-align-"));
const dbPath = path.join(dir, "orders.db");
process.env.DB_PATH = dbPath;

const { saveEnquiry, deleteOldEnquiries } = await import("../db.js");

after(() => fs.rmSync(dir, { recursive: true, force: true }));

// SQLite's datetime() stores and compares "YYYY-MM-DD HH:MM:SS" in UTC. Using 30-day months keeps
// both rows clear of the 12-calendar-month boundary (330 days is under any year; 390 is over any
// year, including a leap year).
function createdAtDaysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
}

test("deleteOldEnquiries keeps an 11-month-old enquiry and deletes a 13-month-old one", () => {
  const keptId = saveEnquiry({
    name: "Eleven Months",
    email: "eleven@example.test",
    message: "this enquiry is still inside the retention period",
    page: "/privacy",
  });
  const deletedId = saveEnquiry({
    name: "Thirteen Months",
    email: "thirteen@example.test",
    message: "this enquiry is past the retention period",
    page: "/privacy",
  });

  const raw = new Database(dbPath);
  raw.prepare("UPDATE enquiries SET createdAt = ? WHERE id = ?").run(createdAtDaysAgo(11 * 30), keptId);
  raw.prepare("UPDATE enquiries SET createdAt = ? WHERE id = ?").run(createdAtDaysAgo(13 * 30), deletedId);

  assert.equal(raw.prepare("SELECT COUNT(*) AS n FROM enquiries").get().n, 2, "both rows are seeded");

  const removed = deleteOldEnquiries();

  assert.equal(removed, 1, "exactly the 13-month-old enquiry is removed");
  const rows = raw.prepare("SELECT id, email, message FROM enquiries ORDER BY id").all();
  assert.deepEqual(rows.map((row) => row.id), [keptId], "the 11-month-old enquiry survives");
  assert.equal(rows[0].email, "eleven@example.test");
  assert.equal(rows[0].message, "this enquiry is still inside the retention period");

  raw.close();
});
