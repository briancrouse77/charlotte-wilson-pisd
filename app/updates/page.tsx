import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import styles from "@/styles/Home.module.css";
import compStyles from "@/styles/Components.module.css";

export const revalidate = 60;

interface CampaignUpdateItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  featuredImage?: string | null;
  publicationDate: Date;
  authorLabel?: string | null;
}

export default async function UpdatesPage() {
  let updates: CampaignUpdateItem[] = [];

  try {
    updates = await prisma.campaignUpdate.findMany({
      where: { publishedStatus: "PUBLISHED" },
      orderBy: { publicationDate: "desc" },
    });
  } catch {
    console.error("Prisma update query omitted or database not yet migrated.");
  }

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="section-light" style={{ padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
          <div className={styles.heroBadge}>News & Stories</div>
          <h1 className={styles.heroName} style={{ marginBottom: "1rem" }}>
            Campaign Updates
          </h1>
          <p className={styles.heroSub} style={{ margin: "0 auto" }}>
            Stay informed with the latest updates and announcements from Charlotte&apos;s school board campaign.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {updates.length > 0 ? (
            <div className={compStyles.updateList}>
              {updates.map((update) => (
                <div key={update.id} className={compStyles.updateCard}>
                  {update.featuredImage && (
                    <div className={compStyles.updateImage}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={update.featuredImage}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  )}
                  <div className={compStyles.updateDetails}>
                    <h3 className={compStyles.updateTitle}>
                      <Link href={`/updates/${update.slug}`} style={{ color: "var(--color-primary)" }}>
                        {update.title}
                      </Link>
                    </h3>
                    <div className={compStyles.updateMeta}>
                      <span>By {update.authorLabel || "Campaign Staff"}</span>
                      <span>
                        {new Date(update.publicationDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className={compStyles.updateDesc}>{update.summary}</p>
                    <Link
                      href={`/updates/${update.slug}`}
                      className="btn btn-outline"
                      style={{ fontSize: "0.85rem", padding: "0.5rem 1rem", marginTop: "auto" }}
                    >
                      Read Full Article
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                backgroundColor: "var(--color-bg-light)",
                borderRadius: "var(--border-radius)",
                maxWidth: "600px",
                margin: "0 auto",
                border: "1px dashed rgba(0,0,0,0.15)",
              }}
              role="status"
            >
              <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.5rem" }}>📰</span>
              <h3 style={{ color: "var(--color-primary)", fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                No Campaign Updates Yet
              </h3>
              <p style={{ margin: 0, fontSize: "0.95rem" }}>
                Official news, statements, and community announcements will be posted here as the campaign progresses.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
