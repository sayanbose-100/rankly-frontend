import React from 'react';
import { AlertTriangle, ArrowDownRight, ArrowUpRight, Minus, Sparkles } from 'lucide-react';
import { RankDirection } from '@/types/rankly';

interface Props {
  direction: RankDirection;
  delta: number | null;
}

export const RankDeltaBadge: React.FC<Props> = ({ direction, delta }) => {
  if (direction === 'UNRANKED') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-600 ring-1 ring-inset ring-rose-500/20 dark:text-rose-400">
        <AlertTriangle className="h-3.5 w-3.5" />
        &gt;100 Alert
      </span>
    );
  }

  if (direction === 'UP' && delta !== null) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-inset ring-emerald-500/20 dark:text-emerald-400">
        <ArrowUpRight className="h-3.5 w-3.5" />+{delta}
      </span>
    );
  }

  if (direction === 'DOWN' && delta !== null) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-600 ring-1 ring-inset ring-rose-500/20 dark:text-rose-400">
        <ArrowDownRight className="h-3.5 w-3.5" />
        {delta}
      </span>
    );
  }

  if (direction === 'NEW') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-500/20 dark:text-indigo-400">
        <Sparkles className="h-3.5 w-3.5" />
        New
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/10 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
      <Minus className="h-3.5 w-3.5" />0
    </span>
  );
};
