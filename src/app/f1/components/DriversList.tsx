import type { DriverRow } from '../../../lib/types/f1';

interface Props {
  drivers: DriverRow[];
}

export default function DriversList({ drivers }: Props) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {drivers.map((driver) => (
        <li
          key={driver.driverNumber}
          className="flex items-center gap-4 rounded-lg border border-gray-700 bg-gray-800 px-4 py-3"
        >
          <span className="text-2xl font-black text-red-400 w-10 text-center">
            {driver.driverNumber}
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-white truncate">{driver.fullName}</p>
            <p className="text-sm text-gray-400 truncate">{driver.teamName}</p>
            <p className="text-xs text-gray-500">{driver.countryCode}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
