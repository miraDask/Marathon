import { useState } from 'react';

const useFormProcessor = (initialError, initialData) => {
	const [ errors, setErrors ] = useState(initialError);
	const [ data, setData ] = useState(initialData);

	const handleChange = (event) => {
		const { value, name } = event.target;
		setData({ ...data, [name]: value });
		setErrors({ ...errors, [name]: '' });
	};

	const handleOnBlur = (event, validationFunc, data) => {
		const { name } = event.target;
		const { error } = validationFunc(data);

		if (error) {
			return setErrors({ ...errors, [name]: error });
		}
	};

	const handleSubmit = async (event, errorsObject, fetchFunc) => {
		event.preventDefault();
		if (Object.keys(errors).some((key) => errors[key] !== '')) {
			return;
		}

		if (Object.keys(errorsObject).some((key) => errorsObject[key] !== '')) {
			return setErrors({ ...errors, ...errorsObject });
		}

		await fetchFunc();
	};

	return {
		data,
		errors,
		setData,
		setErrors,
		handleSubmit,
		handleOnBlur,
		handleChange
	};
};

export default useFormProcessor;