import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	TextField,
} from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RegionSelect } from '../../../../components/common/RegionSelect'
import { useCategories } from '../../../../context/CategoriesContext'
import { useCreateUser } from '../../../../hooks/useUsers'

const schema = z.object({
	name: z.string().min(1, 'Введите имя'),
	username: z.string().min(1, 'Введите логин'),
	region: z.number().min(1, 'Введите регион'),
	category: z.string().min(1, 'Выберите категорию'),
	password: z.string().min(6, 'Минимум 6 символов'),
})

type FormValues = z.infer<typeof schema>

function UsersAddModal() {
	const categories = useCategories()

	const [open, setOpen] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	})

	const create = useCreateUser()

	const onSubmit = (data: FormValues) => {
		create
			.mutateAsync({
				name: data.name,
				category_id: data.category,
				password: data.password,
				username: data.username,
				region_id: +data.region,
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
				<DialogTitle>Добавить нового пользователя</DialogTitle>
				<DialogContent>
					<form id='user-form' onSubmit={handleSubmit(onSubmit)}>
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

						<RegionSelect<FormValues>
							control={control}
							name='region'
							error={errors.region?.message}
						/>

						<TextField
							select
							label='Категория'
							fullWidth
							margin='normal'
							defaultValue={''}
							{...register('category')}
							error={!!errors.category}
							helperText={errors.category?.message}
						>
							<MenuItem value='' disabled>
								Выберите категорию
							</MenuItem>
							{Array.isArray(categories) &&
								categories.map(cat => (
									<MenuItem key={cat.id} value={cat.id}>
										{cat.category_name}
									</MenuItem>
								))}
						</TextField>

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
						form='user-form'
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

export default UsersAddModal
