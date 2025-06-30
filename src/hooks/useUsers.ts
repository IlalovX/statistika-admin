import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { QUERY_KEYS } from '../constants/queryKeys'
import { UserService } from '../services/user.service'
import type { DetailSuccessfully } from '../types/common'
import type { AdminCreateForm, UsersSuccessType } from '../types/users'

export function useGetUsersList() {
	return useQuery<UsersSuccessType[]>({
		queryKey: [QUERY_KEYS.USERS.LIST],
		queryFn: () => UserService.getUserList(),
	})
}

export function useCreateUser() {
	const queryClient = useQueryClient()
	return useMutation<DetailSuccessfully, Error, AdminCreateForm>({
		mutationKey: [QUERY_KEYS.USERS.CREATE],
		mutationFn: (data) => UserService.createAdmin(data),
		onSuccess: () => {
			toast.success('Успешно создано ✅')
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS.LIST] })
		},
	})
}

export function useEditUser() {
	const queryClient = useQueryClient()
	return useMutation<
		DetailSuccessfully,
		Error,
		AdminCreateForm & { id: string | number }
	>({
		mutationKey: [QUERY_KEYS.USERS.EDIT],
		mutationFn: (data) => {
			const { id, ...formData } = data
			return UserService.editAdmin(formData, id)
		},
		onSuccess: () => {
			toast.success('Успешно изменено ✅')
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS.LIST] })
		},
	})
}

export function useDeleteAdmin() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['delete_admin'],
		mutationFn: (data: { id: string }) => UserService.deleteAdmin(data.id),
		onSuccess: () => {
			toast.success('Успешно удаленно ✅')
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS.LIST] })
		},
	})
}
