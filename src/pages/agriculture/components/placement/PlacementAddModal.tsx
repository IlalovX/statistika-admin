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
import { useCreatePlacemt } from '../../../../hooks/useAgriculture'
import type { CreatePlacementForm } from '../../../../types/agriculture'

const schema = z.object({
	year: z.number().min(2000, 'Год должен быть не меньше 2000'),
	product: z.string().min(1, 'Введите продукт'),
	area: z.number().nonnegative('Площадь не может быть отрицательной'),
	planted: z.number().nonnegative('Посеяно не может быть отрицательным'),
	harvested: z.number().nonnegative('Убрано не может быть отрицательным'),
	forecast: z.number().nonnegative('Прогноз не может быть отрицательным'),
	percent: z.number().min(0).max(100, 'Процент должен быть от 0 до 100'),
})

export default function PlacementAddModal({
	open,
	onClose,
}: {
	open: boolean
	onClose: () => void
}) {
	const { mutateAsync } = useCreatePlacemt()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CreatePlacementForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			year: new Date().getFullYear(),
			product: '',
			area: 0,
			planted: 0,
			harvested: 0,
			forecast: 0,
			percent: 0,
		},
	})

	const onSubmit = async (data: CreatePlacementForm) => {
		await mutateAsync(data)
		reset()
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Добавить размещение</DialogTitle>
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
								type='number'
								fullWidth
								error={!!errors.area}
								helperText={errors.area?.message}
								{...register('area', { valueAsNumber: true })}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Посеяно'
								type='number'
								fullWidth
								error={!!errors.planted}
								helperText={errors.planted?.message}
								{...register('planted', { valueAsNumber: true })}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Убрано'
								type='number'
								fullWidth
								error={!!errors.harvested}
								helperText={errors.harvested?.message}
								{...register('harvested', { valueAsNumber: true })}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Прогноз'
								type='number'
								fullWidth
								error={!!errors.forecast}
								helperText={errors.forecast?.message}
								{...register('forecast', { valueAsNumber: true })}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Процент'
								type='number'
								fullWidth
								error={!!errors.percent}
								helperText={errors.percent?.message}
								{...register('percent', { valueAsNumber: true })}
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
