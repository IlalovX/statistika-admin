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
import { MONTHS } from '../../../../constants/months'
import { useEditProductionDistrict } from '../../../../hooks/useInvestment'
import { useGetRegionsList } from '../../../../hooks/useRegions'
import type {
	CreateProductionDistrictForm,
	GetProductionDistrictForm,
} from '../../../../types/investment'

const isNumeric = (val: string) =>
	typeof val === 'string' &&
	val.trim() !== '' &&
	/^-?\d+(\.\d+)?$/.test(val.trim())

const schema = z.object({
	year: z.number().min(2000),
	month: z.number().min(1).max(12),
	region_id: z.number().min(1),
	product: z.string().min(1, 'Обязательное поле'),
	area: z.string().min(1, 'Обязательное поле').refine(isNumeric, {
		message: 'Введите корректное число',
	}),
	weight: z.string().min(1, 'Обязательное поле').refine(isNumeric, {
		message: 'Введите корректное число',
	}),
	percent: z.string().min(1, 'Обязательное поле').refine(isNumeric, {
		message: 'Введите корректное число',
	}),
})

export default function ProductionDistrictEditModal({
	open,
	onClose,
	data,
}: {
	open: boolean
	onClose: () => void
	data: GetProductionDistrictForm | null
}) {
	const { mutateAsync } = useEditProductionDistrict()
	const { data: regions = [] } = useGetRegionsList()

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<CreateProductionDistrictForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			year: data?.year || new Date().getFullYear(),
			month: data?.month || new Date().getMonth() + 1,
			region_id: data?.region_id || 0,
			product: data?.product || '',
			area: data?.area || '',
			weight: data?.weight || '',
			percent: data?.percent || '',
		},
	})

	useEffect(() => {
		if (data) {
			reset({
				year: data.year,
				month: data.month,
				region_id: data.region_id,
				product: data.product,
				area: String(data.area),
				weight: String(data.weight),
				percent: String(data.percent),
			})
		}
	}, [data, reset])

	const onSubmit = async (formData: CreateProductionDistrictForm) => {
		if (!data) return
		await mutateAsync({ ...formData, id: data.id })
		reset()
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Редактировать производственный округ</DialogTitle>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid size={6}>
							<TextField
								label='Год'
								type='number'
								fullWidth
								error={!!errors.year}
								helperText={errors.year?.message}
								{...register('year', { valueAsNumber: true })}
							/>
						</Grid>

						<Grid size={6}>
							<Controller
								name='month'
								control={control}
								defaultValue={data?.month || new Date().getMonth() + 1} // 💡 Важно!
								render={({ field }) => (
									<TextField
										select
										label='Месяц'
										fullWidth
										{...field}
										error={!!errors.month}
										helperText={errors.month?.message}
									>
										{MONTHS.map(month => (
											<MenuItem key={month.value} value={month.value}>
												{month.label}
											</MenuItem>
										))}
									</TextField>
								)}
							/>
						</Grid>

						<Grid size={6}>
							<Controller
								name='region_id'
								control={control}
								render={({ field }) => (
									<TextField
										select
										label='Регион'
										fullWidth
										error={!!errors.region_id}
										helperText={errors.region_id?.message}
										{...field}
									>
										<MenuItem value='' disabled>
											Выберите регион
										</MenuItem>
										{regions.map(region => (
											<MenuItem key={region.id} value={region.id}>
												{region.region_name}
											</MenuItem>
										))}
									</TextField>
								)}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Продукт'
								fullWidth
								error={!!errors.product}
								helperText={errors.product?.message}
								{...register('product')}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Площадь'
								fullWidth
								error={!!errors.area}
								helperText={errors.area?.message}
								{...register('area')}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Вес'
								fullWidth
								error={!!errors.weight}
								helperText={errors.weight?.message}
								{...register('weight')}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Процент'
								fullWidth
								error={!!errors.percent}
								helperText={errors.percent?.message}
								{...register('percent')}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Отмена</Button>
					<Button type='submit' variant='contained'>
						Сохранить
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}
