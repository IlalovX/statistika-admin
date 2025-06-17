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
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { MONTHS } from '../../../../constants/months'
import { useCreateProductionDistrict } from '../../../../hooks/useInvestment'
import { useGetRegionsList } from '../../../../hooks/useRegions'
import type { CreateProductionDistrictForm } from '../../../../types/investment'

const schema = z.object({
	year: z.number().min(2000),
	month: z.number().min(1).max(12),
	region_id: z.number(),
	product: z.string().min(1),
	area: z.string().min(1),
	weight: z.string().min(1),
	percent: z.string().min(1),
})

export default function ProductionDistrictAddModal({
	open,
	onClose,
}: {
	open: boolean
	onClose: () => void
}) {
	const { mutateAsync } = useCreateProductionDistrict()
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
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
			region_id: 0,
			product: '',
			area: '',
			weight: '',
			percent: '',
		},
	})

	const onSubmit = async (formData: CreateProductionDistrictForm) => {
		await mutateAsync(formData)
		reset()
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Добавить Производственный Район</DialogTitle>
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
										{...field}
										error={!!errors.region_id}
										helperText={errors.region_id?.message}
									>
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
						Добавить
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}
