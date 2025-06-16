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
import { useEditIndustry } from '../../../../hooks/useInvestment'
import { useGetRegionsList } from '../../../../hooks/useRegions'
import type {
	CreateInvestmentIndustryForm,
	GetIndustryList,
} from '../../../../types/investment'

const schema = z.object({
	month: z.number().min(1).max(12),
	year: z.number().min(2000),
	region_id: z.number(),
	product_weight: z.string().min(1),
	product_profit: z.string().min(1),
})

export default function IndustryEditModal({
	open,
	onClose,
	data,
}: {
	open: boolean
	onClose: () => void
	data: GetIndustryList | null
}) {
	const { mutateAsync } = useEditIndustry()
	const { data: regions = [] } = useGetRegionsList()

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<CreateInvestmentIndustryForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			month: data?.month || new Date().getMonth() + 1,
			year: data?.year || new Date().getFullYear(),
			region_id: data?.region_id || 0,
			product_weight: String(data?.product_weight),
			product_profit: String(data?.product_profit),
		},
	})

	useEffect(() => {
		if (data) {
			reset({
				month: data.month,
				year: data.year,
				region_id: data.region_id,
				product_weight: String(data.product_weight),
				product_profit: String(data.product_profit),
			})
		}
	}, [data, reset])

	const onSubmit = async (formData: CreateInvestmentIndustryForm) => {
		if (!data) return

		await mutateAsync({
			...formData,
			id: data.id,
		})

		reset()
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Редактировать отрасль</DialogTitle>
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
								label='Вес продукта'
								type='text'
								fullWidth
								error={!!errors.product_weight}
								helperText={errors.product_weight?.message}
								{...register('product_weight')}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Прибыль'
								type='text'
								fullWidth
								error={!!errors.product_profit}
								helperText={errors.product_profit?.message}
								{...register('product_profit')}
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
