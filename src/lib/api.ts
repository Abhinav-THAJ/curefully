import Cookies from 'js-cookie';
import { ApiRoutes } from './apiRoutes';

const TOKEN_KEY = 'seller_access_token';
const USER_DATA_KEY = 'seller_user_data';

export function getToken(): string | null {
  return Cookies.get(TOKEN_KEY) || null;
}

export function setToken(token: string) {
  Cookies.set(TOKEN_KEY, token, { expires: 30, secure: false });
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USER_DATA_KEY);
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_DATA_KEY);
  }
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function getUserData() {
  try {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(USER_DATA_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function setUserData(data: unknown) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
  }
}

// ---- ACTUAL API FETCHER ----
const getHeaders = (isMultipart = false) => {
  const token = getToken();
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'lang': 'en', // Matching Flutter Security.headers()
  };
  
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

async function handleResponse(res: Response): Promise<any> {
  if (res.status === 401) {
    removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    throw new Error('Unauthorized');
  }

  // Gracefully handle HTML or invalid JSON
  const text = await res.text();
  let data: any;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error(res.ok ? "Invalid JSON response" : `HTTP Error ${res.status}`);
  }

  if (!res.ok) {
    // Extract the most useful error message
    const msg = (data?.message as string)
      || (data?.error as string)
      || `HTTP error! status: ${res.status}`;
    throw new Error(msg);
  }

  // If the response has an access_token, it's a successful auth response
  // (some backends return success:false with a token, so check token first)
  if (data?.access_token || data?.token) {
    return data;
  }

  if (data && data.success === false) {
    throw new Error((data.message as string) || 'API request failed');
  }

  return data;
}

export const api = {
  async get(url: string) {
    const res = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  async post(url: string, body: any) {
    const res = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  async put(url: string, body: any) {
    const res = await fetch(url, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  async delete(url: string) {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  async postMultipart(url: string, formData: FormData) {
    // Note: Do not set Content-Type for FormData, the browser sets it automatically with the boundary
    const headers = getHeaders(true);
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });
    return handleResponse(res);
  }
};

// ---- AUTHENTICATION APIs ----
export async function loginApi(email: string, password: string) {
  const response = await api.post(ApiRoutes.login, { email, password, mobile: 0, device_type: 'web' });
  const token = response?.access_token || response?.token || response?.data?.access_token || response?.data?.token;
  if (token) {
    setToken(token);
  }
  if (response?.data) {
    setUserData(response.data);
  }
  return response;
}

export async function sendOtpApi(phone: string) {
  return await api.post(ApiRoutes.sendOtp, { mobile: phone });
}

export async function verifyOtpApi(phone: string, otp: string) {
  const response = await api.post(ApiRoutes.verifyOtp, { mobile: phone, otp });
  const token = response?.access_token || response?.token || response?.data?.access_token || response?.data?.token;
  if (token) {
    setToken(token);
  }
  if (response?.data) {
    setUserData(response.data);
  }
  return response;
}

export async function forgotPasswordApi(email: string) {
  return await api.post(ApiRoutes.forgetPassword, { email });
}

export async function logoutApi() {
  try {
    await api.post(ApiRoutes.logout, {});
  } catch (e) {
    console.error(e);
  } finally {
    removeToken();
  }
}
