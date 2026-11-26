import {
  AlertItem,
  AuthUser,
  BatchAccepted,
  CreateDomainPayload,
  DomainSummary,
  KeywordRow,
  RankHistoryPoint,
  UserQuota,
} from '@/types/rankly';
import { normalizeDomain } from './formatters';

const now = Date.now();
const dayMs = 86400000;

class MockRanklyStore {
  user: AuthUser | null = {
    id: 1,
    email: 'sayan@rankly.io',
    fullName: 'Sayan Chatterjee',
    themePreference: 'LIGHT',
    emailAlertsEnabled: true,
    dailyApiQuota: 250,
  };

  quota: UserQuota = {
    dailyLimit: 250,
    usedToday: 34,
    remainingToday: 216,
  };

  domains: DomainSummary[] = [
    {
      id: 101,
      domainName: 'rankly.io',
      targetCountry: 'US',
      targetDevice: 'desktop',
      keywordCount: 5,
      top10Count: 3,
      top100Count: 4,
      averageRank: 7.5,
      lastCheckedAt: new Date(now - 2 * 3600 * 1000).toISOString(),
    },
    {
      id: 102,
      domainName: 'cloudpulse.dev',
      targetCountry: 'IN',
      targetDevice: 'mobile',
      keywordCount: 3,
      top10Count: 2,
      top100Count: 3,
      averageRank: 11.3,
      lastCheckedAt: new Date(now - 5 * 3600 * 1000).toISOString(),
    },
  ];

  keywords: KeywordRow[] = [
    {
      id: 1001,
      domainId: 101,
      phrase: 'serp rank tracker api',
      currentRank: 3,
      previousRank: 7,
      rankDelta: 4,
      rankDirection: 'UP',
      bestRank: 3,
      rankingUrl: 'https://rankly.io/features/serp-api',
      checkStatus: 'COMPLETED',
      lastError: null,
      lastCheckedAt: new Date(now - 2 * 3600 * 1000).toISOString(),
    },
    {
      id: 1002,
      domainId: 101,
      phrase: 'automated keyword monitoring',
      currentRank: 6,
      previousRank: 5,
      rankDelta: -1,
      rankDirection: 'DOWN',
      bestRank: 4,
      rankingUrl: 'https://rankly.io/solutions/monitoring',
      checkStatus: 'COMPLETED',
      lastError: null,
      lastCheckedAt: new Date(now - 2 * 3600 * 1000).toISOString(),
    },
    {
      id: 1003,
      domainId: 101,
      phrase: 'google search position checker',
      currentRank: 9,
      previousRank: 14,
      rankDelta: 5,
      rankDirection: 'UP',
      bestRank: 9,
      rankingUrl: 'https://rankly.io/',
      checkStatus: 'COMPLETED',
      lastError: null,
      lastCheckedAt: new Date(now - 2 * 3600 * 1000).toISOString(),
    },
    {
      id: 1004,
      domainId: 101,
      phrase: 'daily seo rank alerts',
      currentRank: 12,
      previousRank: 12,
      rankDelta: 0,
      rankDirection: 'UNCHANGED',
      bestRank: 10,
      rankingUrl: 'https://rankly.io/alerts',
      checkStatus: 'COMPLETED',
      lastError: null,
      lastCheckedAt: new Date(now - 2 * 3600 * 1000).toISOString(),
    },
    {
      id: 1005,
      domainId: 101,
      phrase: 'enterprise rank intelligence saas',
      currentRank: null,
      previousRank: 42,
      rankDelta: -59,
      rankDirection: 'UNRANKED',
      bestRank: 28,
      rankingUrl: null,
      checkStatus: 'COMPLETED',
      lastError: null,
      lastCheckedAt: new Date(now - 2 * 3600 * 1000).toISOString(),
    },
    {
      id: 2001,
      domainId: 102,
      phrase: 'kubernetes latency monitor',
      currentRank: 4,
      previousRank: 6,
      rankDelta: 2,
      rankDirection: 'UP',
      bestRank: 4,
      rankingUrl: 'https://cloudpulse.dev/k8s',
      checkStatus: 'COMPLETED',
      lastError: null,
      lastCheckedAt: new Date(now - 5 * 3600 * 1000).toISOString(),
    },
    {
      id: 2002,
      domainId: 102,
      phrase: 'spring boot observability tool',
      currentRank: 8,
      previousRank: 11,
      rankDelta: 3,
      rankDirection: 'UP',
      bestRank: 8,
      rankingUrl: 'https://cloudpulse.dev/spring-boot',
      checkStatus: 'COMPLETED',
      lastError: null,
      lastCheckedAt: new Date(now - 5 * 3600 * 1000).toISOString(),
    },
    {
      id: 2003,
      domainId: 102,
      phrase: 'microservices health dashboard',
      currentRank: 22,
      previousRank: 19,
      rankDelta: -3,
      rankDirection: 'DOWN',
      bestRank: 15,
      rankingUrl: 'https://cloudpulse.dev/dashboard',
      checkStatus: 'COMPLETED',
      lastError: null,
      lastCheckedAt: new Date(now - 5 * 3600 * 1000).toISOString(),
    },
  ];

  historyMap: Record<number, RankHistoryPoint[]> = {
    1001: [18, 14, 11, 9, 7, 5, 3].map((pos, idx) => ({
      id: idx + 1,
      rankPosition: pos,
      rankingUrl: 'https://rankly.io/features/serp-api',
      serpFeatures: idx > 4 ? ['Featured Snippet', 'People Also Ask'] : ['People Also Ask'],
      source: 'SCHEDULED',
      checkedAt: new Date(now - (6 - idx) * dayMs).toISOString(),
    })),
    1002: [9, 8, 7, 6, 4, 5, 6].map((pos, idx) => ({
      id: idx + 20,
      rankPosition: pos,
      rankingUrl: 'https://rankly.io/solutions/monitoring',
      serpFeatures: ['Sitelinks'],
      source: 'SCHEDULED',
      checkedAt: new Date(now - (6 - idx) * dayMs).toISOString(),
    })),
    1003: [26, 22, 19, 17, 15, 14, 9].map((pos, idx) => ({
      id: idx + 40,
      rankPosition: pos,
      rankingUrl: 'https://rankly.io/',
      serpFeatures: [],
      source: 'SCHEDULED',
      checkedAt: new Date(now - (6 - idx) * dayMs).toISOString(),
    })),
    1004: [15, 14, 13, 11, 12, 12, 12].map((pos, idx) => ({
      id: idx + 60,
      rankPosition: pos,
      rankingUrl: 'https://rankly.io/alerts',
      serpFeatures: [],
      source: 'SCHEDULED',
      checkedAt: new Date(now - (6 - idx) * dayMs).toISOString(),
    })),
    1005: [31, 34, 36, 39, 40, 42, null].map((pos, idx) => ({
      id: idx + 80,
      rankPosition: pos,
      rankingUrl: pos ? 'https://rankly.io/enterprise' : null,
      serpFeatures: [],
      source: 'SCHEDULED',
      checkedAt: new Date(now - (6 - idx) * dayMs).toISOString(),
    })),
    2001: [11, 9, 8, 7, 6, 5, 4].map((pos, idx) => ({
      id: idx + 100,
      rankPosition: pos,
      rankingUrl: 'https://cloudpulse.dev/k8s',
      serpFeatures: ['People Also Ask'],
      source: 'SCHEDULED',
      checkedAt: new Date(now - (6 - idx) * dayMs).toISOString(),
    })),
    2002: [19, 16, 15, 13, 12, 11, 8].map((pos, idx) => ({
      id: idx + 120,
      rankPosition: pos,
      rankingUrl: 'https://cloudpulse.dev/spring-boot',
      serpFeatures: [],
      source: 'SCHEDULED',
      checkedAt: new Date(now - (6 - idx) * dayMs).toISOString(),
    })),
    2003: [16, 17, 18, 19, 19, 20, 22].map((pos, idx) => ({
      id: idx + 140,
      rankPosition: pos,
      rankingUrl: 'https://cloudpulse.dev/dashboard',
      serpFeatures: [],
      source: 'SCHEDULED',
      checkedAt: new Date(now - (6 - idx) * dayMs).toISOString(),
    })),
  };

  alerts: AlertItem[] = [
    {
      id: 501,
      domainId: 101,
      domainName: 'rankly.io',
      keywordId: 1005,
      keywordPhrase: 'enterprise rank intelligence saas',
      alertType: 'RANK_ABOVE_100',
      oldRank: 42,
      newRank: null,
      outOfTop100: true,
      message: 'Dropped out of Top 100 (>100) during the 06:00 AM daily monitor check (was #42).',
      isRead: false,
      createdAt: new Date(now - 2 * 3600 * 1000).toISOString(),
    },
    {
      id: 502,
      domainId: 101,
      domainName: 'rankly.io',
      keywordId: 1003,
      keywordPhrase: 'google search position checker',
      alertType: 'RANK_GAIN',
      oldRank: 14,
      newRank: 9,
      outOfTop100: false,
      message: 'Entered Top 10! Climbed +5 positions from #14 to #9.',
      isRead: false,
      createdAt: new Date(now - 2 * 3600 * 1000).toISOString(),
    },
  ];

  batches: Record<number, BatchAccepted> = {};

  recalculateDomainStats(domainId: number) {
    const domain = this.domains.find((d) => d.id === domainId);
    if (!domain) return;
    const domainKeywords = this.keywords.filter((k) => k.domainId === domainId);
    const ranked = domainKeywords.filter((k) => k.currentRank !== null);
    domain.keywordCount = domainKeywords.length;
    domain.top10Count = ranked.filter((k) => (k.currentRank ?? 999) <= 10).length;
    domain.top100Count = ranked.filter((k) => (k.currentRank ?? 999) <= 100).length;
    domain.averageRank =
      ranked.length > 0
        ? Number((ranked.reduce((sum, k) => sum + (k.currentRank ?? 0), 0) / ranked.length).toFixed(1))
        : null;
    domain.lastCheckedAt = new Date().toISOString();
  }

  addDomain(payload: CreateDomainPayload): DomainSummary {
    const cleanName = normalizeDomain(payload.domainName);
    const existing = this.domains.find((d) => d.domainName === cleanName);
    if (existing) return existing;

    const created: DomainSummary = {
      id: Date.now(),
      domainName: cleanName,
      targetCountry: payload.targetCountry.toUpperCase(),
      targetDevice: payload.targetDevice,
      keywordCount: 0,
      top10Count: 0,
      top100Count: 0,
      averageRank: null,
      lastCheckedAt: null,
    };
    this.domains.unshift(created);
    return created;
  }

  deleteDomain(domainId: number) {
    this.domains = this.domains.filter((d) => d.id !== domainId);
    this.keywords = this.keywords.filter((k) => k.domainId !== domainId);
    this.alerts = this.alerts.filter((a) => a.domainId !== domainId);
  }

  submitBatchKeywords(domainId: number, phrases: string[]): BatchAccepted {
    const batchId = Math.floor(Math.random() * 90000) + 10000;
    const domain = this.domains.find((d) => d.id === domainId);
    const createdOrExistingIds: number[] = [];

    phrases.forEach((phrase, i) => {
      const existing = this.keywords.find(
        (k) => k.domainId === domainId && k.phrase.toLowerCase() === phrase.toLowerCase()
      );
      if (existing) {
        existing.checkStatus = 'CHECKING';
        createdOrExistingIds.push(existing.id);
      } else {
        const newId = Date.now() + i;
        this.keywords.unshift({
          id: newId,
          domainId,
          phrase,
          currentRank: null,
          previousRank: null,
          rankDelta: null,
          rankDirection: 'NEW',
          bestRank: null,
          rankingUrl: null,
          checkStatus: 'CHECKING',
          lastError: null,
          lastCheckedAt: null,
        });
        createdOrExistingIds.push(newId);
      }
    });

    const batch: BatchAccepted = {
      batchId,
      domainId,
      totalKeywords: phrases.length,
      completedKeywords: 0,
      failedKeywords: 0,
      status: 'PROCESSING',
    };
    this.batches[batchId] = batch;

    createdOrExistingIds.forEach((kwId, index) => {
      setTimeout(() => {
        const kw = this.keywords.find((item) => item.id === kwId);
        if (!kw) return;
        const oldRank = kw.currentRank;
        // 15% chance of dropping >100 to demonstrate alert behavior
        const isOut = Math.random() < 0.15;
        const newRank = isOut ? null : Math.floor(Math.random() * 28) + 1;

        kw.previousRank = oldRank;
        kw.currentRank = newRank;
        kw.checkStatus = 'COMPLETED';
        kw.lastCheckedAt = new Date().toISOString();
        kw.rankingUrl = newRank
          ? `https://${domain?.domainName ?? 'example.com'}/${kw.phrase.replace(/\s+/g, '-')}`
          : null;

        if (newRank === null) {
          kw.rankDirection = 'UNRANKED';
          kw.rankDelta = oldRank !== null ? oldRank - 101 : null;
        } else if (oldRank === null) {
          kw.rankDirection = 'NEW';
          kw.rankDelta = null;
          kw.bestRank = kw.bestRank ? Math.min(kw.bestRank, newRank) : newRank;
        } else {
          const delta = oldRank - newRank;
          kw.rankDelta = delta;
          kw.rankDirection = delta > 0 ? 'UP' : delta < 0 ? 'DOWN' : 'UNCHANGED';
          kw.bestRank = kw.bestRank ? Math.min(kw.bestRank, newRank) : newRank;
        }

        const existingHist = this.historyMap[kw.id] ?? [
          {
            id: Date.now() - 2 * dayMs,
            rankPosition: oldRank ?? (newRank ? newRank + 4 : 35),
            rankingUrl: kw.rankingUrl,
            serpFeatures: [],
            source: 'SCHEDULED',
            checkedAt: new Date(Date.now() - dayMs).toISOString(),
          },
        ];

        this.historyMap[kw.id] = [
          ...existingHist,
          {
            id: Date.now() + index,
            rankPosition: newRank,
            rankingUrl: kw.rankingUrl,
            serpFeatures: newRank && newRank <= 5 ? ['Featured Snippet'] : [],
            source: 'BATCH',
            checkedAt: new Date().toISOString(),
          },
        ];

        if (newRank === null && domain) {
          this.alerts.unshift({
            id: Date.now() + index + 500,
            domainId: domain.id,
            domainName: domain.domainName,
            keywordId: kw.id,
            keywordPhrase: kw.phrase,
            alertType: 'RANK_ABOVE_100',
            oldRank,
            newRank: null,
            outOfTop100: true,
            message: `Keyword "${kw.phrase}" ranked >100 (outside Top 100 SERP results).`,
            isRead: false,
            createdAt: new Date().toISOString(),
          });
        }

        this.quota.usedToday = Math.min(this.quota.dailyLimit, this.quota.usedToday + 1);
        this.quota.remainingToday = this.quota.dailyLimit - this.quota.usedToday;
        batch.completedKeywords += 1;
        if (batch.completedKeywords >= batch.totalKeywords) {
          batch.status = 'COMPLETED';
        }
        this.recalculateDomainStats(domainId);
      }, (index + 1) * 750);
    });

    return batch;
  }
}

export const mockStore = new MockRanklyStore();
