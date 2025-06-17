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
import { useEditFirms } from '../../../../hooks/useAgriculture'
import type { CreateFirms } from '../../../../types/agriculture'

const schema = z.object({
	year: z.coerce.number().min(2000, 'Минимум 2000'),
	firm_count: z.coerce.number().min(0, 'Минимум 0'),
})

export default function FirmsEditModal({
	open,
	onClose,
	data,
}: {
	open: boolean
	onClose: () => void
	data: (CreateFirms & { id: number }) | null
}) {
	const { mutateAsync } = useEditFirms()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CreateFirms>({
		resolver: zodResolver(schema),
		defaultValues: {
			year: data?.year || new Date().getFullYear(),
			firm_count: data?.firm_count || 0,
		},
	})

	useEffect(() => {
		if (data) {
			reset({
				year: data.year,
				firm_count: data.firm_count,
			})
		}
	}, [data, reset])

	const onSubmit = async (formData: CreateFirms) => {
		if (!data?.id) return
		await mutateAsync({ ...formData, id: data.id })
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Редактировать данные по фирмам</DialogTitle>
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
								label='Количество фирм'
								type='number'
								fullWidth
								error={!!errors.firm_count}
								helperText={errors.firm_count?.message}
								{...register('firm_count', { valueAsNumber: true })}
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
