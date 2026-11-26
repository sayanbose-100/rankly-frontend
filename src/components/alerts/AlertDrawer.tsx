import React from 'react';
import { AlertTriangle, CheckCheck, TrendingUp, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAlerts, useMarkAlertRead, useMarkAllAlertsRead } from '@/hooks/useAlerts';
import { formatRelativeTime } from '@/utils/formatters';

interface AlertDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const AlertDrawer: React.FC<AlertDrawerProps> = ({ open, onClose }) => {
  const { data: alerts = [] } = useAlerts();
  const markRead = useMarkAlertRead();
  const markAllRead = useMarkAllAlertsRead();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs">
      <div className="flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Rank Movement Alerts
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Triggered by 06:00 AM sweep &amp; live batch checks
            </p>
          </div>
          <div className="flex items-center gap-2">
            {alerts.some((a) => !a.isRead) && (
              <button
                type="button"
                onClick={() => markAllRead.mutate(undefined)}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/60"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-6">
          {alerts.length === 0 ? (
            <p className="py-12 text-center text-sm text-slate-500">
              No rank alerts yet. You are all caught up!
            </p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => !alert.isRead && markRead.mutate(alert.id)}
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  alert.outOfTop100
                    ? 'border-rose-200 bg-rose-50/70 dark:border-rose-900/60 dark:bg-rose-950/25'
                    : 'border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/50'
                } ${alert.isRead ? 'opacity-65' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {alert.outOfTop100 ? (
                      <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
                    ) : (
                      <TrendingUp className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    )}
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">
                      {alert.keywordPhrase}
                    </span>
                  </div>
                  {!alert.isRead && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-600" />
                  )}
                </div>

                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {alert.message}
                </p>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <Link
                    to={`/domains/${alert.domainId}`}
                    onClick={onClose}
                    className="font-mono font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    {alert.domainName}
                  </Link>
                  <span>{formatRelativeTime(alert.createdAt)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
