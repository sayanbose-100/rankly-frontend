import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/api/user.api';

export const quotaKeys = {
  all: ['user', 'quota'] as const,
};

export function useQuota() {
  return useQuery({
    queryKey: quotaKeys.all,
    queryFn: () => userApi.getQuota(),
  });
}
