import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { alertsApi } from '@/api/alerts.api';

export const alertKeys = {
  all: ['alerts'] as const,
};

export function useAlerts(domainId?: number) {
  return useQuery({
    queryKey: [...alertKeys.all, domainId ?? 'all'],
    queryFn: () => alertsApi.list(domainId, false),
  });
}

export function useMarkAlertRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (alertId: number) => alertsApi.markRead(alertId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: alertKeys.all });
    },
  });
}

export function useMarkAllAlertsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (domainId?: number) => alertsApi.markAllRead(domainId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: alertKeys.all });
    },
  });
}
