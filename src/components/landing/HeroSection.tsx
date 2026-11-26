import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BellRing,
  Clock,
  Globe2,
  Layers,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface HeroSectionProps {
  onOpenAuthModal: (mode: 'login' | 'register') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAuthModal }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-white via-indigo-50/40 to-slate-50 py-16 dark:border-slate-800/70 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-800/70 dark:bg-indigo-950/60 dark:text-indigo-300">
              <Clock className="h-3.5 w-3.5" />
              Automated 06:00 AM Daily SERP Sweep
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Know where every keyword ranks{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                before traffic drops.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Manage multiple websites in isolated workspaces, run non-blocking batch keyword
              searches, inspect historical position curves, and get alerted the moment any keyword
              slips past position #100.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => (user ? navigate('/dashboard') : onOpenAuthModal('register'))}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500"
              >
                {user ? 'Open Domains Dashboard' : 'Start Tracking Free'}
                <ArrowRight className="h-4 w-4" />
              </button>

              {!user && (
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Explore Live Demo
                </button>
              )}
            </div>

            {/* 3 Clear Value Pillars */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400">
                  <Globe2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Multi-Domain
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Per-user isolated sites
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-600 dark:text-cyan-400">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Async Batches
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Live progress, zero freeze
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-rose-500/10 p-2 text-rose-600 dark:text-rose-400">
                  <BellRing className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    &gt;100 Drop Alerts
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Instant email &amp; UI flags
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Live Preview Snapshot Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Active Workspace
                  </span>
                  <h2 className="font-mono text-base font-bold text-slate-900 dark:text-white">
                    rankly.io
                  </h2>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  06:00 AM Synced
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      serp rank tracker api
                    </p>
                    <p className="text-xs text-slate-500">Top 3 • Desktop US</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-slate-900 dark:text-white">
                      #3
                    </span>
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      +4
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      google search position checker
                    </p>
                    <p className="text-xs text-slate-500">Entered Top 10</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-slate-900 dark:text-white">
                      #9
                    </span>
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      +5
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-rose-200/80 bg-rose-50/60 p-3 dark:border-rose-900/50 dark:bg-rose-950/20">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      enterprise rank intelligence saas
                    </p>
                    <p className="text-xs text-rose-600 dark:text-rose-400">
                      Slipped outside Top 100 (was #42)
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 px-2.5 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    &gt;100
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
