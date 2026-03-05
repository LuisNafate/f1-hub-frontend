import type { TeamView } from '../../../lib/types/f1';
import { countryFlag } from '../../../lib/utils/countryFlag';

interface Props {
  team: TeamView;
}

export default function TeamCard({ team }: Props) {
  const teamColor = `#${team.teamColour}`;

  return (
    <div
      className="flex flex-col rounded-xl border overflow-hidden"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'rgba(42,30,32,0.35)',
      }}
    >
      {/* Cabecera del equipo con color real de la escudería */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'rgba(42,30,32,0.6)' }}
      >
        <span
          className="inline-block h-3 w-3 rounded-full shrink-0"
          style={{ backgroundColor: teamColor }}
        />
        <h2 className="font-bold text-base leading-tight" style={{ color: 'var(--color-text)' }}>
          {team.teamName}
        </h2>
        <span
          className="ml-auto text-xs font-medium"
          style={{ color: 'var(--color-muted)' }}
        >
          {team.drivers.length} pilotos
        </span>
      </div>

      {/* Lista de pilotos con foto */}
      <ul className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
        {team.drivers.map((driver) => (
          <li
            key={driver.driverNumber}
            className="flex items-center gap-4 px-4 py-4"
          >
            {/* Foto del piloto */}
            <div
              className="h-14 w-14 shrink-0 rounded-lg overflow-hidden"
              style={{
                backgroundColor: 'rgba(42,30,32,0.8)',
                border: `2px solid ${teamColor}44`,
              }}
            >
              {driver.headshotUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={driver.headshotUrl}
                  alt={driver.fullName}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center text-sm font-black"
                  style={{ color: teamColor }}
                >
                  {driver.nameAcronym}
                </div>
              )}
            </div>

            {/* Info del piloto */}
            <div className="flex flex-1 flex-col min-w-0 gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black" style={{ color: teamColor }}>
                  #{driver.driverNumber}
                </span>
                <span className="text-base leading-none" title={driver.countryCode}>
                  {countryFlag(driver.countryCode)}
                </span>
              </div>
              <span
                className="font-semibold text-sm leading-tight truncate"
                style={{ color: 'var(--color-text)' }}
              >
                {driver.fullName}
              </span>
              <span className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                {driver.nameAcronym}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

