"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { ApiRoutes } from "@/lib/apiRoutes";

interface StorePricingItem {
  storeId: number; storeName: string;
  price: string; specialPrice: string;
  cost: string; stock: string; sku: string;
}
interface ProductForm {
  categoryId: string; categoryName: string;
  title: string; hsnCode: string; madeIn: string;
  indicator: string; prepTime: number;
  minOrderQty: string; stepSize: string; totalAllowed: string;
  isReturnable: boolean; returnableDays: string;
  isCancelable: boolean; cancelableTill: string;
  requiresOtp: boolean; featured: boolean; isAttachmentRequired: boolean;
  warrantyPeriod: string; warrantyUnit: string;
  guaranteePeriod: string; guaranteeUnit: string;
  type: string; barcode: string;
  weight: string; height: string; length: string; breadth: string;
  mainImage: File | null; otherImages: File[];
  shortDescription: string; description: string;
  taxGroupIds: number[]; storePricing: StorePricingItem[];
}
const STEPS = [
  { id: 1, label: "Category" }, { id: 2, label: "Product Info" },
  { id: 3, label: "Policies" }, { id: 4, label: "Variations" },
  { id: 5, label: "Images" }, { id: 6, label: "Description" },
  { id: 7, label: "Pricing & Taxes" },
];
const PRI = "#006BD5";
const card: React.CSSProperties = { background: "white", borderRadius: 14, border: "1.5px solid #E2E8F0", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", padding: 24 };
const inp: React.CSSProperties = { width: "100%", padding: "11px 14px", border: "1.5px solid #E2E8F0", borderRadius: 10, fontSize: 14, outline: "none", background: "white", boxSizing: "border-box" };
const lb: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 };

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={lb}>{label}{required && <span style={{ color: "red", marginLeft: 3 }}>*</span>}</label>
      {children}
    </div>
  );
}
function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{label}</span>
      <div onClick={() => onChange(!value)} style={{ width: 44, height: 24, borderRadius: 12, cursor: "pointer", background: value ? PRI : "#D1D5DB", position: "relative", transition: "background .2s" }}>
        <div style={{ position: "absolute", top: 3, left: value ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "white", transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.3)" }} />
      </div>
    </div>
  );
}
function Counter({ label, value, onChange, min = 0 }: { label: string; value: string; onChange: (v: string) => void; min?: number }) {
  const num = parseInt(value) || 0;
  return (
    <Field label={label} required>
      <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #E2E8F0", borderRadius: 10, overflow: "hidden" }}>
        <button type="button" onClick={() => onChange(String(Math.max(min, num - 1)))} style={{ padding: "10px 14px", background: "#F8FAFC", border: "none", cursor: "pointer", fontSize: 16, color: "#6B7280" }}>−</button>
        <input type="number" value={value} onChange={e => onChange(e.target.value)} style={{ flex: 1, border: "none", textAlign: "center", fontSize: 15, fontWeight: 600, outline: "none", padding: "10px 0" }} />
        <button type="button" onClick={() => onChange(String(num + 1))} style={{ padding: "10px 14px", background: "#F8FAFC", border: "none", cursor: "pointer", fontSize: 16, color: "#6B7280" }}>+</button>
      </div>
    </Field>
  );
}

export default function AddProductPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [taxGroups, setTaxGroups] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [initLoading, setInitLoading] = useState(true);
  const [form, setForm] = useState<ProductForm>({
    categoryId: "", categoryName: "",
    title: "", hsnCode: "", madeIn: "India", indicator: "", prepTime: 20,
    minOrderQty: "1", stepSize: "1", totalAllowed: "0",
    isReturnable: false, returnableDays: "", isCancelable: false, cancelableTill: "pending",
    requiresOtp: false, featured: false, isAttachmentRequired: false,
    warrantyPeriod: "", warrantyUnit: "Month", guaranteePeriod: "", guaranteeUnit: "Month",
    type: "simple", barcode: "", weight: "1", height: "1", length: "1", breadth: "1",
    mainImage: null, otherImages: [],
    shortDescription: "", description: "",
    taxGroupIds: [], storePricing: [],
  });

  useEffect(() => {
    Promise.all([
      api.get(ApiRoutes.categories).catch(() => ({ data: [] })),
      api.get(ApiRoutes.taxGroups).catch(() => ({ data: { data: [] } })),
      api.get(ApiRoutes.stores).catch(() => ({ data: { data: [] } })),
    ]).then(([catRes, taxRes, storesRes]) => {
      setCategories(catRes?.data?.data || catRes?.data || []);
      setTaxGroups(taxRes?.data?.data || taxRes?.data || []);
      setStores(storesRes?.data?.data || storesRes?.data || []);
      setInitLoading(false);
    });
  }, []);

  function validate(s: number): string | null {
    switch (s) {
      case 1: return form.categoryId ? null : "Please select a category.";
      case 2: return form.title.trim() ? null : "Product title is required.";
      case 3: {
        if ((parseInt(form.minOrderQty) || 0) <= 0) return "Min order qty must be > 0";
        if ((parseInt(form.stepSize) || 0) <= 0) return "Step size must be > 0";
        return null;
      }
      case 4:
        if (!form.barcode.trim()) return "Barcode is required.";
        if (!form.weight.trim()) return "Weight is required.";
        return null;
      case 5: return form.mainImage ? null : "Main product image is required.";
      case 6: return form.shortDescription.trim() ? null : "Short description is required.";
      case 7: return form.storePricing.length ? null : "Add pricing for at least one store.";
      default: return null;
    }
  }

  function goNext() {
    const err = validate(step);
    if (err) { setError(err); return; }
    setError("");
    if (step < 7) setStep(s => s + 1);
    else handleSubmit();
  }
  function goPrev() { setError(""); setStep(s => s - 1); }
  function jumpStep(s: number) {
    if (s < step) { setError(""); setStep(s); return; }
    for (let i = 1; i < s; i++) { const e = validate(i); if (e) { setError(`Step ${i}: ${e}`); return; } }
    setError(""); setStep(s);
  }

  async function handleSubmit() {
    setSubmitting(true); setError("");
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("short_description", form.shortDescription);
      fd.append("description", form.description);
      fd.append("type", form.type);
      fd.append("category_id", form.categoryId);
      fd.append("hsn_code", form.hsnCode);
      fd.append("indicator", form.indicator || "none");
      fd.append("made_in", form.madeIn || "India");
      fd.append("base_prep_time", String(form.prepTime));
      fd.append("image_fit", "contain");
      fd.append("minimum_order_quantity", form.minOrderQty);
      fd.append("quantity_step_size", form.stepSize);
      fd.append("total_allowed_quantity", form.totalAllowed || "0");
      fd.append("is_returnable", form.isReturnable ? "1" : "0");
      fd.append("returnable_days", form.returnableDays || "0");
      fd.append("is_cancelable", form.isCancelable ? "1" : "0");
      fd.append("cancelable_till", form.isCancelable ? form.cancelableTill : "pending");
      fd.append("is_attachment_required", form.isAttachmentRequired ? "1" : "0");
      fd.append("featured", form.featured ? "1" : "0");
      fd.append("requires_otp", form.requiresOtp ? "1" : "0");
      if (form.warrantyPeriod) fd.append("warranty_period", `${form.warrantyPeriod} ${form.warrantyUnit}`);
      if (form.guaranteePeriod) fd.append("guarantee_period", `${form.guaranteePeriod} ${form.guaranteeUnit}`);
      form.taxGroupIds.forEach((id, i) => fd.append(`tax_groups[${i}]`, String(id)));
      if (form.mainImage) fd.append("main_image", form.mainImage);
      form.otherImages.forEach((img, i) => fd.append(`additional_images[${i}]`, img));
      fd.append("variants_json", JSON.stringify([{
        id: "", title: "Default",
        weight: form.weight || "1", length: form.length || "1",
        breadth: form.breadth || "1", height: form.height || "1",
        availability: "yes", is_default: "on",
        barcode: form.barcode, attributes: [],
      }]));
      fd.append("pricing", JSON.stringify({
        store_pricing: form.storePricing.map(sp => ({
          store_id: sp.storeId, price: sp.price,
          special_price: sp.specialPrice || sp.price,
          cost: sp.cost || sp.price,
          stock: sp.stock, sku: sp.sku,
        })),
        variant_pricing: [],
      }));
      await api.postMultipart(ApiRoutes.products, fd);
      router.push("/products");
    } catch (err: any) { setError(err.message || "Failed to add product."); setSubmitting(false); }
  }

  function renderStep() {
    switch (step) {
      case 1: return <Step1 form={form} setForm={setForm} categories={categories} />;
      case 2: return <Step2 form={form} setForm={setForm} />;
      case 3: return <Step3 form={form} setForm={setForm} />;
      case 4: return <Step4 form={form} setForm={setForm} />;
      case 5: return <Step5 form={form} setForm={setForm} />;
      case 6: return <Step6 form={form} setForm={setForm} />;
      case 7: return <Step7 form={form} setForm={setForm} taxGroups={taxGroups} stores={stores} />;
      default: return null;
    }
  }

  if (initLoading) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: 16 }}>
      <div style={{ width: 40, height: 40, border: "3px solid #E2E8F0", borderTop: `3px solid ${PRI}`, borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      <p style={{ color: "#6B7280", fontSize: 14 }}>Loading form data…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ padding: "20px 24px", maxWidth: 860, margin: "0 auto" }} className="fade-in">
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <Link href="/products" style={{ width: 36, height: 36, background: "white", border: "1.5px solid #E2E8F0", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, textDecoration: "none", color: "#374151" }}>←</Link>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Add New Product</h1>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
        {STEPS.map(s => (
          <button key={s.id} type="button" onClick={() => jumpStep(s.id)}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 100, border: "none", cursor: "pointer", transition: "all .2s", background: step === s.id ? PRI : step > s.id ? "#DCFCE7" : "#F1F5F9", color: step === s.id ? "white" : step > s.id ? "#16A34A" : "#64748B", fontWeight: step === s.id ? 700 : 500, fontSize: 12, whiteSpace: "nowrap" }}>
            <span style={{ width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, background: step === s.id ? "rgba(255,255,255,.25)" : step > s.id ? "#16A34A" : "#CBD5E1", color: step > s.id ? "white" : "inherit" }}>
              {step > s.id ? "✓" : s.id}
            </span>
            {s.label}
          </button>
        ))}
      </div>

      {error && <div style={{ padding: "12px 16px", background: "#FEE2E2", color: "#991B1B", borderRadius: 10, marginBottom: 16, fontSize: 14 }}>⚠️ {error}</div>}

      <div style={card}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 20, color: "#111827" }}>
          Step {step} / {STEPS.length} — {STEPS[step - 1].label}
        </h2>
        {renderStep()}
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        {step > 1 && (
          <button type="button" onClick={goPrev} style={{ flex: 1, padding: 14, border: `1.5px solid ${PRI}`, borderRadius: 10, background: "white", color: PRI, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>← Previous</button>
        )}
        <button type="button" onClick={goNext} disabled={submitting}
          style={{ flex: 2, padding: 14, border: "none", borderRadius: 10, background: submitting ? "#93C5FD" : PRI, color: "white", fontWeight: 700, fontSize: 15, cursor: submitting ? "not-allowed" : "pointer" }}>
          {submitting ? "Submitting…" : step === 7 ? "🚀 Save Product" : "Next →"}
        </button>
      </div>

      <style>{`
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; }
        @media (max-width: 640px) {
          .grid-2, .grid-3 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

function Step1({ form, setForm, categories }: any) {
  const [search, setSearch] = useState("");
  const filtered = categories.filter((c: any) => (c.name || c.title || "").toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Field label="Search Category">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Type to filter…" style={inp} />
      </Field>
      {form.categoryId && (
        <div style={{ padding: "10px 14px", background: "#EFF6FF", borderRadius: 10, color: PRI, fontWeight: 600, fontSize: 14 }}>
          ✓ Selected: {form.categoryName}
        </div>
      )}
      <div style={{ maxHeight: 320, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6, border: "1.5px solid #E2E8F0", borderRadius: 10, padding: 10 }}>
        {filtered.length === 0 && <p style={{ color: "#9CA3AF", fontSize: 13, textAlign: "center", margin: "20px 0" }}>No categories found</p>}
        {filtered.map((c: any) => (
          <div key={c.id} onClick={() => setForm((f: any) => ({ ...f, categoryId: String(c.id), categoryName: c.name || c.title }))}
            style={{ padding: "10px 14px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500, background: form.categoryId === String(c.id) ? PRI + "15" : "#F9FAFB", border: form.categoryId === String(c.id) ? `2px solid ${PRI}` : "2px solid transparent", color: form.categoryId === String(c.id) ? PRI : "#374151", transition: "all .15s" }}>
            {c.name || c.title}
          </div>
        ))}
      </div>
    </div>
  );
}

function Step2({ form, setForm }: any) {
  const set = (k: string) => (e: any) => setForm((f: any) => ({ ...f, [k]: e.target.value }));
  return (
    <div className="grid-2" style={{ gap: 16 }}>
      <div style={{ gridColumn: "1/-1" }}>
        <Field label="Product Title" required>
          <input value={form.title} onChange={set("title")} style={inp} placeholder="e.g. Organic Almonds 500g" />
        </Field>
      </div>
      <Field label="HSN Code"><input value={form.hsnCode} onChange={set("hsnCode")} style={inp} placeholder="e.g. 08021100" /></Field>
      <Field label="Made In"><input value={form.madeIn} onChange={set("madeIn")} style={inp} placeholder="e.g. India" /></Field>
      <Field label="Food Indicator">
        <select value={form.indicator} onChange={set("indicator")} style={inp}>
          <option value="">None</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>
      </Field>
      <Field label="Base Prep Time" required>
        <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #E2E8F0", borderRadius: 10, overflow: "hidden" }}>
          <button type="button" onClick={() => setForm((f: any) => ({ ...f, prepTime: Math.max(0, f.prepTime - 5) }))} style={{ padding: "10px 14px", background: "#F8FAFC", border: "none", cursor: "pointer", fontSize: 16 }}>-</button>
          <span style={{ flex: 1, textAlign: "center", fontWeight: 700, color: PRI }}>{form.prepTime} min</span>
          <button type="button" onClick={() => setForm((f: any) => ({ ...f, prepTime: f.prepTime + 5 }))} style={{ padding: "10px 14px", background: "#F8FAFC", border: "none", cursor: "pointer", fontSize: 16 }}>+</button>
        </div>
      </Field>
    </div>
  );
}

function Step3({ form, setForm }: any) {
  const set = (k: string) => (e: any) => setForm((f: any) => ({ ...f, [k]: e.target.value }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="grid-3" style={{ gap: 16 }}>
        <Counter label="Min Order Qty" value={form.minOrderQty} min={1} onChange={v => setForm((f: any) => ({ ...f, minOrderQty: v }))} />
        <Counter label="Step Size" value={form.stepSize} min={1} onChange={v => setForm((f: any) => ({ ...f, stepSize: v }))} />
        <Counter label="Max Qty (0=unlimited)" value={form.totalAllowed} min={0} onChange={v => setForm((f: any) => ({ ...f, totalAllowed: v }))} />
      </div>
      <div className="grid-3" style={{ gap: 20, paddingTop: 8, borderTop: "1px solid #F1F5F9" }}>
        <Toggle label="Is Returnable" value={form.isReturnable} onChange={v => setForm((f: any) => ({ ...f, isReturnable: v }))} />
        <Toggle label="Is Cancelable" value={form.isCancelable} onChange={v => setForm((f: any) => ({ ...f, isCancelable: v }))} />
        <Toggle label="Requires OTP" value={form.requiresOtp} onChange={v => setForm((f: any) => ({ ...f, requiresOtp: v }))} />
        <Toggle label="Featured Product" value={form.featured} onChange={v => setForm((f: any) => ({ ...f, featured: v }))} />
        <Toggle label="Attachment Required" value={form.isAttachmentRequired} onChange={v => setForm((f: any) => ({ ...f, isAttachmentRequired: v }))} />
      </div>
      {form.isReturnable && <Field label="Returnable Days"><input type="number" value={form.returnableDays} onChange={set("returnableDays")} style={inp} placeholder="e.g. 7" /></Field>}
      {form.isCancelable && (
        <Field label="Cancelable Till">
          <select value={form.cancelableTill} onChange={set("cancelableTill")} style={inp}>
            <option value="pending">Pending</option>
            <option value="awaiting_store_response">Awaiting Store Response</option>
            <option value="accepted">Approved</option>
            <option value="preparing">Preparing</option>
          </select>
        </Field>
      )}
      <div className="grid-2" style={{ gap: 16 }}>
        <Field label="Warranty Period">
          <div style={{ display: "flex", gap: 8 }}>
            <input type="number" value={form.warrantyPeriod} onChange={set("warrantyPeriod")} style={{ ...inp, flex: 2 }} placeholder="0" />
            <select value={form.warrantyUnit} onChange={set("warrantyUnit")} style={{ ...inp, flex: 1 }}>
              <option value="Days">Days</option><option value="Month">Month</option><option value="Year">Year</option>
            </select>
          </div>
        </Field>
        <Field label="Guarantee Period">
          <div style={{ display: "flex", gap: 8 }}>
            <input type="number" value={form.guaranteePeriod} onChange={set("guaranteePeriod")} style={{ ...inp, flex: 2 }} placeholder="0" />
            <select value={form.guaranteeUnit} onChange={set("guaranteeUnit")} style={{ ...inp, flex: 1 }}>
              <option value="Days">Days</option><option value="Month">Month</option><option value="Year">Year</option>
            </select>
          </div>
        </Field>
      </div>
    </div>
  );
}

function Step4({ form, setForm }: any) {
  const set = (k: string) => (e: any) => setForm((f: any) => ({ ...f, [k]: e.target.value }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Field label="Product Type" required>
        <select value={form.type} onChange={set("type")} style={inp}>
          <option value="simple">Simple Product</option>
          <option value="variant">Variable Product</option>
        </select>
      </Field>
      <div style={{ padding: 16, background: "#F8FAFC", borderRadius: 12, border: "1.5px solid #E2E8F0" }}>
        <p style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 14, color: "#374151" }}>Barcode and Dimensions</p>
        <div className="grid-2" style={{ gap: 14 }}>
          <div style={{ gridColumn: "1/-1" }}>
            <Field label="Barcode" required><input value={form.barcode} onChange={set("barcode")} style={inp} placeholder="Scan or enter barcode" /></Field>
          </div>
          <Field label="Weight (kg)" required><input type="number" step="0.01" value={form.weight} onChange={set("weight")} style={inp} placeholder="1" /></Field>
          <Field label="Height (cm)" required><input type="number" step="0.01" value={form.height} onChange={set("height")} style={inp} placeholder="1" /></Field>
          <Field label="Length (cm)" required><input type="number" step="0.01" value={form.length} onChange={set("length")} style={inp} placeholder="1" /></Field>
          <Field label="Breadth (cm)" required><input type="number" step="0.01" value={form.breadth} onChange={set("breadth")} style={inp} placeholder="1" /></Field>
        </div>
      </div>
    </div>
  );
}

function Step5({ form, setForm }: any) {
  const [mainP, setMainP] = useState<string | null>(null);
  const [otherP, setOtherP] = useState<string[]>([]);
  function handleMain(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setForm((f: any) => ({ ...f, mainImage: file }));
    setMainP(file ? URL.createObjectURL(file) : null);
  }
  function handleOther(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setForm((f: any) => ({ ...f, otherImages: [...f.otherImages, ...files] }));
    setOtherP(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  }
  function removeOther(i: number) {
    setForm((f: any) => ({ ...f, otherImages: f.otherImages.filter((_: any, idx: number) => idx !== i) }));
    setOtherP(prev => prev.filter((_, idx) => idx !== i));
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Field label="Main Image" required>
        <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed #CBD5E1", borderRadius: 12, padding: 20, cursor: "pointer", background: "#F8FAFC", gap: 8, minHeight: 140 }}>
          {mainP
            ? <img src={mainP} alt="Preview" style={{ maxHeight: 160, maxWidth: "100%", borderRadius: 8, objectFit: "contain" }} />
            : <><span style={{ fontSize: 32 }}>Image</span><span style={{ color: "#64748B", fontSize: 13 }}>Click to upload main image</span></>
          }
          <input type="file" accept="image/*" onChange={handleMain} style={{ display: "none" }} />
        </label>
      </Field>
      <Field label="Additional Images">
        <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed #CBD5E1", borderRadius: 12, padding: 16, cursor: "pointer", background: "#F8FAFC", gap: 6 }}>
          <span style={{ fontSize: 13, color: "#64748B" }}>Click to add more images</span>
          <input type="file" accept="image/*" multiple onChange={handleOther} style={{ display: "none" }} />
        </label>
        {otherP.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
            {otherP.map((src, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img src={src} alt="" style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8, border: "1.5px solid #E2E8F0" }} />
                <button type="button" onClick={() => removeOther(i)}
                  style={{ position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: "50%", background: "#EF4444", border: "none", color: "white", fontSize: 11, cursor: "pointer" }}>x</button>
              </div>
            ))}
          </div>
        )}
      </Field>
    </div>
  );
}

function Step6({ form, setForm }: any) {
  const set = (k: string) => (e: any) => setForm((f: any) => ({ ...f, [k]: e.target.value }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Field label="Short Description" required>
        <textarea value={form.shortDescription} onChange={set("shortDescription")} rows={3} placeholder="Brief product summary shown in listings..." style={{ ...inp, resize: "vertical", minHeight: 80 }} />
      </Field>
      <Field label="Full Description">
        <textarea value={form.description} onChange={set("description")} rows={7} placeholder="Detailed product description, ingredients, usage instructions..." style={{ ...inp, resize: "vertical", minHeight: 160 }} />
      </Field>
    </div>
  );
}

function Step7({ form, setForm, taxGroups, stores }: any) {
  const [expandedStore, setExpandedStore] = useState<number | null>(null);
  const [storeSearch, setStoreSearch] = useState("");

  function toggleTax(id: number) {
    setForm((f: any) => ({
      ...f,
      taxGroupIds: f.taxGroupIds.includes(id)
        ? f.taxGroupIds.filter((t: number) => t !== id)
        : [...f.taxGroupIds, id],
    }));
  }

  function addStore(store: any) {
    if (form.storePricing.find((sp: StorePricingItem) => sp.storeId === store.id)) return;
    setForm((f: any) => ({
      ...f,
      storePricing: [...f.storePricing, { storeId: store.id, storeName: store.name, price: "", specialPrice: "", cost: "", stock: "", sku: "" }],
    }));
    setExpandedStore(store.id);
  }

  function removeStore(storeId: number) {
    setForm((f: any) => ({ ...f, storePricing: f.storePricing.filter((sp: StorePricingItem) => sp.storeId !== storeId) }));
    if (expandedStore === storeId) setExpandedStore(null);
  }

  function updateP(storeId: number, field: string, value: string) {
    setForm((f: any) => ({
      ...f,
      storePricing: f.storePricing.map((sp: StorePricingItem) => sp.storeId === storeId ? { ...sp, [field]: value } : sp),
    }));
  }

  const avail = stores.filter((s: any) =>
    s.name.toLowerCase().includes(storeSearch.toLowerCase()) &&
    !form.storePricing.find((sp: StorePricingItem) => sp.storeId === s.id)
  );
  const selTax = taxGroups.filter((t: any) => form.taxGroupIds.includes(t.id)).map((t: any) => t.title).join(", ");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 4px", color: "#111827" }}>Tax Groups</p>
        <p style={{ fontSize: 12, color: "#9CA3AF", margin: "0 0 12px" }}>Leave empty for zero tax</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {taxGroups.map((t: any) => (
            <div key={t.id} onClick={() => toggleTax(t.id)}
              style={{ padding: "7px 14px", borderRadius: 100, cursor: "pointer", fontSize: 13, fontWeight: 600, background: form.taxGroupIds.includes(t.id) ? PRI : "#F1F5F9", color: form.taxGroupIds.includes(t.id) ? "white" : "#374151", border: form.taxGroupIds.includes(t.id) ? `2px solid ${PRI}` : "2px solid transparent", transition: "all .15s" }}>
              {t.title}
            </div>
          ))}
          {taxGroups.length === 0 && <p style={{ color: "#9CA3AF", fontSize: 13 }}>No tax groups available</p>}
        </div>
        {selTax && <p style={{ fontSize: 12, color: "#6B7280", marginTop: 8 }}>Selected: {selTax}</p>}
      </div>

      <div>
        <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 4px", color: "#111827" }}>Store Pricing</p>
        <p style={{ fontSize: 12, color: "#9CA3AF", margin: "0 0 12px" }}>Set pricing for each store</p>
        <div style={{ marginBottom: 12 }}>
          <input value={storeSearch} onChange={e => setStoreSearch(e.target.value)} placeholder="Search stores to add..." style={{ ...inp, marginBottom: 8 }} />
          {storeSearch && (
            <div style={{ border: "1.5px solid #E2E8F0", borderRadius: 10, maxHeight: 180, overflowY: "auto" }}>
              {avail.length === 0
                ? <p style={{ color: "#9CA3AF", fontSize: 13, padding: 12 }}>No stores found</p>
                : avail.map((s: any) => (
                  <div key={s.id} onClick={() => { addStore(s); setStoreSearch(""); }}
                    style={{ padding: "10px 14px", cursor: "pointer", fontSize: 14, borderBottom: "1px solid #F1F5F9" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#F8FAFC")}
                    onMouseLeave={e => (e.currentTarget.style.background = "white")}>
                    {s.name}
                  </div>
                ))
              }
            </div>
          )}
        </div>

        {form.storePricing.map((sp: StorePricingItem) => (
          <div key={sp.storeId} style={{ border: "1.5px solid #E2E8F0", borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", background: "#F8FAFC", cursor: "pointer" }}
              onClick={() => setExpandedStore(expandedStore === sp.storeId ? null : sp.storeId)}>
              <span style={{ flex: 1, fontWeight: 700, fontSize: 15, color: PRI }}>{sp.storeName}</span>
              {sp.price && <span style={{ fontSize: 12, color: "#6B7280", marginRight: 8 }}>Rs.{sp.price}</span>}
              <button type="button" onClick={e => { e.stopPropagation(); removeStore(sp.storeId); }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontSize: 14, marginRight: 4 }}>Remove</button>
              <span style={{ color: "#9CA3AF" }}>{expandedStore === sp.storeId ? "^" : "v"}</span>
            </div>
            {expandedStore === sp.storeId && (
              <div className="grid-2" style={{ padding: 16, gap: 14 }}>
                <Field label="Price" required>
                  <input type="number" step="0.01" value={sp.price} onChange={e => updateP(sp.storeId, "price", e.target.value)} style={inp} placeholder="0.00" />
                </Field>
                <Field label="Special Price">
                  <input type="number" step="0.01" value={sp.specialPrice} onChange={e => updateP(sp.storeId, "specialPrice", e.target.value)} style={inp} placeholder="0.00" />
                </Field>
                <Field label="Cost Price" required>
                  <input type="number" step="0.01" value={sp.cost} onChange={e => updateP(sp.storeId, "cost", e.target.value)} style={inp} placeholder="0.00" />
                </Field>
                <Field label="Stock" required>
                  <input type="number" value={sp.stock} onChange={e => updateP(sp.storeId, "stock", e.target.value)} style={inp} placeholder="0" />
                </Field>
                <div style={{ gridColumn: "1/-1" }}>
                  <Field label="SKU" required>
                    <input value={sp.sku} onChange={e => updateP(sp.storeId, "sku", e.target.value)} style={inp} placeholder="e.g. PROD-001" />
                  </Field>
                </div>
              </div>
            )}
          </div>
        ))}

        {form.storePricing.length === 0 && (
          <div style={{ textAlign: "center", padding: 24, color: "#9CA3AF", fontSize: 13, border: "2px dashed #E2E8F0", borderRadius: 12 }}>
            Search and add a store above to set pricing
          </div>
        )}
      </div>
    </div>
  );
}
