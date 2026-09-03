"use client";
import { useState } from "react";
import Link from "next/link";
import { loginApi, sendOtpApi } from "@/lib/api";

export default function LoginPage() {
  const [tab, setTab]               = useState<"email" | "phone">("email");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [phone, setPhone]           = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [success, setSuccess]       = useState("");

  // ── Validators ───────────────────────────────────────────────────────────
  function validateEmail(v: string): string | null {
    if (!v.trim()) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return "Please enter a valid email address.";
    return null;
  }
  function validatePassword(v: string): string | null {
    if (!v.trim()) return "Password is required.";
    if (v.trim().length < 6) return "Password must be at least 6 characters.";
    return null;
  }

  // ── Handlers ─────────────────────────────────────────────────────────────
  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSuccess("");

    const emailErr = validateEmail(email);
    if (emailErr) { setError(emailErr); return; }

    const passErr = validatePassword(password);
    if (passErr) { setError(passErr); return; }

    setLoading(true);
    try {
      await loginApi(email.trim(), password.trim());
      setSuccess("Login successful! Redirecting…");
      setTimeout(() => { window.location.href = "/dashboard"; }, 600);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handlePhoneLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!phone.trim()) { setError("Please enter your phone number."); return; }
    setLoading(true);
    try {
      await sendOtpApi(phone);
      setSuccess("OTP sent! Redirecting…");
      setTimeout(() => { window.location.href = `/otp?phone=${encodeURIComponent(phone)}`; }, 800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  }

  const isLoginEnabled = email.trim().length > 0 && password.trim().length > 0;
  const isPhoneEnabled = phone.trim().length > 0;
  const PRI = "#006BD5";

  return (
    <div className="fade-in">
      <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0D1117", marginBottom: "6px" }}>
        Welcome Back
      </h2>
      <p style={{ color: "#718096", fontSize: "15px", marginBottom: "32px" }}>
        Sign in to your account to continue
      </p>

      {/* Tab switcher */}
      <div style={{ display: "flex", background: "#F7FAFC", borderRadius: "10px", padding: "4px", marginBottom: "24px" }}>
        {(["email", "phone"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setError(""); setSuccess(""); }}
            style={{
              flex: 1, padding: "10px", borderRadius: "8px", border: "none",
              fontWeight: 600, fontSize: "14px", cursor: "pointer", transition: "all 0.2s",
              background: tab === t ? PRI : "transparent",
              color:      tab === t ? "white" : "#718096",
            }}
          >
            {t === "email" ? "📧 Email" : "📱 Phone"}
          </button>
        ))}
      </div>

      {/* Feedback banners */}
      {error && (
        <div style={{ padding: "12px 16px", background: "#FEE2E2", color: "#991B1B", borderRadius: "10px", marginBottom: "16px", fontSize: "14px", display: "flex", gap: "8px", alignItems: "center" }}>
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div style={{ padding: "12px 16px", background: "#D1FAE5", color: "#065F46", borderRadius: "10px", marginBottom: "16px", fontSize: "14px", display: "flex", gap: "8px", alignItems: "center" }}>
          ✓ {success}
        </div>
      )}

      {tab === "email" ? (
        /* ── Email / Password form ─────────────────────────────────────── */
        <form onSubmit={handleEmailLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#4A5568", marginBottom: "6px" }}>
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
              onFocus={e => (e.target.style.borderColor = PRI)}
              onBlur={e  => (e.target.style.borderColor = "#E2E8F0")}
            />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#4A5568", marginBottom: "6px" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                style={{ width: "100%", padding: "13px 48px 13px 16px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
                onFocus={e => (e.target.style.borderColor = PRI)}
                onBlur={e  => (e.target.style.borderColor = "#E2E8F0")}
              />
              <button
                type="button"
                id="toggle-password-visibility"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#718096" }}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <div style={{ textAlign: "right", marginBottom: "24px" }}>
            <Link href="/forgot-password" style={{ color: PRI, fontSize: "13px", fontWeight: 600 }}>
              Forgot Password?
            </Link>
          </div>

          <button
            id="sign-in-btn"
            type="submit"
            disabled={loading || !isLoginEnabled}
            style={{
              width: "100%", padding: "14px",
              background: loading || !isLoginEnabled ? "#CBD5E0" : PRI,
              color: "white", border: "none", borderRadius: "10px",
              fontSize: "16px", fontWeight: 700,
              cursor: loading || !isLoginEnabled ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              boxShadow: isLoginEnabled && !loading ? "0 4px 16px rgba(0,107,213,0.3)" : "none",
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      ) : (
        /* ── Phone / OTP form ──────────────────────────────────────────── */
        <form onSubmit={handlePhoneLogin}>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#4A5568", marginBottom: "6px" }}>
              Phone Number
            </label>
            <input
              id="login-phone"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
              onFocus={e => (e.target.style.borderColor = PRI)}
              onBlur={e  => (e.target.style.borderColor = "#E2E8F0")}
            />
          </div>
          <button
            id="send-otp-btn"
            type="submit"
            disabled={loading || !isPhoneEnabled}
            style={{
              width: "100%", padding: "14px",
              background: loading || !isPhoneEnabled ? "#CBD5E0" : PRI,
              color: "white", border: "none", borderRadius: "10px",
              fontSize: "16px", fontWeight: 700,
              cursor: loading || !isPhoneEnabled ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Sending OTP…" : "Send OTP"}
          </button>
        </form>
      )}

      <div style={{ marginTop: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ flex: 1, height: "1px", background: "#E2E8F0" }} />
        <span style={{ color: "#718096", fontSize: "13px" }}>OR</span>
        <div style={{ flex: 1, height: "1px", background: "#E2E8F0" }} />
      </div>

      <p style={{ textAlign: "center", marginTop: "20px", color: "#718096", fontSize: "14px" }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup" style={{ color: PRI, fontWeight: 700 }}>Sign Up</Link>
      </p>
    </div>
  );
}
