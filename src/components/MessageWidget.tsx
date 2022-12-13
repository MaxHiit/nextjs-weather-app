import { FunctionComponent } from 'react';

type Props = {
	message: string;
};
const MessageWidget: FunctionComponent<Props> = ({ message }) => {
	return <p className='message whitespace-pre-line mt-2 py-2 text-center bg-[#84a69e]'>{message}</p>;
};

export default MessageWidget;
