import React from "react";
import styles from "@/styles/Components.module.css";

interface GoldCheckmarkProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export default function GoldCheckmark({ className = "", size = 20, style }: GoldCheckmarkProps) {
  return (
    <svg
      className={`${styles.checkmarkIcon} ${className}`}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
