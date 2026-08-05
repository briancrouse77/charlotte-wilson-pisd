"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CampaignLogo from "@/components/CampaignLogo";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter the admin password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login, router will redirect based on middleware or client transition
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch {
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--color-bg-light)", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "440px", backgroundColor: "var(--white)", padding: "3rem 2rem", borderRadius: "var(--border-radius)", boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)", borderTop: "4px solid var(--color-primary)" }}>
        
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2.5rem" }}>
          <CampaignLogo variant="nav" />
        </div>

        <h1 style={{ fontSize: "1.65rem", textAlign: "center", color: "var(--color-primary)", marginBottom: "2rem" }}>
          Campaign Dashboard Login
        </h1>

        {error && (
          <div style={{ padding: "0.75rem 1rem", backgroundColor: "#fdf0f0", color: "#d93838", borderRadius: "4px", marginBottom: "1.5rem", fontWeight: 600, fontSize: "0.9rem" }} role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: "2rem" }}>
            <label htmlFor="admin-password" className="form-label">
              Admin Password
            </label>
            <input
              type="password"
              id="admin-password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Access Dashboard"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href="/" style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", textDecoration: "underline" }}>
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

// Inline helper for Link since it's used inside component
import Link from "next/link";
