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
import { MonthSelect } from '../../../../components/common/MonthSelect'
import { useCreateYield } from '../../../../hooks/useAgriculture'
import type { CreateYieldForm } from '../../../../types/agriculture'

const schema = z.object({
	year: z.number().min(2000),
	month: z.number().min(1).max(12),
	country_code: z.string().min(1).max(2),
	product: z.string().min(1),
	type: z.string().min(1),
	value: z.string().min(1),
	unit: z.string().min(1),
})

export default function YieldAddModal({
	open,
	onClose,
}: {
	open: boolean
	onClose: () => void
}) {
	const { mutateAsync } = useCreateYield()

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

	const onSubmit = async (formData: CreateYieldForm) => {
		console.log(formData)

		await mutateAsync(formData)
		reset()
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Добавить урожайность</DialogTitle>
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
							<TextField
								label='Страна'
								fullWidth
								error={!!errors.country_code}
								helperText={errors.country_code?.message}
								{...register('country_code')}
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
								select
								label='Тип'
								fullWidth
								error={!!errors.type}
								helperText={errors.type?.message}
								{...register('type')}
								defaultValue=''
							>
								<MenuItem value='' disabled>
									Выберите тип
								</MenuItem>
								<MenuItem value='export'>Экспорт</MenuItem>
								<MenuItem value='import'>Импорт</MenuItem>
								<MenuItem value='yield'>Урожайность</MenuItem>
								<MenuItem value='profit'>Прибыль</MenuItem>
							</TextField>
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
						Добавить
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}
