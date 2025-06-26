import { Delete, Edit } from '@mui/icons-material'
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
	useDeleteProductionDistrict,
	useGetProductionDistrict,
} from '../../../../hooks/useInvestment'
import { useGetRegionsList } from '../../../../hooks/useRegions'
import type { GetProductionDistrictForm } from '../../../../types/investment'
import ProductionDistrictAddModal from './ProductionDistrictAddModal'
import ProductionDistrictEditModal from './ProductionDistrictEditModal'

export default function ProductionDistrictTable() {
	const { data: list = [], isLoading } = useGetProductionDistrict()
	const { data: regions = [] } = useGetRegionsList()
	const { mutate: deleteItem } = useDeleteProductionDistrict()

	const [addOpen, setAddOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [selected, setSelected] = useState<GetProductionDistrictForm | null>(
		null
	)

	if (isLoading) return <p>Загрузка...</p>

	return (
		<div>
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
							<TableCell>Регион</TableCell>
							<TableCell>Продукт</TableCell>
							<TableCell>Площадь</TableCell>
							<TableCell>Вес</TableCell>
							<TableCell>Процент</TableCell>
							<TableCell align='right'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{list.map(row => (
							<TableRow key={row.id}>
								<TableCell>{row.year}</TableCell>
								<TableCell>
									{regions.find(r => r.id === row.region_id)?.region_name}
								</TableCell>
								<TableCell>{row.product}</TableCell>
								<TableCell>{row.area}</TableCell>
								<TableCell>{row.weight}</TableCell>
								<TableCell>{row.percent}</TableCell>
								<TableCell align='right'>
									<IconButton
										onClick={() => {
											setSelected(row)
											setEditOpen(true)
										}}
									>
										<Edit />
									</IconButton>
									<IconButton onClick={() => deleteItem({ id: row.id })}>
										<Delete color='error' />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<ProductionDistrictAddModal
				open={addOpen}
				onClose={() => setAddOpen(false)}
			/>
			<ProductionDistrictEditModal
				open={editOpen}
				onClose={() => setEditOpen(false)}
				data={selected}
			/>
		</div>
	)
}
