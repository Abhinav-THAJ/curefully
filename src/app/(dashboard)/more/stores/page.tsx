"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { ApiRoutes } from "@/lib/apiRoutes";
import { useRouter } from "next/navigation";

export default function GenericPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(ApiRoutes.stores).then(res => {
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0D1117" }}>My Stores</h1>
        <button onClick={() => router.push('/more/stores/add')} style={{ padding: "10px 16px", background: "#006BD5", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "14px", boxShadow: "0 4px 12px rgba(0,107,213,0.2)" }}>
          + Add New Store
        </button>
      </div>
      
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
        {data.length === 0 ? <p style={{ color: "#718096" }}>No stores found.</p> : data.map((item: any) => {
          const isOpen = typeof item.status === 'object' ? item.status?.is_open : false;
          
          return (
            <div key={item.id || Math.random()} style={{ background: "white", borderRadius: "16px", border: "1px solid #E2E8F0", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 8px rgba(0,0,0,0.02)", transition: "transform 0.2s" }} className="store-card">
              <div style={{ height: "120px", width: "100%", background: "#F7FAFC", backgroundImage: `url(${item.banner})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                <div style={{ position: "absolute", top: "12px", right: "12px", background: isOpen ? "#10B981" : "#EF4444", color: "white", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                  {isOpen ? "OPEN" : "CLOSED"}
                </div>
              </div>
              <div style={{ padding: "20px", position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
                {item.logo && (
                  <div style={{ position: "absolute", top: "-30px", left: "20px", width: "60px", height: "60px", borderRadius: "12px", background: "white", padding: "4px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                    <div style={{ width: "100%", height: "100%", borderRadius: "8px", backgroundImage: `url(${item.logo})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  </div>
                )}
                
                <div style={{ marginTop: item.logo ? "24px" : "0" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0D1117", marginBottom: "4px" }}>{item.name || item.title || "Store Name"}</h3>
                  <p style={{ fontSize: "13px", color: "#718096", marginBottom: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {item.description || "No description provided."}
                  </p>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#4A5568" }}>
                      <span>📍</span>
                      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.city}, {item.state}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#4A5568" }}>
                      <span>⭐</span>
                      <span>{item.avg_store_rating} ({item.total_store_feedback} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginTop: "auto", display: "flex", gap: "12px", borderTop: "1px solid #F0F4F8", paddingTop: "16px" }}>
                  <button onClick={() => router.push(`/more/stores/edit/${item.id}`)} style={{ flex: 1, padding: "10px", background: "#F7FAFC", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "13px", fontWeight: 600, color: "#4A5568", cursor: "pointer" }}>Edit</button>
                  <button onClick={() => { localStorage.setItem('active_store_id', item.id.toString()); router.push("/dashboard"); }} style={{ flex: 1, padding: "10px", background: "#E0F2FE", border: "1px solid #BAE6FD", borderRadius: "8px", fontSize: "13px", fontWeight: 600, color: "#0284C7", cursor: "pointer" }}>Manage</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
