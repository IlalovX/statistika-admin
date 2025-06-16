import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateTourismGroup } from '../../../../hooks/useTourismGroups'

const schema = z.object({
	group_name: z.string().min(1, 'Название обязательно'),
})

type FormData = z.infer<typeof schema>

interface Props {
	open: boolean
	onClose: () => void
}

export default function TourismGroupAddModal({ open, onClose }: Props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	})

	const { mutateAsync, isPending } = useCreateTourismGroup()

	const onSubmit = (data: FormData) => {
		mutateAsync(data).then(() => {
			reset()
			onClose()
		})
	}

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Добавить группу</DialogTitle>
			<DialogContent>
				<form id='add-group-form' onSubmit={handleSubmit(onSubmit)}>
					<TextField
						label='Название группы'
						fullWidth
						margin='normal'
						{...register('group_name')}
						error={!!errors.group_name}
						helperText={errors.group_name?.message}
					/>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} disabled={isPending}>
					Отмена
				</Button>
				<Button
					type='submit'
					form='add-group-form'
					variant='contained'
					disabled={isPending}
				>
					Добавить
				</Button>
			</DialogActions>
		</Dialog>
	)
}
