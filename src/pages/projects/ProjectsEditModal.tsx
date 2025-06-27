import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	MenuItem,
	TextField,
} from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { RegionSelect } from '../../components/common/RegionSelect'
import { useEditProject } from '../../hooks/useProjects'
import type { CreateProjectForm, EditProjectForm } from '../../types/projects'
import type { ProjectsStatusesForm } from '../../types/projects-statuses'
import type { Region } from '../../types/regios'

const schema = z.object({
	project_name: z.string().min(1, 'Введите название'),
	project_initiator: z.string().min(1, 'Введите инициатора'),
	project_budget: z
		.string()
		.regex(/^\d+(\.\d{1,2})?$/, 'Введите корректную сумму'),
	jobs_created: z.coerce.number().nonnegative('Введите число'),
	planned_date: z.string().min(1, 'Выберите дату'),
	responsible_party: z.string().optional(),
	overall_status: z.string().optional(),
	region_id: z.coerce.number({
		required_error: 'Выберите регион',
	}),
	project_status_id: z.coerce.number({
		required_error: 'Выберите статус',
	}),
})

type FormData = z.infer<typeof schema>

type Props = {
	open: boolean
	onClose: () => void
	project: (CreateProjectForm & { id: number }) | null
	regions: Region[]
	statuses: ProjectsStatusesForm[]
}

export default function ProjectsEditModal({
	open,
	onClose,
	project,
	statuses,
}: Props) {
	const { mutateAsync, isPending } = useEditProject()

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			project_name: project?.project_name || '',
			project_initiator: project?.project_initiator || '',
			project_budget: project?.project_budget || '',
			jobs_created: +(project?.jobs_created as string) || 0,
			planned_date: project?.planned_date.split(' ')[0] || '',
			responsible_party: project?.responsible_party || '',
			overall_status: project?.overall_status || '',
			region_id: (project?.region_id as number) || 0,
			project_status_id: (project?.project_status_id as number) || 0,
		},
	})

	useEffect(() => {
		if (project) {
			reset({
				project_name: project.project_name,
				project_initiator: project.project_initiator,
				project_budget: project.project_budget,
				jobs_created: +project.jobs_created,
				planned_date: project.planned_date.split(' ')[0],
				responsible_party: project.responsible_party,
				overall_status: project.overall_status,
				region_id: project.region_id,
				project_status_id: project.project_status_id,
			})
		}
	}, [project, reset])

	const onSubmit = async (data: FormData) => {
		if (!project) return

		const formData: EditProjectForm = {
			...data,
			status_reason: '',
			responsible_party: data.responsible_party || '',
			overall_status: data.overall_status || '',
		}

		await mutateAsync({
			data: formData,
			id: project.id,
		})

		onClose()
	}

	if (!project) return null

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='lg'>
			<DialogTitle>Редактировать проект</DialogTitle>
			<form id='project-edit-form' onSubmit={handleSubmit(onSubmit)}>
				<DialogContent>
					<Grid container spacing={2} mt={1}>
						<Grid size={6}>
							<TextField
								label='Название проекта'
								fullWidth
								error={!!errors.project_name}
								helperText={errors.project_name?.message}
								{...register('project_name')}
								InputProps={{ readOnly: true }}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Инициатор проекта'
								fullWidth
								error={!!errors.project_initiator}
								helperText={errors.project_initiator?.message}
								{...register('project_initiator')}
								InputProps={{ readOnly: true }}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Стоимость проекта (млн долл)'
								fullWidth
								error={!!errors.project_budget}
								helperText={errors.project_budget?.message}
								{...register('project_budget')}
								InputProps={{ readOnly: true }}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Созданное рабочее место'
								fullWidth
								error={!!errors.jobs_created}
								helperText={errors.jobs_created?.message}
								{...register('jobs_created')}
								InputProps={{ readOnly: true }}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Срок запуска'
								type='date'
								fullWidth
								error={!!errors.planned_date}
								helperText={errors.planned_date?.message}
								{...register('planned_date')}
								InputProps={{ readOnly: true }}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Ответственный'
								fullWidth
								value={project?.responsible_party || ''}
								InputProps={{ readOnly: true }}
							/>
						</Grid>

						{/* Новый блок: Регион и статус */}
						<Grid size={6}>
							<RegionSelect<FormData>
								control={control}
								name='region_id'
								error={errors.region_id?.message}
							/>
						</Grid>

						<Grid size={6}>
							<Controller
								name='project_status_id'
								control={control}
								render={({ field }) => (
									<TextField
										select
										label='Статус'
										fullWidth
										{...field}
										error={!!errors.project_status_id}
										helperText={errors.project_status_id?.message}
									>
										{statuses.map(s => (
											<MenuItem key={s.id} value={s.id}>
												{s.value}
											</MenuItem>
										))}
									</TextField>
								)}
							/>
						</Grid>

						<Grid size={12}>
							<TextField
								label='Общее состояние'
								fullWidth
								multiline
								rows={4}
								{...register('overall_status')}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Отмена</Button>
					<Button type='submit' variant='contained' disabled={isPending}>
						Сохранить
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}
