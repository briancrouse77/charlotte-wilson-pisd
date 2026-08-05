import React from "react";
import VolunteerForm from "@/components/VolunteerForm";
import styles from "@/styles/Home.module.css";

export default function VolunteerPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="section-light" style={{ padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
          <div className={styles.heroBadge}>Get Involved</div>
          <h1 className={styles.heroName} style={{ marginBottom: "1rem" }}>
            Join the Campaign
          </h1>
          <p className={styles.heroSub} style={{ margin: "0 auto" }}>
            This campaign is powered by parents, educators, taxpayers, and community members who believe Princeton ISD should remain focused on student success.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: "680px" }}>
          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <p style={{ fontSize: "1.1rem" }}>
              Every yard sign, conversation, and share brings us closer to a school board focused on results. Please select how you&apos;d like to participate, fill out your information below, and Charlotte&apos;s team will contact you.
            </p>
          </div>

          <VolunteerForm />
        </div>
      </section>
    </div>
  );
}
