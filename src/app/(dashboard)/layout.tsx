"use client";
import { useEffect, useState } from "react";
import logoPic from "../../../public/logo.png";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { isAuthenticated, removeToken } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { href: "/dashboard", icon: "🏠", label: "Home" },
  { href: "/orders", icon: "📦", label: "Orders" },
  { href: "/products", icon: "💊", label: "Products" },
  { href: "/more", icon: "⚙️", label: "More" },
];

const moreItems = [
  { href: "/more/wallet", icon: "💰", label: "Wallet" },
  { href: "/more/earnings", icon: "📈", label: "Earnings" },
  { href: "/more/stores", icon: "🏪", label: "Stores" },
  { href: "/more/categories", icon: "📋", label: "Categories" },
  { href: "/more/brands", icon: "🏷️", label: "Brands" },
  { href: "/more/tax-groups", icon: "🧾", label: "Tax Groups" },
  { href: "/more/delivery-zones", icon: "🗺️", label: "Delivery Zones" },
  { href: "/more/roles", icon: "👥", label: "Roles & Permissions" },
  { href: "/more/system-users", icon: "👤", label: "System Users" },
  { href: "/more/subscription", icon: "⭐", label: "Subscription" },
  { href: "/more/profile", icon: "✏️", label: "Edit Profile" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreExpanded, setMoreExpanded] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const userName = (user as any)?.name || "Seller";
  const userEmail = (user as any)?.email || "";

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <aside style={{
        width: "260px", background: "white", borderRight: "1px solid #E2E8F0",
        display: "flex", flexDirection: "column", flexShrink: 0,
        boxShadow: "2px 0 8px rgba(0,0,0,0.04)",
      }} className="desktop-sidebar">
        
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={logoPic.src} alt="Curefully Logo" style={{ width: "40px", height: "40px", objectFit: "contain", flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: "15px", color: "#0D1117" }}>Curefully</div>
              <div style={{ fontSize: "11px", color: "#718096" }}>Seller Dashboard</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, overflowY: "auto", padding: "10px 10px" }}>
          {navItems.slice(0, 3).map(item => (
            <Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "10px", marginBottom: "2px", background: isActive(item.href) ? "#EBF3FF" : "transparent", color: isActive(item.href) ? "#006BD5" : "#4A5568", fontWeight: isActive(item.href) ? 700 : 500, fontSize: "14px", transition: "all 0.2s" }}>
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <button onClick={() => setMoreExpanded(!moreExpanded)}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "10px", marginBottom: "2px", background: isActive("/more") ? "#EBF3FF" : "transparent", color: isActive("/more") ? "#006BD5" : "#4A5568", fontWeight: isActive("/more") ? 700 : 500, fontSize: "14px", border: "none", cursor: "pointer", transition: "all 0.2s" }}>
            <span style={{ fontSize: "18px" }}>⚙️</span>
            <span style={{ flex: 1, textAlign: "left" }}>More</span>
            <span style={{ fontSize: "12px", transition: "transform 0.2s", transform: moreExpanded ? "rotate(90deg)" : "none" }}>›</span>
          </button>

          {moreExpanded && (
            <div style={{ paddingLeft: "12px", borderLeft: "2px solid #E2E8F0", marginLeft: "20px", marginBottom: "4px" }}>
              {moreItems.map(item => (
                <Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "8px", marginBottom: "1px", background: pathname === item.href ? "#EBF3FF" : "transparent", color: pathname === item.href ? "#006BD5" : "#718096", fontWeight: pathname === item.href ? 600 : 400, fontSize: "13px", transition: "all 0.15s" }}>
                  <span style={{ fontSize: "15px" }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <Link href="/notifications" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "10px", marginBottom: "2px", background: isActive("/notifications") ? "#EBF3FF" : "transparent", color: isActive("/notifications") ? "#006BD5" : "#4A5568", fontWeight: isActive("/notifications") ? 700 : 500, fontSize: "14px", transition: "all 0.2s" }}>
            <span style={{ position: "relative", fontSize: "18px" }}>🔔</span>
            Notifications
          </Link>
        </nav>

        <div style={{ padding: "12px 16px", borderTop: "1px solid #E2E8F0" }}>
          <Link href="/more/profile" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", textDecoration: "none" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", color: "#4A5568", fontWeight: 700 }}>
              {userName[0]}
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#0D1117", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userName}</div>
              <div style={{ fontSize: "11px", color: "#718096", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userEmail}</div>
            </div>
          </Link>
          <button onClick={handleLogout} style={{ width: "100%", padding: "9px", background: "#FEE2E2", color: "#991B1B", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            🚪 Logout
          </button>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <header style={{ background: "white", borderBottom: "1px solid #E2E8F0", padding: "0 16px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#4A5568" }}>☰</button>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, fontSize: "15px", color: "#006BD5" }}>
              <img src={logoPic.src} alt="Curefully Logo" style={{ height: "24px", objectFit: "contain" }} />
              Curefully
            </div>
          </div>
          <Link href="/notifications" style={{ position: "relative", fontSize: "22px", textDecoration: "none" }}>🔔</Link>
        </header>

        {mobileMenuOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }}>
            <div style={{ flex: 1, background: "rgba(0,0,0,0.4)" }} onClick={() => setMobileMenuOpen(false)} />
            <div style={{ width: "260px", background: "white", height: "100%", overflowY: "auto", padding: "20px 10px", position: "absolute", left: 0 }}>
              {[...navItems, ...moreItems].map(item => (
                <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "10px", marginBottom: "2px", background: isActive(item.href) ? "#EBF3FF" : "transparent", color: isActive(item.href) ? "#006BD5" : "#4A5568", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
                  <span style={{ fontSize: "18px" }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <button onClick={handleLogout} style={{ width: "100%", padding: "10px", background: "#FEE2E2", color: "#991B1B", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer", marginTop: "16px" }}>🚪 Logout</button>
            </div>
          </div>
        )}

        <main style={{ flex: 1, overflowY: "auto", background: "#F7FAFC" }}>
          {children}
        </main>
      </div>

      <style>{`
        .desktop-sidebar { display: flex !important; }
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
        }
        @media (min-width: 769px) {
          header { display: none !important; }
        }
      `}</style>
    </div>
  );
}
