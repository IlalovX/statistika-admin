import { Delete, Edit } from '@mui/icons-material'
import {
	Button,
	IconButton,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
	useDeleteTourismSubGroup,
	useGetTourismGroupList,
	useGetTourismSubGroupList,
} from '../../../../hooks/useTourismGroups'
import type {
	GetTourismGroupList,
	GetTourismSubGroupList,
} from '../../../../types/tourism-groups'
import { TourismSubGroupAddModal } from './TourismSubGroupAddModal'
import { TourismSubGroupEditModal } from './TourismSubGroupEditModal'
// ...

export default function TourismSubGroupTable() {
	const [editingSubgroup, setEditingSubgroup] =
		useState<GetTourismSubGroupList | null>(null)
	const [openAdd, setOpenAdd] = useState(false)

	const { data: groups } = useGetTourismGroupList()
	const [selectedGroup, setSelectedGroup] =
		useState<GetTourismGroupList | null>(null)
	const { data: subgroups = [], refetch } = useGetTourismSubGroupList(
		selectedGroup?.id ?? ''
	)

	const { mutate: deleteSubGroup } = useDeleteTourismSubGroup()

	// 🆕 Выбираем первую группу после загрузки данных
	useEffect(() => {
		if (!selectedGroup && groups && groups.length > 0) {
			setSelectedGroup(groups[0])
		}
	}, [groups, selectedGroup])

	const handleDelete = (id: number | string) => {
		deleteSubGroup(id, {
			onSuccess: () => {
				toast.success('Удалено ✅')
				refetch()
			},
			onError: () => {
				toast.error('Ошибка при удалении ❌')
			},
		})
	}

	return (
		<div>
			<div className='mb-4 flex items-center gap-4'>
				<Select
					value={selectedGroup?.id ?? ''}
					displayEmpty
					onChange={e => {
						const group =
							groups?.find(g => g.id === Number(e.target.value)) || null
						setSelectedGroup(group)
					}}
					sx={{ minWidth: 200 }}
				>
					<MenuItem value=''>Выберите группу</MenuItem>
					{groups?.map(g => (
						<MenuItem key={g.id} value={g.id}>
							{g.name}
						</MenuItem>
					))}
				</Select>
				<Button
					variant='contained'
					onClick={() => setOpenAdd(true)}
					disabled={!selectedGroup}
				>
					Добавить подгруппу
				</Button>
			</div>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Название</TableCell>
							<TableCell>Дата</TableCell>
							<TableCell align='right'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{subgroups?.map(sg => (
							<TableRow key={sg.id}>
								<TableCell>{sg.id}</TableCell>
								<TableCell>{sg.name}</TableCell>
								<TableCell>
									{new Date(sg.created_at).toLocaleDateString()}
								</TableCell>
								<TableCell align='right'>
									<Tooltip title='Редактировать'>
										<IconButton
											color='primary'
											onClick={() => setEditingSubgroup(sg)}
										>
											<Edit />
										</IconButton>
									</Tooltip>
									<Tooltip title='Удалить'>
										<IconButton
											color='error'
											onClick={() => handleDelete(sg.id)}
										>
											<Delete />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{selectedGroup && (
				<TourismSubGroupAddModal
					group={selectedGroup}
					open={openAdd}
					onClose={() => {
						setOpenAdd(false)
						refetch()
					}}
				/>
			)}

			{editingSubgroup && selectedGroup && (
				<TourismSubGroupEditModal
					groupId={selectedGroup.id}
					subgroup={editingSubgroup}
					onClose={() => {
						setEditingSubgroup(null)
						refetch()
					}}
				/>
			)}
		</div>
	)
}
