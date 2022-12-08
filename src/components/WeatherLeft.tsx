import Image from 'next/image';
import useLocalTime from '../../hooks/useLocalTime';

type Props = {
	city: string;
	temp: number;
	icon: string;
	main: string;
	timezone: number;
};

const Weather: React.FC<Props> = ({ city, temp, icon, main, timezone }) => {
	const { date } = useLocalTime(timezone);

	return (
		<div className='flex-1 p-20 pr-0 h-screen flex flex-col justify-between'>
			<h1 className='text-2xl font-bold'>the.weather</h1>
			<div className='flex items-end gap-6'>
				<p className='text-9xl relative'>
					{temp}
					<span className='text-3xl absolute top-0'>℉</span>
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
		</div>
	);
};

export default Weather;
