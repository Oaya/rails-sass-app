import type { AxiosError } from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface ApiResponse {
    success: boolean;
    message?: string;
    data?: any;
    error?: AxiosError | string;
    status?: number;
  }
}

export {};
