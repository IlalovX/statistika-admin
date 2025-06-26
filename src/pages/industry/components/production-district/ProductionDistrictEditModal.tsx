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
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RegionSelect } from '../../../../components/common/RegionSelect'
import { useEditProductionDistrict } from '../../../../hooks/useInvestment'
import type {
	CreateProductionDistrictForm,
	GetProductionDistrictForm,
} from '../../../../types/investment'
import { MonthSelect } from '../../../../components/common/MonthSelect'

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
							<MonthSelect
								control={control}
								name='month'
								error={errors.month?.message}
							/>
						</Grid>

						<Grid size={6}>
							<RegionSelect<CreateProductionDistrictForm>
								control={control}
								name='region_id'
								error={errors.region_id?.message}
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
