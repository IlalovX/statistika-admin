import {
	Agriculture as AgricultureIcon,
	AirplaneTicket as AirplaneTicketIcon,
	DashboardCustomize as DashboardCustomizeIcon,
	Factory as IndustryIcon,
	People as PeopleIcon,
} from '@mui/icons-material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import type { JSX } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useCategories } from '../../../context/CategoriesContext'
import { logout } from '../../../features/slices/UserMeSlice'
import { useGetUserMe } from '../../../hooks/useUserMe'
import { removeTokens } from '../../../services/auth-token.service'
import { useAppDispatch } from '../../../utils/helpers'

const iconMap: Record<string, JSX.Element> = {
	projects: <DashboardCustomizeIcon fontSize='medium' />,
	tourism: <AirplaneTicketIcon fontSize='medium' />,
	industry: <IndustryIcon fontSize='medium' />,
	agriculture: <AgricultureIcon fontSize='medium' />,
}

const Sidebar = () => {
	const navigate = useNavigate()
	const { data: user } = useGetUserMe()
	const categories = useCategories()
	const dispatch = useAppDispatch()
	if (!user || !categories) return null

	const isSuperAdmin = user.is_superadmin
	const userCategory = user.category

	const baseNav = categories
		.map(cat => ({
			segment: cat.id,
			title: cat.category_name,
			icon: iconMap[cat.id] ?? <DashboardCustomizeIcon fontSize='medium' />,
		}))
		.filter(item => isSuperAdmin || item.segment === userCategory)

	if (isSuperAdmin) {
		baseNav.splice(1, 0, {
			segment: 'users',
			title: 'Adminlar',
			icon: <PeopleIcon fontSize='medium' />,
		})
	}

	function onLogOut() {
		dispatch(logout())
		removeTokens()
		navigate('/auth')
	}

	return (
		<aside className='w-64 h-full bg-white border-r-2 border-r-[#B1B1B1] shadow-sm p-4 space-y-2 flex flex-col justify-between'>
			<div className='space-y-2'>
				{baseNav.map(nav => (
					<NavLink
						key={nav.segment}
						to={`/${nav.segment}`}
						className={({ isActive }) =>
							`flex text-[#b0bec5] items-center gap-6 px-4 py-2 rounded transition text-xl hover:text-blue-600 ${
								isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-blue-100'
							}`
						}
					>
						{nav.icon}
						<span className='text-gray-600'>{nav.title}</span>
					</NavLink>
				))}
			</div>

			<div className='px-4 py-2'>
				<button
					className='flex items-center gap-2 text-xl cursor-pointer text-gray-600'
					onClick={onLogOut}
				>
					<ExitToAppIcon fontSize='medium' />
					Выход
				</button>
			</div>
		</aside>
	)
}

export default Sidebar
