import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	TextField,
} from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { RegionSelect } from '../../../../components/common/RegionSelect'
import { useEditInvestment } from '../../../../hooks/useInvestment'
import type {
	CreateInvestmentsForm,
	GetInvestmentsForm,
} from '../../../../types/investment'
import { MonthSelect } from '../../../../components/common/MonthSelect'

const isNumeric = (val: string) =>
	typeof val === 'string' &&
	val.trim() !== '' &&
	/^-?\d+(\.\d+)?$/.test(val.trim())

const schema = z.object({
	country_code: z.string(),
	year: z.number(),
	month: z.number().min(1).max(12),
	region_id: z.number(),
	project_name: z.string(),
	project_count: z.number(),
	project_workplaces: z.number(),
	investment_amount: z
		.string()
		.min(1, 'Обязательное поле')
		.refine(isNumeric, { message: 'Введите корректную сумму' }),
})

export default function InvestmentEditModal({
	open,
	onClose,
	data,
}: {
	open: boolean
	onClose: () => void
	data: GetInvestmentsForm
}) {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<CreateInvestmentsForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			country_code: data.country.official,
			investment_amount: data.investment_amount || '',
			month: data.month,
			project_count: data.project_count,
			project_name: data.project_name,
			project_workplaces: data.project_workplaces,
			region_id: data.region_id,
			year: data.year,
		},
	})

	useEffect(() => {
		if (data) {
			reset({
				country_code: data.country.official,
				investment_amount: String(data.investment_amount),
				month: data.month,
				project_count: data.project_count,
				project_name: data.project_name,
				project_workplaces: data.project_workplaces,
				region_id: data.region_id,
				year: data.year,
			})
		}
	}, [data, reset])

	const { mutateAsync } = useEditInvestment()

	const onSubmit = (formData: CreateInvestmentsForm) => {
		mutateAsync({ ...formData, id: data.id })
		reset()
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Редактировать инвестицию</DialogTitle>
			<DialogContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2} mt={1}>
						<Grid size={6}>
							<Controller
								name='year'
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										label='Год'
										type='number'
										fullWidth
										error={!!errors.year}
										helperText={errors.year?.message}
									/>
								)}
							/>
						</Grid>

						<Grid size={6}>
							<MonthSelect
								control={control}
								name='month'
								error={errors.month?.message}
							/>
						</Grid>

						<Grid size={6}>
							<RegionSelect<CreateInvestmentsForm>
								control={control}
								name='region_id'
								error={errors.region_id?.message}
							/>
						</Grid>

						<Grid size={6}>
							<Controller
								name='country_code'
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										label='Код страны'
										fullWidth
										error={!!errors.country_code}
										helperText={errors.country_code?.message}
									/>
								)}
							/>
						</Grid>

						<Grid size={6}>
							<Controller
								name='project_name'
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										label='Название проекта'
										fullWidth
										error={!!errors.project_name}
										helperText={errors.project_name?.message}
									/>
								)}
							/>
						</Grid>

						<Grid size={6}>
							<Controller
								name='project_count'
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										label='Кол-во проектов'
										type='number'
										fullWidth
										error={!!errors.project_count}
										helperText={errors.project_count?.message}
									/>
								)}
							/>
						</Grid>

						<Grid size={6}>
							<Controller
								name='project_workplaces'
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										label='Рабочие места'
										type='number'
										fullWidth
										error={!!errors.project_workplaces}
										helperText={errors.project_workplaces?.message}
									/>
								)}
							/>
						</Grid>

						<Grid size={6}>
							<Controller
								name='investment_amount'
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										label='Сумма инвестиций'
										fullWidth
										error={!!errors.investment_amount}
										helperText={errors.investment_amount?.message}
									/>
								)}
							/>
						</Grid>
					</Grid>

					<DialogActions sx={{ mt: 2 }}>
						<Button onClick={onClose}>Отмена</Button>
						<Button type='submit' variant='contained'>
							Сохранить
						</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
	)
}
