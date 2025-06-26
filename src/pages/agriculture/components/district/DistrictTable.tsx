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
	useDeleteDistrict,
	useGetDistrict,
} from '../../../../hooks/useAgriculture'
import { useGetRegionsList } from '../../../../hooks/useRegions'
import type { GetDistrictForm } from '../../../../types/agriculture'
import DistrictAddModal from './DistrictAddModal'
import DistrictEditModal from './DistrictEditModal'

const YEARS = Array.from({ length: 10 }, (_, i) => 2020 + i)

export default function DistrictTable() {
	const [year, setYear] = useState(new Date().getFullYear())
	const { data: list = [] } = useGetDistrict(year)
	const { data: regions = [] } = useGetRegionsList()
	const { mutate: deleteItem } = useDeleteDistrict()
	const [addOpen, setAddOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [selected, setSelected] = useState<GetDistrictForm | null>(null)

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
							<TableCell>Регион</TableCell>
							<TableCell>Продукт</TableCell>
							<TableCell>Вес</TableCell>
							<TableCell>Площадь</TableCell>
							<TableCell>Экспорт</TableCell>
							<TableCell>Внутр. рынок</TableCell>
							<TableCell>Лимит воды</TableCell>
							<TableCell align='right'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{list.length === 0 ? (
							<TableRow>
								<TableCell colSpan={9} align='center'>
									Нет данных за выбранный год
								</TableCell>
							</TableRow>
						) : (
							list.map(row => (
								<TableRow key={row.id}>
									<TableCell>{row.year}</TableCell>
									<TableCell>
										{
											regions.find(region => region.id === row.region_id)
												?.region_name
										}
									</TableCell>
									<TableCell>{row.product}</TableCell>
									<TableCell>{row.weight}</TableCell>
									<TableCell>{row.area}</TableCell>
									<TableCell>{row.export}</TableCell>
									<TableCell>{row.local_market}</TableCell>
									<TableCell>{row.water_limit}</TableCell>
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
											onClick={() => deleteItem({ id: row.id as number })}
										>
											<Delete color='error' />
										</IconButton>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>

			<DistrictAddModal open={addOpen} onClose={() => setAddOpen(false)} />
			<DistrictEditModal
				open={editOpen}
				onClose={() => setEditOpen(false)}
				data={selected}
			/>
		</div>
	)
}
