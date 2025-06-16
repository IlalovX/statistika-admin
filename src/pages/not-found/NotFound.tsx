import { Button } from '@mui/material'
import { useNavigate } from 'react-router'

export default function NotFound() {
	const navigate = useNavigate()

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4'>
			<div className='text-center space-y-6 max-w-md'>
				<h1 className='text-8xl font-extrabold text-indigo-600 drop-shadow-lg'>
					404
				</h1>
				<h2 className='text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100'>
					Страница не найдена
				</h2>
				<p className='text-gray-600 dark:text-gray-400'>
					Кажется, вы заблудились. Проверьте адрес или вернитесь на главную.
				</p>
				<Button
					variant='contained'
					color='primary'
					size='large'
					onClick={() => navigate('/auth')}
				>
					На страницу авторизации
				</Button>
			</div>
		</div>
	)
}
