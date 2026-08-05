import React from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import PullQuote from "@/components/PullQuote";
import GoldCheckmark from "@/components/GoldCheckmark";
import { prisma } from "@/lib/prisma";

const DEFAULT_QUESTIONS = [
  "Will this decision directly improve student learning and classroom instruction?",
  "Does this support and empower teachers to do their best work?",
  "Is this policy transparent, clear, and accountable to taxpayers?",
  "Does this respect the role of parents as primary partners in their child's education?",
  "Is this focused on measurable results rather than political talking points?",
];

export const revalidate = 60;

export default async function ResultsOverRhetoricPage() {
  let settings = null;
  try {
    settings = await prisma.systemSettings.findFirst();
  } catch {
    // Fallback
  }

  const questions: string[] = Array.isArray(settings?.frameworkQuestions)
    ? (settings.frameworkQuestions as string[])
    : DEFAULT_QUESTIONS;

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Editorial Header */}
      <section className="section-light" style={{ padding: "6rem 0 5rem 0" }}>
        <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
          <div className={styles.heroBadge}>Campaign Philosophy</div>
          <h1 className={styles.heroName} style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "1.5rem" }}>
            Results Over Rhetoric
          </h1>
          <p style={{ fontSize: "1.25rem", fontStyle: "italic", color: "var(--color-primary)", fontWeight: "600", maxWidth: "600px", margin: "0 auto" }}>
            &ldquo;My values are measured by whether students are learning.&rdquo;
          </p>
        </div>
      </section>

      {/* Philosophy Context */}
      <section className="section">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            
            {/* What it means */}
            <div>
              <h2 className="section-title-divider">What Does &ldquo;Results Over Rhetoric&rdquo; Mean?</h2>
              <p style={{ marginTop: "1.5rem", fontSize: "1.1rem", lineHeight: "1.7" }}>
                Results Over Rhetoric means focusing on what works in our schools. School boards exist to improve education—not simply talk about it or debate theoretical problems. In a local school board race, we must move past political talking points and empty slogans, focusing instead on measurable student success and practical support for classrooms.
              </p>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
                For Charlotte Wilson, this philosophy is not a slogan. It is a commitment to evaluate every policy, budget item, and district goal by its direct impact on instruction.
              </p>
            </div>

            {/* Why Classroom Experience Matters */}
            <div>
              <h3 style={{ fontSize: "1.6rem", color: "var(--color-primary)", marginBottom: "1rem" }}>
                Why Classroom Experience Matters
              </h3>
              <p style={{ fontSize: "1.05rem" }}>
                Today&apos;s classrooms face unique, daily challenges that cannot be understood from assumptions or administrative boards alone. As a current Special Education teacher, Department Chair, and Pre-K Team Lead, Charlotte experiences these classroom realities every single day.
              </p>
              <p style={{ fontSize: "1.05rem" }}>
                Classroom experience ensures that board decisions are practical, workable, and supportive of teachers. When the board understands the actual impact of policy on instruction, it can avoid unnecessary compliance burdens and focus resources where they matter most—with students and educators.
              </p>
            </div>

            {/* Pull Quote */}
            <PullQuote
              quote="As an educator, I don’t have the luxury of debating problems all day. Every morning, my students walk through the classroom door expecting me to help them succeed."
              citation="Charlotte Wilson"
            />

            {/* Why Measurable Results Matter */}
            <div>
              <h3 style={{ fontSize: "1.6rem", color: "var(--color-primary)", marginBottom: "1rem" }}>
                Why Measurable Results Matter
              </h3>
              <p style={{ fontSize: "1.05rem" }}>
                A school board must measure success by student outcomes rather than headlines or administrative explanations. This means tracking concrete markers of growth:
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", padding: "1rem 0", margin: 0 }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <GoldCheckmark size={18} style={{ marginTop: "0.25rem" }} />
                  <span>Academic growth in core competencies (Reading, Math, Science).</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <GoldCheckmark size={18} style={{ marginTop: "0.25rem" }} />
                  <span>Grade-level progress and early screening intervention milestones.</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <GoldCheckmark size={18} style={{ marginTop: "0.25rem" }} />
                  <span>The quality and delivery of Special Education services.</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <GoldCheckmark size={18} style={{ marginTop: "0.25rem" }} />
                  <span>Teacher retention rates and teacher support structures.</span>
                </li>
              </ul>
              <p style={{ fontSize: "1.05rem" }}>
                By establishing clear, publicly communicated academic and operational goals, Princeton ISD can maintain focus on student growth and ensure taxpayers see real value in their school investment.
              </p>
            </div>

            {/* 5-Question Decision Framework */}
            <div style={{ backgroundColor: "var(--color-bg-light)", padding: "2.5rem 2rem", borderRadius: "var(--border-radius)", borderTop: "4px solid var(--color-accent)", marginTop: "1.5rem" }}>
              <h3 style={{ fontSize: "1.75rem", color: "var(--color-primary)", marginBottom: "1.5rem", textAlign: "center" }}>
                Charlotte&apos;s Decision-Making Framework
              </h3>
              <p style={{ textAlign: "center", marginBottom: "2rem", color: "var(--color-text-muted)" }}>
                Before casting any vote as a trustee on the Princeton ISD School Board, Charlotte promises to ask:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "550px", margin: "0 auto" }}>
                {questions.map((q, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "1rem", backgroundColor: "var(--color-bg-white)", padding: "1rem 1.25rem", borderRadius: "var(--border-radius)", borderLeft: "3px solid var(--color-accent)" }}>
                    <GoldCheckmark size={22} />
                    <span style={{ fontSize: "1.05rem", fontWeight: "700", color: "var(--color-primary)" }}>
                      {q}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <p style={{ fontStyle: "italic", fontSize: "1.1rem", margin: 0, fontWeight: "600" }}>
                  &ldquo;If the answer is yes, I’ll support it.&rdquo;
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Action Footer */}
      <section className="section section-light" id="rhetoric-footer">
        <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
          <h2 className="section-title-divider-center" style={{ display: "inline-block" }}>
            Help Us Focus on Student Success
          </h2>
          <p style={{ marginTop: "1rem" }}>
            Join our parent-led, teacher-supported campaign to bring classroom experience to the school board.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
            <Link href="/volunteer" className="btn btn-primary" id="rhetoric-volunteer-btn">
              Volunteer With Charlotte
            </Link>
            <Link href="/about" className="btn btn-outline">
              Read Charlotte's Biography
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
