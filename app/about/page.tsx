import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import styles from "@/styles/Home.module.css";
import compStyles from "@/styles/Components.module.css";
import PullQuote from "@/components/PullQuote";
import GoldCheckmark from "@/components/GoldCheckmark";

export const revalidate = 60;

export default async function AboutPage() {
  let settings = null;
  let timelineEvents: any[] = [];

  try {
    settings = await prisma.systemSettings.findFirst();
    // Fetch timeline entries from database if available (ordered by year or date)
    timelineEvents = await prisma.event.findMany({
      where: { eventType: "TIMELINE", publishedStatus: "PUBLISHED" },
      orderBy: { date: "asc" },
    });
  } catch (error) {
    console.error("Prisma query omitted or database not yet migrated.");
  }

  const bioText = settings?.biography || 
    "Charlotte Wilson is a Special Education teacher, current Special Education Department Chair, current Pre-K Team Lead, former Princeton ISD teacher, and Princeton parent with more than a decade of experience serving students in Texas public schools.";

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Page Hero */}
      <section className="section-light" style={{ padding: "5rem 0" }}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>About the Candidate</div>
              <h1 className={styles.heroName}>Meet Charlotte Wilson</h1>
              <p className={styles.heroSlogan} style={{ fontSize: "1.5rem" }}>
                A Teacher's Perspective. A Parent's Voice.
              </p>
              <p className={styles.heroSub}>
                Grounded in today's classrooms. Focused on measurable student success.
              </p>
            </div>
            <div className={styles.heroPortraitWrapper}>
              <div className={styles.heroPortraitPlaceholder}>
                <div className={styles.placeholderInitials}>CW</div>
                <div className={styles.placeholderLabel}>Charlotte Wilson</div>
                <div className={styles.placeholderSub}>Educator & Parent</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Biography Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Professional Overview */}
            <div>
              <h2 className="section-title-divider">Professional Background & Classroom Leadership</h2>
              <p style={{ marginTop: "1.5rem" }}>
                {bioText}
              </p>
              <p>
                She currently serves in Garland ISD, where she leads her Special Education team and her Pre-K teaching team while supporting students with diverse learning needs.
              </p>
            </div>

            {/* Pull Quote */}
            <PullQuote
              quote="School board decisions belong in classrooms—not just boardrooms."
              citation="Charlotte Wilson"
            />

            {/* Princeton Connection */}
            <div>
              <h3 style={{ fontSize: "1.5rem", color: "var(--color-primary)", marginBottom: "1rem" }}>
                The Princeton ISD Connection
              </h3>
              <p>
                Previously, Charlotte taught in Princeton ISD, giving her firsthand knowledge of the district she is now seeking to serve. As a former teacher in the district and a current Princeton parent, she understands how school board policies manifest in daily classroom life and affect student opportunities.
              </p>
            </div>

            {/* Special Education Experience */}
            <div>
              <h3 style={{ fontSize: "1.5rem", color: "var(--color-primary)", marginBottom: "1rem" }}>
                Experience in Special Education & Pre-K
              </h3>
              <p>
                Throughout her career, Charlotte has worked alongside teachers, administrators, specialists, and families to solve problems, improve instruction, and advocate for students.
              </p>
              <p>
                As a current Special Education Department Chair, she manages individualized student plans, navigates compliance, and leads teams of educators to support diverse learners. Her role as a Pre-K Team Lead highlights her focus on early intervention, setting the foundation for long-term academic achievement.
              </p>
            </div>

            {/* Parent Perspective */}
            <div>
              <h3 style={{ fontSize: "1.5rem", color: "var(--color-primary)", marginBottom: "1rem" }}>
                A Parent's Voice
              </h3>
              <p>
                As a parent raising children in the community, Charlotte is deeply invested in the long-term success of Princeton schools. She believes families deserve clear, transparent communication, understandable student data, and a school board that approaches every decision with student learning as the primary metric.
              </p>
            </div>

            {/* Approach to Service */}
            <div>
              <h3 style={{ fontSize: "1.5rem", color: "var(--color-primary)", marginBottom: "1rem" }}>
                Approach to Service: Results Over Rhetoric
              </h3>
              <p>
                Charlotte believes school board leadership should be informed by today’s classrooms—not yesterday’s assumptions. Her service is guided by a simple, evidence-driven standard: putting student outcomes first, supporting teachers, ensuring fiscal transparency, and asking the vital question before every vote:
              </p>
              <h4 style={{ fontSize: "1.35rem", color: "var(--color-accent)", marginTop: "1rem", fontFamily: "var(--font-serif)" }}>
                &ldquo;Will this help students learn?&rdquo;
              </h4>
            </div>

          </div>
        </div>
      </section>

      {/* Timeline Section (Optional component, only renders if populated) */}
      {timelineEvents.length > 0 && (
        <section className="section section-light" id="timeline" aria-label="Campaign Timeline">
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 className="section-title-divider-center" style={{ display: "inline-block" }}>
                Timeline of Experience
              </h2>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem", position: "relative" }}>
              {timelineEvents.map((evt) => (
                <div key={evt.id} style={{ display: "flex", gap: "2rem" }}>
                  <div style={{ fontWeight: "700", color: "var(--color-primary)", fontSize: "1.2rem", minWidth: "80px" }}>
                    {new Date(evt.date).getFullYear()}
                  </div>
                  <div style={{ borderLeft: "2px solid var(--color-accent)", paddingLeft: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.15rem", margin: 0 }}>{evt.title}</h3>
                    <p style={{ fontSize: "0.95rem", marginTop: "0.5rem", margin: 0 }}>{evt.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Volunteer CTA */}
      <section className="section" id="about-volunteer-cta">
        <div className="container">
          <div className={styles.volunteerCta} style={{ textAlign: "center" }}>
            <h2 style={{ color: "var(--white)" }}>Help Put Results First in Princeton ISD</h2>
            <p style={{ maxWidth: "600px", margin: "1.5rem auto 2rem auto", color: "rgba(255, 255, 255, 0.85)" }}>
              Join parents, teachers, and neighbors supporting Charlotte Wilson's campaign for school board.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/volunteer" className="btn btn-accent" id="about-volunteer-btn">
                Volunteer With Charlotte
              </Link>
              <Link href="/priorities" className="btn btn-outline" style={{ borderColor: "var(--white)", color: "var(--white)" }}>
                Read the Priorities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
