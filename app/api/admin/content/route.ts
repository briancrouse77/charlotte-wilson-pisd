import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_FRAMEWORK_QUESTIONS = [
  "Will this decision directly improve student learning and classroom instruction?",
  "Does this support and empower teachers to do their best work?",
  "Is this policy transparent, clear, and accountable to taxpayers?",
  "Does this respect the role of parents as primary partners in their child's education?",
  "Is this focused on measurable results rather than political talking points?",
];

const DEFAULT_SETTINGS = {
  id: "global",
  heroBadge: "Candidate for Princeton ISD School Board",
  heroTitle: "Charlotte Wilson",
  heroTagline: "RESULTS OVER RHETORIC",
  coreQuestion: "Will this help students learn?",
  heroSubhead: "Classroom-informed, student-focused leadership for Princeton ISD.",
  candidatePerspectiveQuote: "As an educator, I don’t have the luxury of debating problems all day. Every morning, my students walk through the classroom door expecting me to help them succeed. I believe our school board should approach every decision with that same sense of purpose.",
  frameworkQuestions: DEFAULT_FRAMEWORK_QUESTIONS,
  campaignEmail: "info@wilsonforprincetonisd.com",
  campaignPhone: "(469) 555-0192",
  campaignAddress: "P.O. Box 482, Princeton, TX 75407",
  facebookUrl: "https://facebook.com/wilsonforprincetonisd",
  twitterUrl: "https://twitter.com/wilson4pisd",
  instagramUrl: "https://instagram.com/wilsonforprincetonisd",
  footerDisclaimer: "Pol. ad. paid for by Charlotte Wilson Campaign.",
  biography: "Charlotte Wilson is a Special Education Department Chair, Pre-K Team Lead, former Princeton ISD teacher, and Princeton ISD parent running for the Princeton ISD School Board under the campaign theme 'Results Over Rhetoric'. Charlotte believes every school board decision should be guided by a simple, fundamental question: Will this help students learn?",
  siteVisibility: "PUBLIC",
};

const DEFAULT_ANNOUNCEMENT = {
  id: "announcement-global",
  text: "Early voting begins soon! Join us in putting results first in Princeton ISD.",
  link: "/volunteer",
  isActive: true,
};

const DEFAULT_FAQS = [
  {
    id: "faq-1",
    question: "What does Results Over Rhetoric mean?",
    answer: "Results Over Rhetoric means focusing on what works. School boards exist to improve schools—not simply talk about them. Every decision should improve student learning, strengthen teacher support, increase transparency, and prepare students for the future.",
    category: "Campaign",
    publishedStatus: "PUBLISHED",
    orderIndex: 1,
  },
  {
    id: "faq-2",
    question: "What makes Charlotte different?",
    answer: "Charlotte is not only a parent—she is a current classroom educator, Special Education Department Chair, and Pre-K Team Lead. She understands how school board decisions affect classrooms because she experiences those realities every day.",
    category: "About Charlotte",
    publishedStatus: "PUBLISHED",
    orderIndex: 2,
  },
  {
    id: "faq-3",
    question: "What are Charlotte’s priorities?",
    answer: "Charlotte's priorities focus on Student Achievement, Special Education, Teacher Support, Transparency, Accountability, and Future Readiness.",
    category: "Priorities",
    publishedStatus: "PUBLISHED",
    orderIndex: 3,
  },
  {
    id: "faq-4",
    question: "How does Charlotte approach difficult or controversial issues?",
    answer: "Charlotte believes every student should be treated with dignity, every parent deserves to be heard, and every school should follow the law. As a trustee, she will keep the board's primary focus on the issues that most directly improve student learning and strengthen Princeton ISD.",
    category: "School Board Service",
    publishedStatus: "PUBLISHED",
    orderIndex: 4,
  },
];

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
    challenge: "Academic outcomes require sharp focus on core skills.",
    principle: "Prioritize reading, math, and literacy above administrative distractions.",
    measurement: "State assessment growth, reading proficiency rates, and graduation readiness.",
    orderIndex: 1,
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
    challenge: "Policy decisions are often disconnected from daily classroom operations.",
    principle: "Bring classroom-tested, practical perspective to board governance.",
    measurement: "Teacher retention rates and staff satisfaction surveys.",
    orderIndex: 2,
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
    challenge: "Taxpayers and parents often lack clear insight into district decision-making.",
    principle: "Provide clear, accessible financial and academic reporting.",
    measurement: "Public availability of budget details and meeting documentation.",
    orderIndex: 3,
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
    challenge: "Special Education services require specialized resources and support.",
    principle: "Ensure full compliance, robust funding, and teacher training for Special Education.",
    measurement: "IEP goal mastery rates and parent feedback.",
    orderIndex: 4,
  },
];

// GET all content items for admin panel view
export async function GET() {
  try {
    const dbSettings = await prisma.systemSettings.findFirst();
    const dbAnnouncement = await prisma.announcement.findFirst();
    const faqs = await prisma.fAQ.findMany({ orderBy: { orderIndex: "asc" } });
    const rawPriorities = await prisma.priority.findMany({ orderBy: { orderIndex: "asc" } });

    let parsedQuestions = DEFAULT_FRAMEWORK_QUESTIONS;
    if (dbSettings?.frameworkQuestions) {
      try {
        parsedQuestions = typeof dbSettings.frameworkQuestions === "string"
          ? JSON.parse(dbSettings.frameworkQuestions)
          : dbSettings.frameworkQuestions;
      } catch {
        parsedQuestions = DEFAULT_FRAMEWORK_QUESTIONS;
      }
    }

    const settings = dbSettings
      ? {
          ...DEFAULT_SETTINGS,
          ...dbSettings,
          frameworkQuestions: parsedQuestions,
        }
      : DEFAULT_SETTINGS;

    const priorities = rawPriorities.length > 0
      ? rawPriorities.map((p) => {
          let pointsArr = [];
          try {
            pointsArr = typeof p.points === "string" ? JSON.parse(p.points) : p.points;
          } catch {
            pointsArr = [];
          }
          return { ...p, points: pointsArr };
        })
      : DEFAULT_PRIORITIES;

    return NextResponse.json({
      settings,
      announcement: dbAnnouncement || DEFAULT_ANNOUNCEMENT,
      faqs: faqs.length > 0 ? faqs : DEFAULT_FAQS,
      priorities,
    });
  } catch (error) {
    console.error("GET admin content error:", error);
    return NextResponse.json({
      settings: DEFAULT_SETTINGS,
      announcement: DEFAULT_ANNOUNCEMENT,
      faqs: DEFAULT_FAQS,
      priorities: DEFAULT_PRIORITIES,
    });
  }
}

// POST mutations (Create/Update/Delete)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, data, id } = body;

    if (!action) {
      return NextResponse.json({ error: "Action is required" }, { status: 400 });
    }

    switch (action) {
      // 1. Manage Global Settings & Homepage Section Copy
      case "updateSettings": {
        const frameworkStr = Array.isArray(data.frameworkQuestions)
          ? JSON.stringify(data.frameworkQuestions)
          : data.frameworkQuestions;

        const settings = await prisma.systemSettings.upsert({
          where: { id: "global" },
          update: {
            heroBadge: data.heroBadge || null,
            heroTitle: data.heroTitle || null,
            heroTagline: data.heroTagline || null,
            coreQuestion: data.coreQuestion || null,
            heroSubhead: data.heroSubhead || null,
            candidatePerspectiveQuote: data.candidatePerspectiveQuote || null,
            frameworkQuestions: frameworkStr || JSON.stringify(DEFAULT_FRAMEWORK_QUESTIONS),
            campaignEmail: data.campaignEmail || null,
            campaignPhone: data.campaignPhone || null,
            campaignAddress: data.campaignAddress || null,
            facebookUrl: data.facebookUrl || null,
            twitterUrl: data.twitterUrl || null,
            instagramUrl: data.instagramUrl || null,
            footerDisclaimer: data.footerDisclaimer || null,
            biography: data.biography || null,
            siteVisibility: data.siteVisibility || "PUBLIC",
          },
          create: {
            id: "global",
            heroBadge: data.heroBadge || null,
            heroTitle: data.heroTitle || null,
            heroTagline: data.heroTagline || null,
            coreQuestion: data.coreQuestion || null,
            heroSubhead: data.heroSubhead || null,
            candidatePerspectiveQuote: data.candidatePerspectiveQuote || null,
            frameworkQuestions: frameworkStr || JSON.stringify(DEFAULT_FRAMEWORK_QUESTIONS),
            campaignEmail: data.campaignEmail || null,
            campaignPhone: data.campaignPhone || null,
            campaignAddress: data.campaignAddress || null,
            facebookUrl: data.facebookUrl || null,
            twitterUrl: data.twitterUrl || null,
            instagramUrl: data.instagramUrl || null,
            footerDisclaimer: data.footerDisclaimer || null,
            biography: data.biography || null,
            siteVisibility: data.siteVisibility || "PUBLIC",
          },
        });
        return NextResponse.json({ success: true, settings });
      }

      // 2. Manage Announcement Banner
      case "updateAnnouncement": {
        const announcement = await prisma.announcement.upsert({
          where: { id: id || "announcement-global" },
          update: {
            text: data.text,
            link: data.link || null,
            isActive: data.isActive ?? false,
          },
          create: {
            id: "announcement-global",
            text: data.text,
            link: data.link || null,
            isActive: data.isActive ?? false,
          },
        });
        return NextResponse.json({ success: true, announcement });
      }

      // 3. Manage Priorities
      case "upsertPriority": {
        const pointsStr = Array.isArray(data.points)
          ? JSON.stringify(data.points)
          : data.points || "[]";

        const priority = id
          ? await prisma.priority.update({
              where: { id },
              data: {
                num: Number(data.num),
                title: data.title,
                intro: data.intro,
                points: pointsStr,
                quote: data.quote || null,
                challenge: data.challenge || null,
                principle: data.principle || null,
                measurement: data.measurement || null,
              },
            })
          : await prisma.priority.create({
              data: {
                num: Number(data.num),
                title: data.title,
                intro: data.intro,
                points: pointsStr,
                quote: data.quote || null,
                challenge: data.challenge || null,
                principle: data.principle || null,
                measurement: data.measurement || null,
                orderIndex: Number(data.num),
              },
            });
        return NextResponse.json({ success: true, priority });
      }

      // 4. Manage FAQs
      case "upsertFAQ": {
        const faq = id
          ? await prisma.fAQ.update({
              where: { id },
              data: {
                question: data.question,
                answer: data.answer,
                category: data.category,
                publishedStatus: data.publishedStatus || "DRAFT",
                orderIndex: Number(data.orderIndex) || 0,
              },
            })
          : await prisma.fAQ.create({
              data: {
                question: data.question,
                answer: data.answer,
                category: data.category,
                publishedStatus: data.publishedStatus || "DRAFT",
                orderIndex: Number(data.orderIndex) || 0,
              },
            });
        return NextResponse.json({ success: true, faq });
      }

      case "deleteFAQ": {
        await prisma.fAQ.delete({ where: { id } });
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: "Invalid action type" }, { status: 400 });
    }
  } catch (error) {
    console.error("Admin content POST API error:", error);
    return NextResponse.json({ error: "Internal server error editing content." }, { status: 500 });
  }
}
