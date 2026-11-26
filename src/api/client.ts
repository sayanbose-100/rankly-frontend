const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
console.log("API_BASE_URL:: ", API_BASE_URL);
export const USE_MOCK_FALLBACK = (import.meta.env.VITE_USE_MOCK_FALLBACK ?? 'true') === 'true';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  mockFallback?: () => T | Promise<T>
): Promise<T> {
  try {
    console.log(`${API_BASE_URL}${path}`)
    const response = await fetch(`${API_BASE_URL}${path}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(response.status, errorText || `HTTP ${response.status}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  } catch (err) {
    if (USE_MOCK_FALLBACK && mockFallback && !(err instanceof ApiError && err.status === 401)) {
      return await mockFallback();
    }
    throw err;
  }
}
