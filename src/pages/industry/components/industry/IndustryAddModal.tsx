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
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MonthSelect } from '../../../../components/common/MonthSelect'
import { RegionSelect } from '../../../../components/common/RegionSelect'
import { useCreateIndustry } from '../../../../hooks/useInvestment'
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

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
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
							<MonthSelect
								control={control}
								name='month'
								error={errors.month?.message}
							/>
						</Grid>

						<Grid size={6}>
							<RegionSelect<CreateInvestmentIndustryForm>
								control={control}
								name='region_id'
								error={errors.region_id?.message}
							/>
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
