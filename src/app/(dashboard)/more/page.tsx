"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeToken } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const sections = [
  {
    title: "Store Management",
    items: [
      { href: "/products", icon: "💊", label: "Manage Products", subtitle: "Add, edit, and organize products" },
      { href: "/orders", icon: "📦", label: "Orders", subtitle: "Manage and track customer orders" },
      { href: "/more/stores", icon: "🏪", label: "Stores", subtitle: "Manage multiple stores" },
      { href: "/more/categories", icon: "📋", label: "Categories", subtitle: "Manage product categories" },
      { href: "/more/brands", icon: "🏷️", label: "Brands", subtitle: "Add and manage brands" },
      { href: "/more/tax-groups", icon: "🧾", label: "Tax Groups", subtitle: "View tax groups" },
    ],
  },
  {
    title: "Finance",
    items: [
      { href: "/more/wallet", icon: "💰", label: "Wallet", subtitle: "Wallet balance & transactions" },
      { href: "/more/earnings", icon: "📈", label: "Earnings", subtitle: "View commissions & settlements" },
      { href: "/more/delivery-zones", icon: "🗺️", label: "Delivery Zones", subtitle: "Manage delivery zones" },
      { href: "/more/subscription", icon: "⭐", label: "Subscription Plans", subtitle: "View subscription plans" },
    ],
  },
  {
    title: "Account & Users",
    items: [
      { href: "/more/roles", icon: "👥", label: "Roles & Permissions", subtitle: "User access control" },
      { href: "/more/system-users", icon: "👤", label: "System Users", subtitle: "Team members" },
      { href: "/more/profile", icon: "✏️", label: "Edit Profile", subtitle: "Update your profile" },
    ],
  },
];

export default function MorePage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  const userName = (user as any)?.name || "Seller";
  const userEmail = (user as any)?.email || "";

  return (
    <div style={{ background: "#F7FAFC", minHeight: "100%" }}>
      <div style={{ background: "linear-gradient(135deg,#006BD5,#004fa3)", padding: "28px 24px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#E2E8F0", border: "3px solid rgba(255,255,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4A5568", fontSize: "24px", fontWeight: 700 }}>
              {userName[0]}
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "16px", height: "16px", background: "#22C55E", border: "2px solid white", borderRadius: "50%" }} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: "white", fontSize: "18px", fontWeight: 800 }}>{userName}</h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", marginTop: "2px" }}>{userEmail}</p>
          </div>
          <Link href="/more/profile" style={{ color: "rgba(255,255,255,0.9)", fontSize: "22px", textDecoration: "none" }}>✏️</Link>
        </div>
      </div>

      <div style={{ padding: "0 24px 24px", marginTop: "-16px", maxWidth: "900px", margin: "-16px auto 0" }}>
        {sections.map(section => (
          <div key={section.title} style={{ marginBottom: "16px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#718096", textTransform: "uppercase", letterSpacing: "0.6px", margin: "0 4px 10px" }}>{section.title}</h3>
            <div style={{ background: "white", borderRadius: "14px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #E2E8F0" }}>
              {section.items.map((item, idx) => (
                <Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderBottom: idx < section.items.length - 1 ? "1px solid #F7FAFC" : "none", textDecoration: "none", color: "inherit", transition: "background 0.15s" }}>
                  <div style={{ width: "38px", height: "38px", background: "#F7FAFC", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D1117" }}>{item.label}</div>
                    <div style={{ fontSize: "12px", color: "#718096", marginTop: "1px" }}>{item.subtitle}</div>
                  </div>
                  <div style={{ color: "#CBD5E0", fontSize: "18px" }}>›</div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background: "white", borderRadius: "14px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #E2E8F0", marginTop: "16px" }}>
          <button onClick={handleLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
            <div style={{ width: "38px", height: "38px", background: "#FEE2E2", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🚪</div>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#991B1B" }}>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
