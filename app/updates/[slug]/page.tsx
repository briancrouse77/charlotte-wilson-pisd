import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface UpdateDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: UpdateDetailPageProps) {
  const { slug } = await params;
  let update = null;

  try {
    update = await prisma.campaignUpdate.findUnique({
      where: { slug },
    });
  } catch {
    // Database fallback or omitted
  }

  if (!update || update.publishedStatus !== "PUBLISHED") {
    return {
      title: "Article Not Found | Charlotte Wilson Campaign",
    };
  }

  return {
    title: `${update.seoTitle || update.title} | Charlotte Wilson Campaign`,
    description: update.seoDescription || update.summary,
  };
}

export default async function UpdateDetailPage({ params }: UpdateDetailPageProps) {
  const { slug } = await params;
  let update = null;

  try {
    update = await prisma.campaignUpdate.findUnique({
      where: { slug },
    });
  } catch {
    console.error("Prisma lookup failed or database not yet migrated.");
  }

  if (!update || update.publishedStatus !== "PUBLISHED") {
    notFound();
  }

  return (
    <div style={{ paddingTop: "80px" }}>
      <article className="section">
        <div className="container" style={{ maxWidth: "720px" }}>
          {/* Back button */}
          <div style={{ marginBottom: "2rem" }}>
            <Link
              href="/updates"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--color-primary)",
                fontWeight: "700",
                fontSize: "0.95rem",
              }}
            >
              ← Back to Updates
            </Link>
          </div>

          <header style={{ marginBottom: "2.5rem" }}>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: "1.2",
                marginBottom: "1rem",
              }}
            >
              {update.title}
            </h1>
            
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                fontSize: "0.95rem",
                color: "var(--color-text-muted)",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                paddingBottom: "1.5rem",
              }}
            >
              <span>By {update.authorLabel || "Campaign Staff"}</span>
              <span aria-hidden="true">&bull;</span>
              <span>
                {new Date(update.publicationDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </header>

          {/* Featured Image */}
          {update.featuredImage && (
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: "var(--border-radius)",
                overflow: "hidden",
                marginBottom: "2.5rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={update.featuredImage}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Article Body */}
          <div
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8",
              color: "var(--color-text-dark)",
            }}
            dangerouslySetInnerHTML={{ __html: update.body }}
          />
        </div>
      </article>

      {/* Volunteer footer for the news page */}
      <section className="section section-light">
        <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
          <h2 className="section-title-divider-center" style={{ display: "inline-block" }}>
            Get Involved With Charlotte&apos;s Team
          </h2>
          <p style={{ marginTop: "1rem" }}>
            Make a direct impact on classrooms in Princeton ISD.
          </p>
          <div style={{ marginTop: "2rem" }}>
            <Link href="/volunteer" className="btn btn-primary" id="article-volunteer-btn">
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
