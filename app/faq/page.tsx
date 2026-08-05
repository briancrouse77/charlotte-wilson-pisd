import React from "react";
import { prisma } from "@/lib/prisma";
import FaqClient from "@/components/FaqClient";
import styles from "@/styles/Home.module.css";

export const revalidate = 60;

const SEEDED_FAQS = [
  {
    id: "faq-1",
    question: "What does Results Over Rhetoric mean?",
    answer: "Results Over Rhetoric means focusing on what works. School boards exist to improve schools—not simply talk about them. Every decision should improve student learning, strengthen teacher support, increase transparency, and prepare students for the future.",
    category: "Campaign",
  },
  {
    id: "faq-2",
    question: "What makes Charlotte different?",
    answer: "Charlotte is not only a parent—she is a current classroom educator, Special Education Department Chair, and Pre-K Team Lead. She understands how school board decisions affect classrooms because she experiences those realities every day.",
    category: "About Charlotte",
  },
  {
    id: "faq-3",
    question: "What are Charlotte’s priorities?",
    answer: "Charlotte's priorities focus on Student Achievement, Special Education, Teacher Support, Transparency, Accountability, and Future Readiness. Read more on our dedicated Priorities page.",
    category: "Priorities",
  },
  {
    id: "faq-4",
    question: "How does Charlotte approach difficult or controversial issues?",
    answer: "Charlotte believes every student should be treated with dignity, every parent deserves to be heard, and every school should follow the law. As a trustee, she will keep the board's primary focus on the issues that most directly improve student learning and strengthen Princeton ISD.",
    category: "School Board Service",
  },
];

interface FaqItemType {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default async function FaqPage() {
  let dbFaqs: FaqItemType[] = [];

  try {
    dbFaqs = await prisma.fAQ.findMany({
      where: { publishedStatus: "PUBLISHED" },
      orderBy: { orderIndex: "asc" },
    });
  } catch {
    console.error("Prisma FAQ query omitted or database not yet migrated.");
  }

  // Combine seeded FAQs with database FAQs
  const allFaqs = dbFaqs.length > 0 ? dbFaqs.map(f => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category,
  })) : SEEDED_FAQS;

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="section-light" style={{ padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
          <div className={styles.heroBadge}>Questions & Answers</div>
          <h1 className={styles.heroName} style={{ marginBottom: "1rem" }}>
            Frequently Asked Questions
          </h1>
          <p className={styles.heroSub} style={{ margin: "0 auto" }}>
            Find answers to common questions about Charlotte&apos;s campaign, platform, and approach to public education.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: "800px" }}>
          <FaqClient initialFaqs={allFaqs} />
        </div>
      </section>
    </div>
  );
}
