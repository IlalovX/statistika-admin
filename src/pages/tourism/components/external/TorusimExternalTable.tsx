import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
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
	useDeleteBothTourism,
	useGetExternalList,
} from '../../../../hooks/useTourism'
import type { GetTourismExternal } from '../../../../types/tourism'
import { getMonthLabel } from '../../../../utils/getMontsLabel'
import { EditExternalDialog } from './TourismExternalEditModal'

export default function TorusimExternalTable() {
	const [openEdit, setOpenEdit] = useState(false)
	const deleteMutation = useDeleteBothTourism()
	const [editData, setEditData] = useState<
		(GetTourismExternal & { id: string | number }) | null
	>(null)

	const { data = [] } = useGetExternalList()

	const handleDelete = (id: string | number) => {
		deleteMutation.mutate({ id })
	}

	const handleEdit = (row: GetTourismExternal & { id: string | number }) => {
		setEditData(row)
		setOpenEdit(true)
	}

	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Год</TableCell>
							<TableCell>Месяц</TableCell>
							<TableCell>Страна</TableCell>
							<TableCell>Въездной</TableCell>
							<TableCell>Выездной</TableCell>
							<TableCell>Доход</TableCell>
							<TableCell>Средняя продолжительность</TableCell>
							<TableCell align='right'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.map((row: GetTourismExternal & { id: string | number }) => (
							<TableRow key={row.id}>
								<TableCell>{row.year}</TableCell>
								<TableCell>{getMonthLabel(row.month)}</TableCell>
								<TableCell>
									{row.country_code && row.country_code.data.official}
								</TableCell>
								<TableCell>{row.inbound_tourists}</TableCell>
								<TableCell>{row.outbound_tourists}</TableCell>
								<TableCell>{row.tourism_profit}</TableCell>
								<TableCell>{row.avg_trip_duration}</TableCell>
								<TableCell align='right'>
									<IconButton onClick={() => handleEdit(row)}>
										<EditIcon />
									</IconButton>
									<IconButton onClick={() => handleDelete(row.id)}>
										<DeleteIcon color='error' />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{editData && (
				<EditExternalDialog
					open={openEdit}
					onClose={() => setOpenEdit(false)}
					initialData={editData}
				/>
			)}
		</>
	)
}
