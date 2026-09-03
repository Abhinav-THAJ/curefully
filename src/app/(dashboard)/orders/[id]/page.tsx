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
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <Link href="/orders" style={{ width: "36px", height: "36px", background: "white", border: "1px solid #E2E8F0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", textDecoration: "none" }}>←</Link>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: 800 }}>{order.order_number}</h1>
          <p style={{ fontSize: "13px", color: "#718096", marginTop: "2px" }}>{order.created_at}</p>
        </div>
        <span className={"badge " + (statusColors[order.status] || "badge-received")} style={{ marginLeft: "auto" }}>{order.status?.replace(/_/g, " ")}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div style={{ background: "white", borderRadius: "14px", padding: "20px", border: "1px solid #E2E8F0", gridColumn: "1/-1" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Order Items</h3>
          {items.map((item: any) => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #F0F4F8" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: "14px" }}>{item.product_name}</div>
                <div style={{ fontSize: "12px", color: "#718096", marginTop: "2px" }}>{item.variant_name} x {item.quantity}</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: "16px" }}>${item.total}</div>
            </div>
          ))}
          <div style={{ marginTop: "16px", padding: "16px", background: "#F7FAFC", borderRadius: "10px" }}>
            {[["Subtotal", "$" + order.total], ["Delivery", "$" + order.delivery_charge], ["Tax", "$" + order.tax], ["Discount", "-$" + order.discount]].map(function(row) { return (
              <div key={row[0]} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px", color: "#718096" }}>
                <span>{row[0]}</span><span>{row[1]}</span>
              </div>
            ); })}
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "16px", paddingTop: "10px", borderTop: "1px solid #E2E8F0" }}>
              <span>Total Payable</span><span>${order.payable}</span>
            </div>
          </div>
        </div>
        <div style={{ background: "white", borderRadius: "14px", padding: "20px", border: "1px solid #E2E8F0" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Customer Details</h3>
          {[["Name", order.user_name], ["Email", order.user_email], ["Mobile", order.user_mobile], ["Address", order.address]].map(function(row) { return (
            <div key={row[0]} style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "11px", color: "#718096", marginBottom: "2px" }}>{row[0]}</div>
              <div style={{ fontSize: "14px", fontWeight: 500 }}>{row[1]}</div>
            </div>
          ); })}
        </div>
        <div style={{ background: "white", borderRadius: "14px", padding: "20px", border: "1px solid #E2E8F0" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Payment Info</h3>
          {[["Method", order.payment_method?.toUpperCase()], ["Status", order.payment_status], ["Store", order.store_name]].map(function(row) { return (
            <div key={row[0]} style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "11px", color: "#718096", marginBottom: "2px" }}>{row[0]}</div>
              <div style={{ fontSize: "14px", fontWeight: 500 }}>{row[1]}</div>
            </div>
          ); })}
        </div>
      </div>
    </div>
  );
}