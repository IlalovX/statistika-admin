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
import { useEditDistrict } from '../../../../hooks/useAgriculture'
import { useGetRegionsList } from '../../../../hooks/useRegions'
import type {
	CreateDistrictForm,
	GetDistrictForm,
} from '../../../../types/agriculture'

const schema = z.object({
	year: z.coerce.number().min(2000),
	region_id: z.coerce.number().min(1),
	product: z.string().min(1, 'Обязательное поле'),
	weight: z.coerce.number().min(0, 'Введите корректный вес'),
	area: z.coerce.number().min(0, 'Введите корректную площадь'),
	export: z.coerce.number().min(0, 'Введите корректный экспорт'),
	local_market: z.coerce.number().min(0, 'Введите корректный рынок'),
	water_limit: z.coerce.number().min(0, 'Введите корректный лимит воды'),
})

export default function DistrictEditModal({
	open,
	onClose,
	data,
}: {
	open: boolean
	onClose: () => void
	data: GetDistrictForm | null
}) {
	const { mutateAsync } = useEditDistrict()
	const { data: regions = [] } = useGetRegionsList()

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<CreateDistrictForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			year: data?.year || new Date().getFullYear(),
			region_id: data?.region_id || 0,
			product: data?.product || '',
			weight: data?.weight || 0,
			area: data?.area || 0,
			export: data?.export || 0,
			local_market: data?.local_market || 0,
			water_limit: data?.water_limit || 0,
		},
	})

	useEffect(() => {
		if (data) {
			reset({
				year: data.year,
				region_id: data.region_id,
				product: data.product,
				weight: data.weight,
				area: data.area,
				export: data.export,
				local_market: data.local_market,
				water_limit: data.water_limit,
			})
		}
	}, [data, reset])

	const onSubmit = async (formData: CreateDistrictForm) => {
		if (!data) return
		await mutateAsync({
			...formData,
			id: data.id,
			weight: formData.weight,
			area: formData.area,
			export: formData.export,
			local_market: formData.local_market,
			water_limit: formData.water_limit,
		})
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Редактировать данные по району</DialogTitle>
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
								name='region_id'
								control={control}
								render={({ field }) => (
									<TextField
										select
										label='Регион'
										fullWidth
										error={!!errors.region_id}
										helperText={errors.region_id?.message}
										{...field}
									>
										<MenuItem value='' disabled>
											Выберите регион
										</MenuItem>
										{regions.map(region => (
											<MenuItem key={region.id} value={region.id}>
												{region.region_name}
											</MenuItem>
										))}
									</TextField>
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
								label='Вес'
								fullWidth
								error={!!errors.weight}
								helperText={errors.weight?.message}
								{...register('weight')}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Площадь'
								fullWidth
								error={!!errors.area}
								helperText={errors.area?.message}
								{...register('area')}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Экспорт'
								fullWidth
								error={!!errors.export}
								helperText={errors.export?.message}
								{...register('export')}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Локальный рынок'
								fullWidth
								error={!!errors.local_market}
								helperText={errors.local_market?.message}
								{...register('local_market')}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Лимит воды'
								fullWidth
								error={!!errors.water_limit}
								helperText={errors.water_limit?.message}
								{...register('water_limit')}
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
