import type { TeamView } from '../../../lib/types/f1';
import TeamCard from './TeamCard';

interface Props {
  teams: TeamView[];
}

export default function TeamsGrid({ teams }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {teams.map((team) => (
        <TeamCard key={team.teamName} team={team} />
      ))}
    </div>
  );
}
