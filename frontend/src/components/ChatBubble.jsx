import React from "react";

export default function ChatBubble({ sender, text }) {
  const isUser = sender === "user";
  return (
    <div className={`mb-2 ${isUser ? "text-end" : "text-start"}`}>
      <span
        className={`d-inline-block p-2 rounded ${
          isUser ? "bg-primary text-white" : "bg-light text-dark"
        }`}
        style={{ maxWidth: "80%" }}
      >
        <strong>{isUser ? "You" : "Agent"}:</strong> {text}
      </span>
    </div>
  );
}
