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
import { useEditOutput } from '../../../../hooks/useInvestment'
import type {
	CreateInvestmentOutputForm,
	GetOutputList,
} from '../../../../types/investment'

const schema = z.object({
	year: z.number().min(2000),
	month: z.number().min(1).max(12),
	industry_type: z.string().min(1),
	ind_amount: z.string().min(1),
})

export default function OutputEditModal({
	open,
	onClose,
	data,
}: {
	open: boolean
	onClose: () => void
	data: GetOutputList | null
}) {
	const { mutateAsync } = useEditOutput()
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<CreateInvestmentOutputForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			year: data?.year || new Date().getFullYear(),
			month: data?.month || new Date().getMonth() + 1,
			industry_type: data?.industry_type || '',
			ind_amount: data?.ind_amount || '',
		},
	})

	useEffect(() => {
		if (data) {
			reset({
				year: data.year,
				month: data.month,
				industry_type: data.industry_type,
				ind_amount: String(data.ind_amount),
			})
		}
	}, [data, reset])

	const onSubmit = async (formData: CreateInvestmentOutputForm) => {
		if (!data) return
		await mutateAsync({ ...formData, id: data.id })
		reset()
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Редактировать выход продукции</DialogTitle>
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
						Сохранить
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}
