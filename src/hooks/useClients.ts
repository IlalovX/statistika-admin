import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { ClientsService } from '../services/clients.service'
import type { ClientCreateForm, ClientsData } from '../types/clients'

export function useGetClients() {
	return useQuery<ClientsData[]>({
		queryKey: [QUERY_KEYS.CLIENTS.LIST],
		queryFn: () => ClientsService.getList(),
	})
}

export function useCreateNewClient() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.CLIENTS.CREATE],
		mutationFn: (data: ClientCreateForm) => ClientsService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTS.LIST] })
		},
	})
}

export function useEditClient() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.CLIENTS.EDIT],
		mutationFn: (data: ClientCreateForm & { id: string | number }) => {
			const { id, ...formData } = data
			return ClientsService.edit(formData, id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTS.LIST] })
		},
	})
}

export function useDeleteClient() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.CLIENTS.DELETE],
		mutationFn: (id: string | number) => {
			return ClientsService.delete(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTS.LIST] })
		},
	})
}
