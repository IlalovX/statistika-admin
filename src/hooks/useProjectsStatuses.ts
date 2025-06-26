import { QUERY_KEYS } from '../constants/queryKeys'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
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
export function useDeleteProjectStatus(id: string | number) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.PROJECT_STATUSES.DELETE],
		mutationFn: () => ProjectsStatusesService.deleteStatus(id),
		onSuccess: () => {
			toast.success('Успешно удалено ✅')
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.PROJECT_STATUSES.LIST],
			})
		},
	})
}
