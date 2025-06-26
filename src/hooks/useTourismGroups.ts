import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { QUERY_KEYS } from '../constants/queryKeys'
import { TourismGroupsService } from '../services/tourism-groups.service'
import type {
	CreateTourismGroupData,
	CreateTourismGroupForm,
	EditTourismSubGroupForm,
	GetTourismGroupData,
	GetTourismGroupList,
	GetTourismSubGroupList,
} from '../types/tourism-groups'

// GROUP

export function useGetTourismGroupList() {
	return useQuery<GetTourismGroupList[]>({
		queryKey: [QUERY_KEYS.TOURISM_GROUPS.GROUP.LIST],
		queryFn: TourismGroupsService.getTourismGroupList,
	})
}

export function useCreateTourismGroup() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.TOURISM_GROUPS.GROUP.CREATE],
		mutationFn: TourismGroupsService.createTourismGroup,
		onSuccess: () => {
			toast.success('Успешно создано ✅')
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM_GROUPS.GROUP.LIST],
			})
		},
	})
}

export function useEditTourismGroup() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.TOURISM_GROUPS.GROUP.EDIT],
		mutationFn: (data: CreateTourismGroupForm & { id: number }) => {
			const { id, ...formData } = data
			return TourismGroupsService.editTourismGroup(formData, id)
		},
		onSuccess: () => {
			toast.success('Успешно изменено ✅')
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM_GROUPS.GROUP.LIST],
			})
		},
	})
}

// SUBGROUP

export function useGetTourismSubGroupList(id: number | string) {
	return useQuery<GetTourismSubGroupList[]>({
		queryKey: [QUERY_KEYS.TOURISM_GROUPS.SUBGROUP.LIST, id],
		queryFn: () => TourismGroupsService.getTourismSubGroupList(id),
		enabled: !!id,
	})
}

export function useCreateTourismSubGroup() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.TOURISM_GROUPS.SUBGROUP.CREATE],
		mutationFn: TourismGroupsService.createTourismSubGroup,
		onSuccess: () => {
			toast.success('Успешно создано ✅')
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM_GROUPS.SUBGROUP.LIST],
			})
		},
	})
}

export function useEditTourismSubGroup() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.TOURISM_GROUPS.SUBGROUP.EDIT],
		mutationFn: (data: EditTourismSubGroupForm & { id: number }) => {
			const { id, ...formData } = data
			return TourismGroupsService.editTourismSubGroup(formData, id)
		},
		onSuccess: () => {
			toast.success('Успешно изменено ✅')
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM_GROUPS.SUBGROUP.LIST],
			})
		},
	})
}

// GROUP DATA

export function useGetTourismGroupData() {
	return useQuery<GetTourismGroupData[]>({
		queryKey: [QUERY_KEYS.TOURISM_GROUPS.GROUP_DATA.LIST],
		queryFn: TourismGroupsService.getTourismGroupData,
	})
}

export function useCreateTourismGroupData() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.TOURISM_GROUPS.GROUP_DATA.CREATE],
		mutationFn: (data: CreateTourismGroupData) =>
			TourismGroupsService.creatTourismGroupData(data),
		onSuccess: () => {
			toast.success('Успешно создано ✅')
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM_GROUPS.GROUP_DATA.LIST],
			})
		},
	})
}

export function useEditTourismGroupData() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.TOURISM_GROUPS.GROUP_DATA.EDIT],
		mutationFn: (data: CreateTourismGroupData & { id: number }) => {
			const { id, ...formData } = data
			return TourismGroupsService.editTourismGroupData(formData, id)
		},
		onSuccess: () => {
			toast.success('Успешно изменено ✅')
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM_GROUPS.GROUP_DATA.LIST],
			})
		},
	})
}

// DELETE GROUP
export function useDeleteTourismGroup() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.TOURISM_GROUPS.GROUP.DELETE],
		mutationFn: (id: string | number) =>
			TourismGroupsService.deleteTourismGroup(id),
		onSuccess: () => {
			toast.success('Успешно удалено ✅')
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM_GROUPS.GROUP.LIST],
			})
		},
	})
}

// DELETE SUBGROUP
export function useDeleteTourismSubGroup() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.TOURISM_GROUPS.SUBGROUP.DELETE],
		mutationFn: (id: string | number) =>
			TourismGroupsService.deleteTourismSubGroup(id),
		onSuccess: () => {
			toast.success('Успешно удалено ✅')
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM_GROUPS.SUBGROUP.LIST],
			})
		},
	})
}

// DELETE GROUP DATA
export function useDeleteTourismGroupData() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.TOURISM_GROUPS.GROUP_DATA.DELETE],
		mutationFn: (id: number) => TourismGroupsService.deleteTourismGroupData(id),
		onSuccess: () => {
			toast.success('Успешно удалено ✅')
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TOURISM_GROUPS.GROUP_DATA.LIST],
			})
		},
	})
}
