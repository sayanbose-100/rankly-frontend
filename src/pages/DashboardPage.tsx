import React, { useEffect, useState } from 'react';
import { Globe, Plus } from 'lucide-react';
import { AddDomainModal } from '@/components/domains/AddDomainModal';
import { DomainCard } from '@/components/domains/DomainCard';
import { useDeleteDomain, useDomains } from '@/hooks/useDomains';
import { useAuth } from '@/context/AuthContext';

interface DashboardPageProps {
  onOpenAuthModal: (mode: 'login' | 'register') => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onOpenAuthModal
}) => {
  const { data: domains = [], isLoading } = useDomains();
  const deleteDomain = useDeleteDomain();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
  if (!user) {
    setAddModalOpen(false);
  }
}, [user]);
  if (!authLoading && !user) {
    return (
      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
        <Globe className="mx-auto h-10 w-10 text-slate-400" />
        <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
          Sign in required
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Please sign up or log in to view your list of added domains or add a new one.
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onOpenAuthModal('login')}
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => onOpenAuthModal('register')}
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Create Account
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Your Tracked Domains
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Select a domain workspace to inspect keyword rankings, trends, and &gt;100 alerts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" />
          Add Domain
        </button>
      </div>

      {isLoading ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-52 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            />
          ))}
        </div>
      ) : domains.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <Globe className="mx-auto h-10 w-10 text-slate-400" />
          <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
            No domains tracked yet
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Add your first website to begin monitoring daily Google SERP positions.
          </p>
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            Add First Domain
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain) => (
            <DomainCard
              key={domain.id}
              domain={domain}
              onDelete={(id) => deleteDomain.mutate(id)}
            />
          ))}
        </div>
      )}

      <AddDomainModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />
    </div>
  );
};
