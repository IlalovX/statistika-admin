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
import { useCreateExternal } from '../../../../hooks/useTourism'
import type { CreateTourismExternalForm } from '../../../../types/tourism'

const schema = z.object({
	year: z.coerce.number(),
	month: z.coerce.number(),
	country_code: z.string().min(1),
	inbound_tourists: z.coerce.number(),
	outbound_tourists: z.coerce.number(),
	tourism_profit: z.string(),
	avg_trip_duration: z.coerce.number(),
})

type FormValues = CreateTourismExternalForm

export default function ToursimExternalAddModal({
	open,
	onClose,
}: {
	open: boolean
	onClose: () => void
}) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		control,
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	})
	const create = useCreateExternal()

	const onSubmit = (data: FormValues) => {
		create.mutate(data, {
			onSuccess: () => {
				reset()
				onClose()
			},
		})
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
			<DialogTitle>Добавить внешний туризм</DialogTitle>
			<DialogContent>
				<form id='create-external-form' onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2} mt={1}>
						<Grid size={6}>
							<TextField
								label='Год'
								type='number'
								fullWidth
								{...register('year')}
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
								label='Код страны'
								fullWidth
								{...register('country_code')}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Въездной туризм'
								type='number'
								fullWidth
								{...register('inbound_tourists')}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Выездной туризм'
								type='number'
								fullWidth
								{...register('outbound_tourists')}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Доход'
								fullWidth
								{...register('tourism_profit')}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Средняя продолжительность'
								type='number'
								fullWidth
								{...register('avg_trip_duration')}
							/>
						</Grid>
					</Grid>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Отмена</Button>
				<Button type='submit' form='create-external-form' variant='contained'>
					Создать
				</Button>
			</DialogActions>
		</Dialog>
	)
}
