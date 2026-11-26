import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { domainsApi } from '@/api/domains.api';
import { CreateDomainPayload } from '@/types/rankly';
import { useAuth } from '@/context/AuthContext';

export const domainKeys = {
  all: ['domains'] as const,
  detail: (id: number) => ['domains', id] as const,
};

export function useDomains() {
  const { user, isLoading: isAuthLoading } = useAuth();

  return useQuery({
    queryKey: domainKeys.all,
    queryFn: () => domainsApi.list(),
    enabled: !isAuthLoading && Boolean(user),
  });
}

export function useDomain(domainId: number) {
  return useQuery({
    queryKey: domainKeys.detail(domainId),
    queryFn: () => domainsApi.getById(domainId),
    enabled: Number.isFinite(domainId) && domainId > 0,
  });
}

export function useCreateDomain() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateDomainPayload) => domainsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: domainKeys.all });
    },
  });
}

export function useDeleteDomain() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (domainId: number) => domainsApi.remove(domainId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: domainKeys.all });
    },
  });
}
