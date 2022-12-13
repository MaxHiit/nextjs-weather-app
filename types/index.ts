export type Stats = {
	id: number;
	name: string;
	value: string | null;
};

export interface Weather {
	id: number;
	city: string;
	temp: number;
	icon: string;
	main: string;
	timezone: number;
	stats?: Stats[] | null;
}