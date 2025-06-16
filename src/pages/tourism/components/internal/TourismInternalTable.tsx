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
	useGetInternalList,
} from '../../../../hooks/useTourism'
import type { EditTourismInternalForm } from '../../../../types/tourism'
import TourismInternalEditModal from './TourismInternalEditModal'
import { getMonthLabel } from '../../../../utils/getMontsLabel'

function TourismInternalTable() {
	const { data } = useGetInternalList()
	const deleteMutation = useDeleteBothTourism()
	const [openEdit, setOpenEdit] = useState(false)
	const [selectedRow, setSelectedRow] =
		useState<EditTourismInternalForm | null>(null)

	const handleDelete = (id: string | number) => {
		deleteMutation.mutate({ id })
	}

	const handleEditClick = (row: EditTourismInternalForm) => {
		setSelectedRow(row)
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
							<TableCell>Прибыль (млн сум)</TableCell>
							<TableCell>Туристы (чел.)</TableCell>
							<TableCell align='right'>Действии</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.map(item => (
							<TableRow key={item.id}>
								<TableCell>{item.year}</TableCell>
								<TableCell>{getMonthLabel(item.month)}</TableCell>
								<TableCell>{item.tourism_profit ?? '—'}</TableCell>
								<TableCell>{item.domestic_tourists ?? '—'}</TableCell>
								<TableCell align='right'>
									<IconButton
										onClick={() =>
											handleEditClick({
												id: item.id,
												year: item.year,
												month: item.month,
												domestic_tourists: item.domestic_tourists ?? 0,
												tourism_profit: String(item.tourism_profit ?? ''),
											})
										}
									>
										<EditIcon />
									</IconButton>
									<IconButton onClick={() => handleDelete(item.id)}>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Модалка редактирования */}
			{selectedRow && (
				<TourismInternalEditModal
					open={openEdit}
					onClose={() => setOpenEdit(false)}
					initialData={selectedRow}
				/>
			)}
		</>
	)
}

export default TourismInternalTable
