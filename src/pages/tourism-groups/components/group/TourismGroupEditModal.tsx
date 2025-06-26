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
import { useEditTourismGroup } from '../../../../hooks/useTourismGroups'

const schema = z.object({
	group_name: z.string().min(1, 'Название обязательно'),
})

type FormData = z.infer<typeof schema>

interface Props {
	group: { id: number; name: string }
	onClose: () => void
}

export default function TourismGroupEditModal({ group, onClose }: Props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: { group_name: group.name },
	})

	const { mutateAsync, isPending } = useEditTourismGroup()

	const onSubmit = (data: FormData) =>
		mutateAsync({ id: group.id, ...data }).then(() => {
			reset()
			onClose()
		})

	return (
		<Dialog open={!!group} onClose={onClose}>
			<DialogTitle>Редактировать группу</DialogTitle>
			<DialogContent>
				<form id='edit-group-form' onSubmit={handleSubmit(onSubmit)}>
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
					form='edit-group-form'
					variant='contained'
					disabled={isPending}
				>
					Сохранить
				</Button>
			</DialogActions>
		</Dialog>
	)
}
