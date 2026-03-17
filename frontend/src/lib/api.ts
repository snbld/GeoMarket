const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem("geomarket_token", token);
    } else {
      localStorage.removeItem("geomarket_token");
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== "undefined") {
      this.token = localStorage.getItem("geomarket_token");
    }
    return this.token;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    };

    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${path}`, { ...options, headers });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.detail || `API error: ${res.status}`);
    }

    return res.json();
  }

  // Auth
  async register(data: { email: string; password: string; full_name: string; company?: string }) {
    return this.request<{ access_token: string; refresh_token: string }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(email: string, password: string) {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.detail || "Login failed");
    }

    return res.json() as Promise<{ access_token: string; refresh_token: string }>;
  }

  async getMe() {
    return this.request<{ id: string; email: string; full_name: string; company: string | null; role: string }>("/api/auth/me");
  }

  // Datasets
  async listDatasets(params?: { data_type?: string; bbox?: string; limit?: number; offset?: number }) {
    const query = new URLSearchParams();
    if (params?.data_type) query.set("data_type", params.data_type);
    if (params?.bbox) query.set("bbox", params.bbox);
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.offset) query.set("offset", String(params.offset));
    const qs = query.toString();
    return this.request<Dataset[]>(`/api/datasets/${qs ? `?${qs}` : ""}`);
  }

  async getDataset(id: string) {
    return this.request<Dataset>(`/api/datasets/${id}`);
  }

  async createDataset(data: { title: string; description: string; data_type: string; file_format: string; price: number }) {
    return this.request<{ dataset_id: string; upload_url: string; s3_key: string }>("/api/datasets/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Health
  async health() {
    return this.request<{ status: string; service: string }>("/api/health");
  }
}

export interface Dataset {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  data_type: string;
  file_format: string;
  price: number;
  status: string;
  avg_rating: number | null;
  review_count: number;
  download_count: number;
  crs: string | null;
  metadata_json: Record<string, unknown> | null;
  created_at: string;
}

export const api = new ApiClient();
