'use client';

import { useMemo } from 'react';
import { groupByTeam } from '../../lib/api/f1';
import { useF1Drivers } from '../../lib/hooks/useF1Drivers';
import PageStatus from '../components/PageStatus';
import TeamsGrid from './components/TeamsGrid';

export default function TeamsPage() {
  const { data, loading, error } = useF1Drivers();
  const teams = useMemo(() => (data ? groupByTeam(data) : []), [data]);

  return (
    <main className="mx-auto max-w-[1440px] px-10 py-10">
      <div className="mb-6 flex flex-col gap-2">
        <h1
          className="text-[36px] font-bold uppercase tracking-tight leading-none"
          style={{ color: 'var(--color-text)' }}
        >
          Equipos
        </h1>
        <p className="text-base" style={{ color: 'var(--color-muted)' }}>
          Equipos y pilotos de la sesión más reciente · OpenF1 API
        </p>
      </div>

      <PageStatus loading={loading} error={error} loadingText="Cargando equipos…" />
      {!loading && !error && teams.length > 0 && <TeamsGrid teams={teams} />}
      {!loading && !error && teams.length === 0 && (
        <p style={{ color: 'var(--color-muted)' }}>No hay equipos disponibles.</p>
      )}
    </main>
  );
}
