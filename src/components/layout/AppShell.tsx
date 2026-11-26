import React from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

interface AppShellProps {
  children: React.ReactNode;
  onOpenAlerts: () => void;
  onOpenAuthModal: (mode: 'login' | 'register') => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  onOpenAlerts,
  onOpenAuthModal,
}) => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar onOpenAlerts={onOpenAlerts} onOpenAuthModal={onOpenAuthModal} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
