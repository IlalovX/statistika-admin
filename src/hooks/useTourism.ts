import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TourismService } from '../services/tourism.service'
import type {
	CreateTourismExternalForm,
	CreateTourismInternalForm,
	EditTourismExternalForm,
	EditTourismInternalForm,
	GetTourismInternal,
} from '../types/tourism'
import { toast } from 'sonner'

export function useGetExternalList() {
	return useQuery({
		queryKey: ['tourism external list'],
		queryFn: async () => {
			return await TourismService.getTourismExternal()
		},
	})
}
export function useCreateExternal() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['create external'],
		mutationFn: async (data: CreateTourismExternalForm) => {
			return await TourismService.createTourismExternal(data)
		},
		onSuccess: () => {
			toast.success("Успешно создано ✅")
			queryClient.invalidateQueries({
				queryKey: ['tourism external list', 'tourism internal list'],
			})
		},
	})
}
export function useEditExternal() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['edit external'],
		mutationFn: async (data: EditTourismExternalForm) => {
			const { id, ...formData } = data
			return await TourismService.editTourismExternal(formData, id)
		},
		onSuccess: () => {
			toast.success("Успешно изменено ✅")
			queryClient.invalidateQueries({
				queryKey: ['tourism external list', 'tourism internal list'],
				
			})
		},
	})
}

export function useGetInternalList() {
	return useQuery<GetTourismInternal[]>({
		queryKey: ['tourism internal list'],
		queryFn: async () => {
			return await TourismService.getTourismInternal()
		},
	})
}
export function useCreateInternal() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['create internal'],
		mutationFn: async (data: CreateTourismInternalForm) => {
			return await TourismService.createTourismInternal(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['tourism external list', 'tourism internal list'],
			})
		},
	})
}
export function useEditInternal() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['edit internal'],
		mutationFn: async (data: EditTourismInternalForm) => {
			const { id, ...formData } = data
			return await TourismService.editTourismInternal(formData, id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['tourism external list', 'tourism internal list'],
			})
		},
	})
}

export function useDeleteBothTourism() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['delete both tourism'],
		mutationFn: async (data: { id: string | number }) => {
			return await TourismService.deleteTourismTuristData(data.id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['tourism external list', 'tourism internal list'],
			})
		},
	})
}
