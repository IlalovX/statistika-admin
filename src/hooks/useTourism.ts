import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { QUERY_KEYS } from '../constants/queryKeys'
import { TourismService } from '../services/tourism.service'
import type {
	CreateTourismExternalForm,
	CreateTourismInternalForm,
	EditTourismExternalForm,
	EditTourismInternalForm,
	GetTourismInternal,
} from '../types/tourism'

// EXTERNAL

export function useGetExternalList() {
	return useQuery({
		queryKey: [QUERY_KEYS.TOURISM.EXTERNAL.LIST],
		queryFn: () => TourismService.getTourismExternal(),
	})
}

export function useCreateExternal() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.TOURISM.EXTERNAL.CREATE],
		mutationFn: (data: CreateTourismExternalForm) =>
			TourismService.createTourismExternal(data),
		onSuccess: () => {
			toast.success('Успешно создано ✅')
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM.EXTERNAL.LIST],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM.INTERNAL.LIST],
			})
		},
	})
}

export function useEditExternal() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.TOURISM.EXTERNAL.EDIT],
		mutationFn: (data: EditTourismExternalForm) => {
			const { id, ...formData } = data
			return TourismService.editTourismExternal(formData, id)
		},
		onSuccess: () => {
			toast.success('Успешно изменено ✅')
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM.EXTERNAL.LIST],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM.INTERNAL.LIST],
			})
		},
	})
}

// INTERNAL

export function useGetInternalList() {
	return useQuery<GetTourismInternal[]>({
		queryKey: [QUERY_KEYS.TOURISM.INTERNAL.LIST],
		queryFn: () => TourismService.getTourismInternal(),
	})
}

export function useCreateInternal() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.TOURISM.INTERNAL.CREATE],
		mutationFn: (data: CreateTourismInternalForm) =>
			TourismService.createTourismInternal(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM.EXTERNAL.LIST],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM.INTERNAL.LIST],
			})
		},
	})
}

export function useEditInternal() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.TOURISM.INTERNAL.EDIT],
		mutationFn: (data: EditTourismInternalForm) => {
			const { id, ...formData } = data
			return TourismService.editTourismInternal(formData, id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM.EXTERNAL.LIST],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM.INTERNAL.LIST],
			})
		},
	})
}

// DELETE

export function useDeleteBothTourism() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.TOURISM.DELETE],
		mutationFn: (data: { id: string | number }) =>
			TourismService.deleteTourismTuristData(data.id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM.EXTERNAL.LIST],
			})
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM.INTERNAL.LIST],
			})
		},
	})
}
