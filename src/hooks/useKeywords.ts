import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { keywordsApi } from '@/api/keywords.api';
import { alertKeys } from './useAlerts';
import { domainKeys } from './useDomains';
import { quotaKeys } from './useQuota';

export const keywordKeys = {
  byDomain: (domainId: number) => ['domains', domainId, 'keywords'] as const,
  history: (domainId: number, keywordId: number) =>
    ['domains', domainId, 'keywords', keywordId, 'history'] as const,
  batch: (batchId: number) => ['batches', batchId] as const,
};

export function useDomainKeywords(domainId: number, activeBatchId: number | null) {
  return useQuery({
    queryKey: keywordKeys.byDomain(domainId),
    queryFn: () => keywordsApi.listByDomain(domainId),
    enabled: Number.isFinite(domainId) && domainId > 0,
    refetchInterval: activeBatchId ? 1000 : false,
  });
}

export function useBatchProgress(domainId: number, batchId: number | null, onComplete: () => void) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: keywordKeys.batch(batchId ?? 0),
    queryFn: async () => {
      const batch = await keywordsApi.getBatchStatus(batchId!);
      if (batch.status === 'COMPLETED' || batch.status === 'PARTIAL_FAILURE') {
        queryClient.invalidateQueries({ queryKey: keywordKeys.byDomain(domainId) });
        queryClient.invalidateQueries({ queryKey: domainKeys.all });
        queryClient.invalidateQueries({ queryKey: domainKeys.detail(domainId) });
        queryClient.invalidateQueries({ queryKey: alertKeys.all });
        queryClient.invalidateQueries({ queryKey: quotaKeys.all });
        onComplete();
      }
      return batch;
    },
    enabled: batchId !== null,
    refetchInterval: batchId !== null ? 900 : false,
  });
}

export function useSearchKeywordsBatch(domainId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (phrases: string[]) => keywordsApi.searchBatch(domainId, phrases),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keywordKeys.byDomain(domainId) });
    },
  });
}

export function useRefreshKeywords(domainId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (keywordIds?: number[]) => keywordsApi.refreshDomainKeywords(domainId, keywordIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keywordKeys.byDomain(domainId) });
    },
  });
}

export function useDeleteKeyword(domainId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (keywordId: number) => keywordsApi.deleteKeyword(domainId, keywordId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keywordKeys.byDomain(domainId) });
      queryClient.invalidateQueries({ queryKey: domainKeys.all });
    },
  });
}
