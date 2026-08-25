// src/lib/api.ts

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export interface ApiResponseEnvelope<T = any> {
  statusCode: number;
  message: string;
  data: T;
  meta?: any;
}

export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("pg_access_token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `API Error (${res.status})`);
    }

    // NestJS response standardization envelope returns { data: ... }
    return data.data !== undefined ? data.data : data;
  } catch (error) {
    console.warn(`[API] Request to ${cleanEndpoint} failed:`, error);
    throw error;
  }
}

export const api = {
  get: <T = any>(endpoint: string) => fetchApi<T>(endpoint, { method: "GET" }),
  post: <T = any>(endpoint: string, body?: any) =>
    fetchApi<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  patch: <T = any>(endpoint: string, body?: any) =>
    fetchApi<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: <T = any>(endpoint: string) =>
    fetchApi<T>(endpoint, { method: "DELETE" }),
};
