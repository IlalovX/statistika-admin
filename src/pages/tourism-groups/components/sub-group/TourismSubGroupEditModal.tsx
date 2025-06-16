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
import type { GetTourismSubGroupList } from '../../../../types/tourism-groups'

const schema = z.object({
	group_name: z.string().min(1, 'Название обязательно'),
})

type FormData = z.infer<typeof schema>

interface Props {
	groupId: number
	subgroup: GetTourismSubGroupList
	onClose: () => void
}

export function TourismSubGroupEditModal({
	groupId,
	subgroup,
	onClose,
}: Props) {
	const queryClient = useQueryClient()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: { group_name: subgroup.name },
	})

	const { mutate, isPending } = useMutation({
		mutationFn: (data: FormData) =>
			TourismGroupsService.editTourismSubGroup(
				{
					subgroup_id: subgroup.id,
					group_name: data.group_name,
				},
				groupId
			),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['subgroup', groupId] })
			onClose()
		},
	})

	const onSubmit = (data: FormData) => mutate(data)

	return (
		<Dialog open={!!subgroup} onClose={onClose}>
			<DialogTitle>Редактировать подгруппу</DialogTitle>
			<DialogContent>
				<form id='edit-subgroup-form' onSubmit={handleSubmit(onSubmit)}>
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
					form='edit-subgroup-form'
					variant='contained'
					disabled={isPending}
				>
					Сохранить
				</Button>
			</DialogActions>
		</Dialog>
	)
}
