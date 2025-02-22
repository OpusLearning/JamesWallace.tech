import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container py-5 text-white" style={{ maxWidth: "800px" }}>
      <h1 className="mb-4 text-center">Privacy Policy</h1>
      <p className="text-center">Last updated: 1 October 2024</p>
      <hr className="border-white" />
      <section className="mb-4">
        <h2 className="text-white">1. Introduction</h2>
        <p>
          At Purple Pixel Derby, we take your privacy seriously. We are
          committed to protecting your personal data and ensuring that your
          rights are respected. This Privacy Policy explains how we collect,
          use, store, and share your personal information, as well as your
          rights under the applicable data protection laws.
        </p>
      </section>
      <section className="mb-4">
        <h2 className="text-white">2. Information We Collect</h2>
        <p>
          We may collect different types of personal data about you, including:
        </p>
        <ul>
          <li>
            <strong>Identity Data:</strong> Your name, username, or other
            identifiers.
          </li>
          <li>
            <strong>Contact Data:</strong> Your email address, telephone number,
            and postal address.
          </li>
          <li>
            <strong>Technical Data:</strong> Information such as your IP
            address, browser type and version, and other technical details about
            your device and internet connection.
          </li>
          <li>
            <strong>Usage Data:</strong> Details of how you use our website and
            services.
          </li>
        </ul>
      </section>
      <section className="mb-4">
        <h2 className="text-white">3. How We Use Your Personal Data</h2>
        <p>
          We process your personal data only when we have a lawful basis to do
          so. This typically occurs when:
        </p>
        <ul>
          <li>It is necessary for the performance of a contract with you.</li>
          <li>
            It is required for our legitimate interests, provided these do not
            override your rights and freedoms.
          </li>
          <li>
            It is necessary to comply with a legal or regulatory obligation.
          </li>
        </ul>
      </section>
      <section className="mb-4">
        <h2 className="text-white">4. Data Security</h2>
        <p>
          We have implemented a range of appropriate security measures to
          protect your personal data from unauthorised access, accidental loss,
          or alteration. These include both technical and organisational
          safeguards designed to maintain the integrity and confidentiality of
          your information.
        </p>
      </section>
      <section className="mb-4">
        <h2 className="text-white">5. Your Legal Rights</h2>
        <p>Under applicable data protection laws, you have the right to:</p>
        <ul>
          <li>Request access to your personal data.</li>
          <li>Request correction or deletion of your personal data.</li>
          <li>Request restriction of processing your personal data.</li>
          <li>Object to the processing of your personal data.</li>
          <li>Request the transfer (portability) of your personal data.</li>
          <li>
            Withdraw consent at any time, where processing is based on your
            consent.
          </li>
        </ul>
        <p>
          If you wish to exercise any of these rights, please contact us using
          the details provided below.
        </p>
      </section>
      <section className="mb-4">
        <h2 className="text-white">6. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or our privacy
          practices, please contact us at:
        </p>
        <ul>
          <li>
            <strong>Email:</strong> admin@purplepixelderby.com
          </li>
        </ul>
      </section>
    </div>
  );
}
