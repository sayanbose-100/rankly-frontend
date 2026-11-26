import { AlertItem } from '@/types/rankly';
import { mockStore } from '@/utils/mockStore';
import { apiRequest } from './client';

export const alertsApi = {
  list(domainId?: number, unreadOnly = false): Promise<AlertItem[]> {
    const params = new URLSearchParams();
    if (domainId) params.set('domainId', String(domainId));
    if (unreadOnly) params.set('unreadOnly', 'true');
    const query = params.toString() ? `?${params.toString()}` : '';

    return apiRequest<AlertItem[]>(`/alerts${query}`, { method: 'GET' }, () =>
      mockStore.alerts.filter(
        (a) => (!domainId || a.domainId === domainId) && (!unreadOnly || !a.isRead)
      )
    );
  },

  markRead(alertId: number): Promise<void> {
    return apiRequest<void>(`/alerts/${alertId}/read`, { method: 'PATCH' }, () => {
      const target = mockStore.alerts.find((a) => a.id === alertId);
      if (target) target.isRead = true;
    });
  },

  markAllRead(domainId?: number): Promise<void> {
    const query = domainId ? `?domainId=${domainId}` : '';
    return apiRequest<void>(`/alerts/read-all${query}`, { method: 'POST' }, () => {
      mockStore.alerts.forEach((a) => {
        if (!domainId || a.domainId === domainId) {
          a.isRead = true;
        }
      });
    });
  },
};
