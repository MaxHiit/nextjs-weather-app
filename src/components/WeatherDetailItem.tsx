type Props = {
	name: string;
	value: string | null;
};

const WeatherDetailsItem: React.FC<Props> = ({ name, value }) => {
	const unit =
		name === 'cloudy' || name === 'humidity'
			? '%'
			: name === 'wind'
			? 'km/h'
			: name === 'rain' || name === 'snow'
			? 'mm'
			: '';

	if (name === 'snow' && value === null) return null;

	return (
		<div className='flex justify-between items-center py-2'>
			<p className='uppercase'>{name}</p>
			<p>
				{value !== null ? value : 0}
				{unit}
			</p>
		</div>
	);
};

export default WeatherDetailsItem;
