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
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MONTHS } from '../../../../constants/months'
import { useCreateIndustry } from '../../../../hooks/useInvestment'
import { useGetRegionsList } from '../../../../hooks/useRegions'
import type { CreateInvestmentIndustryForm } from '../../../../types/investment'

const schema = z.object({
	month: z.number().min(1).max(12),
	year: z.number().min(2000),
	region_id: z.number(),
	product_weight: z.string().min(1),
	product_profit: z.string().min(1),
})

export default function IndustryAddModal({
	open,
	onClose,
}: {
	open: boolean
	onClose: () => void
}) {
	const { mutateAsync } = useCreateIndustry()
	const { data: regions = [] } = useGetRegionsList()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CreateInvestmentIndustryForm>({
		resolver: zodResolver(schema),
	})

	const onSubmit = async (data: CreateInvestmentIndustryForm) => {
		await mutateAsync(data)
		reset()
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Добавить отрасль</DialogTitle>
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
							<TextField
								select
								label='Месяц'
								fullWidth
								error={!!errors.month}
								helperText={errors.month?.message}
								{...register('month', { valueAsNumber: true })}
							>
								{MONTHS.map(month => (
									<MenuItem key={month.value} value={month.value}>
										{month.label}
									</MenuItem>
								))}
							</TextField>
						</Grid>

						<Grid size={6}>
							<TextField
								select
								label='Регион'
								fullWidth
								error={!!errors.region_id}
								helperText={errors.region_id?.message}
								{...register('region_id', { valueAsNumber: true })}
							>
								<MenuItem value='' disabled>
									Выберите регион
								</MenuItem>
								{regions.length > 0 ? (
									regions.map(region => (
										<MenuItem key={region.id} value={region.id}>
											{region.region_name}
										</MenuItem>
									))
								) : (
									<MenuItem disabled>Загрузка регионов...</MenuItem>
								)}
							</TextField>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Вес продукта'
								fullWidth
								error={!!errors.product_weight}
								helperText={errors.product_weight?.message}
								{...register('product_weight')}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Прибыль'
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
						Добавить
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}
