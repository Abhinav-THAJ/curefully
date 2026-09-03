"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { ApiRoutes } from "@/lib/apiRoutes";

/* ─── Types ────────────────────────────────────── */
interface FormState {
  name: string; email: string; mobile: string;
  password: string; confirm_password: string;
  address: string; city: string; landmark: string;
  state: string; zipcode: string; country: string;
  latitude: string; longitude: string;
}

// Exact field names required by the live backend
interface DocState {
  retail_drug_license: File | null;
  wholesale_drug_license: File | null;
  pharmacist_certificate: File | null;
  id_proof: File | null;
  [key: string]: File | null;
}

/* ─── Constants ─────────────────────────────────── */
const STEPS = ["Personal Info", "Documents", "Business Address"];
const PRI = "#006BD5";
const ERR_COLOR = "#DC2626";
const SUCCESS_COLOR = "#16A34A";

const COUNTRY_CODES = [
  { code: "+91",  name: "🇮🇳 India (+91)" },
  { code: "+1",   name: "🇺🇸 USA (+1)" },
  { code: "+44",  name: "🇬🇧 UK (+44)" },
  { code: "+971", name: "🇦🇪 UAE (+971)" },
  { code: "+966", name: "🇸🇦 Saudi (+966)" },
  { code: "+61",  name: "🇦🇺 Australia (+61)" },
  { code: "+65",  name: "🇸🇬 Singapore (+65)" },
  { code: "+60",  name: "🇲🇾 Malaysia (+60)" },
  { code: "+880", name: "🇧🇩 Bangladesh (+880)" },
  { code: "+92",  name: "🇵🇰 Pakistan (+92)" },
];

/* ─── Shared styles ─────────────────────────────── */
const inp: React.CSSProperties = {
  width: "100%", padding: "12px 14px", border: "1.5px solid #E2E8F0",
  borderRadius: 10, fontSize: 14, outline: "none", background: "white",
  boxSizing: "border-box", transition: "border-color .2s", color: "#111827",
};
const lb: React.CSSProperties = {
  display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6,
};
const fieldWrap: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 0 };
const errText: React.CSSProperties = { fontSize: 11, color: ERR_COLOR, marginTop: 4 };
const hintText: React.CSSProperties = { fontSize: 11, color: "#9CA3AF", marginTop: 3 };

function Field({ label, required, error, hint, children }: {
  label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div style={fieldWrap}>
      <label style={lb}>
        {label}
        {required && <span style={{ color: ERR_COLOR, marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {error && <span style={errText}>{error}</span>}
      {!error && hint && <span style={hintText}>{hint}</span>}
    </div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  const { hasError, style, ...rest } = props;
  return (
    <input
      {...rest}
      style={{ ...inp, borderColor: hasError ? ERR_COLOR : "#E2E8F0", ...style }}
      onFocus={e => { e.target.style.borderColor = hasError ? ERR_COLOR : PRI; }}
      onBlur={e  => { e.target.style.borderColor = hasError ? ERR_COLOR : "#E2E8F0"; }}
    />
  );
}

function PasswordInput({ value, onChange, placeholder, hasError }: {
  value: string; onChange: (v: string) => void; placeholder?: string; hasError?: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ ...inp, paddingRight: 44, borderColor: hasError ? ERR_COLOR : "#E2E8F0" }}
        onFocus={e => { e.target.style.borderColor = hasError ? ERR_COLOR : PRI; }}
        onBlur={e  => { e.target.style.borderColor = hasError ? ERR_COLOR : "#E2E8F0"; }}
      />
      <button type="button" onClick={() => setShow(s => !s)}
        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: 16, padding: 2 }}>
        {show ? "🙈" : "👁"}
      </button>
    </div>
  );
}

function UploadArea({ label, required, file, fieldKey, onChange, onRemove }: {
  label: string; required?: boolean; file: File | null;
  fieldKey: string; onChange: (key: string, file: File | null) => void; onRemove: (key: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <label style={lb}>
        {label}
        {required && <span style={{ color: ERR_COLOR, marginLeft: 3 }}>*</span>}
      </label>
      {file ? (
        <div style={{ display: "flex", alignItems: "center", padding: "12px 14px", border: `2px solid ${SUCCESS_COLOR}`, borderRadius: 10, background: "#F0FDF4", gap: 10 }}>
          <span style={{ fontSize: 20 }}>📄</span>
          <span style={{ flex: 1, fontSize: 13, color: "#15803D", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
          <button type="button" onClick={() => onRemove(fieldKey)}
            style={{ background: "#FEE2E2", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", color: ERR_COLOR, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
            Remove
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          style={{ border: "2px dashed #CBD5E1", borderRadius: 10, padding: "20px 14px", textAlign: "center", cursor: "pointer", background: "#F8FAFC", transition: "border-color .2s" }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = PRI)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "#CBD5E1")}>
          <span style={{ fontSize: 24, display: "block", marginBottom: 6 }}>📎</span>
          <span style={{ color: "#6B7280", fontSize: 13 }}>+ Choose File</span>
          <span style={{ display: "block", color: "#9CA3AF", fontSize: 11, marginTop: 2 }}>JPG, PNG or PDF</span>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,application/pdf" style={{ display: "none" }}
        onChange={e => onChange(fieldKey, e.target.files?.[0] || null)} />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════ */
export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep]               = useState(1);
  const [loading, setLoading]         = useState(false);
  const [locLoading, setLocLoading]   = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [success, setSuccess]         = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  const [form, setForm] = useState<FormState>({
    name: "", email: "", mobile: "", password: "", confirm_password: "",
    address: "", city: "", landmark: "", state: "", zipcode: "", country: "India",
    latitude: "", longitude: "",
  });

  const [docs, setDocs] = useState<DocState>({
    retail_drug_license: null,
    wholesale_drug_license: null,
    pharmacist_certificate: null,
    id_proof: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "docs", string>>>({});

  const setField = (k: keyof FormState) => (v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }));
  };

  /* ── Geolocation ── */
  function autoFetchLocation() {
    if (!navigator.geolocation) { setGlobalError("Geolocation not supported."); return; }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        setForm(f => ({ ...f, latitude: pos.coords.latitude.toFixed(6), longitude: pos.coords.longitude.toFixed(6) }));
        setLocLoading(false);
      },
      () => { setGlobalError("Failed to get location. Enter manually."); setLocLoading(false); }
    );
  }

  /* ── Validation ── */
  function validateStep1(): boolean {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Seller name is required.";
    if (!form.mobile.trim()) e.mobile = "Mobile number is required.";
    else if (!/^\d{7,15}$/.test(form.mobile.replace(/\s/g, ""))) e.mobile = "Enter digits only (7–15 digits), no country code.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (!form.confirm_password) e.confirm_password = "Please confirm your password.";
    else if (form.password !== form.confirm_password) e.confirm_password = "Passwords do not match.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2(): boolean {
    const e: typeof errors = {};
    if (!docs.retail_drug_license) e.docs = "Retail Drug License is required.";
    else if (!docs.wholesale_drug_license) e.docs = "Wholesale Drug License is required.";
    else if (!docs.pharmacist_certificate) e.docs = "Pharmacist Certificate is required.";
    else if (!docs.id_proof) e.docs = "ID Proof is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep3(): boolean {
    const e: typeof errors = {};
    if (!form.address.trim()) e.address = "Address is required.";
    if (!form.city.trim()) e.city = "City is required.";
    if (!form.landmark.trim()) e.landmark = "Landmark is required.";
    if (!form.state.trim()) e.state = "State is required.";
    if (!form.zipcode.trim()) e.zipcode = "Zipcode is required.";
    if (!form.country.trim()) e.country = "Country is required.";
    if (!form.latitude.trim()) e.latitude = "Latitude is required. Use Auto Fetch or enter manually.";
    if (!form.longitude.trim()) e.longitude = "Longitude is required. Use Auto Fetch or enter manually.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function nextStep() {
    setGlobalError("");
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(s => s + 1);
  }

  /* ── Submit — mirrors Flutter auth_repo.dart signUp() exactly ── */
  async function handleSubmit() {
    if (!validateStep3()) return;
    setLoading(true); setGlobalError("");
    try {
      const fd = new FormData();

      // Text fields — exactly matching Flutter auth_repo.dart
      fd.append("name",                form.name.trim());
      fd.append("email",               form.email.trim());
      fd.append("mobile",              `${countryCode}${form.mobile.replace(/\s/g, "")}`);
      fd.append("password",            form.password);
      fd.append("user_id",             "");
      fd.append("address",             form.address.trim());
      fd.append("city",                form.city.trim());
      fd.append("state",               form.state.trim());
      fd.append("landmark",            form.landmark.trim());
      fd.append("zipcode",             form.zipcode.trim());
      fd.append("country",             form.country.trim());
      fd.append("latitude",            form.latitude);
      fd.append("longitude",           form.longitude);
      fd.append("verification_status", "approved");
      fd.append("visibility_status",   "visible");
      fd.append("fcm_token",           "");
      fd.append("device_type",         "web");

      // File fields — matching live backend requirements
      if (docs.retail_drug_license)    fd.append("retail_drug_license",    docs.retail_drug_license);
      if (docs.wholesale_drug_license) fd.append("wholesale_drug_license", docs.wholesale_drug_license);
      if (docs.pharmacist_certificate) fd.append("pharmacist_certificate", docs.pharmacist_certificate);
      if (docs.id_proof)               fd.append("id_proof",               docs.id_proof);

      await api.postMultipart(ApiRoutes.register, fd);
      setSuccess("Account created successfully! Redirecting to login…");
      setTimeout(() => router.push("/login"), 2500);
    } catch (err: unknown) {
      setGlobalError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /* ── Step Indicator ── */
  function StepIndicator() {
    return (
      <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: step > i + 1 ? SUCCESS_COLOR : step === i + 1 ? PRI : "#E2E8F0",
                color: step >= i + 1 ? "white" : "#718096",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, transition: "background .3s",
              }}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: step === i + 1 ? PRI : step > i + 1 ? SUCCESS_COLOR : "#718096", whiteSpace: "nowrap" }}>
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, background: step > i + 1 ? PRI : "#E2E8F0", margin: "0 6px", marginBottom: 18, transition: "background .3s" }} />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="fade-in">
      <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0D1117", marginBottom: 4 }}>Create Account</h2>
      <p style={{ color: "#718096", fontSize: 14, marginBottom: 24 }}>Join Curefully as a seller</p>

      <StepIndicator />

      {globalError && (
        <div style={{ padding: "10px 14px", background: "#FEE2E2", color: "#991B1B", borderRadius: 8, marginBottom: 16, fontSize: 13, display: "flex", gap: 8, alignItems: "flex-start" }}>
          <span>⚠️</span><span>{globalError}</span>
        </div>
      )}
      {success && (
        <div style={{ padding: "10px 14px", background: "#D1FAE5", color: "#065F46", borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
          ✓ {success}
        </div>
      )}

      {/* ══ STEP 1: Personal Info ══ */}
      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Field label="Seller Name" required error={errors.name}>
            <TextInput value={form.name} onChange={e => setField("name")(e.target.value)} placeholder="Enter your full name" hasError={!!errors.name} />
          </Field>

          <Field label="Mobile Number" required error={errors.mobile} hint="Enter digits only — country code selected separately">
            <div style={{ display: "flex", gap: 8 }}>
              <select value={countryCode} onChange={e => setCountryCode(e.target.value)}
                style={{ ...inp, width: "auto", minWidth: 160, flexShrink: 0, paddingRight: 8 }}
                onFocus={e => (e.target.style.borderColor = PRI)}
                onBlur={e  => (e.target.style.borderColor = "#E2E8F0")}>
                {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
              <TextInput
                type="tel"
                value={form.mobile}
                onChange={e => setField("mobile")(e.target.value.replace(/\D/g, ""))}
                placeholder="9876543210"
                hasError={!!errors.mobile}
                maxLength={15}
              />
            </div>
          </Field>

          <Field label="Email Address" required error={errors.email}>
            <TextInput type="email" value={form.email} onChange={e => setField("email")(e.target.value)} placeholder="you@example.com" hasError={!!errors.email} />
          </Field>

          <Field label="Password" required error={errors.password}>
            <PasswordInput value={form.password} onChange={setField("password")} placeholder="Minimum 8 characters" hasError={!!errors.password} />
          </Field>

          <Field label="Confirm Password" required error={errors.confirm_password}>
            <PasswordInput value={form.confirm_password} onChange={setField("confirm_password")} placeholder="Repeat your password" hasError={!!errors.confirm_password} />
          </Field>
        </div>
      )}

      {/* ══ STEP 2: Documents ══ */}
      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ padding: "12px 14px", background: "#EFF6FF", borderRadius: 10, fontSize: 13, color: "#1D4ED8", border: "1px solid #BFDBFE" }}>
            ℹ️ Upload your seller verification documents. These are sent to the backend for review.
          </div>
          {errors.docs && (
            <div style={{ padding: "10px 14px", background: "#FEE2E2", color: "#991B1B", borderRadius: 8, fontSize: 13 }}>⚠️ {errors.docs}</div>
          )}
          <UploadArea label="Retail Drug License" required fieldKey="retail_drug_license" file={docs.retail_drug_license}
            onChange={(k, f) => { setDocs(d => ({ ...d, [k]: f })); setErrors(e => ({ ...e, docs: undefined })); }}
            onRemove={k => setDocs(d => ({ ...d, [k]: null }))} />
          <UploadArea label="Wholesale Drug License" required fieldKey="wholesale_drug_license" file={docs.wholesale_drug_license}
            onChange={(k, f) => { setDocs(d => ({ ...d, [k]: f })); setErrors(e => ({ ...e, docs: undefined })); }}
            onRemove={k => setDocs(d => ({ ...d, [k]: null }))} />
          <UploadArea label="Pharmacist Certificate" required fieldKey="pharmacist_certificate" file={docs.pharmacist_certificate}
            onChange={(k, f) => { setDocs(d => ({ ...d, [k]: f })); setErrors(e => ({ ...e, docs: undefined })); }}
            onRemove={k => setDocs(d => ({ ...d, [k]: null }))} />
          <UploadArea label="ID Proof" required fieldKey="id_proof" file={docs.id_proof}
            onChange={(k, f) => { setDocs(d => ({ ...d, [k]: f })); setErrors(e => ({ ...e, docs: undefined })); }}
            onRemove={k => setDocs(d => ({ ...d, [k]: null }))} />
        </div>
      )}

      {/* ══ STEP 3: Business Address ══ */}
      {step === 3 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" onClick={autoFetchLocation} disabled={locLoading}
              style={{ flex: 1, padding: "11px 14px", border: `1.5px solid ${PRI}`, borderRadius: 10, background: locLoading ? "#F1F5F9" : "white", color: PRI, fontWeight: 700, fontSize: 13, cursor: locLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              {locLoading ? "Fetching…" : "📍 Auto Fetch Location"}
            </button>
          </div>
          {(form.latitude || form.longitude) && (
            <div style={{ padding: "8px 12px", background: "#F0FDF4", borderRadius: 8, fontSize: 12, color: "#15803D" }}>
              ✓ Location: {form.latitude}, {form.longitude}
            </div>
          )}

          <Field label="Address" required error={errors.address}>
            <TextInput value={form.address} onChange={e => setField("address")(e.target.value)} placeholder="e.g. 123, Main Road" hasError={!!errors.address} />
          </Field>
          <Field label="City" required error={errors.city}>
            <TextInput value={form.city} onChange={e => setField("city")(e.target.value)} placeholder="e.g. Kochi" hasError={!!errors.city} />
          </Field>
          <Field label="Landmark" required error={errors.landmark}>
            <TextInput value={form.landmark} onChange={e => setField("landmark")(e.target.value)} placeholder="e.g. Near Bus Stand" hasError={!!errors.landmark} />
          </Field>
          <Field label="State" required error={errors.state}>
            <TextInput value={form.state} onChange={e => setField("state")(e.target.value)} placeholder="e.g. Kerala" hasError={!!errors.state} />
          </Field>
          <Field label="Zipcode" required error={errors.zipcode}>
            <TextInput type="number" value={form.zipcode} onChange={e => setField("zipcode")(e.target.value)} placeholder="e.g. 682002" hasError={!!errors.zipcode} />
          </Field>
          <Field label="Country" required error={errors.country}>
            <TextInput value={form.country} onChange={e => setField("country")(e.target.value)} placeholder="e.g. India" hasError={!!errors.country} />
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Latitude" required error={errors.latitude}>
              <TextInput type="number" step="any" value={form.latitude} onChange={e => setField("latitude")(e.target.value)} placeholder="e.g. 10.8505" hasError={!!errors.latitude} />
            </Field>
            <Field label="Longitude" required error={errors.longitude}>
              <TextInput type="number" step="any" value={form.longitude} onChange={e => setField("longitude")(e.target.value)} placeholder="e.g. 76.2711" hasError={!!errors.longitude} />
            </Field>
          </div>
        </div>
      )}

      {/* ══ Navigation ══ */}
      <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
        {step > 1 && (
          <button type="button" onClick={() => { setGlobalError(""); setErrors({}); setStep(s => s - 1); }}
            style={{ flex: 1, padding: 14, background: "white", color: PRI, border: `2px solid ${PRI}`, borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            ← Previous
          </button>
        )}
        {step < 3 ? (
          <button type="button" onClick={nextStep}
            style={{ flex: 1, padding: 14, background: PRI, color: "white", border: "none", borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            Next →
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={loading}
            style={{ flex: 1, padding: 14, background: loading ? "#93C5FD" : PRI, color: "white", border: "none", borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Creating Account…" : "Register"}
          </button>
        )}
      </div>

      <p style={{ textAlign: "center", marginTop: 20, color: "#718096", fontSize: 14 }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: PRI, fontWeight: 700 }}>Sign In</Link>
      </p>
    </div>
  );
}
