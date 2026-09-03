/**
 * CUREFULLY SELLER — Complete Mock API Database
 * Mirrors the Flutter MockApiDatabase exactly, with all same data & behavior.
 * This runs server-side (Next.js Route Handler), zero CORS issues.
 */

// ─── In-Memory Database (persists for the server process lifetime) ───────────
let db: MockDb | null = null;

interface MockDb {
  profile: Record<string, unknown>;
  stores: Record<string, unknown>[];
  categories: Record<string, unknown>[];
  brands: Record<string, unknown>[];
  attributes: Record<string, unknown>[];
  attributeValues: Record<string, unknown>[];
  products: Record<string, unknown>[];
  productFaqs: Record<string, unknown>[];
  taxGroups: Record<string, unknown>[];
  roles: Record<string, unknown>[];
  permissions: Record<string, unknown>[];
  systemUsers: Record<string, unknown>[];
  notifications: Record<string, unknown>[];
  orders: Record<string, unknown>[];
  transactions: Record<string, unknown>[];
  withdrawals: Record<string, unknown>[];
  settledCommissions: Record<string, unknown>[];
  unsettledDebits: Record<string, unknown>[];
  unsettledCredits: Record<string, unknown>[];
  deliveryZones: Record<string, unknown>[];
  subscriptionPlans: Record<string, unknown>[];
  subscriptionHistory: Record<string, unknown>[];
  currentSubscription: Record<string, unknown>;
  addonGroups: Record<string, unknown>[];
  productAddons: Record<string, unknown>[];
  storeAddonItems: Record<string, unknown>[];
}

function initDb(): MockDb {
  if (db) return db;
  db = {
    profile: {
      id: 1,
      name: "Tester",
      email: "tester@gmail.com",
      mobile: "+91 9876543210",
      country: "India",
      iso_2: "IN",
      wallet_balance: "0.00",
      referral_code: "TESTER01",
      friends_code: "WELCOME10",
      reward_points: 0,
      profile_image: null,
      email_verified_at: "2026-09-01T10:00:00Z",
      created_at: "2026-09-01T10:00:00Z",

      updated_at: "2026-07-16T09:00:00Z",
    },
    stores: [
      {
        id: 1,
        name: "Evergreen Pharmacy & Wellness",
        slug: "evergreen-pharmacy-wellness",
        allows_pickup: true,
        pickup_instructions: "Pickup at Counter 1 (Prescriptions). Present your order ID and verification OTP.",
        product_count: 24,
        description: "Premium prescription medicines, OTC remedies, vitamins, and healthcare devices.",
        contact_number: "+1 (555) 102-3920",
        contact_email: "orders@evergreenpharmacy.com",
        seller_id: 1,
        tax_name: "Sales Tax",
        tax_number: "TX-88290-A",
        bank_name: "Silicon Valley Commerce Bank",
        bank_branch_code: "SVCB-US-SF",
        account_holder_name: "Evergreen Care LLC",
        account_number: "10029302911",
        routing_number: "021000021",
        bank_account_type: "current",
        currency_code: "USD",
        max_delivery_distance: 20,
        order_preparation_time: 25,
        promotional_text: "Stay healthy! 15% Off all vitamins and daily health supplements this week.",
        about_us: "Founded in 2021, we deliver essential drugs, OTC items, and medical supplies to patients across the bay area.",
        return_replacement_policy: "No-questions-asked replacement within 24 hours for unopened OTC items.",
        refund_policy: "Refunds credited to original payment method within 48 hours.",
        terms_and_conditions: "Prices and availability vary according to global supply and prescription validation.",
        delivery_policy: "Contactless thermal-insulated clinical delivery guaranteed.",
        domestic_shipping_charges: "4.99",
        international_shipping_charges: "0.00",
        fulfillment_type: "seller",
        address: "742 Evergreen Terrace, Sector 4",
        city: "San Francisco",
        landmark: "Opposite Golden Gate Park Entrance",
        state: "California",
        country: "United States",
        country_code: "US",
        zipcode: "94102",
        latitude: "37.7749",
        longitude: "-122.4194",
        distance: 0,
        timing: "Monday - Sunday: 07:00 AM - 09:00 PM",
        logo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=150",
        banner: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
        avg_products_rating: "4.9",
        avg_store_rating: "4.8",
        total_store_feedback: 45,
        created_at: "2026-07-10T10:30:00Z",
        updated_at: "2026-07-16T10:00:00Z",
        verification_status: "approved",
        visibility_status: "visible",
        status: { is_open: true, status: "online" },
      }
    ],
    categories: [
      { id: 1, title: "Prescription Drugs", slug: "prescription-drugs", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=150", background_color: "#E8F5E9", font_color: "#1B5E20", description: "Antibiotics, cardiovascular, diabetic, and other prescription medications.", commission: "5", status: "active", requires_approval: false, subcategory_count: 0, product_count: 12 },
      { id: 2, title: "OTC Medicines", slug: "otc-medicines", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=150", background_color: "#FFF3E0", font_color: "#E65100", description: "Pain relievers, cold and flu remedies, allergy relief, and digestive health.", commission: "4", status: "active", requires_approval: false, subcategory_count: 0, product_count: 18 },
      { id: 3, title: "Vitamins & Supplements", slug: "vitamins-supplements", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=150", background_color: "#E1F5FE", font_color: "#01579B", description: "Multivitamins, minerals, proteins, and daily nutritional supplements.", commission: "6", status: "active", requires_approval: false, subcategory_count: 0, product_count: 15 },
      { id: 4, title: "First Aid & Devices", slug: "first-aid-devices", image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=150", background_color: "#F3E5F5", font_color: "#4A148C", description: "Bandages, antiseptics, blood pressure monitors, and clinical thermometers.", commission: "5", status: "active", requires_approval: false, subcategory_count: 0, product_count: 10 },
      { id: 5, title: "Personal Care", slug: "personal-care", image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=150", background_color: "#efebe9", font_color: "#4e342e", description: "Skincare, oral hygiene, baby care, and personal sanitation.", commission: "6", status: "active", requires_approval: false, subcategory_count: 0, product_count: 14 },
    ],
    brands: [
      { id: 1, title: "Pfizer", slug: "pfizer", logo: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=100", status: "active", description: "World-class manufacturer of research-based therapeutic drugs.", total_products: 12 },
      { id: 2, title: "GSK Healthcare", slug: "gsk-healthcare", logo: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=100", status: "active", description: "Global developer of top OTC medicines and vaccine research.", total_products: 18 },
      { id: 3, title: "Bayer AG", slug: "bayer-ag", logo: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=100", status: "active", description: "Premium brand in diagnostics, therapeutics, and personal care.", total_products: 10 },
      { id: 4, title: "Nature's Bounty", slug: "natures-bounty", logo: "https://images.unsplash.com/photo-1611070973770-b1a672610042?auto=format&fit=crop&q=80&w=100", status: "active", description: "High-quality herbal nutrition and dietary supplements.", total_products: 15 },
    ],
    attributes: [
      { id: 1, title: "Dosage Strength", slug: "dosage-strength", status: "active", scope_type: "seller", scope_id: 1 },
      { id: 2, title: "Pack Format", slug: "pack-format", status: "active", scope_type: "seller", scope_id: 1 },
      { id: 3, title: "Container Size", slug: "container-size", status: "active", scope_type: "seller", scope_id: 1 },
    ],
    attributeValues: [
      { id: 1, attribute_id: 1, value: "500 mg", status: "active" },
      { id: 2, attribute_id: 1, value: "250 mg", status: "active" },
      { id: 3, attribute_id: 1, value: "10 mg", status: "active" },
      { id: 4, attribute_id: 2, value: "10 Tablets", status: "active" },
      { id: 5, attribute_id: 2, value: "30 Capsules", status: "active" },
      { id: 6, attribute_id: 2, value: "20 Softgels", status: "active" },
      { id: 7, attribute_id: 3, value: "100 ml", status: "active" },
      { id: 8, attribute_id: 3, value: "200 ml", status: "active" },
    ],
    products: [
      { id: 1, title: "Amoxicillin 500mg Capsules", slug: "amoxicillin-500mg-capsules", categoryId: 1, category_name: "Prescription Drugs", brand_name: "Pfizer", brandId: 1, sellerId: 1, sellerName: "Evergreen Pharmacy & Wellness", short_description: "Broad-spectrum penicillin antibiotic for bacterial infections.", description: "Amoxicillin is used to treat a wide variety of bacterial infections. It works by stopping the growth of bacteria. Prescription required for retail sale.", status: "active", main_image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300", additional_images: ["https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=300"], is_returnable: false, returnable_days: 0, is_cancelable: true, cancelable_till: "received", ratings: 5, rating_count: 48, minimum_order_quantity: 1, quantity_step_size: 1, total_allowed_quantity: 5, is_inclusive_tax: false, tax_groups: [1], tags: ["antibiotic", "prescription", "amoxicillin", "capsule"], variants: [{ id: 101, title: "Amoxicillin - 30 Capsules Pack", slug: "amoxicillin-30-capsules-pack", price: 25.0, special_price: 22.0, availability: true, is_default: true, stock: 120, sku: "AMX-500-30C", store_id: 1, store_name: "Evergreen Pharmacy & Wellness", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300" }] },
      { id: 2, title: "Panadol Pain Reliever 500mg", slug: "panadol-pain-reliever-500mg", categoryId: 2, category_name: "OTC Medicines", brand_name: "GSK Healthcare", brandId: 2, sellerId: 1, sellerName: "Evergreen Pharmacy & Wellness", short_description: "Fast-acting relief from headache, fever, and muscular pain.", description: "Panadol Tablets provide gentle, effective relief from pain and fever. Formulated to disintegrate quickly and start working fast.", status: "active", main_image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=300", additional_images: [], is_returnable: true, returnable_days: 14, is_cancelable: true, cancelable_till: "processed", ratings: 4.8, rating_count: 120, minimum_order_quantity: 1, quantity_step_size: 1, total_allowed_quantity: 10, is_inclusive_tax: true, tax_groups: [1], tags: ["panadol", "paracetamol", "painkiller", "fever"], variants: [{ id: 201, title: "Panadol 500mg - 10 Tablets", price: 3.5, special_price: 3.0, availability: true, is_default: true, stock: 350, sku: "PAN-500-10T", store_id: 1, store_name: "Evergreen Pharmacy & Wellness", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=300" }, { id: 202, title: "Panadol 500mg - 30 Tablets", price: 9.0, special_price: 7.5, availability: true, is_default: false, stock: 200, sku: "PAN-500-30T", store_id: 1, store_name: "Evergreen Pharmacy & Wellness", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=300" }] },
      { id: 3, title: "Vitamin D3 1000 IU Softgels", slug: "vitamin-d3-1000-iu-softgels", categoryId: 3, category_name: "Vitamins & Supplements", brand_name: "Nature's Bounty", brandId: 4, sellerId: 1, sellerName: "Evergreen Pharmacy & Wellness", short_description: "Promotes healthy immune function, bone density, and teeth.", description: "Essential vitamin supplement to support your immune health. Non-GMO and gluten-free.", status: "active", main_image: "https://images.unsplash.com/photo-1611070973770-b1a672610042?auto=format&fit=crop&q=80&w=300", additional_images: [], is_returnable: true, returnable_days: 30, is_cancelable: true, ratings: 4.5, rating_count: 65, minimum_order_quantity: 1, quantity_step_size: 1, total_allowed_quantity: 4, is_inclusive_tax: false, tax_groups: [2], tags: ["vitamin", "supplement", "d3", "immune"], variants: [{ id: 301, title: "Vitamin D3 - 100 Softgels", price: 14.9, special_price: 12.5, availability: true, is_default: true, stock: 90, sku: "VTD-1000-100S", store_id: 1, store_name: "Evergreen Pharmacy & Wellness", image: "https://images.unsplash.com/photo-1611070973770-b1a672610042?auto=format&fit=crop&q=80&w=300" }] },
      { id: 4, title: "Digital Upper Arm BP Monitor", slug: "digital-upper-arm-bp-monitor", categoryId: 4, category_name: "First Aid & Devices", brand_name: "Bayer AG", brandId: 3, sellerId: 1, sellerName: "Evergreen Pharmacy & Wellness", short_description: "Automatic upper arm blood pressure measurement device.", description: "High-accuracy digital blood pressure monitor with double-user memory, irregular heartbeat detection, and large LCD screen.", status: "active", main_image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=300", additional_images: [], is_returnable: true, returnable_days: 10, is_cancelable: true, ratings: 4.9, rating_count: 28, minimum_order_quantity: 1, quantity_step_size: 1, total_allowed_quantity: 2, is_inclusive_tax: false, tax_groups: [2], tags: ["monitor", "device", "bp", "bloodpressure"], variants: [{ id: 401, title: "Bayer Digital BP Monitor", price: 49.9, special_price: 45.0, availability: true, is_default: true, stock: 40, sku: "BYR-BPM-DIG", store_id: 1, store_name: "Evergreen Pharmacy & Wellness", image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=300" }] },
      { id: 5, title: "Antiseptic Skin Healing Cream", slug: "antiseptic-skin-healing-cream", categoryId: 4, category_name: "First Aid & Devices", brand_name: "Bayer AG", brandId: 3, sellerId: 1, sellerName: "Evergreen Pharmacy & Wellness", short_description: "Soothing cream for minor cuts, abrasions, and chapped skin.", description: "Formulated with therapeutic skin protectors and antiseptic agents to prevent infection, soothe skin irritation, and accelerate healing.", status: "active", main_image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=300", additional_images: [], is_returnable: true, returnable_days: 7, is_cancelable: true, ratings: 4.6, rating_count: 33, minimum_order_quantity: 1, quantity_step_size: 1, total_allowed_quantity: 8, is_inclusive_tax: true, tags: ["cream", "healing", "antiseptic", "skincare"], variants: [{ id: 501, title: "Antiseptic Cream - 50g Tube", price: 8.5, special_price: 7.0, availability: true, is_default: true, stock: 150, sku: "BYR-ASC-50G", store_id: 1, store_name: "Evergreen Pharmacy & Wellness", image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=300" }] },
      { id: 6, title: "Chesty Cough Relief Syrup", slug: "chesty-cough-relief-syrup", categoryId: 2, category_name: "OTC Medicines", brand_name: "GSK Healthcare", brandId: 2, sellerId: 1, sellerName: "Evergreen Pharmacy & Wellness", short_description: "Loosens and clears deep chest congestion.", description: "Helps loosen mucus, making it easier to cough up and soothe irritated airways. Pleasant cherry-menthol flavor.", status: "active", main_image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300", additional_images: [], is_returnable: true, returnable_days: 14, is_cancelable: true, ratings: 4.7, rating_count: 82, minimum_order_quantity: 1, quantity_step_size: 1, total_allowed_quantity: 5, is_inclusive_tax: false, tax_groups: [1], tags: ["cough", "syrup", "otc", "congestion"], variants: [{ id: 601, title: "Cough Relief Syrup - 100ml", price: 6.9, special_price: 5.9, availability: true, is_default: true, stock: 180, sku: "GSK-CRS-100", store_id: 1, store_name: "Evergreen Pharmacy & Wellness", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300" }] },
    ],
    productFaqs: [
      { id: 1, product_id: 1, question: "Is a prescription required for Amoxicillin?", answer: "Yes, Amoxicillin is a prescription-only antibiotic. You must upload a valid prescription from a registered doctor to purchase.", status: "answered", created_at: "2026-07-14T12:00:00Z" },
      { id: 2, product_id: 2, question: "Can I take Panadol on an empty stomach?", answer: "Yes, Panadol is gentle on the stomach and can be taken with or without food.", status: "answered", created_at: "2026-07-15T09:30:00Z" },
    ],
    taxGroups: [
      { id: 1, title: "Standard Medicine Tax (5%)", percentage: 5.0, status: "active" },
      { id: 2, title: "Zero Tax Essential Life Drugs (0%)", percentage: 0.0, status: "active" },
      { id: 3, title: "OTC Devices Tax (12%)", percentage: 12.0, status: "active" },
    ],
    roles: [
      { id: 1, name: "General Store Manager", guard_name: "web", status: "active" },
      { id: 2, name: "Inventory Supervisor", guard_name: "web", status: "active" },
      { id: 3, name: "Fulfillment Clerk", guard_name: "web", status: "active" },
    ],
    permissions: [
      { id: 1, name: "dashboard", guard_name: "web" },
      { id: 2, name: "stores", guard_name: "web" },
      { id: 3, name: "products", guard_name: "web" },
      { id: 4, name: "orders", guard_name: "web" },
      { id: 5, name: "wallet", guard_name: "web" },
      { id: 6, name: "earnings", guard_name: "web" },
      { id: 7, name: "subscription", guard_name: "web" },
    ],
    systemUsers: [
      { id: 10, name: "Daniel Carter", email: "daniel.carter@merchant.com", mobile: "+1 (555) 019-3221", role_id: 1, role_name: "General Store Manager", status: "active" },
      { id: 11, name: "Sarah Miller", email: "sarah.miller@merchant.com", mobile: "+1 (555) 019-4820", role_id: 2, role_name: "Inventory Supervisor", status: "active" },
    ],
    notifications: [
      { id: 1, title: "High Value Order Received", message: "You received a new order #ORD-90234 from Alex Carter for $680.00.", type: "order_received", is_read: false, created_at: "2026-07-16T10:15:00Z" },
      { id: 2, title: "Withdrawal Approved", message: "Your withdrawal request of $350.00 has been transferred to your Bank Account.", type: "wallet_withdrawal", is_read: false, created_at: "2026-07-16T08:30:00Z" },
      { id: 3, title: "Low Stock Alert", message: "Antiseptic Cream - 50g Tube stock is down to 2 units.", type: "stock_alert", is_read: true, created_at: "2026-07-16T06:00:00Z" },
      { id: 4, title: "New Store Verification", message: "Your store 'Evergreen Pharmacy & Wellness' was verified and approved.", type: "store_status", is_read: true, created_at: "2026-07-15T14:20:00Z" },
      { id: 5, title: "Subscription Renewed", message: "Pro Retailer Plan renewed successfully for another 30 days.", type: "subscription_status", is_read: true, created_at: "2026-07-15T00:01:00Z" },
    ],
    orders: [
      { id: 90234, order_number: "ORD-90234", store_id: 1, store_name: "Evergreen Pharmacy & Wellness", total: "66.00", discount: "0.00", delivery_charge: "4.99", tax: "3.30", payable: "74.29", payment_method: "stripe", payment_status: "paid", status: "received", created_at: "2026-07-16T10:15:00Z", user_name: "Alex Carter", user_email: "alex.carter@gmail.com", user_mobile: "+1 (555) 902-1209", address: "298 Marina Boulevard, Penthouse C, San Francisco - 94123", pickup_otp: "7730", items: [{ id: 501, product_id: 1, product_name: "Amoxicillin 500mg Capsules", variant_id: 101, variant_name: "Amoxicillin - 30 Capsules Pack", price: "22.00", quantity: 3, total: "66.00" }] },
      { id: 90231, order_number: "ORD-90231", store_id: 1, store_name: "Evergreen Pharmacy & Wellness", total: "7.00", discount: "0.00", delivery_charge: "4.99", tax: "0.35", payable: "12.34", payment_method: "COD", payment_status: "pending", status: "processed", created_at: "2026-07-16T08:00:00Z", user_name: "Miriam Vance", user_email: "miriam.vance@yahoo.com", user_mobile: "+1 (555) 309-8871", address: "402 Castro Street, San Francisco - 94114", pickup_otp: "1024", items: [{ id: 502, product_id: 5, product_name: "Antiseptic Skin Healing Cream", variant_id: 501, variant_name: "Antiseptic Cream - 50g Tube", price: "7.00", quantity: 1, total: "7.00" }] },
      { id: 90220, order_number: "ORD-90220", store_id: 1, store_name: "Evergreen Pharmacy & Wellness", total: "25.00", discount: "5.00", delivery_charge: "3.50", tax: "1.25", payable: "24.75", payment_method: "stripe", payment_status: "paid", status: "ready_for_pickup", created_at: "2026-07-16T07:15:00Z", user_name: "Timothy Gable", user_email: "tgable@gmail.com", user_mobile: "+1 (555) 489-0931", address: "150 Mission Street, San Francisco - 94103", pickup_otp: "2094", items: [{ id: 503, product_id: 3, product_name: "Vitamin D3 1000 IU Softgels", variant_id: 301, variant_name: "Vitamin D3 - 100 Softgels", price: "12.50", quantity: 2, total: "25.00" }] },
      { id: 90211, order_number: "ORD-90211", store_id: 1, store_name: "Evergreen Pharmacy & Wellness", total: "9.00", discount: "0.00", delivery_charge: "4.99", tax: "0.45", payable: "14.44", payment_method: "wallet", payment_status: "paid", status: "delivered", created_at: "2026-07-15T15:30:00Z", user_name: "Samantha Cruz", user_email: "samantha.c@hotmail.com", user_mobile: "+1 (555) 920-1120", address: "110 Valencia Street, San Francisco - 94103", pickup_otp: "", items: [{ id: 504, product_id: 2, product_name: "Panadol Pain Reliever 500mg", variant_id: 201, variant_name: "Panadol 500mg - 10 Tablets", price: "3.00", quantity: 3, total: "9.00" }] },
      { id: 90199, order_number: "ORD-90199", store_id: 1, store_name: "Evergreen Pharmacy & Wellness", total: "45.00", discount: "0.00", delivery_charge: "3.50", tax: "5.40", payable: "53.90", payment_method: "stripe", payment_status: "paid", status: "cancelled", created_at: "2026-07-14T11:00:00Z", user_name: "Gregory House", user_email: "house.md@gmail.com", user_mobile: "+1 (555) 002-3921", address: "120 Park Avenue, San Francisco - 94118", pickup_otp: "", items: [{ id: 505, product_id: 4, product_name: "Digital Upper Arm BP Monitor", variant_id: 401, variant_name: "Bayer Digital BP Monitor", price: "45.00", quantity: 1, total: "45.00" }] },
    ],
    transactions: [
      { id: 1, type: "credit", amount: "115.24", status: "success", message: "Earnings from order ORD-90211", created_at: "2026-07-15T16:00:00Z" },
      { id: 2, type: "debit", amount: "350.00", status: "success", message: "Bank Account Withdrawal Payout", created_at: "2026-07-14T18:00:00Z" },
      { id: 3, type: "credit", amount: "480.00", status: "success", message: "Earnings from order ORD-90180", created_at: "2026-07-13T12:00:00Z" },
      { id: 4, type: "debit", amount: "49.00", status: "success", message: "Pro Subscription Upgrade Fee", created_at: "2026-07-10T10:45:00Z" },
    ],
    withdrawals: [
      { id: 1, amount: "350.00", status: "approved", payment_method: "bank_transfer", bank_name: "Silicon Valley Commerce Bank", account_number: "****9110", created_at: "2026-07-14T10:00:00Z" },
      { id: 2, amount: "500.00", status: "approved", payment_method: "bank_transfer", bank_name: "Silicon Valley Commerce Bank", account_number: "****9110", created_at: "2026-07-05T09:00:00Z" },
    ],
    settledCommissions: [
      { id: 1, order_id: 90211, order_number: "ORD-90211", amount: "5.25", commission_percentage: "5", created_at: "2026-07-15T16:00:00Z" },
    ],
    unsettledDebits: [],
    unsettledCredits: [
      { id: 2, order_id: 90234, order_number: "ORD-90234", amount: "22.50", commission_percentage: "5", created_at: "2026-07-16T10:15:00Z" },
      { id: 3, order_id: 90231, order_number: "ORD-90231", amount: "3.96", commission_percentage: "4", created_at: "2026-07-16T08:00:00Z" },
    ],
    deliveryZones: [
      { id: 1, name: "San Francisco Metro Radius", radius: "25km", shipping_charges: "4.99", status: "active" },
      { id: 2, name: "Napa Valley Local Area", radius: "15km", shipping_charges: "9.99", status: "active" },
    ],
    subscriptionPlans: [
      { id: 1, name: "Starter Merchant Plan", description: "Start listing your local products for free.", price: 0, durationType: "monthly", durationDays: 30, isFree: true, isDefault: true, isRecommended: false, status: true, limits: { max_stores: 1, max_products: 10, commission_percent: 15 } },
      { id: 2, name: "Pro Retailer Plan", description: "Perfect plan for busy shops and multiple stores.", price: 49, durationType: "monthly", durationDays: 30, isFree: false, isDefault: false, isRecommended: true, status: true, limits: { max_stores: 3, max_products: 150, commission_percent: 5 } },
    ],
    subscriptionHistory: [
      { id: 50, plan_id: 2, plan_name: "Pro Retailer Plan", price: 49, status: "active", starts_at: "2026-07-10T00:00:00Z", ends_at: "2026-08-09T23:59:59Z", created_at: "2026-07-10T10:45:00Z" },
    ],
    currentSubscription: { id: 50, plan_id: 2, plan_name: "Pro Retailer Plan", price: 49, starts_at: "2026-07-10T00:00:00Z", ends_at: "2026-08-09T23:59:59Z", max_stores: 3, max_products: 150, commission_percent: 5, status: "active" },
    addonGroups: [
      { id: 1, title: "Dosage Options", slug: "dosage-options", status: "active", items: [{ id: 1, title: "Extra Dosage Info Sheet", price: 0 }, { id: 2, title: "Child Dosage Pack", price: 5 }] },
    ],
    productAddons: [],
    storeAddonItems: [],
  };
  return db;
}

// ─── Paginate helper ──────────────────────────────────────────────────────────
function paginate(arr: unknown[], page = 1, perPage = 15) {
  const total = arr.length;
  const start = (page - 1) * perPage;
  const data = arr.slice(start, start + perPage);
  return { current_page: page, last_page: Math.max(1, Math.ceil(total / perPage)), per_page: perPage, total, data };
}

// ─── Main Route Handler ───────────────────────────────────────────────────────
export function handleMockRequest(
  method: string,
  path: string,
  body: Record<string, unknown> | null,
  query: Record<string, string>
): unknown {
  const d = initDb();
  const segments = path.split('/').filter(Boolean);
  const page = parseInt(query.page || '1', 10);

  console.log(`[MOCK API] ${method} ${path}`);

  // ── SETTINGS ──────────────────────────────────────────────────────────────
  if (path.includes('/settings') && !path.includes('/check-version')) {
    return { success: true, message: "Settings fetched", data: [
      { variable: "system", value: { sellerAppMaintenanceMode: false, demoMode: true, currency: "USD", currencySymbol: "$", systemVendorType: "multi", countryCode: "91" } },
      { variable: "payment", value: {} },
      { variable: "authentication", value: { customSms: true } },
      { variable: "subscription", value: { enableSubscription: true } },
      { variable: "advertisement", value: { featureEnabled: true, walletMinTopup: 10 } },
      { variable: "seller", value: { allowed_store_types: ["grocery", "restaurant", "pharmacy"] } },
    ]};
  }

  if (path.includes('/settings/check-version')) {
    return { success: true, message: "No update required", data: { update_required: false, version: "2.1.0" } };
  }

  // ── AUTH ──────────────────────────────────────────────────────────────────
  if (path.includes('/login') || path.includes('/auth/verify-otp')) {
    // Validate credentials
    if (path.includes('/login') && body) {
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '').trim();
      const validCredentials = [
        { email: 'tester@gmail.com',     password: 'Test123#' },
        { email: 'tester@gmail.com',     password: 'test123#' },
        { email: 'demoseller@gmail.com', password: '12345678' },
        { email: 'seller@gmail.com',     password: '12345678' },
      ];
      const match = validCredentials.find(c => c.email === email && c.password === password);
      if (!match) {
        return { success: false, message: "These credentials do not match our records." };
      }

    }
    return { success: true, message: "Login successful", access_token: "mock_token_seller_abcdef123456", assigned_permissions: d.permissions.map(p => p.name), data: d.profile };
  }
  if (path.includes('/auth/send-otp') || path.includes('/send-otp')) {
    return { success: true, message: "OTP sent successfully" };
  }
  if (path.includes('/register')) {
    return { success: true, message: "Registration submitted successfully. Pending Approval.", data: d.profile };
  }
  if (path.includes('/logout')) {
    return { success: true, message: "Logged out successfully" };
  }
  if (path.includes('/forget-password')) {
    return { success: true, message: "Password reset link sent to your email." };
  }

  // ── USER PROFILE ──────────────────────────────────────────────────────────
  if (path.includes('/user/profile')) {
    if (method === 'POST' && body) {
      Object.assign(d.profile, body);
    }
    return { success: true, message: "Profile fetched", data: d.profile, assigned_permissions: d.permissions.map(p => p.name) };
  }
  if (path.includes('/user/change-password')) {
    return { success: true, message: "Password updated successfully" };
  }
  if (path.includes('/delete-account')) {
    return { success: true, message: "Account deletion scheduled" };
  }

  // ── DASHBOARD ────────────────────────────────────────────────────────────
  if (path.includes('/dashboard')) {
    let filteredOrders = d.orders;
    let filteredProducts = d.products;
    
    if (query.store_id) {
      const sId = parseInt(query.store_id, 10);
      filteredOrders = filteredOrders.filter(o => o.store_id === sId);
      // For products in mock, we can check variant's store_id
      filteredProducts = filteredProducts.filter(p => p.variants?.some((v: any) => v.store_id === sId));
    }
    
    const revenue = filteredOrders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + parseFloat(String(o.payable) || '0'), 0);
    const totalOrdersCount = filteredOrders.length;
    const totalProducts = filteredProducts.length;
    return { success: true, message: "Dashboard data fetched", data: {
      chart: {
        weekly: { period: "Week", data: [
          { day: "Mon", earnings: 120, orders: 1 }, { day: "Tue", earnings: 240, orders: 2 },
          { day: "Wed", earnings: 80, orders: 1 }, { day: "Thu", earnings: 150, orders: 1 },
          { day: "Fri", earnings: 300, orders: 2 }, { day: "Sat", earnings: 450, orders: 3 },
          { day: "Sun", earnings: Math.round(revenue), orders: totalOrdersCount },
        ]},
        monthly: { period: "Month", data: [
          { week: "Week 1", earnings: 800, orders: 6 }, { week: "Week 2", earnings: 1200, orders: 10 },
          { week: "Week 3", earnings: 950, orders: 8 }, { week: "Week 4", earnings: revenue, orders: totalOrdersCount },
        ]},
        yearly: { period: "Year", data: [
          { month: "Jan", earnings: 3000, orders: 25 }, { month: "Feb", earnings: 4200, orders: 35 },
          { month: "Mar", earnings: 2800, orders: 20 }, { month: "Apr", earnings: 5000, orders: 42 },
          { month: "May", earnings: 6100, orders: 50 }, { month: "Jun", earnings: revenue, orders: totalOrdersCount },
        ]},
      },
      summary: {
        todays_revenue: { title: "Today's Revenue", amount: `$${revenue.toFixed(2)}`, message: "Compared to yesterday", change: 8 },
        total_orders: { title: "Total Orders", count: String(totalOrdersCount), message: "Active orders in progress", change: 15 },
        total_products: { title: "Total Products", count: String(totalProducts), message: "Active store catalogue size", change: 3 },
        sales: { title: "Sales Volume", solds: totalOrdersCount * 2, message: "Product units delivered", change: 12 },
      },
    }};
  }

  // ── STORES ────────────────────────────────────────────────────────────────
  if (path.includes('/stores')) {
    const storeId = parseInt(segments[segments.indexOf('stores') + 1] || '', 10);
    
    if (path.includes('/status') && storeId) {
      const idx = d.stores.findIndex(s => s.id === storeId);
      if (idx !== -1 && body?.status) (d.stores[idx].status as Record<string, unknown>).status = body.status;
      return { success: true, message: "Store status updated" };
    }
    if (!isNaN(storeId)) {
      if (method === 'DELETE') {
        d.stores = d.stores.filter(s => s.id !== storeId);
        return { success: true, message: "Store deleted successfully" };
      }
      const store = d.stores.find(s => s.id === storeId);
      if (method === 'POST' || method === 'PUT') {
        if (store && body) Object.assign(store, body);
        return { success: true, message: "Store updated successfully", data: store || {} };
      }
      return { success: true, message: "Store details fetched", data: store || {} };
    }
    if (method === 'POST' && body) {
      const newId = d.stores.length ? Math.max(...d.stores.map(s => s.id as number)) + 1 : 1;
      const newStore = { id: newId, ...body, seller_id: 1, product_count: 0, status: { is_open: true, status: "active" }, verification_status: "approved", visibility_status: "visible" };
      d.stores.push(newStore);
      return { success: true, message: "Store created successfully", data: newStore };
    }
    return { success: true, message: "Stores fetched", data: paginate(d.stores, page) };
  }

  // ── ORDERS ────────────────────────────────────────────────────────────────
  if (path.includes('/orders')) {
    if (path.includes('/enums')) {
      return { success: true, message: "Order filters fetched", data: { payment_methods: ["COD", "stripe", "wallet"], statuses: ["received", "processed", "shipped", "ready_for_pickup", "delivered", "cancelled"] } };
    }
    const ordersIdx = segments.indexOf('orders');
    const orderId = parseInt(segments[ordersIdx + 1] || '', 10);
    if (!isNaN(orderId)) {
      const idx = d.orders.findIndex(o => o.id === orderId);
      if (idx === -1) return { success: false, message: "Order not found" };
      const action = segments[ordersIdx + 2];
      if (action === 'verify-pickup-otp') { d.orders[idx].status = 'delivered'; d.orders[idx].payment_status = 'paid'; return { success: true, message: "OTP verified. Order marked as delivered." }; }
      if (action === 'mark-ready-for-pickup') { d.orders[idx].status = 'ready_for_pickup'; return { success: true, message: "Order marked as ready for pickup" }; }
      if (action) { d.orders[idx].status = action; return { success: true, message: `Order status updated to ${action}` }; }
      return { success: true, message: "Order details fetched", data: d.orders[idx] };
    }
    // Filter by status
    let orders = [...d.orders];
    if (query.status) orders = orders.filter(o => o.status === query.status);
    return { success: true, message: "Orders fetched", data: paginate(orders, page) };
  }

  // ── CATEGORIES ───────────────────────────────────────────────────────────
  if (path.includes('/categories')) {
    return { success: true, message: "Categories fetched", data: paginate(d.categories, page, 10) };
  }

  // ── BRANDS ────────────────────────────────────────────────────────────────
  if (path.includes('/brands')) {
    const brandsIdx = segments.indexOf('brands');
    const brandId = parseInt(segments[brandsIdx + 1] || '', 10);
    if (!isNaN(brandId)) {
      if (method === 'DELETE') { d.brands = d.brands.filter(b => b.id !== brandId); return { success: true, message: "Brand deleted" }; }
      const brand = d.brands.find(b => b.id === brandId);
      if (method === 'POST' || method === 'PUT') { if (brand && body) Object.assign(brand, body); return { success: true, message: "Brand updated", data: brand }; }
      return { success: true, message: "Brand fetched", data: brand };
    }
    if (method === 'POST' && body) {
      const newId = d.brands.length ? Math.max(...d.brands.map(b => b.id as number)) + 1 : 1;
      const newBrand = { id: newId, ...body, status: "active", total_products: 0 };
      d.brands.push(newBrand);
      return { success: true, message: "Brand created", data: newBrand };
    }
    return { success: true, message: "Brands fetched", data: paginate(d.brands, page, 10) };
  }

  // ── ATTRIBUTES ───────────────────────────────────────────────────────────
  if (path.includes('/attribute-values')) {
    return { success: true, message: "Attribute values fetched", data: paginate(d.attributeValues, page) };
  }
  if (path.includes('/attributes')) {
    return { success: true, message: "Attributes fetched", data: paginate(d.attributes, page) };
  }

  // ── PRODUCTS ─────────────────────────────────────────────────────────────
  if (path.includes('/product-faqs')) {
    if (method === 'POST' && body) {
      const newFaq = { id: d.productFaqs.length + 1, ...body, status: "answered", created_at: new Date().toISOString() };
      d.productFaqs.push(newFaq);
      return { success: true, message: "FAQ added", data: newFaq };
    }
    return { success: true, message: "FAQs fetched", data: paginate(d.productFaqs, page) };
  }
  if (path.includes('/products')) {
    if (path.includes('/enums')) {
      return { success: true, message: "Product enums fetched", data: { indicator_types: ["veg", "non-veg", "egg"], fulfillment_types: ["seller", "admin"] } };
    }
    const productsIdx = segments.indexOf('products');
    const productId = parseInt(segments[productsIdx + 1] || '', 10);
    if (!isNaN(productId)) {
      if (method === 'DELETE') { d.products = d.products.filter(p => p.id !== productId); return { success: true, message: "Product deleted" }; }
      const prod = d.products.find(p => p.id === productId);
      if ((method === 'POST' || method === 'PUT') && prod && body) { Object.assign(prod, body); return { success: true, message: "Product updated", data: prod }; }
      return { success: true, message: "Product details fetched", data: prod || {} };
    }
    if (method === 'POST' && body) {
      const newId = d.products.length ? Math.max(...d.products.map(p => p.id as number)) + 1 : 1;
      const title = String(body.title || "New Product");
      const newProduct = {
        id: newId, title, slug: title.toLowerCase().replace(/\s+/g, '-'),
        categoryId: parseInt(String(body.category_id || '1'), 10), category_name: "Prescription Drugs",
        brandId: parseInt(String(body.brand_id || '1'), 10), brand_name: "Pfizer",
        sellerId: 1, sellerName: "Evergreen Pharmacy & Wellness",
        short_description: String(body.short_description || ''), description: String(body.description || ''),
        status: "active",
        main_image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300",
        additional_images: [], is_returnable: true, returnable_days: 7, is_cancelable: true,
        ratings: 5, rating_count: 1, minimum_order_quantity: 1, quantity_step_size: 1, total_allowed_quantity: 10,
        is_inclusive_tax: false, tax_groups: [], tags: [],
        variants: [{
          id: newId * 100 + 1, title, price: parseFloat(String(body.price || '100')),
          special_price: parseFloat(String(body.special_price || '80')),
          availability: true, is_default: true, stock: parseInt(String(body.stock || '10'), 10),
          sku: `PROD-${newId}-SKU`, store_id: 1, store_name: "Evergreen Pharmacy & Wellness",
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300",
        }],
      };
      d.products.push(newProduct);
      return { success: true, message: "Product created successfully", data: newProduct };
    }
    let products = [...d.products];
    if (query.category_id) products = products.filter(p => String(p.categoryId) === query.category_id);
    if (query.brand_id) products = products.filter(p => String(p.brandId) === query.brand_id);
    if (query.search) products = products.filter(p => String(p.title).toLowerCase().includes(query.search.toLowerCase()));
    return { success: true, message: "Products fetched", data: paginate(products, page) };
  }

  // ── TAX GROUPS ───────────────────────────────────────────────────────────
  if (path.includes('/tax-classes')) {
    const taxIdx = segments.indexOf('tax-classes');
    const taxId = parseInt(segments[taxIdx + 1] || '', 10);
    if (!isNaN(taxId)) {
      if (method === 'DELETE') { d.taxGroups = d.taxGroups.filter(t => t.id !== taxId); return { success: true, message: "Tax class deleted" }; }
      const tax = d.taxGroups.find(t => t.id === taxId);
      if (method === 'POST' || method === 'PUT') { if (tax && body) Object.assign(tax, body); return { success: true, message: "Tax class updated", data: tax }; }
      return { success: true, message: "Tax class fetched", data: tax };
    }
    if (method === 'POST' && body) {
      const newId = d.taxGroups.length ? Math.max(...d.taxGroups.map(t => t.id as number)) + 1 : 1;
      const newTax = { id: newId, ...body, status: "active" };
      d.taxGroups.push(newTax);
      return { success: true, message: "Tax class created", data: newTax };
    }
    return { success: true, message: "Tax classes fetched", data: d.taxGroups };
  }

  // ── ROLES & PERMISSIONS ──────────────────────────────────────────────────
  if (path.includes('/permissions')) return { success: true, message: "Permissions fetched", data: d.permissions };
  if (path.includes('/roles')) {
    const rolesIdx = segments.indexOf('roles');
    const roleId = parseInt(segments[rolesIdx + 1] || '', 10);
    if (!isNaN(roleId)) {
      if (method === 'DELETE') { d.roles = d.roles.filter(r => r.id !== roleId); return { success: true, message: "Role deleted" }; }
      const role = d.roles.find(r => r.id === roleId);
      if ((method === 'POST' || method === 'PUT') && role && body) { Object.assign(role, body); return { success: true, message: "Role updated", data: role }; }
      return { success: true, message: "Role fetched", data: role };
    }
    if (method === 'POST' && body) {
      const newId = d.roles.length ? Math.max(...d.roles.map(r => r.id as number)) + 1 : 1;
      const newRole = { id: newId, ...body, guard_name: "web" };
      d.roles.push(newRole);
      return { success: true, message: "Role created", data: newRole };
    }
    return { success: true, message: "Roles fetched", data: d.roles };
  }

  // ── SYSTEM USERS ─────────────────────────────────────────────────────────
  if (path.includes('/system-users')) {
    const suIdx = segments.indexOf('system-users');
    const userId = parseInt(segments[suIdx + 1] || '', 10);
    if (!isNaN(userId)) {
      if (method === 'DELETE') { d.systemUsers = d.systemUsers.filter(u => u.id !== userId); return { success: true, message: "User deleted" }; }
      const user = d.systemUsers.find(u => u.id === userId);
      if ((method === 'POST' || method === 'PUT') && user && body) { Object.assign(user, body); return { success: true, message: "User updated", data: user }; }
      return { success: true, message: "User fetched", data: user };
    }
    if (method === 'POST' && body) {
      const newId = d.systemUsers.length ? Math.max(...d.systemUsers.map(u => u.id as number)) + 1 : 1;
      const role = d.roles.find(r => r.id === parseInt(String(body.role_id), 10));
      const newUser = { id: newId, ...body, role_name: role?.name || "", status: "active" };
      d.systemUsers.push(newUser);
      return { success: true, message: "System user created", data: newUser };
    }
    return { success: true, message: "System users fetched", data: d.systemUsers };
  }

  // ── NOTIFICATIONS ────────────────────────────────────────────────────────
  if (path.includes('/notifications')) {
    const unreadCount = d.notifications.filter(n => !n.is_read).length;
    if (method === 'POST') {
      d.notifications = d.notifications.map(n => ({ ...n, is_read: true }));
      return { success: true, message: "All notifications marked as read" };
    }
    return { success: true, message: "Notifications fetched", data: { ...paginate(d.notifications, page), unread_count: unreadCount } };
  }

  // ── WALLET ───────────────────────────────────────────────────────────────
  if (path.includes('/withdrawals')) {
    if (path.includes('/history')) {
      return { success: true, message: "Withdrawals history fetched", data: paginate(d.withdrawals, page) };
    }
    if (method === 'POST' && body) {
      const amt = String(body.amount || '50.00');
      const newW = { id: d.withdrawals.length + 1, amount: amt, status: "pending", payment_method: "bank_transfer", bank_name: "National Merchant Bank", account_number: "****3210", created_at: new Date().toISOString() };
      d.withdrawals.unshift(newW);
      const bal = parseFloat(String(d.profile.wallet_balance)) - parseFloat(amt);
      d.profile.wallet_balance = bal.toFixed(2);
      d.transactions.unshift({ id: d.transactions.length + 1, type: "debit", amount: amt, status: "pending", message: "Withdrawal request", created_at: new Date().toISOString() });
      return { success: true, message: "Withdrawal request submitted", data: newW };
    }
  }
  if (path.includes('/wallet')) {
    if (path.includes('/transactions')) {
      return { success: true, message: "Transactions fetched", data: paginate(d.transactions, page) };
    }
    return { success: true, message: "Wallet details fetched", data: { balance: d.profile.wallet_balance, currency: "USD" } };
  }

  // ── COMMISSIONS / EARNINGS ───────────────────────────────────────────────
  if (path.includes('/commissions')) {
    if (path.includes('/debits')) return { success: true, message: "Unsettled debits fetched", data: paginate(d.unsettledDebits, page) };
    if (path.includes('/history')) return { success: true, message: "Settled commissions fetched", data: paginate(d.settledCommissions, page) };
    return { success: true, message: "Unsettled credits fetched", data: paginate(d.unsettledCredits, page) };
  }

  // ── DELIVERY ZONES ───────────────────────────────────────────────────────
  if (path.includes('/delivery-zone')) {
    const dzIdx = segments.indexOf('delivery-zone');
    const dzId = parseInt(segments[dzIdx + 1] || '', 10);
    if (!isNaN(dzId)) {
      if (method === 'DELETE') { d.deliveryZones = d.deliveryZones.filter(z => z.id !== dzId); return { success: true, message: "Delivery zone deleted" }; }
      const zone = d.deliveryZones.find(z => z.id === dzId);
      if ((method === 'POST' || method === 'PUT') && zone && body) { Object.assign(zone, body); return { success: true, message: "Zone updated", data: zone }; }
      return { success: true, message: "Zone fetched", data: zone };
    }
    if (method === 'POST' && body) {
      const newId = d.deliveryZones.length ? Math.max(...d.deliveryZones.map(z => z.id as number)) + 1 : 1;
      const newZone = { id: newId, ...body, status: "active" };
      d.deliveryZones.push(newZone);
      return { success: true, message: "Delivery zone created", data: newZone };
    }
    return { success: true, message: "Delivery zones fetched", data: d.deliveryZones };
  }

  // ── SUBSCRIPTIONS ────────────────────────────────────────────────────────
  if (path.includes('/subscription/plans')) {
    return { success: true, message: "Subscription plans fetched", data: { plans: d.subscriptionPlans, settings: { enableSubscription: true, daysBeforeReminder: 3 } } };
  }
  if (path.includes('/subscription/check-eligibility')) {
    return { success: true, message: "User is eligible", data: { is_eligible: true, reason: "" } };
  }
  if (path.includes('/subscription/buy') && method === 'POST' && body) {
    const planId = parseInt(String(body.plan_id || '1'), 10);
    const selectedPlan = d.subscriptionPlans.find(p => p.id === planId) || d.subscriptionPlans[0];
    const limits = selectedPlan.limits as Record<string, unknown>;
    d.currentSubscription = { id: d.subscriptionHistory.length + 51, plan_id: selectedPlan.id, plan_name: selectedPlan.name, price: selectedPlan.price, starts_at: new Date().toISOString(), ends_at: new Date(Date.now() + 30 * 86400000).toISOString(), max_stores: limits.max_stores, max_products: limits.max_products, commission_percent: limits.commission_percent, status: "active" };
    d.subscriptionHistory.unshift({ ...d.currentSubscription, created_at: new Date().toISOString() });
    return { success: true, message: "Subscription purchased successfully", data: d.currentSubscription };
  }
  if (path.includes('/subscription/current')) {
    return { success: true, message: "Current subscription fetched", data: d.currentSubscription };
  }
  if (path.includes('/subscription/history')) {
    return { success: true, message: "Subscription history fetched", data: paginate(d.subscriptionHistory, page) };
  }

  // ── ADDON GROUPS ─────────────────────────────────────────────────────────
  if (path.includes('/addon-groups')) {
    const agIdx = segments.indexOf('addon-groups');
    const agId = parseInt(segments[agIdx + 1] || '', 10);
    if (!isNaN(agId)) {
      if (method === 'DELETE') { d.addonGroups = d.addonGroups.filter(g => g.id !== agId); return { success: true, message: "Addon group deleted" }; }
      const group = d.addonGroups.find(g => g.id === agId);
      if ((method === 'POST' || method === 'PUT') && group && body) { Object.assign(group, body); return { success: true, message: "Addon group updated", data: group }; }
      return { success: true, message: "Addon group fetched", data: group };
    }
    if (method === 'POST' && body) {
      const newId = d.addonGroups.length ? Math.max(...d.addonGroups.map(g => g.id as number)) + 1 : 1;
      const newGroup = { id: newId, ...body, status: "active", items: [] };
      d.addonGroups.push(newGroup);
      return { success: true, message: "Addon group created", data: newGroup };
    }
    return { success: true, message: "Addon groups fetched", data: d.addonGroups };
  }

  // ── PRODUCT ADDONS ───────────────────────────────────────────────────────
  if (path.includes('/product-addons')) {
    if (path.includes('/lookup/products')) return { success: true, message: "Products lookup", data: d.products.map(p => ({ id: p.id, title: p.title, slug: p.slug })) };
    if (path.includes('/lookup/addon-groups')) return { success: true, message: "Addon groups lookup", data: d.addonGroups.map(g => ({ id: g.id, title: g.title, slug: g.slug })) };
    return { success: true, message: "Product addons fetched", data: d.productAddons };
  }

  // ── STORE ADDON ITEMS ─────────────────────────────────────────────────────
  if (path.includes('/store-addon-items')) {
    if (path.includes('/lookup/stores')) return { success: true, message: "Stores lookup", data: d.stores.map(s => ({ id: s.id, name: s.name })) };
    if (path.includes('/lookup/addon-groups')) return { success: true, message: "Addon groups lookup", data: d.addonGroups.map(g => ({ id: g.id, title: g.title })) };
    return { success: true, message: "Store addon items fetched", data: d.storeAddonItems };
  }

  // ── AD WALLET ────────────────────────────────────────────────────────────
  if (path.includes('/ad-wallet')) {
    if (path.includes('/transactions')) return { success: true, message: "Ad wallet transactions fetched", data: [] };
    return { success: true, message: "Ad wallet fetched", data: { balance: "250.00", currency: "USD" } };
  }

  // ── AD CAMPAIGNS ─────────────────────────────────────────────────────────
  if (path.includes('/ad-campaigns')) {
    if (path.includes('/config')) return { success: true, message: "Ad campaign config fetched", data: { min_budget: 5.0, per_day_cost: 2.0 } };
    return { success: true, message: "Ad campaigns fetched", data: [] };
  }

  // ── FALLBACK ─────────────────────────────────────────────────────────────
  return { success: true, message: "Success (stubbed response)", data: {} };
}
