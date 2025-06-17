import {
	Button,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { useState } from 'react'
import {
	useGetTourismGroupList,
	useGetTourismSubGroupList,
} from '../../../../hooks/useTourismGroups'
import type {
	GetTourismGroupList,
	GetTourismSubGroupList,
} from '../../../../types/tourism-groups'
import { TourismSubGroupAddModal } from './TourismSubGroupAddModal'
import { TourismSubGroupEditModal } from './TourismSubGroupEditModal'

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
									<Button
										variant='outlined'
										size='small'
										onClick={() => setEditingSubgroup(sg)}
									>
										Редактировать
									</Button>
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
