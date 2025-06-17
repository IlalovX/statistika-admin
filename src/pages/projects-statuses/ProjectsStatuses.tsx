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
	useGetProjectsStatusesList,
} from '../../hooks/useProjectsStatuses'
import type { ProjectsStatusesForm } from '../../types/projects-statuses'

const ProjectsStatusesPage = () => {
	const { data } = useGetProjectsStatusesList()

	const { mutateAsync: createStatus } = useCreateProjectStatus()

	const [open, setOpen] = useState(false)
	const [editId, setEditId] = useState<string | null>(null)
	const [form, setForm] = useState<ProjectsStatusesForm>({ value: '' })

	const handleOpen = (status?: ProjectsStatusesForm) => {
		if (status) {
			setEditId(status.id as string)
			setForm({ value: status.value })
		} else {
			setEditId(null)
			setForm({ value: '' })
		}
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setForm({ value: '' })
		setEditId(null)
	}

	const handleSubmit = () => {
		createStatus(form)
		handleClose()
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
							<TableCell>ID</TableCell>
							<TableCell>Название статуса</TableCell>
							<TableCell>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.map(status => (
							<TableRow key={status.id}>
								<TableCell>{status.id}</TableCell>
								<TableCell>{status.value}</TableCell>
								<TableCell>
									<IconButton
										color='primary'
										onClick={() => handleOpen(status)}
									>
										<EditIcon />
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
						onChange={e => setForm({ value: e.target.value })}
						sx={{ mb: 2 }}
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
