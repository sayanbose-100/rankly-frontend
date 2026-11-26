import React from 'react';
import { BellRing, Clock, LineChart } from 'lucide-react';
import { HeroSection } from '@/components/landing/HeroSection';

interface LandingPageProps {
  onOpenAuthModal: (mode: 'login' | 'register') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuthModal }) => {
  return (
    <div>
      <HeroSection onOpenAuthModal={onOpenAuthModal} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Designed for clarity, built for daily SERP precision
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            Every workflow is structured around isolated domain workspaces so you never lose track
            of ranking shifts or exhaust your SearchApi quota.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="inline-flex rounded-xl bg-indigo-500/10 p-3 text-indigo-600 dark:text-indigo-400">
              <LineChart className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
              Historical Position Curves
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Compare up to 4 keywords side-by-side on an inverted SERP trajectory chart with exact
              ranking URLs and delta badges.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="inline-flex rounded-xl bg-cyan-500/10 p-3 text-cyan-600 dark:text-cyan-400">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
              06:00 AM Continuous Cron
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Wake up to fresh rankings every morning at 6:00 AM local time without manually
              re-running searches.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="inline-flex rounded-xl bg-rose-500/10 p-3 text-rose-600 dark:text-rose-400">
              <BellRing className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
              &gt;100 Rank Drop Protection
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Instant alert banners and email digests trigger whenever a tracked keyword falls out
              of the Top 100 results.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
