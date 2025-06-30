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
import { CountrySelect } from '../../../../components/common/CountrySelect'
import { MonthSelect } from '../../../../components/common/MonthSelect'
import { useEditExternal } from '../../../../hooks/useTourism'
import type {
	CreateTourismExternalForm,
	GetTourismExternal,
} from '../../../../types/tourism'

const schema = z.object({
	year: z.coerce.number(),
	month: z.coerce.number(),
	country_code: z.string().min(1),
	inbound_tourists: z.coerce.number(),
	outbound_tourists: z.coerce.number(),
	tourism_profit: z.string(),
	avg_trip_duration: z.coerce.number(),
})

export function EditExternalDialog({
	open,
	onClose,
	initialData,
}: {
	open: boolean
	onClose: () => void
	initialData: GetTourismExternal & { id: string | number }
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm<CreateTourismExternalForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			year: initialData.year,
			month: initialData.month,
			country_code: initialData.country_code?.cioc || '', // cioc = alpha3Code
			inbound_tourists: initialData.inbound_tourists,
			outbound_tourists: initialData.outbound_tourists,
			tourism_profit: initialData.tourism_profit,
			avg_trip_duration: initialData.avg_trip_duration,
		},
	})
	const edit = useEditExternal()

	const onSubmit = (data: CreateTourismExternalForm) => {
		edit.mutate(
			{ id: initialData.id, ...data },
			{
				onSuccess: () => {
					reset()
					onClose()
				},
			}
		)
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
			<DialogTitle>Редактировать запись</DialogTitle>
			<DialogContent>
				<form id='edit-external-form' onSubmit={handleSubmit(onSubmit)}>
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
							<CountrySelect
								control={control}
								name='country_code'
								error={errors.country_code?.message}
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
				<Button type='submit' form='edit-external-form' variant='contained'>
					Сохранить
				</Button>
			</DialogActions>
		</Dialog>
	)
}
