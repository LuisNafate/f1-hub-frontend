'use client';

import { useF1Calendar } from '../../lib/hooks/useF1Calendar';
import PageStatus from '../components/PageStatus';
import CalendarGrid from './components/CalendarGrid';

export default function CalendarPage() {
  const year = new Date().getFullYear();
  const { data, loading, error } = useF1Calendar(year);

  return (
    <main className="mx-auto max-w-[1440px] px-10 py-10">
      <div className="mb-8 flex flex-col gap-2">
        <h1
          className="text-[36px] font-bold uppercase tracking-tight leading-none"
          style={{ color: 'var(--color-text)' }}
        >
          Calendario <span style={{ color: 'var(--color-red)' }}>{year}</span>
        </h1>
        <p className="text-base" style={{ color: 'var(--color-muted)' }}>
          Circuitos y fechas de la temporada · OpenF1 API
        </p>
      </div>

      <PageStatus loading={loading} error={error} loadingText="Cargando calendario…" />
      {data && <CalendarGrid meetings={data} />}
    </main>
  );
}
