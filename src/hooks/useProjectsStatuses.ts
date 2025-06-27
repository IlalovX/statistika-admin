import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { QUERY_KEYS } from '../constants/queryKeys'
import { ProjectsStatusesService } from '../services/projects-statuses.service'
import type { ProjectsStatusesForm } from '../types/projects-statuses'

// GET LIST
export function useGetProjectsStatusesList() {
	return useQuery<ProjectsStatusesForm[]>({
		queryKey: [QUERY_KEYS.PROJECT_STATUSES.LIST],
		queryFn: () => ProjectsStatusesService.getStatusesList(),
	})
}

// CREATE
export function useCreateProjectStatus() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.PROJECT_STATUSES.CREATE],
		mutationFn: (data: ProjectsStatusesForm) =>
			ProjectsStatusesService.createStasus(data),
		onSuccess: () => {
			toast.success('Успешно создан ✅')
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PROJECT_STATUSES.LIST],
			})
		},
	})
}

// DELETE
export function useDeleteProjectStatus() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.PROJECT_STATUSES.DELETE],
		mutationFn: ({ id }: { id: string | number }) => {
			return ProjectsStatusesService.deleteStatus(id)
		},
		onSuccess: () => {
			toast.success('Успешно удалено ✅')
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PROJECT_STATUSES.LIST],
			})
		},
	})
}

export function useEditProjectStatus() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.PROJECT_STATUSES.EDIT],
		mutationFn: (data: ProjectsStatusesForm & { id: string | number }) => {
			const { id, ...formData } = data
			return ProjectsStatusesService.editStatus(formData, id)
		},
		onSuccess: () => {
			toast.success('Успешно измененно ✅')
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PROJECT_STATUSES.LIST],
			})
		},
	})
}
