"use client";

import React, { useState } from "react";
import FaqAccordion from "./FaqAccordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FaqClientProps {
  initialFaqs: FaqItem[];
}

export default function FaqClient({ initialFaqs }: FaqClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = [
    { key: "ALL", label: "All Questions" },
    { key: "ABOUT", label: "About Charlotte" },
    { key: "PRIORITIES", label: "Priorities" },
    { key: "SERVICE", label: "School Board Service" },
    { key: "CAMPAIGN", label: "Campaign" },
    { key: "VOTING", label: "Voting Information" },
  ];

  // Map database categories to tab keys
  const getCategoryKey = (cat: string) => {
    const norm = cat.toUpperCase().trim();
    if (norm.includes("ABOUT")) return "ABOUT";
    if (norm.includes("PRIORITY") || norm.includes("PRIORITIES")) return "PRIORITIES";
    if (norm.includes("SERVICE") || norm.includes("BOARD")) return "SERVICE";
    if (norm.includes("CAMPAIGN")) return "CAMPAIGN";
    if (norm.includes("VOTE") || norm.includes("VOTING") || norm.includes("ELECTION")) return "VOTING";
    return "CAMPAIGN";
  };

  const filteredFaqs = initialFaqs.filter((faq) => {
    if (activeCategory === "ALL") return true;
    return getCategoryKey(faq.category) === activeCategory;
  });

  return (
    <div>
      {/* Category Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "3rem",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActiveCategory(cat.key)}
            className={`btn`}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.9rem",
              minHeight: "40px",
              backgroundColor: activeCategory === cat.key ? "var(--color-primary)" : "var(--color-bg-light)",
              color: activeCategory === cat.key ? "var(--white)" : "var(--color-primary)",
              border: `1px solid ${activeCategory === cat.key ? "var(--color-primary)" : "rgba(86, 25, 39, 0.15)"}`,
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordions */}
      {filteredFaqs.length > 0 ? (
        <FaqAccordion items={filteredFaqs} />
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "3rem 1.5rem",
            border: "1px dashed rgba(0,0,0,0.15)",
            borderRadius: "var(--border-radius)",
            backgroundColor: "var(--color-bg-light)",
          }}
          role="status"
        >
          <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>🗳️</span>
          <h3 style={{ color: "var(--color-primary)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>
            {activeCategory === "VOTING"
              ? "Voting Information Pending"
              : "No questions in this category yet"}
          </h3>
          <p style={{ margin: 0, fontSize: "0.95rem" }}>
            {activeCategory === "VOTING"
              ? "Voting locations, early voting dates, and registration information will be updated as soon as election details are officially set by the Collin County Elections Office."
              : "Additional content is currently being finalized by the campaign team."}
          </p>
        </div>
      )}
    </div>
  );
}
