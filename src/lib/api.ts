export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const getTokenFromCookie = () => {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    if (match) return match[2];
  }
  return null;
};

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = getTokenFromCookie();
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "omit", // We are using Bearer tokens, so we don't need cross-origin cookies
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};
