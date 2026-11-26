import React, { useState } from 'react';
import { ExternalLink, Loader2, RefreshCw, Trash2 } from 'lucide-react';
import { RankDeltaBadge } from '@/components/common/RankDeltaBadge';
import { KeywordRow } from '@/types/rankly';
import { formatRelativeTime } from '@/utils/formatters';

interface KeywordTableProps {
  keywords: KeywordRow[];
  selectedChartIds: number[];
  onToggleChart: (id: number) => void;
  onRefreshSingle: (id: number) => void;
  onDelete: (id: number) => void;
}

type FilterTab = 'ALL' | 'TOP10' | 'GAINERS' | 'ALERTS';

export const KeywordTable: React.FC<KeywordTableProps> = ({
  keywords,
  selectedChartIds,
  onToggleChart,
  onRefreshSingle,
  onDelete,
}) => {
  const [filter, setFilter] = useState<FilterTab>('ALL');

  const filtered = keywords.filter((k) => {
    if (filter === 'TOP10') return k.currentRank !== null && k.currentRank <= 10;
    if (filter === 'GAINERS') return k.rankDirection === 'UP';
    if (filter === 'ALERTS') return k.currentRank === null || k.currentRank > 100;
    return true;
  });

  const tabClass = (tab: FilterTab) =>
    `rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
      filter === tab
        ? 'bg-indigo-600 text-white'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
    }`;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Tracked Keywords ({filtered.length})
        </h2>

        <div className="flex flex-wrap items-center gap-1.5">
          <button type="button" onClick={() => setFilter('ALL')} className={tabClass('ALL')}>
            All
          </button>
          <button type="button" onClick={() => setFilter('TOP10')} className={tabClass('TOP10')}>
            Top 10
          </button>
          <button type="button" onClick={() => setFilter('GAINERS')} className={tabClass('GAINERS')}>
            Gainers
          </button>
          <button type="button" onClick={() => setFilter('ALERTS')} className={tabClass('ALERTS')}>
            &gt;100 Alerts
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
            <tr>
              <th className="px-6 py-3.5">Chart</th>
              <th className="px-4 py-3.5">Keyword</th>
              <th className="px-4 py-3.5">Current Rank</th>
              <th className="px-4 py-3.5">Change (24h)</th>
              <th className="px-4 py-3.5">Best</th>
              <th className="px-4 py-3.5">Ranking URL</th>
              <th className="px-4 py-3.5">Updated</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-10 text-center text-sm text-slate-500">
                  No keywords match this filter.
                </td>
              </tr>
            ) : (
              filtered.map((kw) => {
                const isChecking = kw.checkStatus === 'CHECKING' || kw.checkStatus === 'PENDING';
                const isOutOfTop100 = !isChecking && (kw.currentRank === null || kw.currentRank > 100);

                return (
                  <tr
                    key={kw.id}
                    className={`transition-colors hover:bg-slate-50/90 dark:hover:bg-slate-800/40 ${
                      isOutOfTop100 ? 'bg-rose-50/40 dark:bg-rose-950/15' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedChartIds.includes(kw.id)}
                        onChange={() => onToggleChart(kw.id)}
                        aria-label={`Plot ${kw.phrase} on chart`}
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-900 dark:text-white">
                      {kw.phrase}
                    </td>
                    <td className="px-4 py-4 font-mono font-bold">
                      {isChecking ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Checking
                        </span>
                      ) : kw.currentRank !== null ? (
                        <span className="text-slate-900 dark:text-white">#{kw.currentRank}</span>
                      ) : (
                        <span className="text-rose-600 dark:text-rose-400">&gt;100</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <RankDeltaBadge direction={kw.rankDirection} delta={kw.rankDelta} />
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-slate-600 dark:text-slate-400">
                      {kw.bestRank !== null ? `#${kw.bestRank}` : '—'}
                    </td>
                    <td className="max-w-[210px] truncate px-4 py-4 text-xs text-slate-500 dark:text-slate-400">
                      {kw.rankingUrl ? (
                        <a
                          href={kw.rankingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
                        >
                          <span className="truncate">{kw.rankingUrl.replace(/^https?:\/\//, '')}</span>
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      ) : (
                        'Not in Top 100'
                      )}
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500 dark:text-slate-400">
                      {formatRelativeTime(kw.lastCheckedAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onRefreshSingle(kw.id)}
                          title="Refresh Rank Now"
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/60 dark:hover:text-indigo-400"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(kw.id)}
                          title="Delete Keyword"
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/60 dark:hover:text-rose-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
