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
import { RegionSelect } from '../../../../components/common/RegionSelect'
import { useCreateInvestment } from '../../../../hooks/useInvestment'
import type { CreateInvestmentsForm } from '../../../../types/investment'
import { MonthSelect } from '../../../../components/common/MonthSelect'

const schema = z.object({
	country_code: z.string().min(1),
	year: z.number().min(2000),
	month: z.number().min(1).max(12),
	region_id: z.number(),
	project_name: z.string().min(1),
	project_count: z.number(),
	project_workplaces: z.number(),
	investment_amount: z.string().min(1),
})

export default function InvestmentAddModal({
	open,
	onClose,
}: {
	open: boolean
	onClose: () => void
}) {
	const { mutateAsync } = useCreateInvestment()

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		control,
		formState: { errors },
		reset,
	} = useForm<CreateInvestmentsForm>({
		resolver: zodResolver(schema),
	})

	const watchedValues = watch()

	const onSubmit = async (data: CreateInvestmentsForm) => {
		await mutateAsync(data)
		reset()
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Добавить инвестицию</DialogTitle>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogContent>
					<Grid container spacing={2} mt={1}>
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
							<RegionSelect<CreateInvestmentsForm>
								control={control}
								name='region_id'
								error={errors.region_id?.message}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Код страны'
								fullWidth
								error={!!errors.country_code}
								helperText={errors.country_code?.message}
								{...register('country_code')}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Название проекта'
								fullWidth
								error={!!errors.project_name}
								helperText={errors.project_name?.message}
								{...register('project_name')}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Кол-во проектов'
								type='number'
								fullWidth
								error={!!errors.project_count}
								helperText={errors.project_count?.message}
								{...register('project_count', { valueAsNumber: true })}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Рабочие места'
								type='number'
								fullWidth
								error={!!errors.project_workplaces}
								helperText={errors.project_workplaces?.message}
								{...register('project_workplaces', { valueAsNumber: true })}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Сумма инвестиций'
								fullWidth
								error={!!errors.investment_amount}
								helperText={errors.investment_amount?.message}
								{...register('investment_amount')}
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
