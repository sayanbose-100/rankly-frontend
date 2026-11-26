import { AuthUser, LoginPayload, RegisterPayload } from '@/types/rankly';
import { mockStore } from '@/utils/mockStore';
import { apiRequest } from './client';

export const authApi = {
  getMe(): Promise<AuthUser | null> {
    return apiRequest<AuthUser | null>('/auth/me', { method: 'GET' }, () => mockStore.user);
  },

  login(payload: LoginPayload): Promise<AuthUser> {
    return apiRequest<AuthUser>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify(payload) },
      () => {
        const user: AuthUser = {
          id: 1,
          email: payload.email.trim().toLowerCase(),
          fullName: payload.email.split('@')[0] || 'Rankly User',
          themePreference: mockStore.user?.themePreference ?? 'LIGHT',
          emailAlertsEnabled: true,
          dailyApiQuota: 250,
        };
        mockStore.user = user;
        return user;
      }
    );
  },

  register(payload: RegisterPayload): Promise<AuthUser> {
    return apiRequest<AuthUser>(
      '/auth/register',
      { method: 'POST', body: JSON.stringify(payload) },
      () => {
        const user: AuthUser = {
          id: Date.now(),
          email: payload.email.trim().toLowerCase(),
          fullName: payload.fullName.trim(),
          themePreference: 'LIGHT',
          emailAlertsEnabled: true,
          dailyApiQuota: 250,
        };
        mockStore.user = user;
        return user;
      }
    );
  },

  logout(): Promise<void> {
    return apiRequest<void>('/auth/logout', { method: 'POST' }, () => {
      mockStore.user = null;
    });
  },
};
