import React, { Fragment, useState, useContext } from 'react';
import { Context } from '../../providers/global-context.provider';

const Alert = ({ color, onClose }) => {
	const { alertMessage, saveAlert } = useContext(Context);
	const [ showAlert, setShowAlert ] = useState(alertMessage);

	const handleClick = () => {
		onClose();
		saveAlert(null);
		setShowAlert(false);
	};

	return (
		<Fragment>
			{showAlert ? (
				<div
					className={`px-6 py-4 rounded relative mb-4 border border-${color}-500 text-${color}-500 bg-${color}-100`}
				>
					<span className="text-xl inline-block mr-5 align-middle">
						<i className="fas fa-bell" />
					</span>
					<span className="inline-block align-middle mr-8">
						<b className="capitalize">{alertMessage} !</b>
					</span>
					<button
						className="absolute bg-transparent text-2xl leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
						onClick={handleClick}
					>
						<span>×</span>
					</button>
				</div>
			) : null}
		</Fragment>
	);
};

export default Alert;
// export default function ClosingAlert() {
//   return (
//     <>
//       return <Alert color="pink" />;
//     </>
//   );
// }
