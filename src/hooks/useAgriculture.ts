import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AgricultureService } from '../services/agriculture.service'
import type {
	CreateDistrictForm,
	CreateFirms,
	CreatePlacementForm,
	CreateYieldForm,
	GetDistrictForm,
	GetPlacementForm,
	GetYieldForm,
} from '../types/agriculture'

export function useGetYield(year: number) {
	return useQuery<GetYieldForm[]>({
		queryKey: ['get yield list', year],
		queryFn: async () => {
			return await AgricultureService.getYield({ year })
		},
		enabled: !!year, // чтобы запрос не отправлялся без года
	})
}

export function useCreateYield() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['get yield list'],
		mutationFn: async (data: CreateYieldForm) => {
			return await AgricultureService.createYield(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get yield list'] })
		},
	})
}
export function useEditYield() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['edit yield list'],
		mutationFn: async (data: CreateYieldForm & { id: string | number }) => {
			const { id, ...formData } = data
			return await AgricultureService.editYield(formData, id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get yield list'] })
		},
	})
}
export function useDeleteYield() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['delete yield list'],
		mutationFn: async ({ id }: { id: string | number }) => {
			return await AgricultureService.deleteYield(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get yield list'] })
		},
	})
}

export function useGetPlacement(year: number) {
	return useQuery<GetPlacementForm[]>({
		queryKey: ['get placement list', year],
		queryFn: async () => {
			return await AgricultureService.getPlacement({ year })
		},
	})
}

export function useCreatePlacemt() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['create placement list'],
		mutationFn: async (data: CreatePlacementForm) => {
			return await AgricultureService.createPlacement(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get placement list'] })
		},
	})
}
export function useEditPlacemt() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['edit placement list'],
		mutationFn: async (data: CreatePlacementForm & { id: string | number }) => {
			const { id, ...formData } = data
			return await AgricultureService.editPlacement(formData, id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get placement list'] })
		},
	})
}
export function useDeletePlacemt() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['delete placement list'],
		mutationFn: async ({ id }: { id: string | number }) => {
			return await AgricultureService.deletePlacement(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get placement list'] })
		},
	})
}

export function useGetDistrict(year: number) {
	return useQuery<GetDistrictForm[]>({
		queryKey: ['get district list', year],
		queryFn: async () => {
			return await AgricultureService.getDistrict({ year })
		},
	})
}

export function useCreateDistrict() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['create district'],
		mutationFn: async (data: CreateDistrictForm) => {
			return await AgricultureService.createDistrict(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get district list'] })
		},
	})
}
export function useEditDistrict() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['edit district'],
		mutationFn: async (data: GetDistrictForm) => {
			const { id, ...formData } = data
			return await AgricultureService.editDistrict(formData, id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get district list'] })
		},
	})
}
export function useDeleteDistrict() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['delete district'],
		mutationFn: async ({ id }: { id: string | number }) => {
			return await AgricultureService.deleteDistrict(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get district list'] })
		},
	})
}

export function useGetFirms() {
	return useQuery<CreateFirms[]>({
		queryKey: ['get firms list'],
		queryFn: async () => {
			return await AgricultureService.getFirms()
		},
	})
}

export function useCreateFirms() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['create firms'],
		mutationFn: async (data: CreateFirms) => {
			return await AgricultureService.createFirms(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get firms list'] })
		},
	})
}
export function useEditFirms() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['edit firms'],
		mutationFn: async (data: CreateFirms & { id: string | number }) => {
			const { id, ...formData } = data
			return await AgricultureService.editFirms(formData, id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get firms list'] })
		},
	})
}
export function useDeleteFirms() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['create firms'],
		mutationFn: async (id: string | number) => {
			return await AgricultureService.deleteFirms(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get firms list'] })
		},
	})
}
