"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { verifyOtpApi } from "@/lib/api";

function OTPForm() {
  const params = useSearchParams();
  const router = useRouter();
  const phone = params.get("phone") || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!otp || otp.length < 4) { setError("Please enter a valid OTP."); return; }
    setLoading(true);
    try {
      await verifyOtpApi(phone, otp);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid OTP. Please try again.");
    } finally { setLoading(false); }
  }

  return (
    <div className="fade-in">
      <div style={{ fontSize: "40px", marginBottom: "16px" }}>📱</div>
      <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0D1117", marginBottom: "6px" }}>Verify OTP</h2>
      <p style={{ color: "#718096", fontSize: "15px", marginBottom: "8px" }}>Enter the 6-digit code sent to</p>
      <p style={{ color: "#006BD5", fontSize: "16px", fontWeight: 700, marginBottom: "32px" }}>{phone}</p>

      {error && <div style={{ padding: "12px 16px", background: "#FEE2E2", color: "#991B1B", borderRadius: "10px", marginBottom: "16px", fontSize: "14px" }}>⚠️ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "24px" }}>
          <input type="text" value={otp} onChange={e => setOtp(e.target.value.slice(0, 6))} placeholder="000000" maxLength={6} required
            style={{ width: "100%", padding: "16px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "24px", outline: "none", letterSpacing: "8px", textAlign: "center" }}
            onFocus={e => (e.target.style.borderColor = "#006BD5")} onBlur={e => (e.target.style.borderColor = "#E2E8F0")} />
        </div>
        <button type="submit" disabled={loading || otp.length < 4}
          style={{ width: "100%", padding: "14px", background: loading || otp.length < 4 ? "#CBD5E0" : "#006BD5", color: "white", border: "none", borderRadius: "10px", fontSize: "16px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "24px", color: "#718096", fontSize: "14px" }}>
        <Link href="/login" style={{ color: "#006BD5", fontWeight: 700 }}>← Back to Login</Link>
      </p>
    </div>
  );
}

export default function OTPPage() {
  return <Suspense fallback={<div>Loading...</div>}><OTPForm /></Suspense>;
}
