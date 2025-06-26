import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
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

// YIELD
export function useGetYield(year: number) {
	return useQuery<GetYieldForm[]>({
		queryKey: [QUERY_KEYS.AGRICULTURE.YIELD_LIST, year],
		queryFn: () => AgricultureService.getYield({ year }),
		enabled: !!year,
	})
}

export function useCreateYield() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.AGRICULTURE.YIELD_LIST],
		mutationFn: (data: CreateYieldForm) => AgricultureService.createYield(data),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.AGRICULTURE.YIELD_LIST],
			}),
	})
}

export function useEditYield() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.AGRICULTURE.YIELD_EDIT],
		mutationFn: (data: CreateYieldForm & { id: string | number }) => {
			const { id, ...formData } = data
			return AgricultureService.editYield(formData, id)
		},
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.AGRICULTURE.YIELD_LIST],
			}),
	})
}

export function useDeleteYield() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.AGRICULTURE.YIELD_DELETE],
		mutationFn: ({ id }: { id: string | number }) =>
			AgricultureService.deleteYield(id),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.AGRICULTURE.YIELD_LIST],
			}),
	})
}

// PLACEMENT
export function useGetPlacement(year: number) {
	return useQuery<GetPlacementForm[]>({
		queryKey: [QUERY_KEYS.AGRICULTURE.PLACEMENT_LIST, year],
		queryFn: () => AgricultureService.getPlacement({ year }),
		enabled: !!year,
	})
}

export function useCreatePlacemt() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.AGRICULTURE.PLACEMENT_CREATE],
		mutationFn: (data: CreatePlacementForm) =>
			AgricultureService.createPlacement(data),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.AGRICULTURE.PLACEMENT_LIST],
			}),
	})
}

export function useEditPlacemt() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.AGRICULTURE.PLACEMENT_EDIT],
		mutationFn: (data: CreatePlacementForm & { id: string | number }) => {
			const { id, ...formData } = data
			return AgricultureService.editPlacement(formData, id)
		},
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.AGRICULTURE.PLACEMENT_LIST],
			}),
	})
}

export function useDeletePlacemt() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.AGRICULTURE.PLACEMENT_DELETE],
		mutationFn: ({ id }: { id: string | number }) =>
			AgricultureService.deletePlacement(id),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.AGRICULTURE.PLACEMENT_LIST],
			}),
	})
}

// DISTRICT
export function useGetDistrict(year: number) {
	return useQuery<GetDistrictForm[]>({
		queryKey: [QUERY_KEYS.AGRICULTURE.DISTRICT_LIST, year],
		queryFn: () => AgricultureService.getDistrict({ year }),
		enabled: !!year,
	})
}

export function useCreateDistrict() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.AGRICULTURE.DISTRICT_CREATE],
		mutationFn: (data: CreateDistrictForm) =>
			AgricultureService.createDistrict(data),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.AGRICULTURE.DISTRICT_LIST],
			}),
	})
}

export function useEditDistrict() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.AGRICULTURE.DISTRICT_EDIT],
		mutationFn: (data: GetDistrictForm) => {
			const { id, ...formData } = data
			return AgricultureService.editDistrict(formData, id)
		},
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.AGRICULTURE.DISTRICT_LIST],
			}),
	})
}

export function useDeleteDistrict() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.AGRICULTURE.DISTRICT_DELETE],
		mutationFn: ({ id }: { id: string | number }) =>
			AgricultureService.deleteDistrict(id),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.AGRICULTURE.DISTRICT_LIST],
			}),
	})
}

// FIRMS
export function useGetFirms() {
	return useQuery<CreateFirms[]>({
		queryKey: [QUERY_KEYS.AGRICULTURE.FIRMS_LIST],
		queryFn: () => AgricultureService.getFirms(),
	})
}

export function useCreateFirms() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.AGRICULTURE.FIRMS_CREATE],
		mutationFn: (data: CreateFirms) => AgricultureService.createFirms(data),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.AGRICULTURE.FIRMS_LIST],
			}),
	})
}

export function useEditFirms() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.AGRICULTURE.FIRMS_EDIT],
		mutationFn: (data: CreateFirms & { id: string | number }) => {
			const { id, ...formData } = data
			return AgricultureService.editFirms(formData, id)
		},
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.AGRICULTURE.FIRMS_LIST],
			}),
	})
}

export function useDeleteFirms() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.AGRICULTURE.FIRMS_DELETE],
		mutationFn: (id: string | number) => AgricultureService.deleteFirms(id),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.AGRICULTURE.FIRMS_LIST],
			}),
	})
}
