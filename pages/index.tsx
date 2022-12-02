import WeatherLeft from '../src/components/WeatherLeft';
import SearchIcon from '../src/components/SearchIcon';
import { useEffect, useState } from 'react';
import WeatherDetailItem from '../src/components/WeatherDetailItem';
import ImageBgComponent from '../src/components/ImageBgComponent';
import getWeather from './services/weather.service';
import { Weather } from '../types';

type Props = {
	weatherData: Weather;
};

const Home: React.FC<Props> = ({ weatherData }) => {
	const [city, setCity] = useState<string | null>(null);
	const [weather, setWeather] = useState<Weather>(weatherData);

	const { cityName, temp, icon, main, stats, dt, timezone } = weather;

	const handleOnSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const data = await getWeather(city as string);
		setWeather(data);
	};

	const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setCity(e.target.value);
	};

	return (
		<>
			<ImageBgComponent main={main} />
			<div className='flex'>
				<WeatherLeft city={cityName} temp={temp} icon={icon} main={main} dt={dt} timezone={timezone} />
				<div className='glass pl-10 pb-10 w-full max-w-[500px] flex flex-col justify-between'>
					<form className='flex justify-between gap-20' onSubmit={handleOnSubmit}>
						<input
							type='text'
							name='location'
							id='loaction'
							className='h-20 px-3 w-full bg-transparent border-b-2 border-white text-white placeholder:text-white'
							placeholder='Type a location'
							onChange={handleInputOnChange}
						/>
						<button type='submit' className='h-20 p-10 flex items-center justify-center bg-[#84a69e]'>
							<SearchIcon />
						</button>
					</form>
					<div className='border-t-2 border-b-2 border-white py-5 mt-10 mr-10'>
						{stats?.map((item) => (
							<WeatherDetailItem key={item.id} name={item.name} value={item.value} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};
export const getServerSideProps = async () => {
	const data = await getWeather();

	return {
		props: {
			weatherData: data
		}
	};
};

export default Home;
