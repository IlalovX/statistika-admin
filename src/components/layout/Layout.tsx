import { Outlet } from 'react-router'
import { Toaster } from 'sonner'
import { CategoriesContext } from '../../context/CategoriesContext'
import { useCategoriesList } from '../../hooks/useRoleCategoriesList'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'

function Layout() {
	const { data: categories = [] } = useCategoriesList()
	console.log(categories)

	return (
		<CategoriesContext.Provider value={categories}>
			<Toaster />
			<div className='h-screen flex flex-col'>
				<Header />
				<div className='flex flex-1 overflow-hidden'>
					<Sidebar />
					<main className='flex-1 overflow-y-auto bg-[#f5f5f5] p-[36px]'>
						<Outlet />
					</main>
				</div>
			</div>
		</CategoriesContext.Provider>
	)
}

export default Layout
