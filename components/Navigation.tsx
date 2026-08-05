"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CampaignLogo from "./CampaignLogo";
import MobileNavigation from "./MobileNavigation";
import styles from "@/styles/Layout.module.css";
import { Menu } from "lucide-react";

interface NavigationProps {
  announcementText?: string;
  announcementLink?: string;
}

export default function Navigation({ announcementText = "", announcementLink = "" }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile menu on route change
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Scroll effect for sticky navigation header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Meet Charlotte", path: "/about" },
    { name: "Priorities", path: "/priorities" },
    { name: "Results Over Rhetoric", path: "/results-over-rhetoric" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      {/* Announcement Bar */}
      {announcementText && (
        <div className={styles.announcementBar} role="status">
          <div className="container">
            <span className={styles.announcementContent}>
              {announcementLink ? (
                <Link href={announcementLink} className={styles.announcementLink}>
                  {announcementText} →
                </Link>
              ) : (
                announcementText
              )}
            </span>
          </div>
        </div>
      )}

      <div className={styles.navBar}>
        <div className={`container ${styles.navContainer}`}>
          {/* Logo */}
          <Link href="/" aria-label="Charlotte Wilson Campaign Home">
            <CampaignLogo variant="nav" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            <ul className={styles.navLinks}>
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link href="/volunteer" className="btn btn-accent" id="nav-volunteer-btn">
              Volunteer
            </Link>
          </nav>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            className={styles.menuToggle}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
        pathname={pathname}
      />
    </header>
  );
}
