import { Typography } from '@mui/material'
import IndustryTable from './components/industry/IndustryTable'
import InvestmentTable from './components/investment/InvestmentTable'
import OutputTable from './components/output/OutputTable'
import ProductionDistrictTable from './components/production-district/ProductionDistrictTable'

function Industry() {
	return (
		<div className='space-y-10'>
			<section className='!space-y-5'>
				<Typography variant='h4'>Промышленность</Typography>
				<IndustryTable />
			</section>
			<section className='!space-y-5'>
				<Typography variant='h4'>Объем промышленной продукции</Typography>
				<OutputTable />
			</section>
			<section className='!space-y-5'>
				<Typography variant='h4'>Инвестиции</Typography>
				<InvestmentTable />
			</section>
			<section className='!space-y-5'>
				<Typography variant='h4'>Инвестиционные проекты по районам</Typography>
				<ProductionDistrictTable />
			</section>
		</div>
	)
}

export default Industry
