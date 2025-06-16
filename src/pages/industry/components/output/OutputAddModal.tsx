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
import { useCreateOutput } from '../../../../hooks/useInvestment'
import type { CreateInvestmentOutputForm } from '../../../../types/investment'
import { MONTHS } from '../../../../constants/months'

const schema = z.object({
	year: z.number().min(2000),
	month: z.number().min(1).max(12),
	industry_type: z.string().min(1),
	ind_amount: z.string().min(1),
})

export default function OutputAddModal({
	open,
	onClose,
}: {
	open: boolean
	onClose: () => void
}) {
	const { mutateAsync } = useCreateOutput()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CreateInvestmentOutputForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
			industry_type: '',
			ind_amount: '',
		},
	})

	const onSubmit = async (data: CreateInvestmentOutputForm) => {
		await mutateAsync(data)
		reset()
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Добавить выход продукции</DialogTitle>
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
								{...register('month', { valueAsNumber: true })}
								error={!!errors.month}
								helperText={errors.month?.message}
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
								label='Тип отрасли'
								fullWidth
								error={!!errors.industry_type}
								helperText={errors.industry_type?.message}
								{...register('industry_type')}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Объем'
								fullWidth
								error={!!errors.ind_amount}
								helperText={errors.ind_amount?.message}
								{...register('ind_amount')}
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
