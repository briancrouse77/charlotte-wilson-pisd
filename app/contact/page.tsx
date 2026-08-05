import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ContactForm from "@/components/ContactForm";
import styles from "@/styles/Home.module.css";

export const revalidate = 60;

export default async function ContactPage() {
  let settings = null;

  try {
    settings = await prisma.systemSettings.findFirst();
  } catch {
    console.error("Prisma setting query omitted or database not yet migrated.");
  }

  // Fallback to clearly labeled placeholders if not set in database
  const campaignEmail = settings?.campaignEmail || "[Campaign Email Pending Configuration]";
  const campaignPhone = settings?.campaignPhone || "[Campaign Phone Pending Configuration]";
  const campaignAddress = settings?.campaignAddress || "[Campaign Mailing Address Pending Configuration]";
  
  const hasSocials = settings?.facebookUrl || settings?.twitterUrl || settings?.instagramUrl;

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="section-light" style={{ padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
          <div className={styles.heroBadge}>Connect With Us</div>
          <h1 className={styles.heroName} style={{ marginBottom: "1rem" }}>
            Contact the Campaign
          </h1>
          <p className={styles.heroSub} style={{ margin: "0 auto" }}>
            Have a question for Charlotte, or want to get in touch with our team? Send us a message.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem" }} className={styles.whyRunningGrid}>
            
            {/* Contact details & placeholders */}
            <div>
              <h2 className="section-title-divider">Campaign Information</h2>
              <p style={{ marginTop: "1.5rem" }}>
                Our campaign is driven by the community. We welcome your questions, feedback, and engagement.
              </p>

              <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-primary)", margin: "0 0 0.25rem 0", fontFamily: "var(--font-sans)" }}>
                    Email Address
                  </h3>
                  <p style={{ fontSize: "1.05rem", fontWeight: campaignEmail.startsWith("[") ? "normal" : "600", color: campaignEmail.startsWith("[") ? "var(--color-text-muted)" : "var(--color-text-dark)", fontStyle: campaignEmail.startsWith("[") ? "italic" : "normal" }}>
                    {campaignEmail}
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-primary)", margin: "0 0 0.25rem 0", fontFamily: "var(--font-sans)" }}>
                    Mailing Address
                  </h3>
                  <p style={{ fontSize: "1.05rem", color: campaignAddress.startsWith("[") ? "var(--color-text-muted)" : "var(--color-text-dark)", fontStyle: campaignAddress.startsWith("[") ? "italic" : "normal" }}>
                    {campaignAddress}
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-primary)", margin: "0 0 0.25rem 0", fontFamily: "var(--font-sans)" }}>
                    Phone Number
                  </h3>
                  <p style={{ fontSize: "1.05rem", color: campaignPhone.startsWith("[") ? "var(--color-text-muted)" : "var(--color-text-dark)", fontStyle: campaignPhone.startsWith("[") ? "italic" : "normal" }}>
                    {campaignPhone}
                  </p>
                </div>

                {hasSocials && (
                  <div>
                    <h3 style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-primary)", margin: "0 0 0.5rem 0", fontFamily: "var(--font-sans)" }}>
                      Social Media
                    </h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: "1rem" }}>
                      {settings?.facebookUrl && (
                        <li>
                          <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)", textDecoration: "underline", fontWeight: "600" }}>
                            Facebook
                          </a>
                        </li>
                      )}
                      {settings?.twitterUrl && (
                        <li>
                          <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)", textDecoration: "underline", fontWeight: "600" }}>
                            Twitter
                          </a>
                        </li>
                      )}
                      {settings?.instagramUrl && (
                        <li>
                          <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)", textDecoration: "underline", fontWeight: "600" }}>
                            Instagram
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div style={{ marginTop: "3rem", padding: "1.5rem", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "var(--border-radius)", backgroundColor: "var(--color-bg-light)" }}>
                <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", marginBottom: "0.5rem" }}>
                  Want to join our volunteer team?
                </h4>
                <p style={{ fontSize: "0.95rem", marginBottom: "1rem" }}>
                  Help us knock doors, distribute yard signs, make calls, or support operations.
                </p>
                <Link href="/volunteer" className="btn btn-primary" style={{ fontSize: "0.9rem", padding: "0.5rem 1rem" }} id="contact-volunteer-link">
                  Volunteer Sign Up
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />

          </div>
        </div>
      </section>
    </div>
  );
}
