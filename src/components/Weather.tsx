import { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import useLocalTime from '@/hooks/useLocalTime';

type Props = {
	city: string;
	temp: number;
	icon: string;
	main: string;
	timezone: number;
};

const Weather: FunctionComponent<Props> = ({ city, temp, icon, main, timezone }) => {
	const [isFahrenheit, setIsFahrenheit] = useState(true);
	const [temperature, setTemperature] = useState<number>(temp);
	const { date } = useLocalTime(timezone);

	const toCelsius = (fahrenheit: number) => {
		const newTemp = Math.round((fahrenheit - 32) * (5 / 9) * 1e2) / 1e2;
		setTemperature(newTemp);
	};

	const toFahrenheit = (celsius: number) => {
		const newTemp = Math.round((celsius * (9 / 5) + 32) * 1e2) / 1e2;
		setTemperature(newTemp);
	};

	const convertTemp = () => {
		if (!isFahrenheit) {
			setIsFahrenheit(true);
			toFahrenheit(temperature);
			return;
		}

		toCelsius(temperature);
		setIsFahrenheit(false);
	};

	return (
		<div className='flex items-end gap-6'>
			<p
				className='text-9xl relative cursor-pointer'
				title={
					isFahrenheit
						? 'click to convert celsius to fahrenheit'
						: 'click to convert fahrenheit to celsius'
				}
				onClick={convertTemp}
			>
				{Math.floor(temperature)}
				<span className='text-3xl absolute top-0'>{isFahrenheit ? '°F' : '°C'}</span>
			</p>
			<div className='ml-10 pb-2'>
				<h2 className='text-5xl leading-relaxed'>{city}</h2>
				<p>{date}</p>
			</div>
			<div className='pb-2'>
				<Image
					src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
					alt='/'
					width='100'
					height='80'
				/>
				<p className='text-center'>{main}</p>
			</div>
		</div>
	);
};

export default Weather;
