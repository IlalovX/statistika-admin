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
import { useEditIndustry } from '../../../../hooks/useInvestment'
import type {
	CreateInvestmentIndustryForm,
	GetIndustryList,
} from '../../../../types/investment'
import { MonthSelect } from '../../../../components/common/MonthSelect'

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
