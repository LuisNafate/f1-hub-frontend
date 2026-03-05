export interface MeetingRow {
  meetingKey: number;
  meetingName: string;
  officialName: string;
  location: string;
  countryCode: string;
  countryName: string;
  countryFlag: string | null;
  circuitShortName: string;
  circuitType: string;
  circuitImage: string | null;
  dateStart: string;
  dateEnd: string;
  year: number;
}

export interface DriverRow {
  driverNumber: number;
  nameAcronym: string;
  fullName: string;
  teamName: string;
  teamColour: string;
  countryCode: string;
  headshotUrl: string | null;
}

export interface TeamView {
  teamName: string;
  teamColour: string;
  drivers: DriverRow[];
}
