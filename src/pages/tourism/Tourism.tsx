import { Button, Typography } from '@mui/material'
import { useState } from 'react'
import TorusimExternalTable from './components/external/TorusimExternalTable'
import ToursimExternalAddModal from './components/external/ToursimExternalAddModal'
import TourismInternalAddModal from './components/internal/TourismInternalAddModal'
import TourismInternalTable from './components/internal/TourismInternalTable'
import { NavLink } from 'react-router'

function Tourism() {
	const [activeModal, setActiveModal] = useState<
		'external' | 'internal' | null
	>(null)

	return (
		<div className='space-y-5 flex flex-col gap-10'>
			<NavLink to={'/tourism/groups'}>
			<Button variant='contained'>Группы</Button></NavLink>
			<section>
				<header className='flex justify-between'>
					<Typography variant='h4'>Внешний туризм</Typography>
					<Button
						variant='contained'
						onClick={() => setActiveModal('external')}
						sx={{ mb: 2 }}
					>
						Добавить запись
					</Button>
					<ToursimExternalAddModal
						open={activeModal === 'external'}
						onClose={() => setActiveModal(null)}
					/>
				</header>
				<TorusimExternalTable />
			</section>

			<section>
				<header className='flex justify-between'>
					<Typography variant='h4'>Внутренний туризм</Typography>
					<Button
						variant='contained'
						onClick={() => setActiveModal('internal')}
						sx={{ mb: 2 }}
					>
						Добавить запись
					</Button>
					<TourismInternalAddModal
						open={activeModal === 'internal'}
						onClose={() => setActiveModal(null)}
					/>
				</header>
				<TourismInternalTable />
			</section>
		</div>
	)
}

export default Tourism
