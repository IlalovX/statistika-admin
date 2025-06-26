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
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEditYield } from '../../../../hooks/useAgriculture'
import type {
	CreateYieldForm,
	GetYieldForm,
} from '../../../../types/agriculture'
import { MonthSelect } from '../../../../components/common/MonthSelect'

const isNumeric = (val: string) =>
	typeof val === 'string' &&
	val.trim() !== '' &&
	/^-?\d+(\.\d+)?$/.test(val.trim())

const schema = z.object({
	year: z.number().min(2000),
	month: z.number().min(1).max(12),
	country_code: z.string().min(1),
	product: z.string().min(1),
	type: z.string().min(1),
	value: z.string().refine(isNumeric, {
		message: 'Введите корректное число',
	}),
	unit: z.string().min(1),
})

export default function YieldEditModal({
	open,
	onClose,
	data,
}: {
	open: boolean
	onClose: () => void
	data: GetYieldForm | null
}) {
	const { mutateAsync } = useEditYield()

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<CreateYieldForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
			country_code: '',
			product: '',
			type: '',
			value: '',
			unit: '',
		},
	})

	useEffect(() => {
		if (data) {
			reset({
				year: data.year,
				month: data.month,
				country_code: data.country.official,
				product: data.product,
				type: data.type,
				value: String(data.value),
				unit: data.unit,
			})
		}
	}, [data, reset])

	const onSubmit = async (formData: CreateYieldForm) => {
		if (!data) return
		await mutateAsync({ ...formData, id: data.id })
		reset()
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Редактировать данные урожайности</DialogTitle>
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
							<Controller
								name='country_code'
								control={control}
								render={({ field }) => (
									<TextField
										label='Страна'
										fullWidth
										{...field}
										error={!!errors.country_code}
										helperText={errors.country_code?.message}
									/>
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
								label='Тип (import/export)'
								fullWidth
								error={!!errors.type}
								helperText={errors.type?.message}
								{...register('type')}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Значение'
								fullWidth
								error={!!errors.value}
								helperText={errors.value?.message}
								{...register('value')}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Единица измерения'
								fullWidth
								error={!!errors.unit}
								helperText={errors.unit?.message}
								{...register('unit')}
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
