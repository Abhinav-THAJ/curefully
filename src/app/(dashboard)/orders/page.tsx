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
      const ordersData = Array.isArray(res?.data) ? res.data : (res?.data?.data || []);
      setOrders(ordersData);
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
        ) : filtered.map((order, index) => {
          const detailId = order.order?.id || order.id || order.order_id || index;
          const uniqueKey = order.order_item_id || order.id || order.order_id || `order-${index}`;
          const status = (order.order?.delivery_type?.toLowerCase() === 'pickup' ? order.order?.status : order.status) || "pending";
          const price = order.subtotal?.formatted || `$${order.payable || order.total || '0.00'}`;
          const productTitle = order.product?.title || order.user_mobile || "Multiple Items";
          const deliveryType = order.order?.delivery_type?.toLowerCase() === 'pickup' ? 'Pickup' : (order.order?.is_rush_order ? 'Rush Delivery' : 'Standard Delivery');
          const imageUrl = order.order?.image || order.image || order.product?.main_image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=150";
          const qty = order.quantity || 1;
          const isPending = status === 'pending' || status === 'awaiting_store_response';
          
          return (
            <div key={uniqueKey} style={{ background: "white", borderRadius: "14px", padding: "18px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #E2E8F0", marginBottom: "16px" }}>
              <Link href={`/orders/${detailId}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ display: "flex", gap: "16px" }}>
                  <img src={imageUrl} alt="Order item" style={{ width: "64px", height: "64px", borderRadius: "8px", objectFit: "cover", backgroundColor: "#F7FAFC" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: "#0D1117" }}>{productTitle}</h3>
                      <span className={`badge ${statusColors[status] || "badge-received"}`}>{status.replace(/_/g, " ").toUpperCase()}</span>
                    </div>
                    <div style={{ fontSize: "13px", color: "#4A5568", marginTop: "4px" }}>Qty: {qty} × {price}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                      <div style={{ fontSize: "13px", color: "#718096" }}>
                        Delivery Type: <span style={{ color: deliveryType === 'Pickup' ? '#059669' : '#D97706', fontWeight: 600 }}>{deliveryType}</span>
                      </div>
                      <div style={{ fontSize: "12px", color: "#718096" }}>{order.created_at ? new Date(order.created_at).toLocaleDateString() : ""}</div>
                    </div>
                  </div>
                </div>
              </Link>
              
              {isPending && (
                <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                  <button 
                    onClick={() => {
                       api.post(`${ApiRoutes.orders}/${order.order_item_id || order.id}/reject`, {}).then(() => window.location.reload());
                    }} 
                    style={{ flex: 1, padding: "12px", background: "white", border: "1.5px solid #EF4444", color: "#EF4444", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }}
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => {
                       api.post(`${ApiRoutes.orders}/${order.order_item_id || order.id}/accept`, {}).then(() => window.location.reload());
                    }} 
                    style={{ flex: 1, padding: "12px", background: "#10B981", border: "none", color: "white", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }}
                  >
                    Accept
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
