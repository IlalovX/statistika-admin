import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import { useDeleteProject, useGetProjectsList } from '../../hooks/useProjects'
import type { CreateProjectForm, GetProject } from '../../types/projects'
import type { ProjectsStatusesForm } from '../../types/projects-statuses'
import type { Region } from '../../types/regios'
import ProjectsEditModal from './ProjectsEditModal'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import InfoIcon from '@mui/icons-material/Info'
type Column = {
	id:
		| 'project_name'
		| 'project_initiator'
		| 'project_budget'
		| 'region_id'
		| 'jobs_created'
		| 'planned_date'
		| 'responsible_party'
		| 'project_status_id'
		| 'project_overall_status'
		| 'actions'
	label: string
	align?: 'left' | 'right' | 'center'
}

const columns: Column[] = [
	{ id: 'project_name', label: 'Название проекта' },
	{ id: 'project_initiator', label: 'Инициатор' },
	{ id: 'project_budget', label: 'Бюджет' },
	{ id: 'region_id', label: 'Регион' },
	{ id: 'jobs_created', label: 'Рабочие места' },
	{ id: 'planned_date', label: 'Дата запуска' },
	{ id: 'responsible_party', label: 'Ответственный' },
	{ id: 'project_status_id', label: 'Статус' },
	{ id: 'project_overall_status', label: 'Общий' },
	{ id: 'actions', label: 'Действия', align: 'right' },
]

export function ProjectTable({
	regions,
	statuses,
}: {
	regions: Region[]
	statuses: ProjectsStatusesForm[]
}) {
	const { data: projects = [] } = useGetProjectsList()
	const { mutate: deleteProject } = useDeleteProject()

	const [open, setOpen] = useState(false)
	const [selected, setSelected] = useState<
		(CreateProjectForm & { id?: number }) | GetProject | null
	>(null)

	const [modalType, setModalType] = useState<'edit' | 'more'>('edit')

	function convertToCreateProjectForm(
		project: GetProject
	): CreateProjectForm & { id: number } {
		return {
			id: project.id,
			project_name: project.project_name,
			project_initiator: project.initiator,
			project_budget: String(project.budget),
			region_id: '',
			jobs_created: project.jobs_created,
			planned_date: project.planned_date,
			responsible_party: project.responsible_party,
			project_status_id: '',
			status_reason: '',
			overall_status: project.overall_status,
		}
	}

	const handleOpen = (project: GetProject, type: 'edit' | 'more') => {
		if (type === 'edit') {
			const converted = convertToCreateProjectForm(project)
			setSelected(converted)
		} else {
			setSelected(project)
		}
		setModalType(type)
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setSelected(null)
	}

	const handleDelete = (id: number) => {
		deleteProject(id)
	}

	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{columns.map(col => (
								<TableCell key={col.id} align={col.align || 'left'}>
									{col.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{projects.map(project => (
							<TableRow key={project.id}>
								<TableCell>{project.project_name}</TableCell>
								<TableCell>{project.initiator}</TableCell>
								<TableCell>{project.budget}</TableCell>
								<TableCell>{project.region}</TableCell>
								<TableCell>{project.jobs_created}</TableCell>
								<TableCell>
									{new Date(project.planned_date).toLocaleDateString('ru-RU')}
								</TableCell>
								<TableCell>{project.responsible_party}</TableCell>
								<TableCell>{project.project_status}</TableCell>
								<TableCell>{project.overall_status}</TableCell>
								<TableCell align='right'>
									<IconButton onClick={() => handleOpen(project, 'more')}>
										<InfoIcon color='primary' />
									</IconButton>
									<IconButton onClick={() => handleOpen(project, 'edit')}>
										<EditIcon />
									</IconButton>
									<IconButton onClick={() => handleDelete(project.id)}>
										<DeleteIcon color='error' />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Modal open={open} onClose={handleClose}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						bgcolor: 'background.paper',
						p: 4,
						borderRadius: 2,
						width: '600px',
					}}
				>
					{selected && modalType === 'more' && (
						<Typography sx={{ whiteSpace: 'pre-line' }}>
							{(selected as GetProject).overall_status}
						</Typography>
					)}

					{selected && modalType === 'edit' && (
						<ProjectsEditModal
							open={open}
							onClose={handleClose}
							regions={regions}
							statuses={statuses}
							project={selected as CreateProjectForm & { id: number }}
						/>
					)}
				</Box>
			</Modal>
		</>
	)
}
