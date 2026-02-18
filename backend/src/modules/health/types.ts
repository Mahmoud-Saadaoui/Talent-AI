// ========================================
// TYPES SPÉCIFIQUES AU MODULE HEALTH
// ========================================
// Ce fichier contient uniquement les types utilisés par le module health.
// Si un type doit être utilisé par d'autres modules, le déplacer vers src/types/index.ts

import type { ApiResponse } from '@/types/index.js';

// Réponse du endpoint de santé
export interface HealthResponseData extends ApiResponse {
  timestamp: string;
}

// Informations sur le système (pour un health check détaillé)
export interface SystemInfo {
  uptime: number;
  memory: NodeJS.MemoryUsage;
  platform: string;
  nodeVersion: string;
}
