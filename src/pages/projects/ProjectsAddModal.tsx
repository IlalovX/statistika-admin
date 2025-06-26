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
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateProject } from '../../hooks/useProjects'
import type { ProjectsStatusesForm } from '../../types/projects-statuses'
import type { Region } from '../../types/regios'
import { useAppSelector } from '../../utils/helpers'

const schema = z.object({
	region_id: z.string().min(1, 'Выберите регион'),
	project_initiator: z.string().min(1, 'Укажите инициатора'),
	project_name: z.string().min(1, 'Укажите название проекта'),
	project_budget: z.string().min(1, 'Укажите бюджет'),
	jobs_created: z.string().min(1, 'Укажите кол-во рабочих мест'),
	planned_date: z.string().min(1, 'Укажите дату'),
	responsible_party: z.string().min(1, 'Укажите ответственного'),
	project_status_id: z.string().min(1, 'Укажите статус'),
	overall_status: z.string().min(1, 'Укажите общий статус'),
})

type FormValues = z.infer<typeof schema>

function ProjectsAddModal({
	regions,
	statuses,
}: {
	regions: Region[]
	statuses: ProjectsStatusesForm[]
}) {
	const [open, setOpen] = useState(false)
	const user = useAppSelector(state => state.user_me.user)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			region_id: '',
			project_initiator: '',
			project_name: '',
			project_budget: '',
			jobs_created: '',
			planned_date: '',
			responsible_party: '',
			project_status_id: '',
			overall_status: '',
		},
	})

	const watchedValues = watch()
	const create = useCreateProject()

	useEffect(() => {
		if (!user?.is_superadmin && user?.region_id && regions.length > 0) {
			setValue('region_id', String(user.region_id))
		}
	}, [user, regions, setValue])

	const onSubmit = (data: FormValues) => {
		console.log(data)

		const [year, month, day] = data.planned_date.split('-')
		const formattedDate = `${day}.${month}.${year}`
		const transformedData = {
			...data,
			planned_date: formattedDate,
			status_reason: '',
		}

		create.mutateAsync(transformedData).then(() => handleClose())
	}

	const handleClose = () => {
		setOpen(false)
		reset()
	}

	const handleOpen = () => {
		setOpen(true)
		reset()
		if (!user?.is_superadmin && user?.region_id) {
			setValue('region_id', String(user.region_id))
		}
	}

	return (
		<>
			<Button variant='contained' onClick={handleOpen}>
				Добавить
			</Button>

			<Dialog open={open} onClose={handleClose} fullWidth maxWidth='lg'>
				<DialogTitle>Добавить проект</DialogTitle>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						<Grid container spacing={2} mt={1}>
							<Grid size={6}>
								{user?.is_superadmin ? (
									<TextField
										select
										label='Регион'
										fullWidth
										{...register('region_id')}
										value={watchedValues.region_id || ''}
										error={!!errors?.region_id}
										helperText={errors?.region_id?.message}
										onChange={e => setValue('region_id', e.target.value)}
									>
										<MenuItem value='' disabled>
											Выберите регион
										</MenuItem>
										{regions && regions.length > 0 ? (
											regions.map(region => (
												<MenuItem key={region.id} value={String(region.id)}>
													{region.region_name}
												</MenuItem>
											))
										) : (
											<MenuItem disabled>Загрузка регионов...</MenuItem>
										)}
									</TextField>
								) : (
									<TextField
										label='Регион'
										fullWidth
										error={!!errors?.region_id}
										helperText={errors?.region_id?.message}
										value={
											regions?.find(r => r.id === user?.region_id)
												?.region_name || 'Неизвестно'
										}
										InputProps={{
											readOnly: true,
										}}
									/>
								)}
							</Grid>

							<Grid size={6}>
								<TextField
									label='Инициатор проекта'
									fullWidth
									{...register('project_initiator')}
									value={watchedValues.project_initiator || ''}
									error={!!errors.project_initiator}
									helperText={errors.project_initiator?.message}
									onChange={e => setValue('project_initiator', e.target.value)}
								/>
							</Grid>

							<Grid size={6}>
								<TextField
									label='Название проекта'
									fullWidth
									{...register('project_name')}
									value={watchedValues.project_name || ''}
									error={!!errors.project_name}
									helperText={errors.project_name?.message}
									onChange={e => setValue('project_name', e.target.value)}
								/>
							</Grid>

							<Grid size={6}>
								<TextField
									label='Стоимость проекта (млн долл)'
									fullWidth
									{...register('project_budget')}
									value={watchedValues.project_budget || ''}
									error={!!errors.project_budget}
									helperText={errors.project_budget?.message}
									onChange={e => setValue('project_budget', e.target.value)}
								/>
							</Grid>

							<Grid size={6}>
								<TextField
									label='Созданное рабочее место'
									fullWidth
									{...register('jobs_created')}
									value={watchedValues.jobs_created || ''}
									error={!!errors.jobs_created}
									helperText={errors.jobs_created?.message}
									onChange={e => setValue('jobs_created', e.target.value)}
								/>
							</Grid>

							<Grid size={6}>
								<TextField
									label='Срок запуска'
									type='date'
									InputLabelProps={{ shrink: true }}
									fullWidth
									{...register('planned_date')}
									value={watchedValues.planned_date || ''}
									error={!!errors.planned_date}
									helperText={errors.planned_date?.message}
									onChange={e => setValue('planned_date', e.target.value)}
								/>
							</Grid>

							<Grid size={6}>
								<TextField
									label='Ответственный'
									fullWidth
									{...register('responsible_party')}
									value={watchedValues.responsible_party || ''}
									error={!!errors.responsible_party}
									helperText={errors.responsible_party?.message}
									onChange={e => setValue('responsible_party', e.target.value)}
								/>
							</Grid>

							<Grid size={6}>
								<TextField
									select
									label='Статус'
									fullWidth
									{...register('project_status_id')}
									value={watchedValues.project_status_id || ''}
									error={!!errors.project_status_id}
									helperText={errors.project_status_id?.message}
									onChange={e => setValue('project_status_id', e.target.value)}
								>
									<MenuItem value='' disabled>
										Выберите статус
									</MenuItem>
									{statuses && statuses.length > 0 ? (
										statuses.map(status => (
											<MenuItem key={status.id} value={String(status.id)}>
												{status.value}
											</MenuItem>
										))
									) : (
										<MenuItem disabled>Загрузка статусов...</MenuItem>
									)}
								</TextField>
							</Grid>

							<Grid size={12}>
								<TextField
									label='Общее состояние'
									fullWidth
									multiline
									rows={6}
									{...register('overall_status')}
									value={watchedValues.overall_status || ''}
									error={!!errors.overall_status}
									helperText={errors.overall_status?.message}
									onChange={e => setValue('overall_status', e.target.value)}
								/>
							</Grid>
						</Grid>
						<DialogActions>
							<Button onClick={handleClose}>Отмена</Button>
							<Button type='submit' variant='contained'>
								Добавить
							</Button>
						</DialogActions>
					</DialogContent>
				</form>
			</Dialog>
		</>
	)
}

export default ProjectsAddModal
