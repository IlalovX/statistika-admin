import { Typography } from '@mui/material'
import DistrictTable from './components/district/DistrictTable'
import FirmsTable from './components/firms/FirmsTable'
import PlacementTable from './components/placement/PlacementTable'
import YieldTable from './components/yield/YieldTable'

function Agriculture() {
	return (
		<div className='space-y-10'>
			<section className='!space-y-5'>
				<Typography variant='h4'>Поля</Typography>
				<YieldTable />
			</section>
			<section className='!space-y-5'>
				<Typography variant='h4'>Размещение</Typography>
				<PlacementTable />
			</section>
			<section className='!space-y-5'>
				<Typography variant='h4'>Рынок</Typography>
				<DistrictTable />
			</section>
			<section className='!space-y-5'>
				<Typography variant='h4'>Фирмы</Typography>
				<FirmsTable />
			</section>
		</div>
	)
}

export default Agriculture
