"use client";

import React, { useState } from "react";
import styles from "@/styles/Components.module.css";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export default function FaqAccordion({ items, className = "" }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={`${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`${styles.accordion} ${isOpen ? styles.accordionActive : ""}`}
          >
            <h3>
              <button
                type="button"
                className={styles.accordionHeader}
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                id={`faq-header-${item.id}`}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`${styles.accordionIcon} ${isOpen ? styles.accordionIconOpen : ""}`}
                  size={20}
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-header-${item.id}`}
              className={`${styles.accordionPanel} ${isOpen ? styles.accordionPanelOpen : ""}`}
              style={{
                maxHeight: isOpen ? "500px" : "0px", // Inline override for dynamic transition
              }}
            >
              <div className={styles.accordionContent}>
                <p style={{ margin: 0 }}>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
