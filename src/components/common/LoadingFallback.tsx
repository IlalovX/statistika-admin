export default function LoadingFallback() {
	return (
		<div className='flex h-screen w-full items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-950 animate-fade-in'>
			<div className='flex flex-col items-center gap-4'>
				<div className='animate-spin-slow rounded-full p-2 bg-white dark:bg-gray-800 shadow-lg'>
					<svg
						className='w-8 h-8 text-blue-600 dark:text-blue-400'
						viewBox='0 0 50 50'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<circle
							cx='25'
							cy='25'
							r='20'
							stroke='currentColor'
							strokeWidth='4'
							strokeLinecap='round'
							strokeDasharray='31.4 31.4'
							strokeDashoffset='0'
						/>
					</svg>
				</div>
				<p className='text-gray-600 text-sm dark:text-gray-400 animate-fade-up'>
					Загрузка...
				</p>
			</div>
		</div>
	)
}
