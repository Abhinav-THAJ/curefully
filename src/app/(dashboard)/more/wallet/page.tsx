"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { ApiRoutes } from "@/lib/apiRoutes";

export default function WalletPage() {
  const [tab, setTab] = useState<"transactions" | "withdrawals">("transactions");
  const [wallet, setWallet] = useState<any>(null);
  const [txs, setTxs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get(ApiRoutes.wallet),
      api.get(ApiRoutes.transactions)
    ]).then(([wRes, tRes]) => {
      setWallet(wRes?.data);
      setTxs(tRes?.data?.data || []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading wallet...</div>;

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }} className="fade-in">
      <h1 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "24px" }}>Wallet</h1>

      <div style={{ background: "linear-gradient(135deg,#006BD5,#004fa3)", borderRadius: "20px", padding: "28px 24px", marginBottom: "24px", position: "relative", overflow: "hidden" }}>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", marginBottom: "8px" }}>Available Balance</p>
        <h2 style={{ color: "white", fontSize: "40px", fontWeight: 800, marginBottom: "20px" }}>${wallet?.balance || "0.00"}</h2>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ flex: 1, padding: "12px", background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
            💸 Withdraw
          </button>
        </div>
      </div>

      <div style={{ display: "flex", background: "white", borderRadius: "12px", padding: "4px", marginBottom: "20px", border: "1px solid #E2E8F0" }}>
        <button onClick={() => setTab("transactions")} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", fontWeight: 600, fontSize: "14px", cursor: "pointer", background: tab === "transactions" ? "#006BD5" : "transparent", color: tab === "transactions" ? "white" : "#718096" }}>Transactions</button>
      </div>

      <div style={{ background: "white", borderRadius: "14px", overflow: "hidden", border: "1px solid #E2E8F0" }}>
        {txs.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#718096" }}>No transactions found</div>
        ) : txs.map((tx, i) => (
          <div key={tx.id} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px", borderBottom: i < txs.length - 1 ? "1px solid #F7FAFC" : "none" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: tx.type === "credit" ? "#D1FAE5" : "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
              {tx.type === "credit" ? "⬇️" : "⬆️"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "14px", fontWeight: 600 }}>{tx.message || tx.description}</div>
              <div style={{ fontSize: "12px", color: "#718096", marginTop: "2px" }}>{tx.created_at}</div>
            </div>
            <div style={{ fontWeight: 800, fontSize: "16px", color: tx.type === "credit" ? "#065F46" : "#991B1B" }}>
              {tx.type === "credit" ? "+" : "-"}${tx.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
