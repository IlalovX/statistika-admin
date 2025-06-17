import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { updateUserMe } from '../features/slices/UserMeSlice'
import { saveTokens } from '../services/auth-token.service'
import { login } from '../services/auth.service'
import { userMeService } from '../services/user-me.service'
import { useAppDispatch } from '../utils/helpers'

type LoginDto = {
	username: string
	password: string
}

export function useLogin() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const dispatch = useAppDispatch()
	return useMutation({
		mutationFn: async (data: LoginDto) => {
			return await login(data)
		},

		onSuccess: async data => {
			saveTokens(data.access_token, data.refresh_token)

			const user = await queryClient.fetchQuery({
				queryKey: ['user'],
				queryFn: async () => {
					return await userMeService.getMe()
				},
			})
			dispatch(updateUserMe(user))
			queryClient.setQueryData(['user'], user)
			if (user.is_superadmin) {
				navigate(`/users`)
			} else {
				navigate(`/${user.category}`)
			}
		},
		onError: () => {
			toast.error('Ошибка авторизации!')
		},
	})
}
