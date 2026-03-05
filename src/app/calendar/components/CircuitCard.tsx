import type { MeetingRow } from '../../../lib/types/f1';

interface Props {
  round: number;
  meeting: MeetingRow;
}

type Status = 'past' | 'active' | 'upcoming';

function getStatus(dateStart: string, dateEnd: string): Status {
  const now = new Date();
  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  if (end < now) return 'past';
  if (start <= now) return 'active';
  return 'upcoming';
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

const STATUS_LABEL: Record<Status, string> = {
  past: 'Finalizada',
  active: '● En curso',
  upcoming: 'Próxima',
};

const STATUS_COLOR: Record<Status, string> = {
  past: 'var(--color-muted)',
  active: '#4ade80',
  upcoming: '#94a3b8',
};

export default function CircuitCard({ round, meeting }: Props) {
  const status = getStatus(meeting.dateStart, meeting.dateEnd);
  const isActive = status === 'active';

  return (
    <div
      className="flex flex-col rounded-xl border overflow-hidden"
      style={{
        borderColor: isActive ? 'var(--color-red)' : 'var(--color-border)',
        backgroundColor: 'rgba(42,30,32,0.35)',
      }}
    >
      {/* Header: ronda + estado */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'rgba(42,30,32,0.6)' }}
      >
        <span
          className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded"
          style={{
            backgroundColor: isActive ? 'var(--color-red)' : 'rgba(236,19,55,0.15)',
            color: isActive ? '#fff' : 'var(--color-red)',
          }}
        >
          R{round}
        </span>
        <span className="text-xs font-medium" style={{ color: STATUS_COLOR[status] }}>
          {STATUS_LABEL[status]}
        </span>
      </div>

      {/* Imagen del circuito */}
      <div
        className="flex items-center justify-center h-[100px] overflow-hidden"
        style={{ backgroundColor: 'rgba(42,30,32,0.5)' }}
      >
        {meeting.circuitImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={meeting.circuitImage}
            alt={meeting.circuitShortName}
            className="h-[80px] w-auto object-contain opacity-80"
          />
        ) : (
          <span className="text-[40px] opacity-30">🏁</span>
        )}
      </div>

      {/* Info del GP */}
      <div className="flex flex-col gap-1 px-4 py-4">
        <div className="flex items-center gap-2">
          {meeting.countryFlag && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={meeting.countryFlag}
              alt={meeting.countryName}
              className="h-4 w-7 rounded-sm object-cover shrink-0"
            />
          )}
          <span className="text-xs font-semibold uppercase tracking-wider truncate" style={{ color: 'var(--color-muted)' }}>
            {meeting.countryName}
          </span>
        </div>

        <h3 className="font-bold text-sm leading-tight mt-1" style={{ color: 'var(--color-text)' }}>
          {meeting.meetingName}
        </h3>

        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{meeting.circuitShortName}</span>
          <span
            className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: 'rgba(236,19,55,0.12)', color: 'var(--color-red)' }}
          >
            {meeting.circuitType.replace('Temporary - ', '')}
          </span>
        </div>

        <div className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <span
            className="text-xs font-medium"
            style={{ color: status === 'past' ? 'var(--color-muted)' : 'var(--color-text)' }}
          >
            {formatDate(meeting.dateStart)} — {formatDate(meeting.dateEnd)}
          </span>
        </div>
      </div>
    </div>
  );
}
