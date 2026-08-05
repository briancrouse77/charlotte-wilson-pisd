import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import styles from "@/styles/Home.module.css";
import compStyles from "@/styles/Components.module.css";
import PullQuote from "@/components/PullQuote";
import GoldCheckmark from "@/components/GoldCheckmark";
import FaqAccordion from "@/components/FaqAccordion";
import VolunteerForm from "@/components/VolunteerForm";

// Fallback data in case database is empty or not yet migrated
const DEFAULT_PRIORITIES = [
  {
    id: "priority-1",
    num: 1,
    title: "Student Achievement First",
    intro: "Students deserve a school board that measures success by academic growth.",
    points: [
      "Reading and literacy",
      "Mathematics and science",
      "Strong foundational skills",
      "Early intervention & attendance",
      "Career and college readiness",
      "Responsible technology integration (AI & future workforce readiness)",
      "Data-driven decision-making",
    ],
    quote: "Our students don’t need better explanations. They need better outcomes.",
  },
  {
    id: "priority-2",
    num: 2,
    title: "Leadership Informed by Experience",
    intro: "School board decisions affect classrooms every day. Charlotte experiences these realities firsthand.",
    points: [
      "She knows what teachers need in today's environment.",
      "She deeply understands Special Education services.",
      "She has worked inside Princeton ISD classrooms.",
      "She understands how administrative policy affects students.",
    ],
    quote: "School board decisions belong in classrooms—not just boardrooms.",
  },
  {
    id: "priority-3",
    num: 3,
    title: "Transparency Builds Trust",
    intro: "Families, teachers, and taxpayers deserve honest communication and accountability.",
    points: [
      "Campus-by-campus transparency",
      "Understandable student achievement data",
      "Clear, timely district communication",
      "Measurable district goals",
      "Public financial and academic accountability",
    ],
    quote: "Transparency builds trust. Trust builds stronger schools.",
  },
  {
    id: "priority-4",
    num: 4,
    title: "Strong Special Education",
    intro: "Every child deserves the opportunity to succeed. Special Education is public education.",
    points: [
      "Meaningful, individualized services",
      "Parent-teacher collaboration",
      "Early screening and intervention",
      "Supported teachers",
      "Real classroom opportunities to succeed",
    ],
    quote: "Every student deserves more than a plan on paper. They deserve every opportunity to succeed.",
  },
];

const DEFAULT_FAQS = [
  {
    id: "faq-1",
    question: "What does Results Over Rhetoric mean?",
    answer: "Results Over Rhetoric means focusing on what works. School boards exist to improve schools—not simply talk about them. Every decision should improve student learning, strengthen teacher support, increase transparency, and prepare students for the future.",
  },
  {
    id: "faq-2",
    question: "What makes Charlotte different?",
    answer: "Charlotte is not only a parent—she is a current classroom educator, Special Education Department Chair, and Pre-K Team Lead. She understands how school board decisions affect classrooms because she experiences those realities every day.",
  },
  {
    id: "faq-3",
    question: "What are Charlotte’s priorities?",
    answer: "Charlotte's priorities focus on Student Achievement, Special Education, Teacher Support, Transparency, Accountability, and Future Readiness.",
  },
  {
    id: "faq-4",
    question: "How does Charlotte approach difficult or controversial issues?",
    answer: "Charlotte believes every student should be treated with dignity, every parent deserves to be heard, and every school should follow the law. As a trustee, she will keep the board's primary focus on the issues that most directly improve student learning and strengthen Princeton ISD.",
  },
];

export const revalidate = 60; // Revalidate home page every minute

export default async function HomePage() {
  // Fetch active announcement and systems settings from DB
  let homepageSettings = null;

  try {
    homepageSettings = await prisma.systemSettings.findFirst();
  } catch {
    console.error("Database connection omitted or not yet migrated during build.");
  }

  const bioText = homepageSettings?.biography || 
    "Charlotte Wilson is a Special Education teacher, current Special Education Department Chair, current Pre-K Team Lead, former Princeton ISD teacher, and Princeton parent with more than a decade of experience serving students in Texas public schools.";

  const heroBadge = homepageSettings?.heroBadge || "Candidate for Princeton ISD School Board";
  const heroTitle = homepageSettings?.heroTitle || "Charlotte Wilson";
  const heroTagline = homepageSettings?.heroTagline || "RESULTS OVER RHETORIC";
  const coreQuestion = homepageSettings?.coreQuestion || "Will this help students learn?";
  const heroSubhead = homepageSettings?.heroSubhead || "Classroom-informed, student-focused leadership for Princeton ISD.";
  const candidatePerspectiveQuote = homepageSettings?.candidatePerspectiveQuote || "As an educator, I don’t have the luxury of debating problems all day. Every morning, my students walk through the classroom door expecting me to help them succeed. I believe our school board should approach every decision with that same sense of purpose.";

  return (
    <div className={styles.homeWrapper}>
      {/* 2. Hero Section */}
      <section className={`${styles.hero} section-light`} aria-label="Campaign Introduction">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>{heroBadge}</div>
              <h1 className={styles.heroName}>{heroTitle}</h1>
              <p className={styles.heroSlogan}>{heroTagline}</p>
              <p className={styles.heroSub}>{heroSubhead}</p>
              
              <div className={styles.heroBtns}>
                <Link href="/about" className="btn btn-primary" id="hero-about-link">
                  Meet Charlotte
                </Link>
                <Link href="/priorities" className="btn btn-outline" id="hero-priorities-link">
                  My Priorities
                </Link>
                <Link href="/volunteer" className="btn btn-accent" id="hero-volunteer-link">
                  Volunteer
                </Link>
              </div>

              {/* Central Campaign Question Prominently Highlighted */}
              <div className={styles.heroQuestionBox}>
                <div className={styles.heroQuestionLabel}>Our Core Question</div>
                <h2 className={styles.heroQuestionText}>{coreQuestion}</h2>
              </div>
            </div>

            {/* Campaign Portrait Placeholder */}
            <div className={styles.heroPortraitWrapper}>
              <div className={styles.heroPortraitPlaceholder}>
                <div className={styles.placeholderInitials}>CW</div>
                <div className={styles.placeholderLabel}>Charlotte Wilson</div>
                <div className={styles.placeholderSub}>Campaign Portrait Placeholder</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why I'm Running */}
      <section className="section" id="why-i-am-running" aria-label="Why Charlotte is Running">
        <div className="container">
          <div className={styles.whyRunningGrid}>
            <div>
              <span className="form-label" style={{ color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Candidate&apos;s Perspective
              </span>
              <h2 className="section-title-divider">It’s Time to Refocus on What Matters.</h2>
              <div style={{ marginTop: "2rem" }}>
                <p>
                  As a Special Education teacher, current Special Education Department Chair, current Pre-K Team Lead, former Princeton ISD teacher, and Princeton parent, I’ve seen firsthand how school board decisions impact classrooms, teachers, students, and families.
                </p>
                <p>
                  I believe our district deserves leadership that is grounded in today’s classrooms and focused on measurable student success.
                </p>
                <p>
                  My campaign isn’t about political talking points. It’s about making sure every decision improves opportunities for students.
                </p>
                <p style={{ fontWeight: "700", color: "var(--color-primary)" }}>
                  Because that’s what a school board is supposed to do.
                </p>
              </div>

              <div className={styles.chipsContainer}>
                <span className={styles.chip}>👩‍🏫 Special Education Department Chair</span>
                <span className={styles.chip}>🏫 Pre-K Team Lead</span>
                <span className={styles.chip}>🍎 Former Princeton ISD Teacher</span>
                <span className={styles.chip}>👪 Princeton ISD Parent</span>
              </div>
            </div>

            <div>
              {/* Highlighted Pull Quote */}
              <PullQuote
                quote={candidatePerspectiveQuote}
                citation="Charlotte Wilson"
              />

              {/* Classroom informed visual treatment (no child photos) */}
              <div className={styles.classroomTreatment}>
                <div className={styles.classroomPlaceholder}>
                  <div className={styles.classroomIcon} aria-hidden="true">✏️</div>
                  <div className={styles.classroomLabel}>Focusing on Today&apos;s Classrooms</div>
                  <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                    Classroom-informed solutions for Princeton students.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Results Over Rhetoric Comparison */}
      <section className="section section-light" id="rhetoric-vs-results" aria-label="Results Over Rhetoric Philosophy">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="form-label" style={{ color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "1px", display: "block" }}>
              Our Campaign Core
            </span>
            <h2 className="section-title-divider-center" style={{ display: "inline-block" }}>
              What Does &ldquo;Results Over Rhetoric&rdquo; Mean?
            </h2>
            <p style={{ marginTop: "1rem", fontSize: "1.15rem", maxWidth: "600px", margin: "1rem auto 0 auto" }}>
              Results Over Rhetoric means focusing on what works.
            </p>
          </div>

          <div className={compStyles.comparisonGrid}>
            {/* Rhetoric - Subdued styling */}
            <div className={`${compStyles.comparisonColumn} ${compStyles.columnRhetoric}`}>
              <h3 className={compStyles.comparisonTitle}>Rhetoric</h3>
              <ul className={compStyles.comparisonList}>
                <li className={compStyles.comparisonItem}>
                  <span className={compStyles.comparisonDot} />
                  <span>Talking without improving</span>
                </li>
                <li className={compStyles.comparisonItem}>
                  <span className={compStyles.comparisonDot} />
                  <span>Debating without solving</span>
                </li>
                <li className={compStyles.comparisonItem}>
                  <span className={compStyles.comparisonDot} />
                  <span>Explaining instead of fixing</span>
                </li>
                <li className={compStyles.comparisonItem}>
                  <span className={compStyles.comparisonDot} />
                  <span>Measuring success by headlines instead of student growth</span>
                </li>
              </ul>
            </div>

            {/* Results - Positive emphasis styling */}
            <div className={`${compStyles.comparisonColumn} ${compStyles.columnResults}`}>
              <h3 className={compStyles.comparisonTitle}>
                <GoldCheckmark size={24} className={compStyles.comparisonCheck} />
                <span>Results</span>
              </h3>
              <ul className={compStyles.comparisonList}>
                <li className={compStyles.comparisonItem}>
                  <GoldCheckmark size={18} className={compStyles.comparisonCheck} />
                  <span>More students reading on grade level</span>
                </li>
                <li className={compStyles.comparisonItem}>
                  <GoldCheckmark size={18} className={compStyles.comparisonCheck} />
                  <span>Stronger math achievement</span>
                </li>
                <li className={compStyles.comparisonItem}>
                  <GoldCheckmark size={18} className={compStyles.comparisonCheck} />
                  <span>Better Special Education services</span>
                </li>
                <li className={compStyles.comparisonItem}>
                  <GoldCheckmark size={18} className={compStyles.comparisonCheck} />
                  <span>Better teacher support</span>
                </li>
                <li className={compStyles.comparisonItem}>
                  <GoldCheckmark size={18} className={compStyles.comparisonCheck} />
                  <span>Honest communication with families</span>
                </li>
                <li className={compStyles.comparisonItem}>
                  <GoldCheckmark size={18} className={compStyles.comparisonCheck} />
                  <span>Transparent decision-making</span>
                </li>
                <li className={compStyles.comparisonItem}>
                  <GoldCheckmark size={18} className={compStyles.comparisonCheck} />
                  <span>Students graduating prepared for college, careers, and life</span>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <p style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--color-primary)" }}>
              Every decision should answer one question:
            </p>
            <h3 style={{ fontSize: "1.85rem", color: "var(--color-accent)", fontFamily: "var(--font-serif)" }}>
              Will this help students learn?
            </h3>
          </div>
        </div>
      </section>

      {/* 5. Priorities Overview */}
      <section className="section" id="priorities-overview" aria-label="Campaign Priorities Overview">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="section-title-divider-center" style={{ display: "inline-block" }}>
              Our Campaign Priorities
            </h2>
            <p style={{ marginTop: "1rem", maxWidth: "600px", margin: "1rem auto 0 auto" }}>
              A solutions-focused approach to improving education, supporting teachers, and building trust in Princeton ISD.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {DEFAULT_PRIORITIES.map((priority) => (
              <div
                key={priority.id}
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "var(--border-radius)",
                  padding: "2rem",
                  backgroundColor: "var(--color-bg-white)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                  <GoldCheckmark size={22} />
                  <h3 style={{ fontSize: "1.35rem", margin: 0 }}>
                    {priority.title}
                  </h3>
                </div>
                <p style={{ fontSize: "0.95rem", marginBottom: "1.5rem", flexGrow: 1 }}>
                  {priority.intro}
                </p>
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "1rem", marginTop: "auto" }}>
                  <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: "var(--color-primary)", fontWeight: "600", marginBottom: "1rem" }}>
                    &ldquo;{priority.quote}&rdquo;
                  </p>
                  <Link
                    href={`/priorities#priority-${priority.num}`}
                    className="btn btn-outline"
                    style={{ fontSize: "0.85rem", padding: "0.5rem 1rem", width: "100%" }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Meet Charlotte Preview */}
      <section className="section section-light" id="meet-charlotte-preview" aria-label="About Charlotte Wilson Preview">
        <div className="container">
          <div className={styles.whyRunningGrid}>
            {/* Primary Portrait Placeholder + Info */}
            <div style={{ position: "relative", minHeight: "350px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className={styles.heroPortraitWrapper} style={{ height: "350px" }}>
                <div className={styles.heroPortraitPlaceholder} style={{ background: "linear-gradient(135deg, var(--charcoal-900) 0%, var(--color-primary) 100%)" }}>
                  <div className={styles.placeholderInitials}>CW</div>
                  <div className={styles.placeholderLabel}>Charlotte Wilson</div>
                  <div className={styles.placeholderSub}>Educator & Parent</div>
                </div>
              </div>
              
              {/* Secondary Image Slot (Placeholder for classroom/family photo) */}
              <div style={{ border: "2px dashed var(--color-accent)", borderRadius: "var(--border-radius)", padding: "1.5rem", textAlign: "center", backgroundColor: "var(--color-bg-white)" }}>
                <span style={{ fontSize: "1.5rem", display: "block" }}>📷</span>
                <span style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--color-primary)" }}>
                  Secondary Campaign Photo Placeholder
                </span>
                <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", margin: "0.25rem 0 0 0" }}>
                  (Admin system customizable: Classroom, Family, or Community photo)
                </p>
              </div>
            </div>

            <div>
              <span className="form-label" style={{ color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Meet the Candidate
              </span>
              <h2 className="section-title-divider">Meet Charlotte</h2>
              <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p>{bioText}</p>
                <p>
                  Previously, Charlotte taught in Princeton ISD, giving her firsthand knowledge of the district she is now seeking to serve.
                </p>
                <p>
                  Throughout her career, she has worked alongside teachers, administrators, specialists, and families to solve problems, improve instruction, and advocate for students.
                </p>
                <p>
                  Charlotte believes school board leadership should be informed by today’s classrooms—not yesterday’s assumptions. She is running to help ensure Princeton ISD remains focused on student achievement, teacher support, transparency, and preparing every child for the future.
                </p>
              </div>
              <Link href="/about" className="btn btn-primary" style={{ marginTop: "1.5rem" }} id="read-story-btn">
                Read Charlotte’s Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. My Values */}
      <section className="section" id="my-values" aria-label="Campaign Values">
        <div className="container">
          <div className={styles.valuesIntro}>
            <span className="form-label" style={{ color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "1px", display: "block" }}>
              Actionable Principles
            </span>
            <h2 className="section-title-divider-center" style={{ display: "inline-block" }}>
              Values Should Be Visible in Our Results.
            </h2>
          </div>

          <div className={styles.valuesList}>
            <div className={styles.valueRow}>
              <div className={styles.valueHeading}>Values matter.</div>
              <p style={{ margin: 0 }}>But on a school board…</p>
              <div className={styles.valueResult} style={{ color: "var(--color-primary)" }}>Values should become action.</div>
            </div>

            <div className={styles.valueRow}>
              <div className={styles.valueHeading}>If we value students—</div>
              <div className={styles.valueDivider} />
              <div className={styles.valueResult}>we improve learning.</div>
            </div>

            <div className={styles.valueRow}>
              <div className={styles.valueHeading}>If we value teachers—</div>
              <div className={styles.valueDivider} />
              <div className={styles.valueResult}>we support them.</div>
            </div>

            <div className={styles.valueRow}>
              <div className={styles.valueHeading}>If we value parents—</div>
              <div className={styles.valueDivider} />
              <div className={styles.valueResult}>we communicate honestly.</div>
            </div>

            <div className={styles.valueRow}>
              <div className={styles.valueHeading}>If we value taxpayers—</div>
              <div className={styles.valueDivider} />
              <div className={styles.valueResult}>we are transparent and accountable.</div>
            </div>

            <div className={styles.valueRow}>
              <div className={styles.valueHeading}>If we value public education—</div>
              <div className={styles.valueDivider} />
              <div className={styles.valueResult}>we strengthen it.</div>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <PullQuote
                quote="My values are measured by whether students are learning."
                citation="Charlotte Wilson"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. My Promise */}
      <section className="section section-light" id="my-promise" aria-label="Trustee Promise Checklist">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="section-title-divider-center" style={{ display: "inline-block" }}>
              Before Every Vote, I Will Ask:
            </h2>
          </div>

          <div className={compStyles.promiseGrid}>
            <div className={compStyles.promiseCard}>
              <GoldCheckmark size={24} />
              <p className={compStyles.promiseText}>Will this help students learn?</p>
            </div>
            <div className={compStyles.promiseCard}>
              <GoldCheckmark size={24} />
              <p className={compStyles.promiseText}>Will this support teachers?</p>
            </div>
            <div className={compStyles.promiseCard}>
              <GoldCheckmark size={24} />
              <p className={compStyles.promiseText}>Will this strengthen our schools?</p>
            </div>
            <div className={compStyles.promiseCard}>
              <GoldCheckmark size={24} />
              <p className={compStyles.promiseText}>Will this improve Special Education?</p>
            </div>
            <div className={compStyles.promiseCard}>
              <GoldCheckmark size={24} />
              <p className={compStyles.promiseText}>Will this prepare students for tomorrow?</p>
            </div>
          </div>

          <div className={compStyles.signatureElement}>
            <p style={{ fontSize: "1.25rem", fontStyle: "italic", marginBottom: "0.5rem" }}>
              &ldquo;If the answer is yes, I’ll support it.&rdquo;
            </p>
            <div className={compStyles.signatureText}>Charlotte Wilson</div>
            <div className={compStyles.signatureLabel}>Candidate for Princeton ISD School Board</div>
          </div>
        </div>
      </section>

      {/* 9. Volunteer Call to Action Section */}
      <section className="section" id="volunteer-cta" aria-label="Volunteer Action Panel">
        <div className="container">
          <div className={styles.volunteerCta}>
            <div className={styles.volunteerGrid}>
              <div className={styles.volunteerText}>
                <h2>Help Put Results First.</h2>
                <p>
                  This campaign is powered by parents, educators, taxpayers, and community members who believe Princeton ISD should remain focused on student success.
                </p>
                <p style={{ marginTop: "1rem" }}>
                  Every conversation with a neighbor brings us closer to a school board that prioritizes student learning. Choose how you want to participate:
                </p>
                <ul className={styles.volunteerOptionsList}>
                  <li className={styles.volunteerOptionItem}>
                    <span className={styles.volunteerOptionDot} />
                    <span>Display a yard sign</span>
                  </li>
                  <li className={styles.volunteerOptionItem}>
                    <span className={styles.volunteerOptionDot} />
                    <span>Help at an event</span>
                  </li>
                  <li className={styles.volunteerOptionItem}>
                    <span className={styles.volunteerOptionDot} />
                    <span>Walk a neighborhood</span>
                  </li>
                  <li className={styles.volunteerOptionItem}>
                    <span className={styles.volunteerOptionDot} />
                    <span>Make phone calls</span>
                  </li>
                  <li className={styles.volunteerOptionItem}>
                    <span className={styles.volunteerOptionDot} />
                    <span>Share campaign information</span>
                  </li>
                  <li className={styles.volunteerOptionItem}>
                    <span className={styles.volunteerOptionDot} />
                    <span>Host a meet-and-greet</span>
                  </li>
                </ul>
              </div>

              {/* Form container */}
              <VolunteerForm />
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ Preview */}
      <section className="section section-light" id="faq-preview" aria-label="Frequently Asked Questions Preview">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="section-title-divider-center" style={{ display: "inline-block" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <FaqAccordion items={DEFAULT_FAQS} />

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/faq" className="btn btn-outline" id="view-all-faq-btn">
              View All Questions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
