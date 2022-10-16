// import React from 'react';
import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

const ServiceCard = ({ color, title, icon, subtitle }) => (
	<div className='white-glassmorphism hover:shadow-xl+ m-2 flex cursor-pointer items-center justify-start p-3'>
		<div
			className={`flex h-10 w-10 items-center justify-center rounded-full ${color}`}>
			{icon}
		</div>

		<div className='ml-5 flex flex-1 flex-col'>
			<h1 className='mt-2 text-lg text-white'>{title}</h1>
			<p className='mt-2 text-sm text-white md:w-9/12'>{subtitle}</p>
		</div>
	</div>
);

const Services = () => {
	return (
		<div className='gradient-bg-services flex w-full flex-col items-center justify-center md:flex-row'>
			<div className='flex flex-col items-center justify-between py-12 px-4 md:p-20 mf:flex-row'>
				<div className='mb-14 flex flex-1 flex-col items-start justify-start sm:mb-0'>
					<h1 className='text-gradient py-2 text-3xl text-white sm:text-5xl'>
						Services that we <br /> continue to improve
					</h1>

					{/* <p className='my-2 w-11/12 text-left text-base font-light text-white md:w-9/12'>
						The best choice for buying and selling your crypto assets, with the
						various super friendly services we offer
					</p> */}
				</div>

				<div className='flex flex-1 flex-col items-center justify-start'>
					<ServiceCard
						color='bg-[#2952e3]'
						title='Security Guaranteed'
						icon={<BsShieldFillCheck fontSize={21} className='text-white' />}
						subtitle='Security is guaranteed. We always maintain the privacy of our users and quality of our products.'
					/>
					<ServiceCard
						color='bg-[#8945f8]'
						title='Best exchange rates.'
						icon={<BiSearchAlt fontSize={21} className='text-white' />}
						subtitle='Security is guaranteed. We always maintain the privacy of our users and quality of our products.'
					/>
					<ServiceCard
						color='bg-[#f84550]'
						title='Fastest Transactions'
						icon={<RiHeart2Fill fontSize={21} className='text-white' />}
						subtitle='Security is guaranteed. We always maintain the privacy of our users and quality of our products.'
					/>
				</div>
			</div>
		</div>
	);
};

export default Services;
