// The real backend URL (kept for reference, not used directly by browser)
export const DOMAIN_URL = process.env.NEXT_PUBLIC_API_URL || 'https://curefully-backend-production-eijmhh.laravel.cloud';

// All browser requests go through our local Next.js mock API to avoid CORS.
// /api/proxy maps to src/app/api/proxy/[...path]/route.ts → mockDb.ts
const PROXY_BASE = '/api/proxy';
export const BASE_URL = `${PROXY_BASE}/api`;
export const SELLER_URL = `${BASE_URL}/seller`;

export const ApiRoutes = {
  // Auth
  login:           `${SELLER_URL}/login`,
  loginWithOtp:    `${SELLER_URL}/login-with-otp`,
  sendOtp:         `${BASE_URL}/auth/send-otp`,
  verifyOtp:       `${BASE_URL}/auth/verify-otp`,
  forgetPassword:  `${BASE_URL}/forget-password`,
  register:        `${SELLER_URL}/register`,
  logout:          `${SELLER_URL}/logout`,
  deleteAccount:   `${SELLER_URL}/delete-account`,

  // User
  profile:         `${BASE_URL}/user/profile`,
  changePassword:  `${BASE_URL}/user/change-password`,

  // Dashboard
  dashboard:       `${SELLER_URL}/dashboard`,

  // Orders
  orders:          `${SELLER_URL}/orders`,
  orderEnums:      `${SELLER_URL}/orders/enums`,

  // Products
  products:        `${SELLER_URL}/products`,
  productEnums:    `${SELLER_URL}/products/enums`,
  productFaqs:     `${SELLER_URL}/product-faqs`,

  // Catalog
  categories:      `${BASE_URL}/categories`,
  brands:          `${SELLER_URL}/brands`,
  attributes:      `${SELLER_URL}/attributes`,
  attributeValues: `${SELLER_URL}/attribute-values`,
  taxGroups:       `${SELLER_URL}/tax-classes`,

  // Store management
  stores:          `${SELLER_URL}/stores`,
  roles:           `${SELLER_URL}/roles`,
  systemUsers:     `${SELLER_URL}/system-users`,
  deliveryZones:   `${BASE_URL}/delivery-zone`,

  // Finance
  wallet:          `${SELLER_URL}/wallet`,
  transactions:    `${SELLER_URL}/wallet/transactions`,
  withdrawals:     `${SELLER_URL}/withdrawals`,
  withdrawalHistory: `${SELLER_URL}/withdrawals/history`,
  commissions:     `${SELLER_URL}/commissions`,
  commissionDebits:  `${SELLER_URL}/commissions/debits`,
  commissionHistory: `${SELLER_URL}/commissions/history`,

  // Notifications
  notifications:   `${SELLER_URL}/notifications`,

  // Subscriptions
  subscriptions:           `${BASE_URL}/subscription/plans`,
  subscriptionCurrent:     `${SELLER_URL}/subscription/current`,
  subscriptionBuy:         `${SELLER_URL}/subscription/buy`,
  subscriptionHistory:     `${SELLER_URL}/subscription/history`,
  subscriptionEligibility: `${SELLER_URL}/subscription/check-eligibility`,

  // Addons & Inventory
  addonGroups:     `${SELLER_URL}/addon-groups`,
  productAddons:   `${SELLER_URL}/product-addons`,
  storeAddonItems: `${SELLER_URL}/store-addon-items`,

  // Ad Wallet & Campaigns
  adWallet:             `${SELLER_URL}/ad-wallet`,
  adWalletTransactions: `${SELLER_URL}/ad-wallet/transactions`,
  adCampaigns:          `${SELLER_URL}/ad-campaigns`,
  adCampaignConfig:     `${SELLER_URL}/ad-campaigns/config`,

  // Settings
  settings: `${BASE_URL}/settings`,
};
