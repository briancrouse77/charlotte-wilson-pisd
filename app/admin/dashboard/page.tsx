"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CampaignLogo from "@/components/CampaignLogo";
import { LogOut, Save, Download, Search, Check, AlertCircle, Edit2, Plus, Trash2 } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"hero" | "bio" | "framework" | "priorities" | "announcement" | "contact" | "submissions">("hero");
  
  // Data States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  
  const [settings, setSettings] = useState({
    heroBadge: "Candidate for Princeton ISD School Board",
    heroTitle: "Charlotte Wilson",
    heroTagline: "RESULTS OVER RHETORIC",
    coreQuestion: "Will this help students learn?",
    heroSubhead: "Classroom-informed, student-focused leadership for Princeton ISD.",
    candidatePerspectiveQuote: "As an educator, I don’t have the luxury of debating problems all day. Every morning, my students walk through the classroom door expecting me to help them succeed. I believe our school board should approach every decision with that same sense of purpose.",
    frameworkQuestions: [
      "Will this decision directly improve student learning and classroom instruction?",
      "Does this support and empower teachers to do their best work?",
      "Is this policy transparent, clear, and accountable to taxpayers?",
      "Does this respect the role of parents as primary partners in their child's education?",
      "Is this focused on measurable results rather than political talking points?",
    ],
    campaignEmail: "info@wilsonforprincetonisd.com",
    campaignPhone: "(469) 555-0192",
    campaignAddress: "P.O. Box 482, Princeton, TX 75407",
    facebookUrl: "https://facebook.com/wilsonforprincetonisd",
    twitterUrl: "https://twitter.com/wilson4pisd",
    instagramUrl: "https://instagram.com/wilsonforprincetonisd",
    footerDisclaimer: "Pol. ad. paid for by Charlotte Wilson Campaign.",
    biography: "Charlotte Wilson is a Special Education Department Chair, Pre-K Team Lead, former Princeton ISD teacher, and Princeton ISD parent running for the Princeton ISD School Board under the campaign theme 'Results Over Rhetoric'. Charlotte believes every school board decision should be guided by a simple, fundamental question: Will this help students learn?",
    siteVisibility: "PUBLIC",
  });
  
  const [announcement, setAnnouncement] = useState({
    text: "Early voting begins soon! Join us in putting results first in Princeton ISD.",
    link: "/volunteer",
    isActive: true,
  });

  const [priorities, setPriorities] = useState<any[]>([]);
  const [priorityEditor, setPriorityEditor] = useState<any | null>(null);

  // Submissions lists
  const [subType, setSubType] = useState<"volunteer" | "contact">("volunteer");
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [subFilter, setSubFilter] = useState("ALL");

  const showMsg = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/content");
      if (response.ok) {
        const data = await response.json();
        if (data.settings) setSettings((prev) => ({ ...prev, ...data.settings }));
        if (data.announcement) setAnnouncement(data.announcement);
        if (data.priorities) setPriorities(data.priorities);
      } else {
        showMsg("Failed to load dashboard data. Please refresh.", "error");
      }
    } catch {
      showMsg("Network error loading dashboard.", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`/api/admin/submissions?type=${subType}`);
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions || []);
      }
    } catch (err) {
      console.error("Error loading submissions", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (activeTab === "submissions") {
      fetchSubmissions();
    }
  }, [activeTab, subType]);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (response.ok) {
        router.push("/admin");
        router.refresh();
      }
    }
  };

  // Save Settings (Hero, Bio, Framework, Contact)
  const saveSettings = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateSettings", data: settings }),
      });
      if (response.ok) {
        showMsg("Public site content updated successfully!", "success");
      } else {
        showMsg("Failed to save site content.", "error");
      }
    } catch {
      showMsg("Network error saving site content.", "error");
    } finally {
      setSaving(false);
    }
  };

  // Save Announcement
  const saveAnnouncement = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateAnnouncement", data: announcement }),
      });
      if (response.ok) {
        showMsg("Announcement banner updated successfully!", "success");
      } else {
        showMsg("Failed to save announcement.", "error");
      }
    } catch {
      showMsg("Network error saving announcement.", "error");
    } finally {
      setSaving(false);
    }
  };

  // Save Priority
  const savePriority = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "upsertPriority",
          id: priorityEditor.id,
          data: priorityEditor,
        }),
      });
      if (response.ok) {
        showMsg("Priority updated successfully!", "success");
        setPriorityEditor(null);
        fetchDashboardData();
      } else {
        showMsg("Failed to save priority.", "error");
      }
    } catch {
      showMsg("Network error saving priority.", "error");
    } finally {
      setSaving(false);
    }
  };

  // CSV Export Trigger
  const handleExportCsv = () => {
    window.open(`/api/admin/submissions?type=${subType}&export=csv`, "_blank");
  };

  // Filtering submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const textStr = (
      sub.name ||
      `${sub.firstName} ${sub.lastName}` ||
      ""
    ).toLowerCase();
    const emailStr = (sub.email || "").toLowerCase();
    const matchesSearch = textStr.includes(searchQuery.toLowerCase()) || emailStr.includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (subType === "volunteer" && subFilter !== "ALL") {
      const activities = Array.isArray(sub.activities) ? sub.activities : [];
      return activities.includes(subFilter);
    }

    if (subType === "contact" && subFilter !== "ALL") {
      return sub.subject === subFilter;
    }

    return true;
  });

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--color-bg-light)" }}>
        <p style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-primary)" }}>Loading Admin Control Panel...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--color-bg-light)" }}>
      {/* Top Header */}
      <div style={{ backgroundColor: "var(--color-primary)", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--white)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ transform: "scale(0.85)", transformOrigin: "left" }}>
            <CampaignLogo variant="footer" />
          </div>
          <span style={{ fontSize: "0.85rem", backgroundColor: "rgba(255,255,255,0.15)", padding: "0.25rem 0.5rem", borderRadius: "4px", fontWeight: 700 }}>
            WEBSITE CONTENT MANAGER
          </span>
        </div>
        <button onClick={handleLogout} className="btn" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem", minHeight: "36px", border: "1px solid rgba(255,255,255,0.3)", backgroundColor: "transparent", color: "var(--white)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar tabs */}
        <div style={{ width: "260px", backgroundColor: "var(--white)", borderRight: "1px solid rgba(0,0,0,0.06)", display: "flex", flexDirection: "column" }}>
          <ul style={{ listStyle: "none", padding: "1.5rem 0", margin: 0, display: "flex", flexDirection: "column" }}>
            {[
              { id: "hero", label: "1. Homepage Hero Section" },
              { id: "bio", label: "2. Bio & Perspective" },
              { id: "framework", label: "3. 5-Question Framework" },
              { id: "priorities", label: "4. Campaign Priorities" },
              { id: "announcement", label: "5. Top Announcement Banner" },
              { id: "contact", label: "6. Contact & Footer Details" },
              { id: "submissions", label: "7. Supporter Inquiries (CSV)" },
            ].map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setMessage(null);
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "1rem 1.25rem",
                    border: "none",
                    background: "none",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    color: activeTab === tab.id ? "var(--color-primary)" : "var(--color-text-muted)",
                    borderLeft: `4px solid ${activeTab === tab.id ? "var(--color-accent)" : "transparent"}`,
                    backgroundColor: activeTab === tab.id ? "var(--color-bg-light)" : "transparent",
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                  }}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Area */}
        <div style={{ flexGrow: 1, padding: "2.5rem 3rem" }}>
          {message && (
            <div
              style={{
                padding: "1rem",
                borderRadius: "4px",
                marginBottom: "2rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: message.type === "success" ? "#eefbf4" : "#fdf0f0",
                color: message.type === "success" ? "#1e7e48" : "#d93838",
                borderLeft: `4px solid ${message.type === "success" ? "#1e7e48" : "#d93838"}`,
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
              role="alert"
            >
              {message.type === "success" ? <Check size={18} /> : <AlertCircle size={18} />}
              <span>{message.text}</span>
            </div>
          )}

          {/* ==================== TAB 1: HOMEPAGE HERO ==================== */}
          {activeTab === "hero" && (
            <div style={{ maxWidth: "800px" }}>
              <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Homepage Hero & Main Headline</h2>
              <p style={{ marginBottom: "2rem" }}>Edit the main text displayed at the top of the homepage.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", backgroundColor: "var(--white)", padding: "2rem", borderRadius: "var(--border-radius)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="form-group">
                  <label className="form-label">Hero Badge Text</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.heroBadge || ""}
                    onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Candidate Name / Main Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.heroTitle || ""}
                    onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Campaign Theme / Tagline</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.heroTagline || ""}
                    onChange={(e) => setSettings({ ...settings, heroTagline: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Core Campaign Question</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.coreQuestion || ""}
                    onChange={(e) => setSettings({ ...settings, coreQuestion: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Hero Subheadline / Intro Paragraph</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={settings.heroSubhead || ""}
                    onChange={(e) => setSettings({ ...settings, heroSubhead: e.target.value })}
                  />
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <button onClick={saveSettings} className="btn btn-primary" disabled={saving} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                    <Save size={18} /> {saving ? "Saving..." : "Save Hero Content"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 2: BIO & PERSPECTIVE ==================== */}
          {activeTab === "bio" && (
            <div style={{ maxWidth: "800px" }}>
              <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Candidate Bio & Perspective Quote</h2>
              <p style={{ marginBottom: "2rem" }}>Edit Charlotte's official biography and featured campaign pull quote.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", backgroundColor: "var(--white)", padding: "2rem", borderRadius: "var(--border-radius)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="form-group">
                  <label className="form-label">Featured Perspective Pull Quote</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={settings.candidatePerspectiveQuote || ""}
                    onChange={(e) => setSettings({ ...settings, candidatePerspectiveQuote: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Official Candidate Biography Text</label>
                  <textarea
                    className="form-control"
                    rows={6}
                    value={settings.biography || ""}
                    onChange={(e) => setSettings({ ...settings, biography: e.target.value })}
                  />
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <button onClick={saveSettings} className="btn btn-primary" disabled={saving} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                    <Save size={18} /> {saving ? "Saving..." : "Save Bio & Quote"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: 5-QUESTION FRAMEWORK ==================== */}
          {activeTab === "framework" && (
            <div style={{ maxWidth: "800px" }}>
              <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Results Over Rhetoric: 5 Decision Questions</h2>
              <p style={{ marginBottom: "2rem" }}>Edit the 5 questions Charlotte promises to ask before casting any school board vote.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", backgroundColor: "var(--white)", padding: "2rem", borderRadius: "var(--border-radius)", border: "1px solid rgba(0,0,0,0.06)" }}>
                {settings.frameworkQuestions.map((qText: string, idx: number) => (
                  <div key={idx} className="form-group">
                    <label className="form-label">Question {idx + 1}</label>
                    <input
                      type="text"
                      className="form-control"
                      value={qText}
                      onChange={(e) => {
                        const updated = [...settings.frameworkQuestions];
                        updated[idx] = e.target.value;
                        setSettings({ ...settings, frameworkQuestions: updated });
                      }}
                    />
                  </div>
                ))}

                <div style={{ marginTop: "1rem" }}>
                  <button onClick={saveSettings} className="btn btn-primary" disabled={saving} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                    <Save size={18} /> {saving ? "Saving..." : "Save 5 Questions"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: CAMPAIGN PRIORITIES ==================== */}
          {activeTab === "priorities" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Campaign Priorities</h2>
                  <p style={{ margin: 0 }}>Edit the 4 core priority pillars displayed on the homepage and priorities page.</p>
                </div>
              </div>

              {priorityEditor ? (
                <div style={{ backgroundColor: "var(--white)", padding: "2rem", borderRadius: "var(--border-radius)", border: "1px solid rgba(0,0,0,0.06)", marginBottom: "2rem" }}>
                  <h3 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", color: "var(--color-primary)" }}>
                    Edit Priority #{priorityEditor.num}: {priorityEditor.title}
                  </h3>
                  <form onSubmit={savePriority}>
                    <div className="form-group">
                      <label className="form-label">Priority Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={priorityEditor.title}
                        onChange={(e) => setPriorityEditor({ ...priorityEditor, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Intro Summary Text</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        value={priorityEditor.intro}
                        onChange={(e) => setPriorityEditor({ ...priorityEditor, intro: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Key Pull Quote</label>
                      <input
                        type="text"
                        className="form-control"
                        value={priorityEditor.quote || ""}
                        onChange={(e) => setPriorityEditor({ ...priorityEditor, quote: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Challenge Statement</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        value={priorityEditor.challenge || ""}
                        onChange={(e) => setPriorityEditor({ ...priorityEditor, challenge: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Core Principle Statement</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        value={priorityEditor.principle || ""}
                        onChange={(e) => setPriorityEditor({ ...priorityEditor, principle: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Measurable Success Criteria</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        value={priorityEditor.measurement || ""}
                        onChange={(e) => setPriorityEditor({ ...priorityEditor, measurement: e.target.value })}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                      <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? "Saving..." : "Save Priority"}
                      </button>
                      <button type="button" onClick={() => setPriorityEditor(null)} className="btn btn-outline">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}

              <div style={{ backgroundColor: "var(--white)", borderRadius: "var(--border-radius)", border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ backgroundColor: "var(--color-bg-light)", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: "0.9rem", color: "var(--color-primary)", fontWeight: 700 }}>
                      <th style={{ padding: "1rem" }}>#</th>
                      <th style={{ padding: "1rem" }}>Priority Title</th>
                      <th style={{ padding: "1rem" }}>Intro</th>
                      <th style={{ padding: "1rem", textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priorities.map((p) => (
                      <tr key={p.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)", fontSize: "0.95rem" }}>
                        <td style={{ padding: "1rem", fontWeight: 700 }}>{p.num}</td>
                        <td style={{ padding: "1rem", fontWeight: 600 }}>{p.title}</td>
                        <td style={{ padding: "1rem" }}>{p.intro}</td>
                        <td style={{ padding: "1rem", textAlign: "right" }}>
                          <button onClick={() => setPriorityEditor(p)} className="btn btn-outline" style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem", minHeight: "30px" }}>
                            <Edit2 size={14} /> Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: ANNOUNCEMENT ==================== */}
          {activeTab === "announcement" && (
            <div style={{ maxWidth: "800px" }}>
              <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Top Announcement Banner</h2>
              <p style={{ marginBottom: "2rem" }}>Control the banner text displayed at the absolute top of all website pages.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", backgroundColor: "var(--white)", padding: "2rem", borderRadius: "var(--border-radius)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="form-group">
                  <label className="form-checkbox">
                    <input
                      type="checkbox"
                      checked={announcement.isActive}
                      onChange={(e) => setAnnouncement({ ...announcement, isActive: e.target.checked })}
                    />
                    <span style={{ fontWeight: 600 }}>Enable Announcement Banner publicly</span>
                  </label>
                </div>

                <div className="form-group">
                  <label className="form-label">Banner Text</label>
                  <input
                    type="text"
                    className="form-control"
                    value={announcement.text}
                    onChange={(e) => setAnnouncement({ ...announcement, text: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Target Link (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={announcement.link || ""}
                    onChange={(e) => setAnnouncement({ ...announcement, link: e.target.value })}
                  />
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <button onClick={saveAnnouncement} className="btn btn-primary" disabled={saving} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                    <Save size={18} /> {saving ? "Saving..." : "Save Announcement"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 6: CONTACT & FOOTER ==================== */}
          {activeTab === "contact" && (
            <div style={{ maxWidth: "800px" }}>
              <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Contact Details & Footer Information</h2>
              <p style={{ marginBottom: "2rem" }}>Edit campaign email, phone, mailing address, social links, and legal disclaimer.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", backgroundColor: "var(--white)", padding: "2rem", borderRadius: "var(--border-radius)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Campaign Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={settings.campaignEmail || ""}
                      onChange={(e) => setSettings({ ...settings, campaignEmail: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Campaign Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value={settings.campaignPhone || ""}
                      onChange={(e) => setSettings({ ...settings, campaignPhone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Mailing Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.campaignAddress || ""}
                    onChange={(e) => setSettings({ ...settings, campaignAddress: e.target.value })}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Facebook URL</label>
                    <input
                      type="url"
                      className="form-control"
                      value={settings.facebookUrl || ""}
                      onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Twitter / X URL</label>
                    <input
                      type="url"
                      className="form-control"
                      value={settings.twitterUrl || ""}
                      onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Instagram URL</label>
                    <input
                      type="url"
                      className="form-control"
                      value={settings.instagramUrl || ""}
                      onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Footer Legal Disclaimer</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.footerDisclaimer || ""}
                    onChange={(e) => setSettings({ ...settings, footerDisclaimer: e.target.value })}
                  />
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <button onClick={saveSettings} className="btn btn-primary" disabled={saving} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                    <Save size={18} /> {saving ? "Saving..." : "Save Contact & Footer Details"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 7: SUBMISSIONS ==================== */}
          {activeTab === "submissions" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Supporter Inquiries & Signups</h2>
                  <p style={{ margin: 0 }}>Review form signups collected directly from the public website.</p>
                </div>
                <button onClick={handleExportCsv} className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Download size={18} /> Export List as CSV
                </button>
              </div>

              <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                <button
                  onClick={() => { setSubType("volunteer"); setSubFilter("ALL"); }}
                  className="btn"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.9rem", minHeight: "36px", backgroundColor: subType === "volunteer" ? "var(--color-primary)" : "var(--color-bg-light)", color: subType === "volunteer" ? "var(--white)" : "var(--color-primary)" }}
                >
                  Volunteer Submissions ({submissions.length})
                </button>
                <button
                  onClick={() => { setSubType("contact"); setSubFilter("ALL"); }}
                  className="btn"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.9rem", minHeight: "36px", backgroundColor: subType === "contact" ? "var(--color-primary)" : "var(--color-bg-light)", color: subType === "contact" ? "var(--white)" : "var(--color-primary)" }}
                >
                  Contact Inquiries ({submissions.length})
                </button>
              </div>

              <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                <div style={{ flexGrow: 1, position: "relative" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or email address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ paddingLeft: "2.5rem" }}
                  />
                  <Search size={18} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
                </div>
              </div>

              <div style={{ backgroundColor: "var(--white)", borderRadius: "var(--border-radius)", border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ backgroundColor: "var(--color-bg-light)", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: "0.9rem", color: "var(--color-primary)", fontWeight: 700 }}>
                      <th style={{ padding: "1rem" }}>Date</th>
                      <th style={{ padding: "1rem" }}>Name</th>
                      <th style={{ padding: "1rem" }}>Contact info</th>
                      {subType === "volunteer" ? (
                        <>
                          <th style={{ padding: "1rem" }}>ZIP</th>
                          <th style={{ padding: "1rem" }}>Activities</th>
                        </>
                      ) : (
                        <>
                          <th style={{ padding: "1rem" }}>Subject</th>
                          <th style={{ padding: "1rem" }}>Message</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.length > 0 ? (
                      filteredSubmissions.map((sub) => (
                        <tr key={sub.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)", fontSize: "0.95rem" }}>
                          <td style={{ padding: "1rem", whiteSpace: "nowrap" }}>{new Date(sub.createdAt).toLocaleDateString("en-US")}</td>
                          <td style={{ padding: "1rem", fontWeight: 600 }}>{sub.name || `${sub.firstName} ${sub.lastName}`}</td>
                          <td style={{ padding: "1rem" }}>
                            <div>{sub.email}</div>
                            {sub.phone && <div style={{ fontSize: "0.85rem", color: "#666" }}>{sub.phone}</div>}
                          </td>
                          {subType === "volunteer" ? (
                            <>
                              <td style={{ padding: "1rem" }}>{sub.zipCode}</td>
                              <td style={{ padding: "1rem" }}>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                                  {Array.isArray(sub.activities) && sub.activities.map((act: string, idx: number) => (
                                    <span key={idx} style={{ fontSize: "0.75rem", backgroundColor: "var(--color-bg-light)", color: "var(--color-primary)", padding: "0.1rem 0.4rem", borderRadius: "20px", fontWeight: 600 }}>
                                      {act}
                                    </span>
                                  ))}
                                </div>
                              </td>
                            </>
                          ) : (
                            <>
                              <td style={{ padding: "1rem" }}>{sub.subject}</td>
                              <td style={{ padding: "1rem", maxWidth: "300px" }}>{sub.message}</td>
                            </>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-muted)" }}>No submissions match your query.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
