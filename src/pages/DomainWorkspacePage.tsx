import React, { useEffect, useState } from 'react';
import { ArrowLeft, Monitor, RefreshCw, Smartphone } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { BatchProgressBanner } from '@/components/workspace/BatchProgressBanner';
import { KeywordSearchBar } from '@/components/workspace/KeywordSearchBar';
import { KeywordTable } from '@/components/workspace/KeywordTable';
import { RankTrendChart } from '@/components/workspace/RankTrendChart';
import { useDomain } from '@/hooks/useDomains';
import {
  useBatchProgress,
  useDeleteKeyword,
  useDomainKeywords,
  useRefreshKeywords,
  useSearchKeywordsBatch,
} from '@/hooks/useKeywords';

export const DomainWorkspacePage: React.FC = () => {
  const { domainId } = useParams();
  const numericDomainId = Number(domainId);

  const [activeBatchId, setActiveBatchId] = useState<number | null>(null);
  const [selectedChartIds, setSelectedChartIds] = useState<number[]>([]);

  const { data: domain } = useDomain(numericDomainId);
  const { data: keywords = [] } = useDomainKeywords(numericDomainId, activeBatchId);
  const { data: batchStatus } = useBatchProgress(numericDomainId, activeBatchId, () =>
    setActiveBatchId(null)
  );

  const searchBatch = useSearchKeywordsBatch(numericDomainId);
  const refreshKeywords = useRefreshKeywords(numericDomainId);
  const deleteKeyword = useDeleteKeyword(numericDomainId);

  // Automatically plot top 3 keywords on first load
  useEffect(() => {
    if (keywords.length > 0 && selectedChartIds.length === 0) {
      setSelectedChartIds(keywords.slice(0, 3).map((k) => k.id));
    }
  }, [keywords, selectedChartIds.length]);

  const handleToggleChart = (id: number) => {
    setSelectedChartIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 4) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const handleSearchKeywords = async (phrases: string[]) => {
    const accepted = await searchBatch.mutateAsync(phrases);
    setActiveBatchId(accepted.batchId);
  };

  const handleRefreshAll = async () => {
    const accepted = await refreshKeywords.mutateAsync(undefined);
    setActiveBatchId(accepted.batchId);
  };

  const handleRefreshSingle = async (keywordId: number) => {
    const accepted = await refreshKeywords.mutateAsync([keywordId]);
    setActiveBatchId(accepted.batchId);
  };

  const outOfTop100Count = keywords.filter(
    (k) => k.checkStatus === 'COMPLETED' && (k.currentRank === null || k.currentRank > 100)
  ).length;

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Domain Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Domains
          </Link>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="font-mono text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              {domain?.domainName ?? `Domain #${numericDomainId}`}
            </h1>
            {domain && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                {domain.targetCountry} •{' '}
                {domain.targetDevice === 'mobile' ? (
                  <Smartphone className="h-3.5 w-3.5" />
                ) : (
                  <Monitor className="h-3.5 w-3.5" />
                )}
                <span className="capitalize">{domain.targetDevice}</span>
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleRefreshAll}
          disabled={refreshKeywords.isPending || keywords.length === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-700"
        >
          <RefreshCw className={`h-4 w-4 ${refreshKeywords.isPending ? 'animate-spin' : ''}`} />
          Refresh All Ranks
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Tracked Keywords</p>
          <p className="mt-1 font-mono text-2xl font-bold text-slate-900 dark:text-white">
            {keywords.length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Top 10 Positions</p>
          <p className="mt-1 font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {keywords.filter((k) => k.currentRank !== null && k.currentRank <= 10).length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Average Rank</p>
          <p className="mt-1 font-mono text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {domain?.averageRank !== null && domain?.averageRank !== undefined
              ? `#${domain.averageRank}`
              : '—'}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">&gt;100 Alerts</p>
          <p className="mt-1 font-mono text-2xl font-bold text-rose-600 dark:text-rose-400">
            {outOfTop100Count}
          </p>
        </div>
      </div>

      {/* Multi-Keyword Search Bar + Async Batch Progress */}
      <KeywordSearchBar
        onSubmitKeywords={handleSearchKeywords}
        isSubmitting={searchBatch.isPending}
      />
      <BatchProgressBanner batch={batchStatus} />

      {/* Historical Rank Trajectory Chart */}
      <RankTrendChart
        domainId={numericDomainId}
        keywords={keywords}
        selectedIds={selectedChartIds}
        onToggleKeyword={handleToggleChart}
      />

      {/* Keyword Rankings Table */}
      <KeywordTable
        keywords={keywords}
        selectedChartIds={selectedChartIds}
        onToggleChart={handleToggleChart}
        onRefreshSingle={handleRefreshSingle}
        onDelete={(kwId) => {
          setSelectedChartIds((prev) => prev.filter((id) => id !== kwId));
          deleteKeyword.mutate(kwId);
        }}
      />
    </div>
  );
};
