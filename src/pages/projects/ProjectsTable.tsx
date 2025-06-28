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
		| 'project_status'
		| 'project_last_update'
		| 'project_overall_status'
		| 'actions'
	label: string
	align?: 'left' | 'right' | 'center'
}

const columns: Column[] = [
	{ id: 'region_id', label: 'Регион' },
	{ id: 'project_name', label: 'Название проекта' },
	{ id: 'project_initiator', label: 'Инициатор проекта' },
	{ id: 'project_budget', label: 'Стоимость проекта (млн долл)' },
	{ id: 'jobs_created', label: 'Созданное рабочее место' },
	{ id: 'planned_date', label: 'Срок запуска' },
	{ id: 'responsible_party', label: 'Ответственный' },
	{ id: 'project_status', label: 'Статус' },
	{ id: 'project_last_update', label: 'Последнее обновление' },
	{ id: 'project_overall_status', label: 'Общее состояние' },
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
		| (CreateProjectForm & { id: number; project_status_id: number })
		| GetProject
		| null
	>(null)

	const [modalType, setModalType] = useState<'edit' | 'more'>('edit')

	function getStatusIdFromValue(value: string): number {
		const found = statuses.find(s => s.value === value)
		if (!found) throw new Error(`Не найден статус с value = ${value}`)
		return found?.id
	}

	function convertToCreateProjectForm(
		project: GetProject
	): CreateProjectForm & { id: number; project_status_id: number } {
		return {
			id: project.id,
			project_name: project.project_name,
			project_initiator: project.initiator,
			project_budget: String(project.budget),
			jobs_created: project.jobs_created,
			planned_date: project.planned_date,
			responsible_party: project.responsible_party,
			project_status_id: getStatusIdFromValue(project.project_status.value), // ⚠️
			region_id: project.region.id,
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
								<TableCell>{project.region.name}</TableCell>
								<TableCell>{project.jobs_created}</TableCell>
								<TableCell>
									{new Date(project.planned_date).toLocaleDateString('ru-RU')}
								</TableCell>
								<TableCell>{project.responsible_party}</TableCell>
								<TableCell sx={{ color: project.project_status.color }}>
									{project.project_status.value}
								</TableCell>
								<TableCell>{project.last_update}</TableCell>
								<TableCell>
									<IconButton onClick={() => handleOpen(project, 'more')}>
										<InfoIcon color='primary' />
									</IconButton>
								</TableCell>
								<TableCell align='right' width={120}>
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
