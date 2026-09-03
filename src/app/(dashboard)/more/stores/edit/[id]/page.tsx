"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { ApiRoutes } from "@/lib/apiRoutes";

export default function EditStorePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Fetch store details to populate form
    api.get(`${ApiRoutes.stores}/${id}`).then(res => {
      setStoreData(res?.data || res?.data?.data || null);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`${ApiRoutes.stores}/${id}`, storeData);
      router.push("/more/stores");
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading store details...</div>;
  if (!storeData) return <div style={{ padding: "40px", textAlign: "center", color: "red" }}>Store not found.</div>;

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }} className="fade-in">
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <button onClick={() => router.back()} style={{ border: "none", background: "white", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", fontWeight: 600 }}>
          ← Back
        </button>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0D1117", margin: 0 }}>Edit Store</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
        <div style={{ display: "grid", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Store Name</label>
            <input name="name" value={storeData.name || ""} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} required />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Description</label>
            <textarea name="description" value={storeData.description || ""} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px", minHeight: "100px" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>City</label>
              <input name="city" value={storeData.city || ""} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>State</label>
              <input name="state" value={storeData.state || ""} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} />
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Address</label>
            <input name="address" value={storeData.address || ""} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} />
          </div>
        </div>
        
        <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" disabled={saving} style={{ padding: "12px 24px", background: "#006BD5", color: "white", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
