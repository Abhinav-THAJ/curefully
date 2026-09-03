"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { ApiRoutes } from "@/lib/apiRoutes";

export default function EarningsPage() {
  const [unsettled, setUnsettled] = useState<Record<string, unknown>[]>([]);
  const [settled, setSettled]     = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");

  useEffect(() => {
    Promise.all([
      api.get(ApiRoutes.commissions),
      api.get(ApiRoutes.commissionHistory),
    ])
      .then(([unsRes, setRes]) => {
        setUnsettled(unsRes?.data?.data || unsRes?.data || []);
        setSettled(setRes?.data?.data   || setRes?.data  || []);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const getAmount = (e: any) => {
    let amt = e.amount;
    if (typeof amt === 'object' && amt !== null) {
      amt = amt.value || amt.amount || amt.total || 0;
    }
    return parseFloat(String(amt || e.earning || e.seller_earning || "0"));
  };

  const getOrderNumber = (e: any) => e.order_number || e.order?.order_number || e.order_id || "Unknown Order";
  const getCommission = (e: any) => e.commission_percentage || e.commission || e.admin_commission || 0;

  const settledTotal   = settled.reduce((s, e)   => s + getAmount(e), 0);
  const unsettledTotal = unsettled.reduce((s, e) => s + getAmount(e), 0);

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading earnings...</div>;

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }} className="fade-in">
      <h1 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "24px" }}>Earnings</h1>

      {error && (
        <div style={{ padding: "12px 16px", background: "#FEE2E2", color: "#991B1B", borderRadius: "10px", marginBottom: "16px", fontSize: "14px" }}>
          ⚠️ {error}
        </div>
      )}

      <div className="grid-2" style={{ gap: "16px", marginBottom: "24px" }}>
        <div style={{ background: "linear-gradient(135deg,#065F46,#1C6D2B)", borderRadius: "14px", padding: "20px", color: "white" }}>
          <p style={{ fontSize: "13px", opacity: 0.8, marginBottom: "6px" }}>Settled Earnings</p>
          <h2 style={{ fontSize: "28px", fontWeight: 800 }}>${settledTotal.toFixed(2)}</h2>
        </div>
        <div style={{ background: "linear-gradient(135deg,#92400E,#D97706)", borderRadius: "14px", padding: "20px", color: "white" }}>
          <p style={{ fontSize: "13px", opacity: 0.8, marginBottom: "6px" }}>Pending Earnings</p>
          <h2 style={{ fontSize: "28px", fontWeight: 800 }}>${unsettledTotal.toFixed(2)}</h2>
        </div>
      </div>

      <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px" }}>Pending (Unsettled)</h2>
      <div style={{ background: "white", borderRadius: "14px", overflow: "hidden", border: "1px solid #E2E8F0", marginBottom: "24px" }}>
        {unsettled.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#718096" }}>No pending earnings</div>
        ) : unsettled.map((e, i) => (
          <div key={String(e.id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: i < unsettled.length - 1 ? "1px solid #F7FAFC" : "none" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: "14px" }}>{String(getOrderNumber(e))}</div>
              <div style={{ fontSize: "12px", color: "#718096" }}>
                Commission: {String(getCommission(e))}% • {e.created_at ? new Date(String(e.created_at)).toLocaleDateString() : "N/A"}
              </div>
            </div>
            <span className="badge badge-pending">${getAmount(e).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px" }}>Settled</h2>
      <div style={{ background: "white", borderRadius: "14px", overflow: "hidden", border: "1px solid #E2E8F0" }}>
        {settled.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#718096" }}>No settled earnings yet</div>
        ) : settled.map((e, i) => (
          <div key={String(e.id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: i < settled.length - 1 ? "1px solid #F7FAFC" : "none" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: "14px" }}>{String(getOrderNumber(e))}</div>
              <div style={{ fontSize: "12px", color: "#718096" }}>
                Commission: {String(getCommission(e))}% • {e.created_at ? new Date(String(e.created_at)).toLocaleDateString() : "N/A"}
              </div>
            </div>
            <span className="badge badge-approved">${getAmount(e).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}