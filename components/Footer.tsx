import React from "react";
import Link from "next/link";
import CampaignLogo from "./CampaignLogo";
import styles from "@/styles/Layout.module.css";

interface FooterProps {
  disclaimerText?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
}

export default function Footer({
  disclaimerText = "",
  facebookUrl = "",
  twitterUrl = "",
  instagramUrl = "",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Logo and Office Info */}
          <div className={styles.footerBrand}>
            <CampaignLogo variant="footer" />
            <p className={styles.footerBrandSub}>
              Candidate for Princeton ISD School Board
            </p>
          </div>

          {/* Navigation Links Group 1 */}
          <div className={styles.footerLinksGroup}>
            <h4 className={styles.footerLinksTitle}>Campaign</h4>
            <ul className={styles.footerLinksList}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">Meet Charlotte</Link>
              </li>
              <li>
                <Link href="/priorities">Priorities</Link>
              </li>
              <li>
                <Link href="/results-over-rhetoric">Results Over Rhetoric</Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links Group 2 */}
          <div className={styles.footerLinksGroup}>
            <h4 className={styles.footerLinksTitle}>Involvement & Support</h4>
            <ul className={styles.footerLinksList}>
              <li>
                <Link href="/volunteer">Volunteer</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Social Links Group */}
          {(facebookUrl || twitterUrl || instagramUrl) && (
            <div className={styles.footerLinksGroup}>
              <h4 className={styles.footerLinksTitle}>Connect</h4>
              <ul className={styles.footerSocialList}>
                {facebookUrl && (
                  <li>
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  </li>
                )}
                {twitterUrl && (
                  <li>
                    <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                      Twitter
                    </a>
                  </li>
                )}
                {instagramUrl && (
                  <li>
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.footerBottom}>
          {/* Political Advertising Disclaimer (Only render if campaign-supplied) */}
          {disclaimerText ? (
            <div className={styles.disclaimerBox} role="note">
              <p>{disclaimerText}</p>
            </div>
          ) : null}

          <div className={styles.footerCopyright}>
            <p>
              &copy; {currentYear} Charlotte Wilson for Princeton ISD School Board. All rights reserved.
            </p>
            <p className={styles.footerDistrictNote}>
              This campaign website is independent of Princeton ISD.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
