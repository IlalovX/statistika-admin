'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
	Alert,
	Box,
	Button,
	CircularProgress,
	IconButton,
	InputAdornment,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { useLogin } from '../../hooks/useLogin'
import { useAppSelector } from '../../utils/helpers'

const AuthSchema = z.object({
	username: z.string().min(3, 'Минимум 3 символа'),
	password: z.string().min(6, 'Минимум 6 символов'),
})

type AuthFields = z.infer<typeof AuthSchema>

export default function AuthPage() {
	const user = useAppSelector(state => state.user_me.user)
	const navigate = useNavigate()

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [user, navigate])

	const [showPassword, setShowPassword] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const theme = useTheme()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<AuthFields>({
		resolver: zodResolver(AuthSchema),
	})

	const { mutateAsync } = useLogin()

	const onSubmit = async (data: AuthFields) => {
		setErrorMessage('')
		try {
			await mutateAsync(data)
			toast.success('Успешный вход ✅')
		} catch {
			setErrorMessage('Неверный логин или пароль ❌')
		}
	}

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh',
				bgcolor: theme.palette.mode === 'light' ? '#f5f5f5' : '#121212',
			}}
		>
			<Paper
				elevation={3}
				sx={{
					p: 4,
					width: '100%',
					maxWidth: 400,
					bgcolor: theme.palette.background.paper,
					color: theme.palette.text.primary,
				}}
			>
				<Typography variant='h5' align='center' gutterBottom>
					Авторизация
				</Typography>

				<Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
					<TextField
						fullWidth
						label='Логин'
						margin='normal'
						autoFocus
						{...register('username')}
						error={!!errors.username}
						helperText={errors.username?.message}
					/>

					<TextField
						fullWidth
						label='Пароль'
						type={showPassword ? 'text' : 'password'}
						margin='normal'
						{...register('password')}
						error={!!errors.password}
						helperText={errors.password?.message}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										onClick={() => setShowPassword(prev => !prev)}
										edge='end'
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					{errorMessage && (
						<Alert severity='error' sx={{ mb: 2 }}>
							{errorMessage}
						</Alert>
					)}
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3 }}
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<CircularProgress size={24} color='inherit' />
						) : (
							'Войти'
						)}
					</Button>
				</Box>
			</Paper>
		</Box>
	)
}
