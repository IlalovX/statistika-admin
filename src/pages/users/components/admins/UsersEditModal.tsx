import { zodResolver } from '@hookform/resolvers/zod'
import EditIcon from '@mui/icons-material/Edit'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	MenuItem,
	TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RegionSelect } from '../../../../components/common/RegionSelect'
import { useCategories } from '../../../../context/CategoriesContext'
import { useEditUser } from '../../../../hooks/useUsers'
import type { UsersSuccessType } from '../../../../types/users'

const schema = z.object({
	name: z.string().min(1, 'Введите имя'),
	username: z.string().min(1, 'Введите логин'),
	password: z.string().optional(),
	region_id: z.number().min(1, 'Выберите регион'),
	category_id: z.string().min(1, 'Выберите категорию'),
})

type FormValues = z.infer<typeof schema>

interface UsersEditModalProps {
	user: UsersSuccessType
}

function UsersEditModal({ user }: UsersEditModalProps) {
	const [open, setOpen] = useState(false)
	const categories = useCategories()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			username: '',
			password: '',
			region_id: 0,
			category_id: '',
		},
	})

	const editUser = useEditUser()

	useEffect(() => {
		if (open && user) {
			reset({
				name: user.name,
				username: user.username,
				password: '',
				region_id: Number(user.region),
				category_id: String(user.category),
			})
		}
	}, [open, user, reset])

	const onSubmit = (data: FormValues) => {
		editUser
			.mutateAsync({
				id: user.id,
				name: data.name,
				username: data.username,
				password: data.password || '',
				region_id: +data.region_id,
				category_id: data.category_id,
			})
			.then(() => handleClose())
	}

	const handleClose = () => {
		setOpen(false)
		reset()
	}

	return (
		<>
			<IconButton onClick={() => setOpen(true)}>
				<EditIcon />
			</IconButton>

			<Dialog open={open} onClose={handleClose} fullWidth>
				<DialogTitle>Редактировать администратора</DialogTitle>
				<DialogContent>
					<form
						id={`edit-user-form-${user.id}`}
						onSubmit={handleSubmit(onSubmit)}
					>
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
							label='Пароль (оставьте пустым, если не меняется)'
							type='password'
							fullWidth
							margin='normal'
							{...register('password')}
							error={!!errors.password}
							helperText={errors.password?.message}
						/>

						<RegionSelect<FormValues>
							control={control}
							name='region_id'
							error={errors.region_id?.message}
						/>

						<TextField
							select
							label='Категория'
							fullWidth
							margin='normal'
							{...register('category_id')}
							error={!!errors.category_id}
							helperText={errors.category_id?.message}
						>
							<MenuItem value='' disabled>
								Выберите категорию
							</MenuItem>
							{Array.isArray(categories) &&
								categories.map(cat => (
									<MenuItem key={cat.id} value={String(cat.id)}>
										{cat.category_name}
									</MenuItem>
								))}
						</TextField>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Отмена</Button>
					<Button
						form={`edit-user-form-${user.id}`}
						type='submit'
						variant='contained'
						disabled={editUser.isPending}
					>
						Сохранить
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
export default UsersEditModal
