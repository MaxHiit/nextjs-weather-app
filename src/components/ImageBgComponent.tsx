import { FunctionComponent } from 'react';
import Image from 'next/image';
import imageBgData from '@/utils/imagesBgData';

type Props = {
	main: string | undefined;
};

const ImageBgComponent: FunctionComponent<Props> = ({ main = undefined }) => {
	const currentValue = imageBgData.find((item) => item.name === main?.toLowerCase());

	if (currentValue === undefined || main === undefined)
		return <div className='absolute h-screen w-screen -z-10 defaultBg'></div>;

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
