import React from "react";

export default function GetStarted() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Book Your Free Consultation</h1>
      <p className="text-center mb-4">
        Select an available 30‑minute slot from the calendar below. Once booked,
        you will receive an email with your Zoom meeting link.
      </p>
      <div className="mb-5">
        {/* Replace the src URL below with your actual Google Calendar booking embed URL */}
        <iframe
          src="YOUR_GOOGLE_CALENDAR_EMBED_URL"
          style={{ border: 0 }}
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          title="Book Consultation"
        ></iframe>
      </div>

      <h2 className="text-center mb-4">Contact Us</h2>
      <p className="text-center mb-4">
        If you have any questions or need further assistance, please fill out
        the contact form below.
      </p>
      <div className="mb-5">
        {/* Replace the src URL below with your actual Google Form embed URL */}
        <iframe
          src="YOUR_GOOGLE_FORM_EMBED_URL"
          width="100%"
          height="800"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Contact Form"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}
