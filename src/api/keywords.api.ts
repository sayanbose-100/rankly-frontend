import { BatchAccepted, KeywordRow, RankHistoryPoint } from '@/types/rankly';
import { mockStore } from '@/utils/mockStore';
import { apiRequest } from './client';

export const keywordsApi = {
  listByDomain(domainId: number): Promise<KeywordRow[]> {
    return apiRequest<KeywordRow[]>(
      `/domains/${domainId}/keywords`,
      { method: 'GET' },
      () => mockStore.keywords.filter((k) => k.domainId === domainId).map((k) => ({ ...k }))
    );
  },

  searchBatch(domainId: number, keywords: string[]): Promise<BatchAccepted> {
    return apiRequest<BatchAccepted>(
      `/domains/${domainId}/keywords/search`,
      { method: 'POST', body: JSON.stringify({ keywords }) },
      () => mockStore.submitBatchKeywords(domainId, keywords)
    );
  },

  refreshDomainKeywords(domainId: number, keywordIds?: number[]): Promise<BatchAccepted> {
    return apiRequest<BatchAccepted>(
      `/domains/${domainId}/keywords/refresh`,
      { method: 'POST', body: JSON.stringify({ keywordIds: keywordIds ?? [] }) },
      () => {
        const targets = mockStore.keywords
          .filter((k) => k.domainId === domainId && (!keywordIds?.length || keywordIds.includes(k.id)))
          .map((k) => k.phrase);
        return mockStore.submitBatchKeywords(domainId, targets);
      }
    );
  },

  getBatchStatus(batchId: number): Promise<BatchAccepted> {
    return apiRequest<BatchAccepted>(`/batches/${batchId}`, { method: 'GET' }, () => {
      const batch = mockStore.batches[batchId];
      if (!batch) {
        return {
          batchId,
          domainId: 0,
          totalKeywords: 1,
          completedKeywords: 1,
          failedKeywords: 0,
          status: 'COMPLETED',
        };
      }
      return { ...batch };
    });
  },

  getRankHistory(domainId: number, keywordId: number): Promise<RankHistoryPoint[]> {
    return apiRequest<RankHistoryPoint[]>(
      `/keywords/${keywordId}/history`,
      { method: 'GET' },
      () => [...(mockStore.historyMap[keywordId] ?? [])]
    );
  },

  deleteKeyword(domainId: number, keywordId: number): Promise<void> {
    return apiRequest<void>(
      `/keywords/${keywordId}`,
      { method: 'DELETE' },
      () => {
        mockStore.keywords = mockStore.keywords.filter((k) => k.id !== keywordId);
        mockStore.recalculateDomainStats(domainId);
      }
    );
  },
};
