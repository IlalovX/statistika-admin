import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { useState } from 'react'
import { useGetTourismGroupData } from '../../../../hooks/useTourismGroups'

import { TourismGroupDataAddModal } from './TourismGroupDataAddModal'
import { TourismGroupDataEditModal } from './TourismGroupDataEditModal'
import type { GetTourismGroupData, GetTourismSubGroupList } from '../../../../types/tourism-groups'

interface Props {
	groupId: number
	subgroup: GetTourismSubGroupList
}

export default function TourismGroupDataTable({ groupId, subgroup }: Props) {
	const { data = [] } = useGetTourismGroupData()
	const [editing, setEditing] = useState<GetTourismGroupData | null>(null)
	const [openAdd, setOpenAdd] = useState(false)

	// фильтрация по имени подгруппы
	const filtered = data.filter(
		(row: GetTourismGroupData) => row.subgroup === subgroup.name
	)

	return (
		<>
			<div className='flex justify-between items-center'>
				<h2 className='text-xl font-semibold'>{subgroup.name}</h2>
				<Button onClick={() => setOpenAdd(true)} variant='contained'>
					Добавить запись
				</Button>
			</div>

			<TableContainer component={Paper} className='mt-4'>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Год</TableCell>
							<TableCell>Месяц</TableCell>
							<TableCell>Страна</TableCell>
							<TableCell>Туристы</TableCell>
							<TableCell align='right'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filtered.map((row: GetTourismGroupData) => (
							<TableRow key={row.id}>
								<TableCell>{row.id}</TableCell>
								<TableCell>{row.year}</TableCell>
								<TableCell>{row.month}</TableCell>
								<TableCell>{row.country_code?.official}</TableCell>
								<TableCell>{row.tourist_count}</TableCell>
								<TableCell align='right'>
									<Button onClick={() => setEditing(row)} variant='outlined'>Редактировать</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{editing && (
				<TourismGroupDataEditModal
					data={editing}
					open={true}
					onClose={() => setEditing(null)}
				/>
			)}

			<TourismGroupDataAddModal
				open={openAdd}
				onClose={() => setOpenAdd(false)}
				groupId={groupId}
				subgroup={subgroup}
			/>
		</>
	)
}
