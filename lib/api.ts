import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import type {
  ApiResponse,
  CreateProjectPayload,
  Project,
  ProjectQueryParams,
  ReviewProjectPayload,
  UpdateProjectPayload,
  User,
} from "@/types/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const TOKEN_STORAGE_KEY = "submitflow_access_token";
export const REFRESH_TOKEN_STORAGE_KEY = "submitflow_refresh_token";
export const USER_STORAGE_KEY = "submitflow_user";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setStoredToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

export function getStoredRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
}

export function setStoredRefreshToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  }
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: User | null) {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}

// Request interceptor: attach Authorization header if token exists
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getStoredToken();
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle token expiration and automatic refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isAuthUrl =
      originalRequest.url?.includes("/api/auth/sign-in") ||
      originalRequest.url?.includes("/api/auth/sign-up") ||
      originalRequest.url?.includes("/api/auth/refresh-token");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthUrl) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getStoredRefreshToken();
        const refreshResponse = await axios.post<
          ApiResponse<{ accessToken: string; refreshToken: string }>
        >(
          `${API_BASE_URL}/api/auth/refresh-token`,
          refreshToken ? { refreshToken } : {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.data.accessToken;
        const newRefreshToken = refreshResponse.data.data.refreshToken;

        setStoredToken(newAccessToken);
        if (newRefreshToken) {
          setStoredRefreshToken(newRefreshToken);
        }

        apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        setStoredToken(null);
        setStoredRefreshToken(null);
        setStoredUser(null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const authApi = {
  signIn: async (payload: { email: string; password: string }) => {
    const res = await apiClient.post<
      ApiResponse<{ accessToken: string; refreshToken: string }>
    >("/api/auth/sign-in", payload);
    return res.data;
  },
  signUp: async (payload: {
    email: string;
    password: string;
    fullName: string;
  }) => {
    const res = await apiClient.post<ApiResponse<User>>(
      "/api/auth/sign-up",
      payload
    );
    return res.data;
  },
  refreshToken: async (refreshToken?: string) => {
    const res = await apiClient.post<
      ApiResponse<{ accessToken: string; refreshToken: string }>
    >("/api/auth/refresh-token", refreshToken ? { refreshToken } : {});
    return res.data;
  },
  signOut: async (refreshToken?: string) => {
    const res = await apiClient.post<ApiResponse<null>>(
      "/api/auth/sign-out",
      refreshToken ? { refreshToken } : {}
    );
    return res.data;
  },
  signOutAll: async () => {
    const res = await apiClient.post<ApiResponse<null>>(
      "/api/auth/sign-out-all"
    );
    return res.data;
  },
  getMe: async () => {
    const res = await apiClient.get<ApiResponse<User>>("/api/auth/me");
    return res.data;
  },
  changePassword: async (payload: {
    oldPassword: string;
    newPassword: string;
  }) => {
    const res = await apiClient.put<
      ApiResponse<{ accessToken: string; refreshToken: string }>
    >("/api/auth/change-password", payload);
    return res.data;
  },
};

export const projectApi = {
  getProjects: async (params?: ProjectQueryParams) => {
    const res = await apiClient.get<ApiResponse<Project[]>>("/api/project", {
      params,
    });
    return res.data;
  },
  getProject: async (id: string) => {
    const res = await apiClient.get<ApiResponse<Project>>(
      `/api/project/${id}`
    );
    return res.data;
  },
  createProject: async (payload: CreateProjectPayload) => {
    const res = await apiClient.post<ApiResponse<Project>>(
      "/api/project",
      payload
    );
    return res.data;
  },
  updateProject: async (id: string, payload: UpdateProjectPayload) => {
    const res = await apiClient.patch<ApiResponse<Project>>(
      `/api/project/${id}`,
      payload
    );
    return res.data;
  },
  reviewProject: async (id: string, payload: ReviewProjectPayload) => {
    const res = await apiClient.put<ApiResponse<Project>>(
      `/api/project/${id}`,
      payload
    );
    return res.data;
  },
};
