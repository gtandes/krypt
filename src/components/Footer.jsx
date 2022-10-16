import logo from '../../images/logo.png';

const Footer = () => {
	return (
		<div className='gradient-bg-footer flex w-full flex-col items-center justify-between p-4 md:justify-center'>
			<div className='my-4 flex w-full flex-col items-center justify-between sm:flex-row'>
				<div className='flex flex-[0.5] items-center justify-center'>
					<img src={logo} alt='logo' className='w-32' />
				</div>

				<div className='mt-5 flex w-full flex-1 flex-wrap items-center justify-evenly sm:mt-0'>
					<p className='mx-2 cursor-pointer text-center text-base text-white'>
						Market
					</p>
					<p className='mx-2 cursor-pointer text-center text-base text-white'>
						Exchange
					</p>
					<p className='mx-2 cursor-pointer text-center text-base text-white'>
						Tutorials
					</p>
					<p className='mx-2 cursor-pointer text-center text-base text-white'>
						Wallet
					</p>
				</div>
			</div>

			<div className='mt-5 flex flex-col items-center justify-center'>
				<p className='text-center text-sm text-white'>Contact me @</p>
				<p className='text-center text-sm text-white'>
					andesgregthomas@gmail.com
				</p>
			</div>

			<div className='mt-5 h-[0.25px] w-full bg-gray-400 sm:w-[90%]' />

			<div className='mt-3 flex w-full items-center justify-between sm:w-[90%]'>
				<p className='text-center text-sm text-white'>
					@GTA Media {new Date().getFullYear()}
				</p>
				<p className='text-center text-sm text-white'>All Rights Reserved.</p>
			</div>
		</div>
	);
};

export default Footer;
