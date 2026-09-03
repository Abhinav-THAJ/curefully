"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { ApiRoutes } from "@/lib/apiRoutes";

const statusColors: Record<string, string> = {
  received: "badge-received", processed: "badge-processed", preparing: "badge-preparing",
  ready_for_pickup: "badge-ready_for_pickup", delivered: "badge-delivered", cancelled: "badge-cancelled",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    api.get(ApiRoutes.orders).then(res => {
      setOrders(res?.data?.data || []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const filtered = orders.filter(o => {
    const matchSearch = !search || o.order_number?.toLowerCase().includes(search.toLowerCase()) || o.user_name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading orders...</div>;

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }} className="fade-in">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800 }}>Orders</h1>
          <p style={{ color: "#718096", fontSize: "13px", marginTop: "2px" }}>{filtered.length} orders found</p>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: "14px", padding: "16px", marginBottom: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #E2E8F0", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search orders..." style={{ flex: "1 1 200px", padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "14px", outline: "none" }} />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "14px", outline: "none", background: "white", cursor: "pointer" }}>
          <option value="all">All Status</option>
          <option value="received">Received</option>
          <option value="processed">Processed</option>
          <option value="preparing">Preparing</option>
          <option value="ready_for_pickup">Ready for Pickup</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div style={{ display: "grid", gap: "12px" }}>
        {filtered.length === 0 ? (
          <div style={{ background: "white", borderRadius: "14px", padding: "60px 20px", textAlign: "center", border: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>No orders found</h3>
            <p style={{ color: "#718096", fontSize: "14px" }}>Try adjusting your search or filters.</p>
          </div>
        ) : filtered.map(order => (
          <Link key={order.id} href={`/orders/${order.id}`} style={{ background: "white", borderRadius: "14px", padding: "18px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #E2E8F0", textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 800, fontSize: "15px", color: "#006BD5" }}>{order.order_number}</span>
                  <span className={`badge ${statusColors[order.status] || "badge-received"}`}>{order.status?.replace(/_/g, " ")}</span>
                  <span className={`badge ${order.payment_status === "paid" ? "badge-paid" : "badge-pending"}`}>{order.payment_status}</span>
                </div>
                <div style={{ fontSize: "14px", color: "#4A5568", marginBottom: "6px" }}>👤 {order.user_name} • {order.user_mobile}</div>
                <div style={{ fontSize: "13px", color: "#718096", marginBottom: "6px" }}>📍 {order.address}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "#0D1117" }}>${order.payable}</div>
                <div style={{ fontSize: "12px", color: "#718096", marginTop: "4px" }}>{order.created_at}</div>
                <div style={{ fontSize: "12px", color: "#718096", marginTop: "2px" }}>via {order.payment_method?.toUpperCase()}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
