"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { ApiRoutes } from "@/lib/apiRoutes";

export default function GenericPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(ApiRoutes.roles).then(res => {
      setData(res?.data?.data || res?.data || []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }} className="fade-in">
      <h1 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "24px" }}>$$Roles & Permissions$$</h1>
      <div style={{ display: "grid", gap: "12px" }}>
        {data.length === 0 ? <p style={{ color: "#718096" }}>No data found.</p> : data.map((item: any) => (
          <div key={item.id || Math.random()} style={{ background: "white", borderRadius: "14px", padding: "16px", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 700 }}>{item.title || item.name || item.message || "Item"}</h3>
            <span style={{ fontSize: "12px", color: "#718096" }}>{item.status || item.created_at || ""}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
