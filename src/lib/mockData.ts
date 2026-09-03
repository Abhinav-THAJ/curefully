export const mockProfile = {
  id: 1, name: "Alex Mercer", email: "alex.mercer@merchant.com", mobile: "+1 (555) 019-2834",
  wallet_balance: "4,850.75", referral_code: "ALEXM99", reward_points: 1250,
  profile_image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
};
export const mockStore = {
  id: 1, name: "Evergreen Pharmacy & Wellness", product_count: 24,
  address: "742 Evergreen Terrace, Sector 4", city: "San Francisco", state: "California", zipcode: "94102",
  timing: "Monday - Sunday: 07:00 AM - 09:00 PM",
  logo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=150",
  avg_store_rating: "4.8", total_store_feedback: 45, status: { is_open: true, status: "online" },
  promotional_text: "Stay healthy! 15% Off all vitamins this week.",
};
export const mockCategories = [
  { id: 1, title: "Prescription Drugs", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=150", status: "active", product_count: 12 },
  { id: 2, title: "OTC Medicines", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=150", status: "active", product_count: 18 },
  { id: 3, title: "Vitamins & Supplements", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=150", status: "active", product_count: 15 },
  { id: 4, title: "First Aid & Devices", image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=150", status: "active", product_count: 10 },
  { id: 5, title: "Personal Care", image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=150", status: "active", product_count: 14 },
];
export const mockBrands = [
  { id: 1, title: "Pfizer", logo: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=100", status: "active", total_products: 12 },
  { id: 2, title: "GSK Healthcare", logo: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=100", status: "active", total_products: 18 },
  { id: 3, title: "Bayer AG", logo: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=100", status: "active", total_products: 10 },
  { id: 4, title: "Nature's Bounty", logo: "https://images.unsplash.com/photo-1611070973770-b1a672610042?auto=format&fit=crop&q=80&w=100", status: "active", total_products: 15 },
];
export const mockProducts = [
  { id: 1, title: "Amoxicillin 500mg Capsules", category_name: "Prescription Drugs", brand_name: "Pfizer", short_description: "Broad-spectrum penicillin antibiotic.", status: "active", ratings: 5, rating_count: 48, main_image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300", variants: [{ id: 101, title: "30 Capsules Pack", price: 25.0, special_price: 22.0, stock: 120, sku: "AMX-500-30C", availability: true }] },
  { id: 2, title: "Panadol Pain Reliever 500mg", category_name: "OTC Medicines", brand_name: "GSK Healthcare", short_description: "Fast-acting relief from headache and fever.", status: "active", ratings: 4.8, rating_count: 120, main_image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=300", variants: [{ id: 201, title: "10 Tablets", price: 3.5, special_price: 3.0, stock: 350, sku: "PAN-500-10T", availability: true }, { id: 202, title: "30 Tablets", price: 9.0, special_price: 7.5, stock: 200, sku: "PAN-500-30T", availability: true }] },
  { id: 3, title: "Vitamin D3 1000 IU Softgels", category_name: "Vitamins & Supplements", brand_name: "Nature's Bounty", short_description: "Promotes healthy immune function and bone density.", status: "active", ratings: 4.5, rating_count: 65, main_image: "https://images.unsplash.com/photo-1611070973770-b1a672610042?auto=format&fit=crop&q=80&w=300", variants: [{ id: 301, title: "100 Softgels", price: 14.9, special_price: 12.5, stock: 90, sku: "VTD-1000-100S", availability: true }] },
  { id: 4, title: "Digital Upper Arm BP Monitor", category_name: "First Aid & Devices", brand_name: "Bayer AG", short_description: "Automatic upper arm blood pressure monitor.", status: "active", ratings: 4.9, rating_count: 28, main_image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=300", variants: [{ id: 401, title: "Standard Pack", price: 49.9, special_price: 45.0, stock: 40, sku: "BYR-BPM-DIG", availability: true }] },
  { id: 5, title: "Antiseptic Skin Healing Cream", category_name: "First Aid & Devices", brand_name: "Bayer AG", short_description: "Soothing cream for minor cuts and abrasions.", status: "active", ratings: 4.6, rating_count: 33, main_image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=300", variants: [{ id: 501, title: "50g Tube", price: 8.5, special_price: 7.0, stock: 150, sku: "BYR-ASC-50G", availability: true }] },
  { id: 6, title: "Chesty Cough Relief Syrup", category_name: "OTC Medicines", brand_name: "GSK Healthcare", short_description: "Loosens and clears deep chest congestion.", status: "active", ratings: 4.7, rating_count: 82, main_image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300", variants: [{ id: 601, title: "100ml Bottle", price: 6.9, special_price: 5.9, stock: 180, sku: "GSK-CRS-100", availability: true }] },
];
export const mockOrders = [
  { id: 90234, order_number: "ORD-90234", status: "received", payment_status: "paid", payment_method: "stripe", total: "66.00", payable: "74.29", delivery_charge: "4.99", tax: "3.30", discount: "0.00", created_at: "2026-07-16T10:15:00Z", user_name: "Alex Carter", user_email: "alex.carter@gmail.com", user_mobile: "+1 (555) 902-1209", address: "298 Marina Blvd, San Francisco - 94123", store_name: "Evergreen Pharmacy & Wellness", items: [{ id: 501, product_name: "Amoxicillin 500mg Capsules", variant_name: "30 Capsules Pack", price: "22.00", quantity: 3, total: "66.00" }] },
  { id: 90231, order_number: "ORD-90231", status: "processed", payment_status: "pending", payment_method: "COD", total: "7.00", payable: "12.34", delivery_charge: "4.99", tax: "0.35", discount: "0.00", created_at: "2026-07-16T08:00:00Z", user_name: "Miriam Vance", user_email: "miriam.vance@yahoo.com", user_mobile: "+1 (555) 309-8871", address: "402 Castro Street, San Francisco - 94114", store_name: "Evergreen Pharmacy & Wellness", items: [{ id: 502, product_name: "Antiseptic Skin Healing Cream", variant_name: "50g Tube", price: "7.00", quantity: 1, total: "7.00" }] },
  { id: 90220, order_number: "ORD-90220", status: "ready_for_pickup", payment_status: "paid", payment_method: "stripe", total: "25.00", payable: "24.75", delivery_charge: "3.50", tax: "1.25", discount: "5.00", created_at: "2026-07-16T07:15:00Z", user_name: "Timothy Gable", user_email: "tgable@gmail.com", user_mobile: "+1 (555) 489-0931", address: "150 Mission Street, San Francisco - 94103", store_name: "Evergreen Pharmacy & Wellness", items: [{ id: 503, product_name: "Vitamin D3 1000 IU Softgels", variant_name: "100 Softgels", price: "12.50", quantity: 2, total: "25.00" }] },
  { id: 90211, order_number: "ORD-90211", status: "delivered", payment_status: "paid", payment_method: "wallet", total: "9.00", payable: "14.44", delivery_charge: "4.99", tax: "0.45", discount: "0.00", created_at: "2026-07-15T15:30:00Z", user_name: "Samantha Cruz", user_email: "samantha.c@hotmail.com", user_mobile: "+1 (555) 920-1120", address: "110 Valencia Street, San Francisco - 94103", store_name: "Evergreen Pharmacy & Wellness", items: [{ id: 504, product_name: "Panadol Pain Reliever 500mg", variant_name: "10 Tablets", price: "3.00", quantity: 3, total: "9.00" }] },
  { id: 90199, order_number: "ORD-90199", status: "cancelled", payment_status: "paid", payment_method: "stripe", total: "45.00", payable: "53.90", delivery_charge: "3.50", tax: "5.40", discount: "0.00", created_at: "2026-07-14T11:00:00Z", user_name: "Gregory House", user_email: "house.md@gmail.com", user_mobile: "+1 (555) 002-3921", address: "120 Park Avenue, San Francisco - 94118", store_name: "Evergreen Pharmacy & Wellness", items: [{ id: 505, product_name: "Digital Upper Arm BP Monitor", variant_name: "Standard Pack", price: "45.00", quantity: 1, total: "45.00" }] },
];
export const mockNotifications = [
  { id: 1, title: "High Value Order Received", message: "You received a new order #ORD-90234 from Alex Carter for $680.00.", type: "order_received", is_read: false, created_at: "2026-07-16T10:15:00Z" },
  { id: 2, title: "Withdrawal Approved", message: "Your withdrawal request of $350.00 has been transferred to your Bank Account.", type: "wallet_withdrawal", is_read: false, created_at: "2026-07-16T08:30:00Z" },
  { id: 3, title: "Low Stock Alert", message: "Vitamin D3 Softgels stock is down to 2 units.", type: "stock_alert", is_read: true, created_at: "2026-07-16T06:00:00Z" },
  { id: 4, title: "Store Verified", message: "Your store Evergreen Pharmacy was verified and approved.", type: "store_status", is_read: true, created_at: "2026-07-15T14:20:00Z" },
  { id: 5, title: "Subscription Renewed", message: "Basic Free Plan renewed successfully for another 30 days.", type: "subscription_status", is_read: true, created_at: "2026-07-15T00:01:00Z" },
];
export const mockTransactions = [
  { id: 1, type: "credit", amount: "115.24", status: "success", message: "Earnings from order ORD-90211", created_at: "2026-07-15T16:00:00Z" },
  { id: 2, type: "debit", amount: "350.00", status: "success", message: "Bank Account Withdrawal Payout", created_at: "2026-07-14T18:00:00Z" },
  { id: 3, type: "credit", amount: "480.00", status: "success", message: "Earnings from order ORD-90180", created_at: "2026-07-13T12:00:00Z" },
  { id: 4, type: "debit", amount: "49.00", status: "success", message: "Pro Subscription Upgrade Fee", created_at: "2026-07-10T10:45:00Z" },
];
export const mockTaxGroups = [
  { id: 1, title: "Standard Medicine Tax (5%)", percentage: 5.0, status: "active" },
  { id: 2, title: "Zero Tax Essential Life Drugs (0%)", percentage: 0.0, status: "active" },
  { id: 3, title: "OTC Devices Tax (12%)", percentage: 12.0, status: "active" },
];
export const mockRoles = [
  { id: 1, name: "General Store Manager", status: "active" },
  { id: 2, name: "Inventory Supervisor", status: "active" },
  { id: 3, name: "Fulfillment Clerk", status: "active" },
];
export const mockSystemUsers = [
  { id: 10, name: "Daniel Carter", email: "daniel.carter@merchant.com", mobile: "+1 (555) 019-3221", role_name: "General Store Manager", status: "active" },
  { id: 11, name: "Sarah Miller", email: "sarah.miller@merchant.com", mobile: "+1 (555) 019-4820", role_name: "Inventory Supervisor", status: "active" },
];
export const mockDeliveryZones = [
  { id: 1, name: "San Francisco Metro Radius", radius: "25km", shipping_charges: "4.99", status: "active" },
  { id: 2, name: "Napa Valley Local Area", radius: "15km", shipping_charges: "9.99", status: "active" },
];
export const mockSubscriptionPlans = [
  { id: 1, name: "Basic Free", price: "0", duration_days: 30, features: ["Up to 10 products", "Basic analytics", "Standard support"], is_active: true, is_popular: false },
  { id: 2, name: "Pro Seller", price: "49", duration_days: 30, features: ["Unlimited products", "Advanced analytics", "Priority support", "Ad campaigns", "POS access"], is_active: false, is_popular: true },
  { id: 3, name: "Enterprise", price: "149", duration_days: 30, features: ["Everything in Pro", "Dedicated account manager", "Custom integrations", "White-label option", "SLA guarantee"], is_active: false, is_popular: false },
];
export const chartDataByPeriod: Record<string, Array<{ label: string; value: number }>> = {
  Week: [{ label: "Mon", value: 120 }, { label: "Tue", value: 250 }, { label: "Wed", value: 180 }, { label: "Thu", value: 320 }, { label: "Fri", value: 290 }, { label: "Sat", value: 450 }, { label: "Sun", value: 380 }],
  Month: [{ label: "Week 1", value: 1200 }, { label: "Week 2", value: 1850 }, { label: "Week 3", value: 2100 }, { label: "Week 4", value: 1950 }],
  "3 Months": [{ label: "May", value: 5400 }, { label: "Jun", value: 7200 }, { label: "Jul", value: 8100 }],
};
