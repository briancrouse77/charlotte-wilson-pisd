import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with campaign default data...");

  // 1. Seed global settings
  await prisma.systemSettings.upsert({
    where: { id: "global" },
    update: {},
    create: {
      id: "global",
      biography: "Charlotte Wilson is a Special Education teacher, current Special Education Department Chair, current Pre-K Team Lead, former Princeton ISD teacher, and Princeton parent with more than a decade of experience serving students in Texas public schools.",
      campaignEmail: "", // Empty to trigger placeholders
      campaignPhone: "",
      campaignAddress: "",
      facebookUrl: "",
      twitterUrl: "",
      instagramUrl: "",
      footerDisclaimer: "", // Empty until campaign compliance supplied
      siteVisibility: "PUBLIC",
    },
  });

  // 2. Seed FAQs
  const faqs = [
    {
      question: "What does Results Over Rhetoric mean?",
      answer: "Results Over Rhetoric means focusing on what works. School boards exist to improve schools—not simply talk about them. Every decision should improve student learning, strengthen teacher support, increase transparency, and prepare students for the future.",
      category: "Campaign",
      orderIndex: 1,
    },
    {
      question: "What makes Charlotte different?",
      answer: "Charlotte is not only a parent—she is a current classroom educator, Special Education Department Chair, and Pre-K Team Lead. She understands how school board decisions affect classrooms because she experiences those realities every day.",
      category: "About Charlotte",
      orderIndex: 2,
    },
    {
      question: "What are Charlotte’s priorities?",
      answer: "Charlotte's priorities focus on Student Achievement, Special Education, Teacher Support, Transparency, Accountability, and Future Readiness. Read more details on the Priorities page.",
      category: "Priorities",
      orderIndex: 3,
    },
    {
      question: "How does Charlotte approach difficult or controversial issues?",
      answer: "Charlotte believes every student should be treated with dignity, every parent deserves to be heard, and every school should follow the law. As a trustee, she will keep the board's primary focus on the issues that most directly improve student learning and strengthen Princeton ISD.",
      category: "School Board Service",
      orderIndex: 4,
    },
  ];

  for (const faq of faqs) {
    // Check if FAQ already exists based on question
    const existing = await prisma.fAQ.findFirst({
      where: { question: faq.question },
    });
    if (!existing) {
      await prisma.fAQ.create({
        data: {
          ...faq,
          publishedStatus: "PUBLISHED",
        },
      });
    }
  }

  // 3. Seed Priorities
  const priorities = [
    {
      num: 1,
      title: "Student Achievement First",
      intro: "Students deserve a school board that measures success by academic growth.",
      points: [
        "Reading and literacy: Ensuring early intervention to get students reading on grade level.",
        "Mathematics & Science: Promoting strong foundations in analytical skills.",
        "Responsible technology integration: Preparing students for an AI-driven workforce while ensuring technology serves instruction rather than distracting from it.",
        "Career and college readiness: Supporting pathways that prepare graduates for higher education, career entries, and long-term success.",
        "Early intervention: Identifying academic challenges early and addressing them before gaps widen.",
        "Attendance and foundational habits: Encouraging engagement and consistency from the early years.",
      ],
      quote: "Our students don’t need better explanations. They need better outcomes.",
      challenge: "In a rapidly growing district like Princeton ISD, maintaining and elevating academic outcomes requires deliberate, targeted focus. As classroom technology changes and workforce requirements evolve, students need foundational competencies that prepare them for tomorrow rather than just reacting to the headlines of today.",
      principle: "Students deserve a school board that measures its success primarily by academic growth. Educational policies and budgets must directly align with supporting classrooms and student achievement.",
      measurement: "We should measure success through academic growth, grade-level progress, and publicly communicated goals. Progress must be evidence-driven and tracked through district data.",
      orderIndex: 1,
    },
    {
      num: 2,
      title: "Leadership Informed by Experience",
      intro: "School board decisions affect classrooms every day. Charlotte understands today’s educational challenges because she experiences them every day.",
      points: [
        "Grounded decisions: Leveraging Charlotte's current role as Special Education Department Chair and Pre-K Team Lead to guide policy.",
        "Supporting teachers: Advocating for what educators actually need—reasonable workloads, resources, and administrative support.",
        "District understanding: Using experience inside Princeton ISD to implement policies that make sense for the local community.",
        "Policy impact: Evaluating board votes through the lens of classroom execution.",
      ],
      quote: "School board decisions belong in classrooms—not just boardrooms.",
      challenge: "School board decisions directly shape classrooms, yet policy is too often created without a realistic understanding of what teachers and students experience day-to-day. Decisions made in boardrooms can create unintentional compliance burdens or fail to resolve real instructional challenges.",
      principle: "Leadership should be informed by experience, not assumptions. Board members must understand how policies impact the daily environment of teachers and students.",
      measurement: "We should measure success by teacher retention and support, teacher feedback metrics, and how effectively policies reduce administrative hurdles to focus on teaching.",
      orderIndex: 2,
    },
    {
      num: 3,
      title: "Transparency Builds Trust",
      intro: "Families deserve honest communication. Teachers deserve transparency. Taxpayers deserve accountability.",
      points: [
        "Campus-by-campus transparency: Providing clear information on school performance and resources.",
        "Understandable data: Sharing student achievement results in ways that are clear and accessible to families.",
        "Honest family communication: Building straightforward channels for parent feedback and inquiry.",
        "Measurable goals: Establishing public milestones that hold district administration accountable.",
        "Taxpayer accountability: Ensuring responsible, clear budgeting and financial disclosure.",
      ],
      quote: "Transparency builds trust. Trust builds stronger schools.",
      challenge: "Families, teachers, and taxpayers deserve to understand how decisions are made, where tax dollars are allocated, and how students are performing. A lack of clear, understandable information leads to uncertainty and erodes trust in school board leadership.",
      principle: "Families deserve honest communication, teachers deserve transparency, and taxpayers deserve accountability. School district operations must be open and accessible.",
      measurement: "We should measure success through family understanding, the accessibility of published data, and clear communication of district goals and financial details to the public.",
      orderIndex: 3,
    },
    {
      num: 4,
      title: "Strong Special Education",
      intro: "Every child deserves the opportunity to succeed. Special Education is not a separate issue. It is public education.",
      points: [
        "Meaningful services: Moving beyond paperwork compliance to focus on actual student progress.",
        "Collaboration: Strengthening the partnership between families, teachers, administrators, and specialists.",
        "Supported teachers: Providing special education staff and general education teachers with the training and resources necessary to implement accommodations.",
        "Early intervention: Identifying learning differences early to apply targeted resources.",
        "Real opportunities: Ensuring every student has a pathway to reach their potential.",
      ],
      quote: "Every student deserves more than a plan on paper. They deserve every opportunity to succeed.",
      challenge: "Special Education is not a separate program; it is a core part of public education. Students with diverse learning needs and their families deserve support that goes beyond legal compliance to deliver real, meaningful opportunities for growth.",
      principle: "Every child deserves the opportunity to succeed. Special Education requires collaboration, early intervention, and supported educators to achieve real outcomes.",
      measurement: "We should measure success by the quality of services delivered, feedback from special education families, early intervention milestone completion, and teacher support metrics.",
      orderIndex: 4,
    },
  ];

  for (const priority of priorities) {
    const dataToSave = {
      ...priority,
      points: JSON.stringify(priority.points),
    };
    await prisma.priority.upsert({
      where: { num: priority.num },
      update: dataToSave,
      create: dataToSave,
    });
  }

  // 4. Seed a template announcement bar
  const announcement = await prisma.announcement.findFirst();
  if (!announcement) {
    await prisma.announcement.create({
      data: {
        text: "Join Charlotte Wilson's campaign team! Sign up on our Volunteer page.",
        link: "/volunteer",
        isActive: false, // Default to inactive per requirements
      },
    });
  }

  console.log("Seeding complete successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
