import { Delete, Edit } from '@mui/icons-material'
import {
	Box,
	Button,
	IconButton,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material'
import { useState } from 'react'
import {
	useDeletePlacemt,
	useGetPlacement,
} from '../../../../hooks/useAgriculture'
import type { GetPlacementForm } from '../../../../types/agriculture'
import PlacementAddModal from './PlacementAddModal'
import PlacementEditModal from './PlacementEditModal'

const YEARS = Array.from({ length: 10 }, (_, i) => 2020 + i)

export default function PlacementTable() {
	const [year, setYear] = useState(new Date().getFullYear())
	const { data: list = [], isLoading } = useGetPlacement(year)
	const { mutate: deleteItem } = useDeletePlacemt()

	const [addOpen, setAddOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [selected, setSelected] = useState<GetPlacementForm | null>(null)

	if (isLoading) return <p>Загрузка...</p>

	return (
		<div>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				mb={2}
			>
				<TextField
					select
					label='Год'
					value={year}
					onChange={e => setYear(Number(e.target.value))}
					size='small'
					style={{ width: 150 }}
				>
					{YEARS.map(y => (
						<MenuItem key={y} value={y}>
							{y}
						</MenuItem>
					))}
				</TextField>

				<Button variant='contained' onClick={() => setAddOpen(true)}>
					Добавить
				</Button>
			</Box>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Год</TableCell>
							<TableCell>Продукт</TableCell>
							<TableCell>Площадь</TableCell>
							<TableCell>Посеяно</TableCell>
							<TableCell>Убрано</TableCell>
							<TableCell>Прогноз</TableCell>
							<TableCell>Процент</TableCell>
							<TableCell align='right'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{list.length === 0 ? (
							<TableRow>
								<TableCell colSpan={8} align='center'>
									Нет данных за выбранный год
								</TableCell>
							</TableRow>
						) : (
							list.map(row => (
								<TableRow key={row.id}>
									<TableCell>{row.year}</TableCell>
									<TableCell>{row.product}</TableCell>
									<TableCell>{row.area}</TableCell>
									<TableCell>{row.planted}</TableCell>
									<TableCell>{row.harvested}</TableCell>
									<TableCell>{row.forecast}</TableCell>
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
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>

			<PlacementAddModal open={addOpen} onClose={() => setAddOpen(false)} />
			<PlacementEditModal
				open={editOpen}
				onClose={() => setEditOpen(false)}
				data={selected}
			/>
		</div>
	)
}
