import { FunctionComponent } from 'react';
import { getUserLocationWeather, getWeather } from '@/services/weather.service';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { Weather } from '../../types';

type FindMeProps = {
	setErrorChange: (value: string) => void;
	setWeatherChange: (value: Weather) => void;
};
const FindeMe: FunctionComponent<FindMeProps> = ({ setErrorChange, setWeatherChange }) => {
	const handleFindMe = () => {
		const handleSuccess = async (pos: { coords: { latitude: number; longitude: number } }) => {
			const { latitude, longitude } = pos.coords;
			const data = await getUserLocationWeather(latitude, longitude);
			setWeatherChange(data);
			setErrorChange('');
		};

		// Error handler for geolocation's `getCurrentPosition` method
		const handleError = async (error: { message: string }) => {
			console.log(error.message);
			setErrorChange('Location unavailable. Displaying default \n location: Cork');
			const data = await getWeather();
			setWeatherChange(data);
		};

		const { geolocation } = navigator;
		const options = {
			enableHighAccuracy: true,
			timeout: 1000 * 60 * 1,
			maximumAge: 1000 * 3600 * 24
		};

		// If the geolocation is not defined in the used browser we handle it as an error
		if (!geolocation) {
			alert('Geolocation is not supported.');
		}

		// Call Geolocation API
		geolocation.getCurrentPosition(handleSuccess, handleError, options);
	};

	return (
		<button
			onClick={handleFindMe}
			className='w-full h-auto py-4 flex items-center justify-center bg-[#84a69e]'
		>
			<span className='text-black font-semibold'>Finde Me</span>
			<MapPinIcon className='h-6 w-6 text-black' />
		</button>
	);
};

export default FindeMe;
