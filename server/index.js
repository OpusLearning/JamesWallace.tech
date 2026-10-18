// server/index.js
//
// The entry point. Environment loading, the IPv4 DNS order MailerLite needs, starting the app and
// the daily chat-retention timer live here; the routes themselves are in server/app.js.

// Force IPv4 for all outbound DNS lookups (MailerLite only allows our IPv4)
import { setDefaultResultOrder } from "node:dns";
setDefaultResultOrder("ipv4first");

/**
 * 1. Load environment variables
 */
import dotenv from "dotenv";
dotenv.config();
console.log("OPENAI_API_KEY", process.env.OPENAI_API_KEY ? "loaded" : "MISSING");  // never print the key itself

/**
 * 2. Imports & start
 */
import { app } from "./app.js";
import { deleteOldHelperChats } from "./db.js";

/**
 * 7. Chat retention — conversations are kept for 12 months (sources/legal/README.md).
 *
 * Run once at startup so a restart is enough to catch up, then daily. A failure here must never stop
 * the site answering enquiries, so it is caught and logged rather than thrown.
 */
function runChatRetention() {
  try {
    const removed = deleteOldHelperChats();
    console.log(`[retention] helper_chats older than 12 months removed: ${removed}`);
  } catch (err) {
    console.error("[retention] could not prune helper_chats:", err.message);
  }
}
runChatRetention();
setInterval(runChatRetention, 24 * 60 * 60 * 1000).unref();

/**
 * 8. Start the server
 */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Agent server running on port ${PORT}`));
