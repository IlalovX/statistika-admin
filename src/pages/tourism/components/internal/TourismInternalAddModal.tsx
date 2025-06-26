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
import { useCreateInternal } from '../../../../hooks/useTourism'
import type { CreateTourismInternalForm } from '../../../../types/tourism'
import { MonthSelect } from '../../../../components/common/MonthSelect'

const schema = z.object({
	year: z.coerce.number().min(1900, 'Год должен быть валиден'),
	month: z.coerce.number().min(1, 'Месяц обязателен'),
	domestic_tourists: z.coerce.number().min(0, 'Введите количество туристов'),
	tourism_profit: z.string().min(1, 'Укажите доход'),
})

type FormValues = CreateTourismInternalForm

function TourismInternalAddModal({
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
		control
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	})

	const create = useCreateInternal()

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
			<DialogTitle>Добавить внутренний туризм</DialogTitle>
			<DialogContent>
				<form id='create-internal-form' onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2} mt={1}>
						<Grid size={6}>
							<TextField
								label='Год'
								type='number'
								fullWidth
								error={!!errors.year}
								helperText={errors.year?.message}
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
								label='Количество туристов'
								type='number'
								fullWidth
								error={!!errors.domestic_tourists}
								helperText={errors.domestic_tourists?.message}
								{...register('domestic_tourists')}
							/>
						</Grid>

						<Grid size={6}>
							<TextField
								label='Доход'
								fullWidth
								error={!!errors.tourism_profit}
								helperText={errors.tourism_profit?.message}
								{...register('tourism_profit')}
							/>
						</Grid>
					</Grid>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Отмена</Button>
				<Button
					type='submit'
					form='create-internal-form'
					variant='contained'
					disabled={create.isPending}
				>
					Создать
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default TourismInternalAddModal
