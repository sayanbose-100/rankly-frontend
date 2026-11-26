import React, { useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import { parseKeywordInput } from '@/utils/formatters';

interface KeywordSearchBarProps {
  onSubmitKeywords: (phrases: string[]) => Promise<void>;
  isSubmitting: boolean;
}

export const KeywordSearchBar: React.FC<KeywordSearchBarProps> = ({
  onSubmitKeywords,
  isSubmitting,
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseKeywordInput(input);
    if (parsed.length === 0) return;
    await onSubmitKeywords(parsed);
    setInput('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Track new keywords (comma-separated, e.g. spring boot rank tracker, seo api)..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !input.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Queuing...
            </>
          ) : (
            'Check SERP Rank'
          )}
        </button>
      </div>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        Duplicate keywords are automatically deduplicated and refreshed without collisions.
      </p>
    </form>
  );
};
