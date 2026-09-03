import type { Metadata } from "next";
import logoPic from "../../../public/logo.png";

export const metadata: Metadata = {
  title: "Curefully Seller - Sign In",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-layout-container" style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      background: "#0D1117",
    }}>
      {/* Left Panel - Branding */}
      <div className="auth-left-panel" style={{
        background: "linear-gradient(135deg, #006BD5 0%, #004fa3 50%, #003680 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 48px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background circles */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        
        <div style={{ textAlign: "center", zIndex: 1, maxWidth: "380px" }}>
          {/* Logo */}
          <img 
            src={logoPic.src} 
            alt="Curefully Logo"
            style={{
              width: "100px", height: "100px", objectFit: "contain",
              margin: "0 auto 24px", 
              filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.2))",
            }} 
          />
          <h1 style={{ color: "white", fontSize: "32px", fontWeight: 800, marginBottom: "12px", letterSpacing: "-0.5px" }}>
            Curefully Seller
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "16px", lineHeight: 1.7, marginBottom: "48px" }}>
            Your complete pharmacy management platform. Manage orders, products, earnings, and grow your business.
          </p>
          {/* Feature bullets */}
          {["Real-time order management", "Inventory & product control", "Earnings & wallet dashboard", "Multi-store support"].map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ width: "20px", height: "20px", background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", flexShrink: 0 }}>✓</div>
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="auth-right-panel" style={{
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 48px",
        overflowY: "auto",
      }}>
        <div className="auth-form-container" style={{ width: "100%", maxWidth: "420px" }}>
          {children}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-layout-container {
            grid-template-columns: 1fr !important;
          }
          .auth-left-panel {
            display: none !important;
          }
          .auth-right-panel {
            padding: 24px !important;
          }
          .auth-form-container {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
