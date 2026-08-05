import React from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import PullQuote from "@/components/PullQuote";
import GoldCheckmark from "@/components/GoldCheckmark";

export default function PrioritiesPage() {
  const prioritiesData = [
    {
      id: "priority-1",
      title: "Student Achievement First",
      challenge: "In a rapidly growing district like Princeton ISD, maintaining and elevating academic outcomes requires deliberate, targeted focus. As classroom technology changes and workforce requirements evolve, students need foundational competencies that prepare them for tomorrow rather than just reacting to the headlines of today.",
      principle: "Students deserve a school board that measures its success primarily by academic growth. Educational policies and budgets must directly align with supporting classrooms and student achievement.",
      focus: [
        "Reading and literacy: Ensuring early intervention to get students reading on grade level.",
        "Mathematics & Science: Promoting strong foundations in analytical skills.",
        "Responsible technology integration: Preparing students for an AI-driven workforce while ensuring technology serves instruction rather than distracting from it.",
        "Career and college readiness: Supporting pathways that prepare graduates for higher education, career entries, and long-term success.",
        "Early intervention: Identifying academic challenges early and addressing them before gaps widen.",
        "Attendance and foundational habits: Encouraging engagement and consistency from the early years.",
      ],
      measurement: "We should measure success through academic growth, grade-level progress, and publicly communicated goals. Progress must be evidence-driven and tracked through district data.",
      quote: "Our students don’t need better explanations. They need better outcomes.",
    },
    {
      id: "priority-2",
      title: "Leadership Informed by Experience",
      challenge: "School board decisions directly shape classrooms, yet policy is too often created without a realistic understanding of what teachers and students experience day-to-day. Decisions made in boardrooms can create unintentional compliance burdens or fail to resolve real instructional challenges.",
      principle: "Leadership should be informed by experience, not assumptions. Board members must understand how policies impact the daily environment of teachers and students.",
      focus: [
        "Grounded decisions: Leveraging Charlotte's current role as Special Education Department Chair and Pre-K Team Lead to guide policy.",
        "Supporting teachers: Advocating for what educators actually need—reasonable workloads, resources, and administrative support.",
        "District understanding: Using experience inside Princeton ISD to implement policies that make sense for the local community.",
        "Policy impact: Evaluating board votes through the lens of classroom execution.",
      ],
      measurement: "We should measure success by teacher retention and support, teacher feedback metrics, and how effectively policies reduce administrative hurdles to focus on teaching.",
      quote: "School board decisions belong in classrooms—not just boardrooms.",
    },
    {
      id: "priority-3",
      title: "Transparency Builds Trust",
      challenge: "Families, teachers, and taxpayers deserve to understand how decisions are made, where tax dollars are allocated, and how students are performing. A lack of clear, understandable information leads to uncertainty and erodes trust in school board leadership.",
      principle: "Families deserve honest communication, teachers deserve transparency, and taxpayers deserve accountability. School district operations must be open and accessible.",
      focus: [
        "Campus-by-campus transparency: Providing clear information on school performance and resources.",
        "Understandable data: Sharing student achievement results in ways that are clear and accessible to families.",
        "Honest family communication: Building straightforward channels for parent feedback and inquiry.",
        "Measurable goals: Establishing public milestones that hold district administration accountable.",
        "Taxpayer accountability: Ensuring responsible, clear budgeting and financial disclosure.",
      ],
      measurement: "We should measure success through family understanding, the accessibility of published data, and clear communication of district goals and financial details to the public.",
      quote: "Transparency builds trust. Trust builds stronger schools.",
    },
    {
      id: "priority-4",
      title: "Strong Special Education",
      challenge: "Special Education is not a separate program; it is a core part of public education. Students with diverse learning needs and their families deserve support that goes beyond legal compliance to deliver real, meaningful opportunities for growth.",
      principle: "Every child deserves the opportunity to succeed. Special Education requires collaboration, early intervention, and supported educators to achieve real outcomes.",
      focus: [
        "Meaningful services: Moving beyond paperwork compliance to focus on actual student progress.",
        "Collaboration: Strengthening the partnership between families, teachers, administrators, and specialists.",
        "Supported teachers: Providing special education staff and general education teachers with the training and resources necessary to implement accommodations.",
        "Early intervention: Identifying learning differences early to apply targeted resources.",
        "Real opportunities: Ensuring every student has a pathway to reach their potential.",
      ],
      measurement: "We should measure success by the quality of services delivered, feedback from special education families, early intervention milestone completion, and teacher support metrics.",
      quote: "Every student deserves more than a plan on paper. They deserve every opportunity to succeed.",
    },
  ];

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Page Hero */}
      <section className="section-light" style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <div className={styles.heroBadge}>Platform Details</div>
            <h1 className={styles.heroName} style={{ marginBottom: "1rem" }}>
              Campaign Priorities
            </h1>
            <p className={styles.heroSub} style={{ margin: "0 auto" }}>
              Charlotte Wilson's solutions-focused, classroom-grounded framework for Princeton ISD.
            </p>
          </div>
        </div>
      </section>

      {/* Priorities Detail Sections */}
      <section className="section">
        <div className="container" style={{ maxWidth: "900px" }}>
          
          {prioritiesData.map((priority, index) => (
            <div
              key={priority.id}
              id={priority.id}
              style={{
                marginBottom: "5rem",
                borderBottom: index < prioritiesData.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                paddingBottom: index < prioritiesData.length - 1 ? "4rem" : "0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                <GoldCheckmark size={32} />
                <h2 style={{ fontSize: "2rem", margin: 0, paddingBottom: 0 }}>
                  {priority.title}
                </h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "3rem" }} className={styles.whyRunningGrid}>
                {/* Policy Details */}
                <div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-text-muted)", margin: "0 0 0.5rem 0", fontFamily: "var(--font-sans)" }}>
                      The Challenge
                    </h3>
                    <p style={{ fontSize: "1rem" }}>{priority.challenge}</p>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-primary)", margin: "0 0 0.5rem 0", fontFamily: "var(--font-sans)" }}>
                      Guiding Principle
                    </h3>
                    <p style={{ fontSize: "1.05rem", fontWeight: "600", color: "var(--color-text-dark)" }}>
                      {priority.principle}
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-text-muted)", margin: "0 0 0.5rem 0", fontFamily: "var(--font-sans)" }}>
                      How We Measure Success
                    </h3>
                    <p style={{ fontSize: "1rem", fontStyle: "italic" }}>{priority.measurement}</p>
                  </div>
                </div>

                {/* Focus list & pull quote */}
                <div>
                  <div style={{ backgroundColor: "var(--color-bg-light)", padding: "1.5rem", borderRadius: "var(--border-radius)", marginBottom: "2rem" }}>
                    <h3 style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-primary)", marginBottom: "1rem", fontFamily: "var(--font-sans)" }}>
                      Areas of Focus
                    </h3>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", padding: 0, margin: 0 }}>
                      {priority.focus.map((item, itemIdx) => (
                        <li key={itemIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.95rem", color: "var(--color-text-muted)" }}>
                          <GoldCheckmark size={16} style={{ marginTop: "0.2rem" }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <PullQuote quote={priority.quote} citation="Charlotte Wilson" />
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Volunteer CTA */}
      <section className="section section-light" id="priorities-volunteer">
        <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
          <h2 className="section-title-divider-center" style={{ display: "inline-block" }}>
            Let&apos;s Focus on What Works
          </h2>
          <p style={{ marginTop: "1rem" }}>
            A school board focused on results requires support from families, teachers, and taxpayers alike.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap", marginTop: "2rem" }}>
            <Link href="/volunteer" className="btn btn-primary" id="priorities-volunteer-btn">
              Volunteer to Help
            </Link>
            <Link href="/results-over-rhetoric" className="btn btn-outline">
              Learn About &ldquo;Results Over Rhetoric&rdquo;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
