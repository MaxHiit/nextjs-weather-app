import Image from 'next/image';
import imageBgData from '../utils/imagesBgData';

type Props = {
	main: string;
};

const ImageBgComponent: React.FC<Props> = ({ main }) => {
	const currentValue = imageBgData.find((item) => item.name === main.toLowerCase());

	if (currentValue === undefined) return null;

	return (
		<Image
			className='object-cover h-screen w-screen -z-10'
			fill
			src={currentValue.imageSrc}
			alt={currentValue.name}
		/>
	);
};

export default ImageBgComponent;
