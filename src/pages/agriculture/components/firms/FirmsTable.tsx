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
import { useDeleteFirms, useGetFirms } from '../../../../hooks/useAgriculture'
import type { CreateFirms } from '../../../../types/agriculture'
import FirmsAddModal from './FirmsAddModal'
import FirmsEditModal from './FirmsEditModal'

export default function FirmsTable() {
	const { data: list = [] } = useGetFirms()
	const { mutate: deleteItem } = useDeleteFirms()

	const [addOpen, setAddOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [selected, setSelected] = useState<
		(CreateFirms & { id: string | number }) | null
	>(null)

	return (
		<div>
			<Box display='flex' alignItems='center' justifyContent='flex-end' mb={2}>
				<Button variant='contained' onClick={() => setAddOpen(true)}>
					Добавить
				</Button>
			</Box>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Год</TableCell>
							<TableCell>Количество фирм</TableCell>
							<TableCell align='right'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{list.length === 0 ? (
							<TableRow>
								<TableCell colSpan={3} align='center'>
									Нет данных
								</TableCell>
							</TableRow>
						) : (
							list.map(row => (
								<TableRow key={row.id}>
									<TableCell>{row.year}</TableCell>
									<TableCell>{row.firm_count}</TableCell>
									<TableCell align='right'>
										<IconButton
											onClick={() => {
												setSelected({ ...row, id: Number(row.id) })

												// ✅ передаём выбранную строку
												setEditOpen(true)
											}}
										>
											<Edit />
										</IconButton>

										<IconButton onClick={() => deleteItem(row.id as number)}>
											<Delete color='error' />
										</IconButton>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>

			<FirmsAddModal open={addOpen} onClose={() => setAddOpen(false)} />
			<FirmsEditModal
				open={editOpen}
				onClose={() => setEditOpen(false)}
				data={selected ? { ...selected, id: Number(selected.id) } : null}
			/>
		</div>
	)
}
