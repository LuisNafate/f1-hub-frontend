import type { MeetingRow } from '../../../lib/types/f1';
import CircuitCard from './CircuitCard';

interface Props {
  meetings: MeetingRow[];
}

export default function CalendarGrid({ meetings }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {meetings.map((meeting, index) => (
        <CircuitCard key={meeting.meetingKey} round={index + 1} meeting={meeting} />
      ))}
    </div>
  );
}
