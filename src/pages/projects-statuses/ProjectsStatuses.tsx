import { Delete } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
import {
	Box,
	Button,
	IconButton,
	Modal,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import {
	useCreateProjectStatus,
	useDeleteProjectStatus,
	useEditProjectStatus,
	useGetProjectsStatusesList,
} from '../../hooks/useProjectsStatuses'
import type { ProjectsStatusesForm } from '../../types/projects-statuses'

const ProjectsStatusesPage = () => {
	const { data } = useGetProjectsStatusesList()
	const { mutateAsync: createStatus } = useCreateProjectStatus()
	const { mutateAsync: editStatus } = useEditProjectStatus()
	const { mutateAsync: deleteStatus } = useDeleteProjectStatus()

	const [open, setOpen] = useState(false)
	const [editId, setEditId] = useState<number | null>(null)
	const [form, setForm] = useState<ProjectsStatusesForm>({
		value: '',
		color: '',
	})

	const handleOpen = (status?: ProjectsStatusesForm) => {
		if (status) {
			setEditId(status.id ?? 0)
			setForm({ value: status.value, color: status.color })
		} else {
			setEditId(null)
			setForm({ value: '', color: '' })
		}
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setForm({ value: '', color: '' })
		setEditId(null)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (editId) {
			await editStatus({ ...form, id: editId })
		} else {
			await createStatus(form)
		}
		handleClose()
	}

	const handleDelete = async (id: string | number) => {
		await deleteStatus({ id })
	}

	return (
		<Box p={3}>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				mb={2}
			>
				<Typography variant='h5'>Статусы проектов</Typography>
				<Button
					variant='contained'
					color='primary'
					onClick={() => handleOpen()}
				>
					Добавить
				</Button>
			</Box>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>№</TableCell>
							<TableCell>Название статуса</TableCell>
							<TableCell>Цвет</TableCell>
							<TableCell>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.map((status, index) => (
							<TableRow key={status.id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{status.value}</TableCell>
								<TableCell>
									<Box
										sx={{
											width: 16,
											height: 16,
											borderRadius: '50%',
											backgroundColor: status.color,
											border: '1px solid #ccc',
											display: 'inline-block',
											marginRight: '10px',
										}}
									/>
									{status.color}
								</TableCell>
								<TableCell>
									<IconButton
										color='primary'
										onClick={() => handleOpen(status)}
									>
										<EditIcon />
									</IconButton>
									<IconButton
										color='error'
										onClick={() => handleDelete(status.id || 0)}
									>
										<Delete />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Modal open={open} onClose={handleClose}>
				<Box
					component='form'
					onSubmit={handleSubmit}
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						bgcolor: 'background.paper',
						p: 4,
						borderRadius: 2,
						width: 400,
						boxShadow: 24,
					}}
				>
					<Typography variant='h6' mb={2}>
						{editId ? 'Изменить статус' : 'Добавить статус'}
					</Typography>
					<TextField
						label='Название'
						fullWidth
						value={form.value}
						onChange={e =>
							setForm(prev => ({ ...prev, value: e.target.value }))
						}
						sx={{ mb: 2 }}
					/>
					<TextField
						label='Цвет'
						type='color'
						fullWidth
						value={form.color}
						onChange={e =>
							setForm(prev => ({ ...prev, color: e.target.value }))
						}
						sx={{ mb: 2 }}
						InputLabelProps={{ shrink: true }}
					/>

					<Button type='submit' variant='contained' fullWidth>
						Сохранить
					</Button>
				</Box>
			</Modal>
		</Box>
	)
}

export default ProjectsStatusesPage
