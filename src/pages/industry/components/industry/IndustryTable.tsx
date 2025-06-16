import { Delete, Edit } from '@mui/icons-material'
import {
	Button,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material'
import { useState } from 'react'
import {
	useDeleteIndustry,
	useGetIndustryList,
} from '../../../../hooks/useInvestment'
import { useGetRegionsList } from '../../../../hooks/useRegions'
import type { GetIndustryList } from '../../../../types/investment'
import { getMonthLabel } from '../../../../utils/getMontsLabel'
import IndustryAddModal from './IndustryAddModal'
import IndustryEditModal from './IndustryEditModal'

export default function IndustryTable() {
	const { data: industries = [], isLoading } = useGetIndustryList()
	const { mutate: deleteIndustry } = useDeleteIndustry()
	const { data: regions = [] } = useGetRegionsList()

	const [addOpen, setAddOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [selected, setSelected] = useState<GetIndustryList | null>(null)

	if (isLoading) return <p>Загрузка...</p>

	return (
		<div>
			<Button variant='contained' onClick={() => setAddOpen(true)}>
				Добавить
			</Button>

			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Год</TableCell>
						<TableCell>Месяц</TableCell>
						<TableCell>Регион</TableCell>
						<TableCell>Вес продукта</TableCell>
						<TableCell>Прибыль</TableCell>
						<TableCell align='right'>Действия</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{industries?.map(row => (
						<TableRow key={row.id}>
							<TableCell>{row.year}</TableCell>
							<TableCell>{getMonthLabel(row.month)}</TableCell>
							<TableCell>
								{regions?.find(item => item.id == row.region_id)?.region_name}
							</TableCell>
							<TableCell>{row.product_weight}</TableCell>
							<TableCell>{row.product_profit}</TableCell>
							<TableCell align='right'>
								<IconButton
									onClick={() => {
										setSelected(row)
										setEditOpen(true)
									}}
								>
									<Edit />
								</IconButton>
								<IconButton
									onClick={() => deleteIndustry({ id: +row.id as number })}
								>
									<Delete color='error' />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<IndustryAddModal open={addOpen} onClose={() => setAddOpen(false)} />
			<IndustryEditModal
				open={editOpen}
				onClose={() => setEditOpen(false)}
				data={selected as GetIndustryList}
			/>
		</div>
	)
}
