import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEditClient } from '../../../../hooks/useClients'

const schema = z.object({
	name: z.string().min(1, 'Введите имя'),
	username: z.string().min(1, 'Введите логин'),
	password: z.string().min(1, 'Введите пароль'),
})

type FormValues = z.infer<typeof schema>

interface Props {
	open: boolean
	onClose: () => void
	initialData: {
		id: string | number
		name: string
		username: string
	}
}

function ClientsEditModal({ open, onClose, initialData }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: initialData,
	})

	const edit = useEditClient()

	useEffect(() => {
		reset(initialData)
	}, [initialData, reset])

	const onSubmit = (data: FormValues) => {
		edit.mutateAsync({ ...data, id: initialData.id }).then(() => onClose())
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Редактировать клиента</DialogTitle>
			<DialogContent>
				<form id='edit-client-form' onSubmit={handleSubmit(onSubmit)}>
					<TextField
						label='ФИО'
						fullWidth
						margin='normal'
						{...register('name')}
						error={!!errors.name}
						helperText={errors.name?.message}
					/>

					<TextField
						label='Логин'
						fullWidth
						margin='normal'
						{...register('username')}
						error={!!errors.username}
						helperText={errors.username?.message}
					/>

					<TextField
						label='Новый пароль (необязательно)'
						type='password'
						fullWidth
						margin='normal'
						{...register('password')}
						error={!!errors.password}
						helperText={errors.password?.message}
					/>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Отмена</Button>
				<Button
					form='edit-client-form'
					type='submit'
					variant='contained'
					disabled={edit.isPending}
				>
					Сохранить
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ClientsEditModal
