"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { ApiRoutes } from "@/lib/apiRoutes";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", mobile: "", country: "" });

  useEffect(() => {
    api.get(ApiRoutes.profile)
      .then(res => {
        const d = (res?.data || res) as Record<string, unknown>;
        setProfile(d);
        setForm({
          name:    String(d.name    || ""),
          email:   String(d.email   || ""),
          mobile:  String(d.mobile  || ""),
          country: String(d.country || ""),
        });
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setSuccess(""); setError("");
    try {
      const res = await api.post(ApiRoutes.profile, form);
      const d = (res?.data || res) as Record<string, unknown>;
      setProfile(d);
      setSuccess("Profile updated successfully!");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  const PRI = "#006BD5";

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading profile...</div>;

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }} className="fade-in">
      <h1 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "24px" }}>Edit Profile</h1>

      {error && (
        <div style={{ padding: "12px 16px", background: "#FEE2E2", color: "#991B1B", borderRadius: "10px", marginBottom: "16px", fontSize: "14px" }}>
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div style={{ padding: "12px 16px", background: "#D1FAE5", color: "#065F46", borderRadius: "10px", marginBottom: "16px", fontSize: "14px" }}>
          ✓ {success}
        </div>
      )}

      <form onSubmit={handleSave}>
        <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          {/* Avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
            {profile?.profile_image ? (
              <img
                src={profile.profile_image as string}
                alt="profile"
                style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", border: "2px solid #E2E8F0" }}
              />
            ) : (
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: PRI, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "32px", fontWeight: 800 }}>
                {form.name?.[0]?.toUpperCase() || "S"}
              </div>
            )}
            <div>
              <div style={{ fontWeight: 700, fontSize: "18px", color: "#0D1117" }}>{form.name}</div>
              <div style={{ fontSize: "13px", color: "#718096", marginTop: "4px" }}>{form.email}</div>
              {profile?.wallet_balance && (
                <div style={{ fontSize: "13px", color: "#065F46", marginTop: "4px", fontWeight: 600 }}>
                  💰 Wallet: ${profile.wallet_balance as string}
                </div>
              )}
            </div>
          </div>

          {/* Fields */}
          <div className="grid-2" style={{ gap: "20px", marginBottom: "24px" }}>
            {[
              { label: "Full Name",      key: "name",    type: "text"  },
              { label: "Email Address",  key: "email",   type: "email" },
              { label: "Mobile Number",  key: "mobile",  type: "tel"   },
              { label: "Country",        key: "country", type: "text"  },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#4A5568", marginBottom: "6px" }}>
                  {label}
                </label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                  onFocus={e => (e.target.style.borderColor = PRI)}
                  onBlur={e  => (e.target.style.borderColor = "#E2E8F0")}
                />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
            <button type="button" style={{ padding: "12px 24px", background: "transparent", color: "#4A5568", border: "none", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{ padding: "12px 24px", background: saving ? "#CBD5E0" : PRI, color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: saving ? "not-allowed" : "pointer" }}
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}