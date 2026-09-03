"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { api } from "@/lib/api";
import { ApiRoutes } from "@/lib/apiRoutes";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"weekly" | "monthly" | "yearly">("weekly");

  useEffect(() => {
    api.get(ApiRoutes.dashboard).then(res => {
      setData(res?.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading dashboard...</div>;
  if (!data) return <div style={{ padding: "40px", textAlign: "center", color: "red" }}>Failed to load dashboard data.</div>;

  const summary = data.summary || {};
  const charts = data.chart || {};
  
  const currentChartData = charts[period]?.data?.map((d: any) => ({
    label: d.day || d.week || d.month,
    value: d.earnings
  })) || [];

  const statCards = [
    { label: summary.todays_revenue?.title || "Earnings", value: summary.todays_revenue?.amount || "$0", trend: summary.todays_revenue?.message || "", trendColor: "#1C6D2B", trendBg: "#D1FAE5", icon: "💵", iconBg: "#D1FAE5", href: "/more/earnings" },
    { label: summary.total_orders?.title || "Orders", value: summary.total_orders?.count || "0", trend: summary.total_orders?.message || "", trendColor: "#92400E", trendBg: "#FEF3C7", icon: "📦", iconBg: "#FEF3C7", href: "/orders" },
    { label: summary.total_products?.title || "Products", value: summary.total_products?.count || "0", trend: summary.total_products?.message || "", trendColor: "#991B1B", trendBg: "#FEE2E2", icon: "💊", iconBg: "#E1F5FE", href: "/products" },
    { label: summary.sales?.title || "Sales", value: summary.sales?.solds || "0", trend: summary.sales?.message || "", trendColor: "#1E40AF", trendBg: "#DBEAFE", icon: "🛒", iconBg: "#EDE9FE", href: "/orders" },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }} className="fade-in">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#006BD5", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "24px", fontWeight: 800 }}>
            {(user as any)?.name?.[0] || "S"}
          </div>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0D1117" }}>Welcome, {(user as any)?.name || "Seller"}</h1>
            <p style={{ fontSize: "13px", color: "#718096", marginTop: "2px" }}>Here is what's happening with your store today.</p>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {statCards.map(card => (
          <Link key={card.label} href={card.href} style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #E2E8F0", textDecoration: "none", display: "block" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
              <div style={{ width: "42px", height: "42px", background: card.iconBg, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{card.icon}</div>
            </div>
            <div style={{ fontSize: "26px", fontWeight: 800, color: "#0D1117", marginBottom: "4px" }}>{card.value}</div>
            <div style={{ fontSize: "13px", color: "#718096", marginBottom: "8px" }}>{card.label}</div>
            {card.trend && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 8px", background: card.trendBg, color: card.trendColor, borderRadius: "6px", fontSize: "12px", fontWeight: 600 }}>{card.trend}</span>}
          </Link>
        ))}
      </div>

      <div style={{ background: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #E2E8F0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700 }}>Earnings Overview</h2>
          <div style={{ display: "flex", background: "#F7FAFC", borderRadius: "8px", padding: "3px", gap: "2px" }}>
            {["weekly", "monthly", "yearly"].map(p => (
              <button key={p} onClick={() => setPeriod(p as any)} style={{ padding: "6px 14px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "13px", background: period === p ? "#006BD5" : "transparent", color: period === p ? "white" : "#718096", textTransform: "capitalize" }}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={currentChartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" />
            <XAxis dataKey="label" tick={{ fill: "#718096", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#718096", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: "10px", border: "1px solid #E2E8F0", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
            <Line type="monotone" dataKey="value" stroke="#006BD5" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "#006BD5" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
