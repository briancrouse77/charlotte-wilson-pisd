"use client";

import React, { useState } from "react";
import styles from "@/styles/Home.module.css";

interface VolunteerFormProps {
  className?: string;
}

export default function VolunteerForm({ className = "" }: VolunteerFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
    activities: [] as string[],
    message: "",
    consent: false,
    website: "", // Honeypot spam protector
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");

  const activitiesList = [
    { id: "yard-sign", label: "Display a yard sign" },
    { id: "event-help", label: "Help at an event" },
    { id: "walk-neighborhood", label: "Walk a neighborhood" },
    { id: "phone-calls", label: "Make phone calls" },
    { id: "share-info", label: "Share campaign information" },
    { id: "host-meet", label: "Host a meet-and-greet" },
    { id: "join-team", label: "Join the campaign team" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when editing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleCheckboxChange = (activityLabel: string) => {
    setFormData((prev) => {
      const activities = prev.activities.includes(activityLabel)
        ? prev.activities.filter((act) => act !== activityLabel)
        : [...prev.activities, activityLabel];
      return { ...prev, activities };
    });
  };

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, consent: e.target.checked }));
    if (errors.consent) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.consent;
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid 5-digit ZIP code";
    }

    if (!formData.consent) {
      newErrors.consent = "You must agree to receive campaign updates to submit this form.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.website) {
      // Quietly succeed to fool bots
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
      const response = await fetch("/api/volunteer", {
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
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          zipCode: "",
          activities: [],
          message: "",
          consent: false,
          website: "",
        });
      } else {
        setStatus("error");
        setApiError(result.error || "Something went wrong. Please try again.");
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
          <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>✅</span>
          <h3 className={styles.volunteerFormTitle}>Thank You!</h3>
          <p>
            Your information has been successfully received. A campaign coordinator on Charlotte&apos;s team will reach out to you within 48 hours.
          </p>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setStatus("idle")}
            style={{ marginTop: "1.5rem" }}
          >
            Submit another submission
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.volunteerFormContainer} ${className}`}>
      <h3 className={styles.volunteerFormTitle}>Volunteer With Charlotte</h3>
      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot field (hidden from users, accessible to bots) */}
        <div style={{ display: "none" }} aria-hidden="true">
          <label htmlFor="website">Leave this field blank</label>
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
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              First Name <span style={{ color: "#d93838" }}>*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleInputChange}
              aria-required="true"
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              required
            />
            {errors.firstName && (
              <span id="firstName-error" style={{ color: "#d93838", fontSize: "0.85rem", display: "block", marginTop: "0.25rem" }}>
                {errors.firstName}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Last Name <span style={{ color: "#d93838" }}>*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleInputChange}
              aria-required="true"
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              required
            />
            {errors.lastName && (
              <span id="lastName-error" style={{ color: "#d93838", fontSize: "0.85rem", display: "block", marginTop: "0.25rem" }}>
                {errors.lastName}
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

          {/* ZIP Code */}
          <div className={`${styles.formFullWidth} form-group`}>
            <label htmlFor="zipCode" className="form-label">
              ZIP Code <span style={{ color: "#d93838" }}>*</span>
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              className="form-control"
              value={formData.zipCode}
              onChange={handleInputChange}
              maxLength={5}
              aria-required="true"
              aria-invalid={!!errors.zipCode}
              aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
              required
            />
            {errors.zipCode && (
              <span id="zipCode-error" style={{ color: "#d93838", fontSize: "0.85rem", display: "block", marginTop: "0.25rem" }}>
                {errors.zipCode}
              </span>
            )}
          </div>

          {/* Preferred Activities Checklist */}
          <div className={`${styles.formFullWidth} form-group`}>
            <span className="form-label" style={{ marginBottom: "0.75rem" }}>
              How would you like to help? (Select all that apply)
            </span>
            <div className={styles.checkboxGrid}>
              {activitiesList.map((activity) => (
                <label key={activity.id} className="form-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.activities.includes(activity.label)}
                    onChange={() => handleCheckboxChange(activity.label)}
                  />
                  <span>{activity.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Optional Message */}
          <div className={`${styles.formFullWidth} form-group`}>
            <label htmlFor="message" className="form-label">
              Optional Message
            </label>
            <textarea
              id="message"
              name="message"
              className="form-control"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Share why you support the campaign or details on how you can help."
            />
          </div>

          {/* Consent Checkbox */}
          <div className={`${styles.formFullWidth} form-group`}>
            <label className="form-checkbox">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleConsentChange}
                aria-required="true"
              />
              <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                I agree to receive campaign updates via email or phone. I understand I can opt-out at any time. <span style={{ color: "#d93838" }}>*</span>
              </span>
            </label>
            {errors.consent && (
              <span style={{ color: "#d93838", fontSize: "0.85rem", display: "block", marginTop: "0.25rem" }}>
                {errors.consent}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className={styles.formFullWidth}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Submitting..." : "Volunteer With Charlotte"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
