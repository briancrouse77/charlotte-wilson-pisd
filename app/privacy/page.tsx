import React from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="section-light" style={{ padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
          <h1 className={styles.heroName} style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Privacy Policy
          </h1>
          <p style={{ margin: "0 auto" }}>
            Information on how the Charlotte Wilson Campaign collects, uses, and safeguards your data.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: "720px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <p><strong>Last Updated: July 24, 2026</strong></p>
            
            <p>
              The Charlotte Wilson for Princeton ISD School Board Campaign (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy of our supporters, volunteers, and website visitors. This Privacy Policy details what information we collect through our website, how we use it, and how we protect it.
            </p>

            <h2 style={{ fontSize: "1.35rem", color: "var(--color-primary)", marginTop: "1rem", borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: "0.5rem" }}>
              1. Information We Collect
            </h2>
            <p>
              We collect information that you voluntarily provide to us when you interact with our website, such as submitting a volunteer signup form or a contact inquiry.
            </p>
            <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>
                <strong>Volunteer Form:</strong> We collect your First Name, Last Name, Email Address, Phone Number (optional), ZIP Code, your selected volunteer interests/activities, and any optional message you provide.
              </li>
              <li>
                <strong>Contact Form:</strong> We collect your Name, Email Address, Phone Number (optional), Subject of your inquiry, and your message.
              </li>
              <li>
                <strong>Consent Checkboxes:</strong> We track whether you have consented to receive campaign communications (required for the volunteer form, optional for contact inquiries).
              </li>
            </ul>

            <h2 style={{ fontSize: "1.35rem", color: "var(--color-primary)", marginTop: "1rem", borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: "0.5rem" }}>
              2. How We Use Your Information
            </h2>
            <p>
              We use the information collected exclusively for campaign-related purposes, including:
            </p>
            <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>Coordinating campaign volunteer activities (e.g. organizing neighborhood walks or delivering yard signs).</li>
              <li>Responding directly to your messages, questions, or invitations.</li>
              <li>Sending updates, election alerts, and information regarding Charlotte&apos;s platform (only if you have opted in).</li>
            </ul>

            <h2 style={{ fontSize: "1.35rem", color: "var(--color-primary)", marginTop: "1rem", borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: "0.5rem" }}>
              3. Data Security & Sharing
            </h2>
            <p>
              We prioritize the security of your supporter data. All form submissions are validated and stored in a secure database environment that is only accessible to authorized campaign staff.
            </p>
            <p style={{ fontWeight: "700", color: "var(--color-primary)" }}>
              We do not sell, rent, trade, or share your personal information with third-party organizations, commercial entities, or other campaigns.
            </p>

            <h2 style={{ fontSize: "1.35rem", color: "var(--color-primary)", marginTop: "1rem", borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: "0.5rem" }}>
              4. Cookies and Web Analytics
            </h2>
            <p>
              Our website may use standard session cookies to ensure the proper functioning of interactive forms and the admin authentication portal. We support privacy-conscious analytics hooks that track high-level events (like form submissions) to monitor site health without harvesting personally identifiable profile data. We do not use third-party behavioral advertising trackers.
            </p>

            <h2 style={{ fontSize: "1.35rem", color: "var(--color-primary)", marginTop: "1rem", borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: "0.5rem" }}>
              5. Opting Out
            </h2>
            <p>
              If you wish to stop receiving updates or campaign notifications, you may unsubscribe at any time by following the instructions at the bottom of our emails, or by replying &ldquo;STOP&rdquo; to text notifications. You can also contact us directly to request that your information be removed from our volunteer lists.
            </p>

            <h2 style={{ fontSize: "1.35rem", color: "var(--color-primary)", marginTop: "1rem", borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: "0.5rem" }}>
              6. Contacting the Campaign
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact the campaign through our <Link href="/contact" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>Contact Page</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
