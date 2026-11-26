import { CreateDomainPayload, DomainSummary } from '@/types/rankly';
import { mockStore } from '@/utils/mockStore';
import { apiRequest } from './client';

export const domainsApi = {
  list(): Promise<DomainSummary[]> {
    return apiRequest<DomainSummary[]>('/domains', { method: 'GET' }, () => [...mockStore.domains]);
  },

  getById(domainId: number): Promise<DomainSummary> {
    return apiRequest<DomainSummary>(`/domains/${domainId}`, { method: 'GET' }, () => {
      const found = mockStore.domains.find((d) => d.id === domainId);
      if (!found) throw new Error('Domain not found');
      return { ...found };
    });
  },

  create(payload: CreateDomainPayload): Promise<DomainSummary> {
    return apiRequest<DomainSummary>(
      '/domains',
      { method: 'POST', body: JSON.stringify(payload) },
      () => mockStore.addDomain(payload)
    );
  },

  remove(domainId: number): Promise<void> {
    return apiRequest<void>(`/domains/${domainId}`, { method: 'DELETE' }, () => {
      mockStore.deleteDomain(domainId);
    });
  },
};
