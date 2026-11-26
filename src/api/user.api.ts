import { AuthUser, UpdatePreferencesPayload, UserQuota } from '@/types/rankly';
import { mockStore } from '@/utils/mockStore';
import { apiRequest } from './client';

export const userApi = {
  updatePreferences(payload: UpdatePreferencesPayload): Promise<AuthUser> {
    return apiRequest<AuthUser>(
      '/user/preferences',
      { method: 'PATCH', body: JSON.stringify(payload) },
      () => {
        if (mockStore.user) {
          mockStore.user = { ...mockStore.user, ...payload };
        }
        return mockStore.user!;
      }
    );
  },

  getQuota(): Promise<UserQuota> {
    return apiRequest<UserQuota>('/user/quota', { method: 'GET' }, () => ({ ...mockStore.quota }));
  },
};
