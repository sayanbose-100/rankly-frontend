import React from 'react';
import { Loader2 } from 'lucide-react';
import { BatchAccepted } from '@/types/rankly';

interface BatchProgressBannerProps {
  batch: BatchAccepted | undefined;
}

export const BatchProgressBanner: React.FC<BatchProgressBannerProps> = ({ batch }) => {
  if (!batch || batch.status === 'COMPLETED') return null;

  const pct =
    batch.totalKeywords > 0
      ? Math.round((batch.completedKeywords / batch.totalKeywords) * 100)
      : 0;

  return (
    <div className="rounded-2xl border border-indigo-200 bg-indigo-50/80 p-4 dark:border-indigo-800/70 dark:bg-indigo-950/40">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 font-semibold text-indigo-900 dark:text-indigo-200">
          <Loader2 className="h-4 w-4 animate-spin text-indigo-600 dark:text-indigo-400" />
          <span>Fetching live Google SERP positions asynchronously...</span>
        </div>
        <span className="font-mono text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          {batch.completedKeywords} / {batch.totalKeywords} checked ({pct}%)
        </span>
      </div>
      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-indigo-200/70 dark:bg-indigo-900">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-300 dark:bg-indigo-400"
          style={{ width: `${Math.max(pct, 12)}%` }}
        />
      </div>
    </div>
  );
};
