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
import { MonthSelect } from '../../../../components/common/MonthSelect'
import { useEditInternal } from '../../../../hooks/useTourism'
import type { EditTourismInternalForm } from '../../../../types/tourism'

const schema = z.object({
	id: z.union([z.string(), z.number()]),
	year: z.coerce.number().min(1900),
	month: z.coerce.number().min(1).max(12),
	domestic_tourists: z.coerce.number().nonnegative(),
	tourism_profit: z.string().min(1),
})

type FormValues = EditTourismInternalForm

function TourismInternalEditModal({
	open,
	onClose,
	initialData,
}: {
	open: boolean
	onClose: () => void
	initialData: EditTourismInternalForm | null
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

	const edit = useEditInternal()

	useEffect(() => {
		if (initialData) reset(initialData)
	}, [initialData, reset])

	const onSubmit = (data: FormValues) => {
		edit.mutate(data, {
			onSuccess: () => {
				reset()
				onClose()
			},
		})
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
			<DialogTitle>Редактировать запись</DialogTitle>
			<DialogContent>
				<form id='edit-internal-form' onSubmit={handleSubmit(onSubmit)}>
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
								label='Прибыль (млн сум)'
								fullWidth
								error={!!errors.tourism_profit}
								helperText={errors.tourism_profit?.message}
								{...register('tourism_profit')}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Туристы (чел.)'
								type='number'
								fullWidth
								error={!!errors.domestic_tourists}
								helperText={errors.domestic_tourists?.message}
								{...register('domestic_tourists')}
							/>
						</Grid>
					</Grid>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Отмена</Button>
				<Button
					type='submit'
					form='edit-internal-form'
					variant='contained'
					disabled={edit.isPending}
				>
					Сохранить
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default TourismInternalEditModal
