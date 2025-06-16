import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UserService } from '../services/user.service'
import type { DetailSuccessfully } from '../types/common'
import type { UserCreateForm, UsersSuccessType } from '../types/users'
import { toast } from 'sonner'

export function useGetUsersList() {
	return useQuery<UsersSuccessType[]>({
		queryKey: ['users list'],
		queryFn: async () => {
			return await UserService.getUserList()
		},
	})
}

export function useCreateUser() {
	const queryClient = useQueryClient()
	return useMutation<DetailSuccessfully, Error, UserCreateForm>({
		mutationKey: ['create user'],
		mutationFn: async data => {
			return await UserService.create(data)
		},
		onSuccess: () => {
			toast.success("Успешно создано✅")
			queryClient.invalidateQueries({ queryKey: ['users list'] })
		},
	})
}
