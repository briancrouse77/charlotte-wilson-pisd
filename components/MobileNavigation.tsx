"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "@/styles/Layout.module.css";
import CampaignLogo from "./CampaignLogo";
import { X } from "lucide-react";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ name: string; path: string }>;
  pathname: string;
}

export default function MobileNavigation({ isOpen, onClose, links, pathname }: MobileNavigationProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Manage body scroll lock and focus when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap implementation
  const handleTabKey = (e: React.KeyboardEvent) => {
    if (!drawerRef.current) return;
    const focusableElements = drawerRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex="0"]'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.mobileDrawerOverlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        id="mobile-nav-drawer"
        className={styles.mobileDrawer}
        onClick={(e) => e.stopPropagation()}
        ref={drawerRef}
        onKeyDown={handleTabKey}
        role="dialog"
        aria-modal="true"
        aria-label="Campaign Navigation Menu"
      >
        <div className={styles.mobileDrawerHeader}>
          <Link href="/" onClick={onClose} aria-label="Charlotte Wilson Campaign Home">
            <CampaignLogo variant="nav" />
          </Link>
          <button
            ref={closeButtonRef}
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close Navigation Menu"
          >
            <X size={28} />
          </button>
        </div>

        <nav className={styles.mobileNav} aria-label="Mobile Navigation">
          <ul className={styles.mobileNavLinks}>
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    onClick={onClose}
                    className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/volunteer"
            onClick={onClose}
            className="btn btn-accent"
            id="mobile-nav-volunteer-btn"
            style={{ width: "100%", marginTop: "2rem" }}
          >
            Volunteer
          </Link>
        </nav>
      </div>
    </div>
  );
}
