"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { ApiRoutes } from "@/lib/apiRoutes";

const statusColors: Record<string, string> = {
  received: "badge-received", processed: "badge-processed", preparing: "badge-preparing",
  ready_for_pickup: "badge-ready_for_pickup", delivered: "badge-delivered", cancelled: "badge-cancelled",
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDispatched, setIsDispatched] = useState(false);
  const [showDispatchMessage, setShowDispatchMessage] = useState(false);

  useEffect(() => {
    api.get(`${ApiRoutes.orders}/${id}`).then(res => {
      setOrder(res?.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading order...</div>;

  if (!order) return (
    <div style={{ padding: "60px 24px", textAlign: "center" }}>
      <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔍</div>
      <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "8px" }}>Order not found</h2>
      <Link href="/orders" style={{ color: "#006BD5", fontWeight: 600 }}>Back to Orders</Link>
    </div>
  );

  const items = order.items || [];

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }} className="fade-in">
      {showDispatchMessage && (
        <div style={{
          position: "fixed",
          top: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#10B981",
          color: "white",
          padding: "12px 24px",
          borderRadius: "8px",
          fontWeight: 600,
          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
          zIndex: 1000,
        }}>
          Successfully dispatched
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <Link href="/orders" style={{ width: "36px", height: "36px", background: "white", border: "1px solid #E2E8F0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", textDecoration: "none" }}>←</Link>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: 800 }}>{order.uuid || order.order_number || "N/A"}</h1>
          <p style={{ fontSize: "13px", color: "#718096", marginTop: "2px" }}>{order.created_at}</p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "12px" }}>
          <span className={"badge " + (statusColors[order.status] || "badge-received")}>{order.status?.replace(/_/g, " ")}</span>
          <button 
            onClick={() => {
              setIsDispatched(true);
              setShowDispatchMessage(true);
              setTimeout(() => setShowDispatchMessage(false), 3000);
            }} 
            disabled={isDispatched}
            style={{
              padding: "8px 16px",
              background: isDispatched ? "#E2E8F0" : "#3B82F6",
              color: isDispatched ? "#718096" : "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: isDispatched ? "not-allowed" : "pointer",
              fontSize: "14px",
              transition: "all 0.2s"
            }}
          >
            {isDispatched ? "Dispatched" : "Dispatch"}
          </button>
        </div>
      </div>

      <div className="grid-2" style={{ gap: "16px", paddingBottom: "80px" }}>
        
        {/* Section 1: Order Summary */}
        <div style={{ background: "white", borderRadius: "14px", padding: "20px", border: "1px solid #E2E8F0" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", borderBottom: "1px solid #F0F4F8", paddingBottom: "12px" }}>Order Summary</h3>
          {[
            ["Order Number:", order.uuid || order.order_number || "N/A", false], 
            ["Order Date:", order.created_at || "N/A", false], 
            ["Status:", order.status || "pending", true], 
            ["Total Price:", `$${order.total_price || order.payable || order.total || "0.00"}`, false], 
            ["Payment Method:", (order.payment_method || "N/A").toUpperCase().replace(/_/g, ' '), false], 
            ["Payment Status:", order.payment_status || "pending", true],
            ["Delivery Type:", order.delivery_type?.toLowerCase() === 'pickup' ? 'Pickup' : (order.is_rush_order ? 'Rush Delivery' : 'Standard Delivery'), true]
          ].map(function(row) { 
            const isBadge = row[2];
            let valContent: any = row[1];
            if (isBadge) {
              const strVal = String(row[1]).toLowerCase();
              let badgeClass = "badge-received";
              if (strVal.includes('pending') || strVal.includes('awaiting')) badgeClass = "badge-pending";
              else if (strVal.includes('accepted') || strVal.includes('paid') || strVal.includes('completed') || strVal.includes('delivered')) badgeClass = "badge-paid";
              else if (strVal.includes('rejected') || strVal.includes('cancelled') || strVal.includes('failed')) badgeClass = "badge-cancelled";
              
              valContent = <span className={`badge ${badgeClass}`}>{String(row[1]).toUpperCase().replace(/_/g, ' ')}</span>;
            }
            return (
              <div key={String(row[0])} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ fontSize: "14px", color: "#718096", fontWeight: 500 }}>{row[0]}</div>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>{valContent}</div>
              </div>
            ); 
          })}
          {order.order_note && (
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", paddingTop: "12px", borderTop: "1px dashed #E2E8F0" }}>
              <div style={{ fontSize: "14px", color: "#718096", fontWeight: 500 }}>Order Note:</div>
              <div style={{ fontSize: "14px", fontWeight: 600 }}>{order.order_note}</div>
            </div>
          )}
        </div>

        {/* Section 2: Order Items */}
        <div style={{ background: "white", borderRadius: "14px", padding: "20px", border: "1px solid #E2E8F0" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", borderBottom: "1px solid #F0F4F8", paddingBottom: "12px" }}>Order Items ({items.length})</h3>
          {items.map((item: any, index: number) => {
            const itemName = item.product?.title || item.product_name || "Unknown Product";
            const itemVariant = item.variant?.title || item.variant_name || "";
            const itemTotal = item.sub_total || item.total || "0.00";
            return (
              <div key={item.id || item.product_id || index} style={{ padding: "12px 0", borderBottom: "1px solid #F0F4F8" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "14px" }}>{itemName}</div>
                    <div style={{ fontSize: "13px", color: "#4A5568", marginTop: "4px" }}>Qty: {item.quantity} &nbsp;&nbsp; <span style={{ color: "#006BD5", fontWeight: 700 }}>${itemTotal}</span></div>
                    {itemVariant && <div style={{ fontSize: "12px", color: "#718096", marginTop: "4px" }}>Variant: {itemVariant}</div>}
                    {item.addons && item.addons.length > 0 && (
                      <div style={{ marginTop: "6px" }}>
                        <div style={{ fontSize: "12px", fontWeight: 600, color: "#718096" }}>Add-Ons:</div>
                        {item.addons.map((addon: any, idx: number) => (
                          <div key={idx} style={{ fontSize: "11px", color: "#718096" }}>
                            {addon.group?.title || "Add-On"}: {addon.item?.title || ""} - ${addon.price}
                          </div>
                        ))}
                      </div>
                    )}
                    {item.orderItem?.status && (
                       <span style={{ display: "inline-block", marginTop: "8px", fontSize: "10px", padding: "2px 6px", background: "#E2E8F0", borderRadius: "4px", fontWeight: 700 }}>
                         {item.orderItem.status.toUpperCase()}
                       </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section 3: Customer Information */}
        <div style={{ background: "white", borderRadius: "14px", padding: "20px", border: "1px solid #E2E8F0" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", borderBottom: "1px solid #F0F4F8", paddingBottom: "12px" }}>Customer Information</h3>
          {[
            ["Customer Name:", order.billing_name || order.shipping_name || order.user_name || "N/A"], 
            ["Phone:", order.billing_phone || order.shipping_phone || order.user_mobile || "N/A"], 
            ["Email:", order.email || order.user_email || "N/A"]
          ].map(function(row) { return (
            <div key={row[0]} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <div style={{ fontSize: "14px", color: "#718096", fontWeight: 500 }}>{row[0]}</div>
              <div style={{ fontSize: "14px", fontWeight: 600 }}>{row[1]}</div>
            </div>
          ); })}
        </div>

        {/* Section 4: Shipping Address */}
        <div style={{ background: "white", borderRadius: "14px", padding: "20px", border: "1px solid #E2E8F0" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", borderBottom: "1px solid #F0F4F8", paddingBottom: "12px" }}>Shipping Address</h3>
          <div style={{ fontSize: "14px", lineHeight: "1.6", color: "#0D1117" }}>
            <div style={{ fontWeight: 600 }}>{order.shipping_name || order.user_name || "N/A"}</div>
            <div>{order.shipping_address_1 || order.address || "No Address Provided"}</div>
            <div>{[order.shipping_city, order.shipping_state, order.shipping_zip].filter(Boolean).join(", ")}</div>
            <div>{order.shipping_country || "India"}</div>
          </div>
        </div>
      </div>
      
      {/* Bottom Action Bar */}
      {order.status === 'pending' || order.status === 'awaiting_store_response' ? (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "white", padding: "16px 24px", boxShadow: "0 -4px 12px rgba(0,0,0,0.05)", borderTop: "1px solid #E2E8F0", display: "flex", gap: "16px", zIndex: 100 }}>
          <button onClick={() => api.post(`${ApiRoutes.orders}/${order.id}/reject`, {}).then(() => window.location.reload())} style={{ flex: 1, padding: "14px", background: "white", border: "1.5px solid #EF4444", color: "#EF4444", borderRadius: "12px", fontWeight: 700, fontSize: "15px", cursor: "pointer" }}>Reject Order</button>
          <button onClick={() => api.post(`${ApiRoutes.orders}/${order.id}/accept`, {}).then(() => window.location.reload())} style={{ flex: 1, padding: "14px", background: "#10B981", border: "none", color: "white", borderRadius: "12px", fontWeight: 700, fontSize: "15px", cursor: "pointer", boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)" }}>Accept Order</button>
        </div>
      ) : order.status === 'accepted' ? (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "white", padding: "16px 24px", boxShadow: "0 -4px 12px rgba(0,0,0,0.05)", borderTop: "1px solid #E2E8F0", display: "flex", gap: "16px", zIndex: 100 }}>
          <button onClick={() => api.post(`${ApiRoutes.orders}/${order.id}/preparing`, {}).then(() => window.location.reload())} style={{ width: "100%", padding: "14px", background: "#3B82F6", border: "none", color: "white", borderRadius: "12px", fontWeight: 700, fontSize: "15px", cursor: "pointer", boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)" }}>Mark as Preparing</button>
        </div>
      ) : null}
    </div>
  );
}