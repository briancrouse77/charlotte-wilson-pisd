import React from "react";
import styles from "@/styles/Components.module.css";

interface CampaignLogoProps {
  className?: string;
  variant?: "nav" | "footer" | "hero";
}

export default function CampaignLogo({ className = "", variant = "nav" }: CampaignLogoProps) {
  return (
    <div className={`${styles.logoContainer} ${styles[`logo-${variant}`]} ${className}`}>
      <div className={styles.logoTopRow}>
        {/* SVG Gold Checkmark forming the C */}
        <span className={styles.logoCheckmarkWrapper} aria-hidden="true">
          <svg
            className={styles.logoCheckmark}
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Checkmark path */}
            <path d="M20 52 L42 75 L80 25" />
          </svg>
        </span>
        <div className={styles.logoTextStack}>
          {/* Charlotte in elegant script */}
          <span className={styles.logoFirstName}>harlotte</span>
          {/* WILSON in bold serif */}
          <span className={styles.logoLastName}>WILSON</span>
        </div>
      </div>
      {/* RESULTS OVER RHETORIC underline theme */}
      <span className={styles.logoSubtext}>RESULTS OVER RHETORIC</span>
    </div>
  );
}
