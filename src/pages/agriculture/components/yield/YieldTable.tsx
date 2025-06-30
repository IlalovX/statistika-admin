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
import { useDeleteYield, useGetYield } from '../../../../hooks/useAgriculture'
import type { GetYieldForm } from '../../../../types/agriculture'
import { getMonthLabel } from '../../../../utils/getMontsLabel'
import YieldAddModal from './YieldAddModal'
import YieldEditModal from './YieldEditModal'

const YEARS = Array.from({ length: 10 }, (_, i) => 2020 + i) // 2020–2029

export default function YieldTable() {
	const [year, setYear] = useState(2025)
	const { data: list = [], isLoading } = useGetYield(year)
	const { mutate: deleteItem } = useDeleteYield()

	const [addOpen, setAddOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [selected, setSelected] = useState<GetYieldForm | null>(null)

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
					onChange={(e) => setYear(Number(e.target.value))}
					size='small'
					style={{ width: 150 }}
				>
					{YEARS.map((y) => (
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
							<TableCell>Месяц</TableCell>
							<TableCell>Страна</TableCell>
							<TableCell>Продукт</TableCell>
							<TableCell>Тип</TableCell>
							<TableCell>Значение</TableCell>
							<TableCell>Ед. изм.</TableCell>
							<TableCell align='right'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{list?.length === 0 ? (
							<TableRow>
								<TableCell colSpan={8} align='center'>
									Нет данных за выбранный год
								</TableCell>
							</TableRow>
						) : (
							list?.map((row) => (
								<TableRow key={row.id}>
									<TableCell>{row.year}</TableCell>
									<TableCell>{getMonthLabel(row.month)}</TableCell>
									<TableCell>{row.country.data.official}</TableCell>
									<TableCell>{row.product}</TableCell>
									<TableCell>{row.type}</TableCell>
									<TableCell>{row.value}</TableCell>
									<TableCell>{row.unit}</TableCell>
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
			<YieldAddModal open={addOpen} onClose={() => setAddOpen(false)} />
			<YieldEditModal
				open={editOpen}
				onClose={() => setEditOpen(false)}
				data={selected}
			/>
		</div>
	)
}
