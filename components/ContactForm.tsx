"use client";

import React, { useState } from "react";
import styles from "@/styles/Home.module.css";

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = "" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
    website: "", // Honeypot spam protection
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, consent: e.target.checked }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website) {
      setStatus("success");
      return;
    }

    if (!validate()) {
      const firstError = Object.keys(errors)[0];
      const element = document.getElementsByName(firstError)[0];
      element?.focus();
      return;
    }

    setStatus("submitting");
    setApiError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          consent: false,
          website: "",
        });
      } else {
        setStatus("error");
        setApiError(result.error || "Failed to submit. Please try again.");
      }
    } catch {
      setStatus("error");
      setApiError("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.volunteerFormContainer} role="alert">
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>✉️</span>
          <h3 className={styles.volunteerFormTitle}>Message Sent!</h3>
          <p>
            Your message has been sent successfully. We appreciate you reaching out to Charlotte&apos;s campaign and will get back to you shortly.
          </p>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setStatus("idle")}
            style={{ marginTop: "1.5rem" }}
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.volunteerFormContainer} ${className}`}>
      <h3 className={styles.volunteerFormTitle}>Send a Message</h3>
      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot field */}
        <div style={{ display: "none" }} aria-hidden="true">
          <label htmlFor="website">Leave blank</label>
          <input
            id="website"
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {apiError && (
          <div style={{ padding: "0.75rem 1rem", backgroundColor: "#fdf0f0", color: "#d93838", borderRadius: "4px", marginBottom: "1.5rem", fontWeight: 600, fontSize: "0.95rem" }} role="alert">
            {apiError}
          </div>
        )}

        <div className={styles.formGrid}>
          {/* Full Name */}
          <div className={`${styles.formFullWidth} form-group`}>
            <label htmlFor="name" className="form-label">
              Name <span style={{ color: "#d93838" }}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleInputChange}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              required
            />
            {errors.name && (
              <span id="name-error" style={{ color: "#d93838", fontSize: "0.85rem", display: "block", marginTop: "0.25rem" }}>
                {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address <span style={{ color: "#d93838" }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            {errors.email && (
              <span id="email-error" style={{ color: "#d93838", fontSize: "0.85rem", display: "block", marginTop: "0.25rem" }}>
                {errors.email}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="optional"
            />
          </div>

          {/* Subject */}
          <div className={`${styles.formFullWidth} form-group`}>
            <label htmlFor="subject" className="form-label">
              Subject <span style={{ color: "#d93838" }}>*</span>
            </label>
            <select
              id="subject"
              name="subject"
              className="form-control"
              value={formData.subject}
              onChange={handleInputChange}
              aria-required="true"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              required
            >
              <option value="">Select a subject...</option>
              <option value="Question">Question for Charlotte</option>
              <option value="Volunteer">Volunteer Question</option>
              <option value="Media">Media Inquiry</option>
              <option value="Other">Other</option>
            </select>
            {errors.subject && (
              <span id="subject-error" style={{ color: "#d93838", fontSize: "0.85rem", display: "block", marginTop: "0.25rem" }}>
                {errors.subject}
              </span>
            )}
          </div>

          {/* Message */}
          <div className={`${styles.formFullWidth} form-group`}>
            <label htmlFor="message" className="form-label">
              Message <span style={{ color: "#d93838" }}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              className="form-control"
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              required
            />
            {errors.message && (
              <span id="message-error" style={{ color: "#d93838", fontSize: "0.85rem", display: "block", marginTop: "0.25rem" }}>
                {errors.message}
              </span>
            )}
          </div>

          {/* Optional Consent */}
          <div className={`${styles.formFullWidth} form-group`}>
            <label className="form-checkbox">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleCheckboxChange}
              />
              <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                I agree to be contacted by Charlotte&apos;s campaign. (Optional)
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className={styles.formFullWidth}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
