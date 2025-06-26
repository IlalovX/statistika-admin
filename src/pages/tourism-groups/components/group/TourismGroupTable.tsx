import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
} from '@mui/material'
import { useState } from 'react'
import { toast } from 'sonner'
import {
	useDeleteTourismGroup,
	useGetTourismGroupList,
} from '../../../../hooks/useTourismGroups'
import type { GetTourismGroupList } from '../../../../types/tourism-groups'
import TourismGroupAddModal from './TourismGroupAddModal'
import TourismGroupEditModal from './TourismGroupEditModal'

export default function TourismGroupTable() {
	const { data: groups, refetch } = useGetTourismGroupList()
	const { mutate: deleteGroup } = useDeleteTourismGroup()

	const [editingGroup, setEditingGroup] = useState<GetTourismGroupList | null>(
		null
	)
	const [openAdd, setOpenAdd] = useState(false)

	const handleDelete = (id: number | string) => {
		if (confirm('Вы уверены, что хотите удалить эту группу?')) {
			deleteGroup(id, {
				onSuccess: () => {
					toast.success('Группа удалена ✅')
					refetch()
				},
				onError: () => {
					toast.error('Ошибка при удалении ❌')
				},
			})
		}
	}

	return (
		<div>
			<Button variant='contained' onClick={() => setOpenAdd(true)}>
				Добавить группу
			</Button>

			<TourismGroupAddModal
				open={openAdd}
				onClose={() => {
					setOpenAdd(false)
					refetch()
				}}
			/>

			<TableContainer component={Paper} sx={{ mt: 3 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Название</TableCell>
							<TableCell align='right'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{groups?.map(group => (
							<TableRow key={group.id}>
								<TableCell>{group.id}</TableCell>
								<TableCell>{group.name}</TableCell>
								<TableCell align='right'>
									<Tooltip title='Редактировать'>
										<IconButton
											aria-label='edit'
											color='primary'
											onClick={() => setEditingGroup(group)}
										>
											<EditIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title='Удалить'>
										<IconButton
											aria-label='delete'
											color='error'
											onClick={() => handleDelete(group.id)}
										>
											<DeleteIcon />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{editingGroup && (
				<TourismGroupEditModal
					group={editingGroup}
					onClose={() => {
						setEditingGroup(null)
						refetch()
					}}
				/>
			)}
		</div>
	)
}
