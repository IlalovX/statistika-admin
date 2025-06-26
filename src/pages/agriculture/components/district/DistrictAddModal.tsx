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
import { useCreateDistrict } from '../../../../hooks/useAgriculture'
import type { CreateDistrictForm } from '../../../../types/agriculture'

const schema = z.object({
	year: z.coerce.number().min(2000, 'Год должен быть не меньше 2000'),
	month: z.number().min(1).max(12),
	region_id: z.coerce.number().min(1, 'Регион обязателен'),
	product: z.string().min(1, 'Введите продукт'),
	weight: z.coerce.number().min(0, 'Введите корректный вес'),
	area: z.coerce.number().min(0, 'Введите корректную площадь'),
	export: z.coerce.number().min(0, 'Введите корректный экспорт'),
	local_market: z.coerce.number().min(0, 'Введите корректный объем рынка'),
	water_limit: z.coerce.number().min(0, 'Введите корректный лимит воды'),
})

export default function AddDistrictModal({
	open,
	onClose,
}: {
	open: boolean
	onClose: () => void
}) {
	const { mutateAsync } = useCreateDistrict()

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CreateDistrictForm>({
		resolver: zodResolver(schema),
	})

	const onSubmit = async (data: CreateDistrictForm) => {
		await mutateAsync(data)
		reset()
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Добавить район</DialogTitle>
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
							<RegionSelect<CreateDistrictForm>
								control={control}
								name='region_id'
								error={errors.region_id?.message}
							/>
						</Grid>

						<Grid size={6}>
							<MonthSelect<CreateDistrictForm>
								control={control}
								name='month'
								error={errors.month?.message}
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
								label='Вес'
								type='number'
								fullWidth
								error={!!errors.weight}
								helperText={errors.weight?.message}
								{...register('weight', { valueAsNumber: true })}
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
								label='Экспорт'
								type='number'
								fullWidth
								error={!!errors.export}
								helperText={errors.export?.message}
								{...register('export', { valueAsNumber: true })}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Местный рынок'
								type='number'
								fullWidth
								error={!!errors.local_market}
								helperText={errors.local_market?.message}
								{...register('local_market', { valueAsNumber: true })}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Лимит воды'
								type='number'
								fullWidth
								error={!!errors.water_limit}
								helperText={errors.water_limit?.message}
								{...register('water_limit', { valueAsNumber: true })}
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
