// Shared types used by both @mha/web and @mha/api

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  coverImage?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
