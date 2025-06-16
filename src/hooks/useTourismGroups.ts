import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TourismGroupsService } from '../services/tourism-groups.service'
import type {
	CreateTourismGroupData,
	CreateTourismGroupForm,
	EditTourismSubGroupForm,
	GetTourismGroupData,
	GetTourismGroupList,
	GetTourismSubGroupList,
} from '../types/tourism-groups'
import { toast } from 'sonner'

export function useGetTourismGroupList() {
	return useQuery<GetTourismGroupList[]>({
		queryKey: ['tourism group list'],
		queryFn: async () => {
			return await TourismGroupsService.getTourismGroupList()
		},
	})
}

export function useCreateTourismGroup() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['create tourism group'],
		mutationFn: TourismGroupsService.createTourismGroup,
		onSuccess: () => {
			toast.success("Успешно создано ✅")
			queryClient.invalidateQueries({ queryKey: ['tourism group list'] })
		},
	})
}

export function useEditTourismGroup() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['edit tourism group'],
		mutationFn: async (data: CreateTourismGroupForm & { id: number }) => {
			const { id, ...formData } = data
			return await TourismGroupsService.editTourismGroup(formData, id)
		},
		onSuccess: () => {
			toast.success("Успешно изменено ✅")
			queryClient.invalidateQueries({ queryKey: ['tourism group list'] })
		},
	})
}

export function useGetTourismSubGroupList(id: number | string) {
	return useQuery<GetTourismSubGroupList[]>({
		queryKey: ['tourism subgroup list'],
		queryFn: async () => {
			return await TourismGroupsService.getTourismSubGroupList(id)
		},
		enabled: !!id,
	})
}

export function useCreateTourismSubGroup() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['create tourism subgroup'],
		mutationFn: TourismGroupsService.createTourismSubGroup,
		onSuccess: () => {
			toast.success("Успешно создано ✅")
			queryClient.invalidateQueries({ queryKey: ['tourism subgroup list'] })
		},
	})
}

export function useEditTourismSubGroup() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['edit tourism subgroup'],
		mutationFn: async (data: EditTourismSubGroupForm & { id: number }) => {
			const { id, ...formData } = data
			return await TourismGroupsService.editTourismSubGroup(formData, id)
		},
		onSuccess: () => {
			toast.success("Успешно изменено ✅")
			queryClient.invalidateQueries({ queryKey: ['tourism subgroup list'] })
		},
	})
}

export function useGetTourismGroupData() {
	return useQuery<GetTourismGroupData[]>({
		queryKey: ['tourism group data list'],
		queryFn: async () => {
			return await TourismGroupsService.getTourismGroupData()
		},
	})
}

export function useCreateTourismGroupData() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['create tourism group data'],
		mutationFn: async (data: CreateTourismGroupData) => {
			return await TourismGroupsService.creatTourismGroupData(data)
		},
		onSuccess: () => {
			toast.success("Успешно создано ✅")
			queryClient.invalidateQueries({ queryKey: ['create tourism group data'] })
		},
	})
}
export function useEditTourismGroupData() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['edit tourism group data'],
		mutationFn: async (data: CreateTourismGroupData & { id: number }) => {
			const { id, ...formData } = data
			return await TourismGroupsService.editTourismGroupData(formData, id)
		},
		onSuccess: () => {
			toast.success("Успешно изменено ✅")
			queryClient.invalidateQueries({ queryKey: ['create tourism group data'] })
		},
	})
}
