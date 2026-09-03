"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { ApiRoutes } from "@/lib/apiRoutes";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    api.get(ApiRoutes.products).then(res => {
      setProducts(res?.data?.data || []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category_name).filter(Boolean)))];

  const filtered = products.filter(p => {
    const matchSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.brand_name?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || p.category_name === category;
    return matchSearch && matchCat;
  });

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading products...</div>;

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }} className="fade-in">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800 }}>Products</h1>
          <p style={{ color: "#718096", fontSize: "13px", marginTop: "2px" }}>{filtered.length} products</p>
        </div>
        <Link href="/products/add" style={{ background: "#006BD5", color: "white", padding: "10px 20px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
          + Add Product
        </Link>
      </div>

      <div style={{ background: "white", borderRadius: "14px", padding: "16px", marginBottom: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #E2E8F0", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." style={{ flex: "1 1 200px", padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "14px", outline: "none" }} />
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "14px", background: "white", outline: "none" }}>
          {categories.map((c: any) => <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {filtered.map(product => {
          const defaultVariant = product.variants?.[0] || {};
          return (
            <div key={product.id} style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #E2E8F0" }}>
              <div style={{ position: "relative" }}>
                <img src={product.main_image || "/placeholder.jpg"} alt={product.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                <span className={"badge " + (product.status === "active" ? "badge-active" : "badge-inactive")} style={{ position: "absolute", top: "10px", right: "10px" }}>{product.status}</span>
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ fontSize: "12px", color: "#718096", marginBottom: "4px" }}>{product.category_name} • {product.brand_name}</div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "6px", lineHeight: 1.3 }}>{product.title}</h3>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px" }}>
                  <div>
                    <span style={{ fontSize: "18px", fontWeight: 800, color: "#006BD5" }}>${defaultVariant.special_price || product.price}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: defaultVariant.stock < 20 ? "#991B1B" : "#065F46", fontWeight: 600 }}>
                    {defaultVariant.stock || 0} in stock
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
