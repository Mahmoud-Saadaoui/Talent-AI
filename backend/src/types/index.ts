// ========================================
// TYPES GLOBAUX PARTAGÉS
// ========================================
// Ces types sont utilisés par plusieurs modules de l'application.
// NE mettre ici que les types VRAIMENT partagés.
// Les types spécifiques à un module vont dans src/modules/xxx/types.ts

// Format de réponse standard de l'API
export interface ApiResponse<T = unknown> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  timestamp?: string;
}

// Format d'erreur standard de l'API
export interface ApiErrorResponse {
  status: 'error';
  message: string;
  statusCode?: number;
  timestamp?: string;
}

// Configuration de l'application
export interface AppConfig {
  port: number;
  nodeEnv: string;
  clientUrl: string;
  db: {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
  };
}

// Types de pagination (utilisés par plusieurs modules)
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
