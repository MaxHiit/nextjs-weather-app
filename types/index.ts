export type Stats = {
	id: number;
	name: string;
	value: string | null;
};

export interface Weather {
	id: number;
	cityName: string;
	temp: number;
	icon: string;
	main: string;
	dt: number;
	timezone: number;
	stats?: Stats[] | null;
}