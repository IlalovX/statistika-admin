import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { TourismGroupsService } from '../../../../services/tourism-groups.service'

const schema = z.object({
	group_name: z.string().min(1, 'Название обязательно'),
})

type FormData = z.infer<typeof schema>

interface Props {
	group: { id: number; name: string }
	open: boolean
	onClose: () => void
}

export function TourismSubGroupAddModal({ group, open, onClose }: Props) {
	const queryClient = useQueryClient()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	})

	const { mutate, isPending } = useMutation({
		mutationFn: (data: FormData) =>
			TourismGroupsService.createTourismSubGroup({
				group_id: group.id,
				group_name: data.group_name,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['subgroup', group.id] })
			reset()
			onClose()
		},
	})

	const onSubmit = (data: FormData) => mutate(data)

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Добавить подгруппу</DialogTitle>
			<DialogContent>
				<form id='add-subgroup-form' onSubmit={handleSubmit(onSubmit)}>
					<TextField
						label='Название подгруппы'
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
					form='add-subgroup-form'
					variant='contained'
					disabled={isPending}
				>
					Добавить
				</Button>
			</DialogActions>
		</Dialog>
	)
}
