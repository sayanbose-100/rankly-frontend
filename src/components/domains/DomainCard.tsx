import React from 'react';
import { ArrowRight, Globe, Monitor, Smartphone, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DomainSummary } from '@/types/rankly';
import { formatRelativeTime } from '@/utils/formatters';

interface DomainCardProps {
  domain: DomainSummary;
  onDelete: (id: number) => void;
}

const getAverageRank = (averageRank: unknown): number => {
    if (typeof averageRank !== 'number' || !Number.isFinite(averageRank) || averageRank <= 0) {
      return 0;
    }
    return Math.floor(averageRank);
};

export const DomainCard: React.FC<DomainCardProps> = ({ domain, onDelete }) => {  
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold text-slate-900 dark:text-white">
                {domain.domainName}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono font-semibold dark:bg-slate-800">
                  {domain.targetCountry}
                </span>
                <span className="inline-flex items-center gap-1 capitalize">
                  {domain.targetDevice === 'mobile' ? (
                    <Smartphone className="h-3.5 w-3.5" />
                  ) : (
                    <Monitor className="h-3.5 w-3.5" />
                  )}
                  {domain.targetDevice}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onDelete(domain.id)}
            title="Remove Domain"
            className="rounded-lg p-1.5 text-slate-400 opacity-0 transition hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-950/70">
          <div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Keywords</p>
            <p className="mt-0.5 font-mono text-lg font-bold text-slate-900 dark:text-white">
              {domain.keywordCount}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Top 10</p>
            <p className="mt-0.5 font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {domain.top10Count}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Avg Rank</p>
            <p className="mt-0.5 font-mono text-lg font-bold text-indigo-600 dark:text-indigo-400">
              {getAverageRank(domain.averageRank)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Checked - {formatRelativeTime(domain.lastCheckedAt)}
        </span>
        <Link
          to={`/domains/${domain.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
        >
          Open Workspace
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};
