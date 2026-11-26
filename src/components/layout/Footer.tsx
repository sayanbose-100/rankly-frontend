import React from 'react';
import { Clock, ShieldCheck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 text-white">
                <TrendingUp className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">Rankly</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Multi-domain SERP rank intelligence with automated daily 06:00 AM monitoring and
              instant &gt;100 rank-drop alerts.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Workspace
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Product Overview
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Tracked Domains
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Monitoring Engine
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-500" />
                <span>Automated Cron Sweep: Daily 06:00 AM</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>User-Isolated Multi-Tenant Sessions</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200/80 pt-6 text-center text-xs text-slate-500 dark:border-slate-800/80 dark:text-slate-500">
          &copy; {new Date().getFullYear()} Rankly Analytics. Built with React, TypeScript &amp;
          Spring Boot.
        </div>
      </div>
    </footer>
  );
};
