import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateNewClient } from '../../../../hooks/useClients'

const schema = z.object({
	name: z.string().min(1, 'Введите имя'),
	username: z.string().min(1, 'Введите логин'),
	password: z.string().min(6, 'Минимум 6 символов'),
})

type FormValues = z.infer<typeof schema>

function ClientsAddModal() {
	const [open, setOpen] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	})

	const create = useCreateNewClient()

	const onSubmit = (data: FormValues) => {
		create
			.mutateAsync({
				name: data.name,
				username: data.username,
				password: data.password,
			})
			.then(() => handleClose())
	}

	const handleClose = () => {
		setOpen(false)
		reset()
	}

	return (
		<>
			<Button variant='contained' onClick={() => setOpen(true)}>
				Добавить
			</Button>

			<Dialog open={open} onClose={handleClose} fullWidth>
				<DialogTitle>Добавить нового клиента</DialogTitle>
				<DialogContent>
					<form id='client-form' onSubmit={handleSubmit(onSubmit)}>
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
							label='Пароль'
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
					<Button onClick={handleClose}>Отмена</Button>
					<Button
						form='client-form'
						type='submit'
						variant='contained'
						disabled={create.isPending}
					>
						Добавить
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default ClientsAddModal
