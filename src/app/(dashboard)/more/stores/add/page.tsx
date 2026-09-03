"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { ApiRoutes } from "@/lib/apiRoutes";

export default function AddStorePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  
  const [storeData, setStoreData] = useState<any>({
    name: "", contact_email: "", contact_number: "",
    country: "", state: "", city: "", zipcode: "", address: "", landmark: "", latitude: "0", longitude: "0",
    tax_name: "", tax_number: "",
    bank_name: "", bank_branch_code: "", account_holder_name: "", account_number: "", routing_number: "", bank_account_type: "",
    allows_pickup: false, pickup_instructions: ""
  });
  const [files, setFiles] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(storeData).forEach(([key, val]) => {
        if (key === "allows_pickup") {
          formData.append(key, val ? "1" : "0");
        } else {
          formData.append(key, String(val));
        }
      });
      Object.entries(files).forEach(([key, file]) => {
        if (file) formData.append(key, file as File);
      });

      await api.postMultipart(ApiRoutes.stores, formData);
      router.push("/more/stores");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to add store.");
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setStoreData({ ...storeData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setStoreData({ ...storeData, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [e.target.name]: e.target.files[0] });
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }} className="fade-in">
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <button onClick={() => router.back()} style={{ border: "none", background: "white", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", fontWeight: 600 }}>
          ← Back
        </button>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0D1117", margin: 0 }}>Add New Store</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", color: "#2D3748", borderBottom: "1px solid #E2E8F0", paddingBottom: "8px" }}>Basic Details</h2>
        <div style={{ display: "grid", gap: "20px", marginBottom: "32px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Store Name *</label>
            <input name="name" value={storeData.name} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} required />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Contact Email *</label>
              <input type="email" name="contact_email" value={storeData.contact_email} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Contact Number *</label>
              <input name="contact_number" value={storeData.contact_number} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} required />
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", color: "#2D3748", borderBottom: "1px solid #E2E8F0", paddingBottom: "8px" }}>Location</h2>
        <div style={{ display: "grid", gap: "20px", marginBottom: "32px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Address *</label>
            <textarea name="address" value={storeData.address} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px", minHeight: "80px" }} required />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Landmark *</label>
            <input name="landmark" value={storeData.landmark} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} required />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Country *</label>
              <input name="country" value={storeData.country} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>State *</label>
              <input name="state" value={storeData.state} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} required />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>City *</label>
              <input name="city" value={storeData.city} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Zip Code *</label>
              <input name="zipcode" value={storeData.zipcode} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} required />
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", color: "#2D3748", borderBottom: "1px solid #E2E8F0", paddingBottom: "8px" }}>Bank Details & Tax</h2>
        <div style={{ display: "grid", gap: "20px", marginBottom: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Bank Name *</label>
              <input name="bank_name" value={storeData.bank_name} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Bank Branch Code *</label>
              <input name="bank_branch_code" value={storeData.bank_branch_code} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} required />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Account Holder Name *</label>
              <input name="account_holder_name" value={storeData.account_holder_name} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Account Number *</label>
              <input name="account_number" value={storeData.account_number} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} required />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Routing Number *</label>
              <input name="routing_number" value={storeData.routing_number} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Bank Account Type *</label>
              <input name="bank_account_type" value={storeData.bank_account_type} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} placeholder="e.g. Checking" required />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Tax Name *</label>
              <input name="tax_name" value={storeData.tax_name} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Tax Number *</label>
              <input name="tax_number" value={storeData.tax_number} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E0", fontSize: "14px" }} required />
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", color: "#2D3748", borderBottom: "1px solid #E2E8F0", paddingBottom: "8px" }}>Logos & Documents</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Store Logo *</label>
            <input type="file" name="store_logo" onChange={handleFileChange} accept="image/*" style={{ width: "100%", padding: "10px", fontSize: "14px" }} required />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Store Banner *</label>
            <input type="file" name="store_banner" onChange={handleFileChange} accept="image/*" style={{ width: "100%", padding: "10px", fontSize: "14px" }} required />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Address Proof *</label>
            <input type="file" name="address_proof" onChange={handleFileChange} style={{ width: "100%", padding: "10px", fontSize: "14px" }} required />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4A5568", marginBottom: "8px" }}>Voided Check *</label>
            <input type="file" name="voided_check" onChange={handleFileChange} style={{ width: "100%", padding: "10px", fontSize: "14px" }} required />
          </div>
        </div>
        
        <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" disabled={saving} style={{ padding: "12px 24px", background: "#006BD5", color: "white", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
            {saving ? "Creating..." : "Create Store"}
          </button>
        </div>
      </form>
    </div>
  );
}
