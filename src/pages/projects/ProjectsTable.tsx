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
		| 'index'
		| 'region_id'
		| 'project_name'
		| 'project_initiator'
		| 'project_budget'
		| 'jobs_created'
		| 'planned_date'
		| 'responsible_party'
		| 'project_status'
		| 'project_last_update'
		| 'project_overall_status'
		| 'actions'
	label: string
	width: number
	align?: 'left' | 'right' | 'center'
}

const columns: Column[] = [
	{ id: 'index', label: '№', width: 40 },
	{ id: 'region_id', label: 'Регион', width: 120 },
	{ id: 'project_name', label: 'Название проекта', width: 200 },
	{ id: 'project_initiator', label: 'Инициатор проекта', width: 250 },
	{ id: 'project_budget', label: 'Стоимость проекта (млн долл)', width: 120 },
	{ id: 'jobs_created', label: 'Созданное рабочее место', width: 100 },
	{ id: 'planned_date', label: 'Срок запуска', width: 140 },
	{ id: 'responsible_party', label: 'Ответственный', width: 140 },
	{ id: 'project_status', label: 'Статус', width: 120 },
	{ id: 'project_last_update', label: 'Последнее обновление', width: 160 },
	{ id: 'project_overall_status', label: 'Общее состояние', width: 160 },
	{ id: 'actions', label: 'Действия', align: 'right', width: 120 },
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
		const found = statuses.find((s) => s.value === value)
		return found?.id ?? 0
	}

	function convertToCreateProjectForm(
		project: GetProject
	): CreateProjectForm & { id: number; project_status_id: number } {
		return {
			id: project.id,
			project_name: project.project_name,
			project_initiator: project.initiator,
			project_budget: String(project.budget),
			jobs_created: +project.jobs_created,
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
				<Table sx={{ tableLayout: 'fixed' }}>
					<TableHead>
						<TableRow>
							{columns.map((col) => (
								<TableCell
									key={col.id}
									align={col.align || 'left'}
									sx={{ fontWeight: 'bold', width: col.width }}
								>
									{col.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{projects.map((project, index) => (
							<TableRow key={project.id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{project.region.name}</TableCell>
								<TableCell>{project.project_name}</TableCell>
								<TableCell>{project.initiator}</TableCell>
								<TableCell>{project.budget}</TableCell>
								<TableCell>{project.jobs_created}</TableCell>
								<TableCell>
									{new Date(project.planned_date).toLocaleDateString('ru-RU')}
								</TableCell>
								<TableCell
									sx={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}
								>
									{project.responsible_party}
								</TableCell>
								<TableCell sx={{ color: project.project_status.color }}>
									{project.project_status.value}
								</TableCell>
								<TableCell>
									{new Date(project.last_update).toLocaleDateString('ru-RU')}
								</TableCell>
								<TableCell>
									<IconButton onClick={() => handleOpen(project, 'more')}>
										<InfoIcon color='primary' />
									</IconButton>
								</TableCell>
								<TableCell align='right'>
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
