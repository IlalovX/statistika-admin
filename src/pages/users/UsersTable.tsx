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
import { useCategories } from '../../context/CategoriesContext'
import { useGetUsersList } from '../../hooks/useUsers'

function UsersTable() {
	const categories = useCategories()
	const { data: users = [] } = useGetUsersList()

	const getCategoryName = (id: string) => {
		return categories?.find(c => c.id === id)?.category_name || id
	}

	return (
		<div>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Название</TableCell>
							<TableCell>Логин</TableCell>
							<TableCell>Регион</TableCell>
							<TableCell>Категория</TableCell>
							<TableCell align='center'>Действии</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{users.map(user => (
							<TableRow key={user.id}>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.username}</TableCell>
								<TableCell>{user.region}</TableCell>
								<TableCell>{getCategoryName(user.category)}</TableCell>
								<TableCell align='center'>
									<IconButton color='primary'>
										<EditIcon />
									</IconButton>
									<IconButton color='error'>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default UsersTable
