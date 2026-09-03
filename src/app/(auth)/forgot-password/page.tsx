"use client";
import { useState } from "react";
import Link from "next/link";
import { forgotPasswordApi } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!email) { setError("Please enter your email address."); return; }
    setLoading(true);
    try {
      await forgotPasswordApi(email);
      setSuccess("Password reset instructions have been sent to your email.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send reset email.");
    } finally { setLoading(false); }
  }

  return (
    <div className="fade-in">
      <div style={{ fontSize: "40px", marginBottom: "16px" }}>🔐</div>
      <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0D1117", marginBottom: "6px" }}>Forgot Password?</h2>
      <p style={{ color: "#718096", fontSize: "15px", marginBottom: "32px" }}>No worries! Enter your email and we&apos;ll send you reset instructions.</p>

      {error && <div style={{ padding: "12px 16px", background: "#FEE2E2", color: "#991B1B", borderRadius: "10px", marginBottom: "16px", fontSize: "14px" }}>⚠️ {error}</div>}
      {success && <div style={{ padding: "12px 16px", background: "#D1FAE5", color: "#065F46", borderRadius: "10px", marginBottom: "16px", fontSize: "14px" }}>✓ {success}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#4A5568", marginBottom: "6px" }}>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seller@example.com" required
            style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "15px", outline: "none" }}
            onFocus={e => (e.target.style.borderColor = "#006BD5")} onBlur={e => (e.target.style.borderColor = "#E2E8F0")} />
        </div>
        <button type="submit" disabled={loading || !email}
          style={{ width: "100%", padding: "14px", background: loading || !email ? "#CBD5E0" : "#006BD5", color: "white", border: "none", borderRadius: "10px", fontSize: "16px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Sending..." : "Send Reset Instructions"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "24px", color: "#718096", fontSize: "14px" }}>
        Remember your password?{" "}
        <Link href="/login" style={{ color: "#006BD5", fontWeight: 700 }}>Back to Login</Link>
      </p>
    </div>
  );
}
