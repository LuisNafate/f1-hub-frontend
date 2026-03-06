import Link from 'next/link';

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-center px-6 text-center"
      style={{ minHeight: 'calc(100vh - 52px)' }}
    >
      {/* Badge */}
      <span
        className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-widest"
        style={{ borderColor: 'var(--color-border)', color: 'var(--color-red)' }}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#ec1337]" />
        Temporada {new Date().getFullYear()} · OpenF1
      </span>

      <h1
        className="mb-4 text-[56px] font-bold leading-none tracking-tight uppercase"
        style={{ color: 'var(--color-text)' }}
      >
        F1{' '}
        <span style={{ color: 'var(--color-red)' }}>Hub</span>
      </h1>

      <p
        className="mb-10 max-w-md text-base leading-relaxed"
        style={{ color: 'var(--color-muted)' }}
      >
        Explora el calendario y los pilotos de la temporada
        de Fórmula 1, con datos casi actualizados de la API OpenF1, con sus limitantes.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/calendar"
          className="inline-flex items-center gap-2 rounded-lg px-7 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-red)' }}
        >
          Ver Calendario
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>

        <Link
          href="/teams"
          className="inline-flex items-center gap-2 rounded-lg border px-7 py-3 text-sm font-semibold transition-colors hover:border-white/30"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-muted)',
          }}
        >
          Ver Equipos
        </Link>
      </div>

      <p className="mt-16 text-xs" style={{ color: 'var(--color-border)' }}>
        © 2026 F1 Hub · Datos vía OpenF1 API
      </p>
    </main>
  );
}
