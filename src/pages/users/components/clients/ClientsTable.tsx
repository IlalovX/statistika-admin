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
import { useDeleteClient, useGetClients } from '../../../../hooks/useClients'
import ClientsEditModal from './ClientsEditModal'

function ClientsTable() {
	const { data: users = [] } = useGetClients()
	const [editData, setEditData] = useState<null | {
		id: string | number
		name: string
		username: string
	}>(null)

	const deleteClient = useDeleteClient()

	const handleDelete = (id: string | number) => {
		deleteClient.mutate(id)
	}

	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ФИО</TableCell>
							<TableCell>Логин</TableCell>
							<TableCell align='right'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map(user => (
							<TableRow key={user.id}>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.username}</TableCell>
								<TableCell align='right'>
									<IconButton onClick={() => setEditData(user)}>
										<EditIcon />
									</IconButton>
									<IconButton
										color='error'
										onClick={() => handleDelete(user.id)}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{editData && (
				<ClientsEditModal
					open={!!editData}
					onClose={() => setEditData(null)}
					initialData={editData}
				/>
			)}
		</>
	)
}

export default ClientsTable
