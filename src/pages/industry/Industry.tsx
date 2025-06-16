import { Typography } from '@mui/material'
import IndustryTable from './components/industry/IndustryTable'
import OutputTable from './components/output/OutputTable'

function Industry() {
	return (
		<div className='space-y-10'>
			<section className='!space-y-5'>
				<Typography variant='h4'>Industry</Typography>
				<IndustryTable />
			</section>
			<section className='!space-y-5'>
				<Typography variant='h4'>Output</Typography>
				<OutputTable />
			</section>
		</div>
	)
}

export default Industry
