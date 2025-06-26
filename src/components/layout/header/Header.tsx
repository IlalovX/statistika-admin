import PersonIcon from '@mui/icons-material/Person'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { NavLink } from 'react-router'
function Header() {
	return (
		<header className='flex items-center border-b-2 border-b-[#B2B2B2] justify-between px-6 py-4 bg-white shadow '>
			<Typography
				variant='h6'
				component='div'
				sx={{
					flexGrow: 1,
					color: '#2c3e50',
				}}
			>
				Статистика
			</Typography>
			<div className='flex items-center gap-4'>
				<Tooltip title='Скачать'>
					<IconButton color='primary'>
						<i className='fas fa-download' />
					</IconButton>
				</Tooltip>

				<NavLink to='/profile'>
					{({ isActive }) => (
						<IconButton>
							<PersonIcon
								className={isActive ? 'text-blue-600' : 'text-gray-600'}
							/>
						</IconButton>
					)}
				</NavLink>
			</div>
		</header>
	)
}

export default Header
