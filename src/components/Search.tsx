import { FunctionComponent, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

type Props = {
	onSearchSubmit: (e: React.SyntheticEvent, cityValue: string) => Promise<void>;
};

const Search: FunctionComponent<Props> = ({ onSearchSubmit }) => {
	const [cityValue, setCityValue] = useState<string>('');

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setCityValue(e.target.value.trim());
	};

	return (
		<form className='flex justify-between gap-20' onSubmit={(e) => onSearchSubmit(e, cityValue)}>
			<input
				type='text'
				name='location'
				id='loaction'
				className='h-20 px-3 w-full bg-transparent border-b-2 border-white text-white placeholder:text-white'
				placeholder='Type a location'
				onChange={handleOnChange}
			/>
			<button type='submit' className='h-20 p-10 flex items-center justify-center bg-[#84a69e]'>
				<MagnifyingGlassIcon className='h-6 w-6 text-black' />
			</button>
		</form>
	);
};

export default Search;
