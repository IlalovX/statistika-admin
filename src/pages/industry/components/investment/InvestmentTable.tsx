import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
	Box,
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { useState } from 'react'
import {
	useDeleteInvestment,
	useGetInvestment,
} from '../../../../hooks/useInvestment'
import { useGetRegionsList } from '../../../../hooks/useRegions'
import type { GetInvestmentsForm } from '../../../../types/investment'
import { getMonthLabel } from '../../../../utils/getMontsLabel'
import InvestmentAddModal from './InvestmentAddModal'
import InvestmentEditModal from './InvestmentEditModal'

export default function InvestmentTable() {
	const { data: investments = [] } = useGetInvestment()
	const { mutate: deleteInvestment } = useDeleteInvestment()
	const { data: regions = [] } = useGetRegionsList()
	const [isAddOpen, setAddOpen] = useState(false)
	const [editData, setEditData] = useState<GetInvestmentsForm | null>(null)

	const handleDelete = (id: number) => {
		deleteInvestment({ id })
	}

	return (
		<Box>
			<Box display='flex' alignItems='center' mb={2}>
				<Button variant='contained' onClick={() => setAddOpen(true)}>
					Добавить
				</Button>
			</Box>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Год</TableCell>
							<TableCell>Месяц</TableCell>
							<TableCell>Регион ID</TableCell>
							<TableCell>Код страны</TableCell>
							<TableCell>Название проекта</TableCell>
							<TableCell>Кол-во проектов</TableCell>
							<TableCell>Рабочие места</TableCell>
							<TableCell>Сумма</TableCell>
							<TableCell align='right'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{investments?.map(item => (
							<TableRow key={item.id}>
								<TableCell>{item.year}</TableCell>
								<TableCell>{getMonthLabel(item.month)}</TableCell>
								<TableCell>
									{regions.find(reg => reg.id === item.region_id)?.region_name}
								</TableCell>
								<TableCell>{item.country.official}</TableCell>
								<TableCell>{item.project_name}</TableCell>
								<TableCell>{item.project_count}</TableCell>
								<TableCell>{item.project_workplaces}</TableCell>
								<TableCell>{item.investment_amount}</TableCell>
								<TableCell align='right'>
									<IconButton onClick={() => setEditData(item)}>
										<EditIcon />
									</IconButton>
									<IconButton onClick={() => handleDelete(+item.id)}>
										<DeleteIcon color='error' />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Add Modal */}
			<InvestmentAddModal open={isAddOpen} onClose={() => setAddOpen(false)} />

			{/* Edit Modal */}
			{editData && (
				<InvestmentEditModal
					open={!!editData}
					onClose={() => setEditData(null)}
					data={editData}
				/>
			)}
		</Box>
	)
}
