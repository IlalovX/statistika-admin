import { Typography } from '@mui/material'
import DistrictTable from './components/district/DistrictTable'
import PlacementTable from './components/placement/PlacementTable'
import YieldTable from './components/yield/YieldTable'
import FirmsTable from './components/firms/FirmsTable'

function Agriculture() {
	return (
		<div className='space-y-10'>
			<section className='!space-y-5'>
				<Typography variant='h4'>Yield</Typography>
				<YieldTable />
			</section>
			<section className='!space-y-5'>
				<Typography variant='h4'>Placement</Typography>
				<PlacementTable />
			</section>
			<section className='!space-y-5'>
				<Typography variant='h4'>District</Typography>
				<DistrictTable />
			</section>
			<section className='!space-y-5'>
				<Typography variant='h4'>Firms</Typography>
				<FirmsTable/>
			</section>
		</div>
	)
}

export default Agriculture
