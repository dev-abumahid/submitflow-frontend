export type UserRole = "STUDENT" | "MENTOR";

export type ProjectStatus = "PENDING" | "IN_PROGRESS" | "REJECTED" | "APPROVED";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  isDeleted?: boolean;
}

export interface ProjectUserSummary {
  id: string;
  fullName: string;
  email: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  gitRepoUrl: string;
  previewUrl: string;
  reviewerFeedBack: string | null;
  status: ProjectStatus;
  submitterId: string;
  reviewerId: string | null;
  createdAt: string;
  updatedAt: string;
  submitter?: ProjectUserSummary;
  reviewer?: ProjectUserSummary | null;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta | null;
  errorSources?: { path: string; message: string }[];
}

export interface CreateProjectPayload {
  name: string;
  description: string;
  gitRepoUrl: string;
  previewUrl: string;
}

export type UpdateProjectPayload = Partial<CreateProjectPayload>;

export interface ReviewProjectPayload {
  status: "IN_PROGRESS" | "REJECTED" | "APPROVED";
  reviewerFeedBack?: string;
}

export interface ProjectQueryParams {
  searchTerm?: string;
  status?: ProjectStatus;
  page?: number;
  limit?: number;
  studentId?: string;
  sortOrder?: "asc" | "desc";
}
