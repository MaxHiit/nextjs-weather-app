import { useState } from 'react';
import { Weather } from '../types';
import { getWeather } from '@/services/weather.service';
import WeatherLeft from '@/components/Weather';
import WeatherDetailItem from '@/components/WeatherDetailItem';
import ImageBgComponent from '@/components/ImageBgComponent';
import MessageWidget from '@/components/MessageWidget';
import SearchBar from '@/components/Search';
import FindeMe from '@/components/FindeMe';

const Home: React.FC = () => {
	const [weather, setWeather] = useState<Weather>({
		id: 0,
		city: '',
		temp: 0,
		icon: '',
		main: '',
		timezone: 0,
		stats: []
	});
	const [errorMessage, setErrorMessage] = useState('');

	const { city, temp, icon, main, stats, timezone } = weather;

	const handleOnSubmit = async (e: React.SyntheticEvent, searchValue: string) => {
		e.preventDefault();
		if (!searchValue) return;
		const data = await getWeather(searchValue as string);
		setWeather(data);
	};

	return (
		<>
			<ImageBgComponent main={main} />
			<div className='flex'>
				<div className='flex-1 p-20 h-screen flex flex-col justify-between'>
					<h1 className='text-2xl font-bold'>the.weather</h1>
					{weather.city ? (
						<WeatherLeft city={city} temp={temp} icon={icon} main={main} timezone={timezone} />
					) : (
						<MessageWidget message='No data' />
					)}
				</div>
				<div className='glass pl-10 pb-10 w-full max-w-[500px] flex flex-col'>
					<SearchBar onSearchSubmit={handleOnSubmit} />
					<div className='mt-5'>
						<FindeMe setErrorChange={setErrorMessage} setWeatherChange={setWeather} />
						{errorMessage && <MessageWidget message={errorMessage} />}
					</div>
					<div className='border-t-2 border-b-2 border-white py-5 mt-auto mr-10'>
						{weather.stats?.length ? (
							stats?.map((item) => <WeatherDetailItem key={item.id} name={item.name} value={item.value} />)
						) : (
							<MessageWidget message='No data' />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
