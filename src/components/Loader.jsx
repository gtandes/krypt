import React from 'react';

const Loader = () => {
	return (
		<div className='flex items-center justify-center py-3'>
			<div className='h-32 w-32 animate-spin rounded-full border-b-2 border-red-700' />
		</div>
	);
};

export default Loader;
