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
import { useGetTourismGroupList } from '../../../../hooks/useTourismGroups'
import type { GetTourismGroupList } from '../../../../types/tourism-groups'
import TourismGroupAddModal from './TourismGroupAddModal'
import TourismGroupEditModal from './TourismGroupEditModal'

export default function TourismGroupTable() {
	const { data: groups, refetch } = useGetTourismGroupList()

	const [editingGroup, setEditingGroup] = useState<GetTourismGroupList | null>(
		null
	)
	const [openAdd, setOpenAdd] = useState(false)

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
							<TableCell>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{groups?.map(group => (
							<TableRow key={group.id}>
								<TableCell>{group.id}</TableCell>
								<TableCell>{group.name}</TableCell>
								<TableCell>
									<Button
										variant='outlined'
										size='small'
										onClick={() => setEditingGroup(group)}
									>
										Редактировать
									</Button>
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
