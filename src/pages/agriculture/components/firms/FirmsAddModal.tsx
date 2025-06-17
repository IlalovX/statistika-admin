import {
	Button, Dialog, DialogActions, DialogContent,
	DialogTitle, Grid, TextField
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateFirms } from '../../../../hooks/useAgriculture'
import type { CreateFirms } from '../../../../types/agriculture'

const schema = z.object({
	year: z.number().min(2000),
	firm_count: z.number().min(0),
})

export default function FirmsAddModal({ open, onClose }: { open: boolean, onClose: () => void }) {
	const { mutateAsync } = useCreateFirms()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateFirms>({
		resolver: zodResolver(schema),
		defaultValues: {
			year: new Date().getFullYear(),
			firm_count: 0,
		},
	})

	const onSubmit = async (formData: CreateFirms) => {
		await mutateAsync(formData)
		reset()
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Добавить фирму</DialogTitle>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid size={6}>
							<TextField
								label="Год"
								type="number"
								fullWidth
								error={!!errors.year}
								helperText={errors.year?.message}
								{...register('year', { valueAsNumber: true })}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label="Количество фирм"
								type="number"
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
					<Button type="submit" variant="contained">Добавить</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}
