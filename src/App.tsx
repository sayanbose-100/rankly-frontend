import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AlertDrawer } from '@/components/alerts/AlertDrawer';
import { AuthModal } from '@/components/auth/AuthModal';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardPage } from '@/pages/DashboardPage';
import { DomainWorkspacePage } from '@/pages/DomainWorkspacePage';
import { LandingPage } from '@/pages/LandingPage';

export const App: React.FC = () => {
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | null>(null);

  return (
    <BrowserRouter>
      <AppShell
        onOpenAlerts={() => setAlertsOpen(true)}
        onOpenAuthModal={(mode) => setAuthModalMode(mode)}
      >
        <Routes>
          <Route
            path="/"
            element={<LandingPage onOpenAuthModal={(mode) => setAuthModalMode(mode)} />}
          />
          <Route path="/dashboard" element={<DashboardPage onOpenAuthModal={(mode) => setAuthModalMode(mode)}/>} />
          <Route path="/domains/:domainId" element={<DomainWorkspacePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>

      <AlertDrawer open={alertsOpen} onClose={() => setAlertsOpen(false)} />
      <AuthModal
        mode={authModalMode}
        onClose={() => setAuthModalMode(null)}
        onSwitchMode={(mode) => setAuthModalMode(mode)}
      />
    </BrowserRouter>
  );
};

export default App;
