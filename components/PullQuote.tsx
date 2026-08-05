import React from "react";
import styles from "@/styles/Components.module.css";

interface PullQuoteProps {
  quote: string;
  citation?: string;
  className?: string;
}

export default function PullQuote({ quote, citation, className = "" }: PullQuoteProps) {
  return (
    <div className={`${styles.pullQuoteContainer} ${className}`} role="blockquote">
      <p className={styles.pullQuoteText}>&ldquo;{quote}&rdquo;</p>
      {citation && (
        <div className={styles.pullQuoteCitation}>
          <span aria-hidden="true">&mdash;</span> {citation}
        </div>
      )}
    </div>
  );
}
