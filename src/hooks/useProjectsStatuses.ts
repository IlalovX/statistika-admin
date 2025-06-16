import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ProjectsStatusesService } from '../services/projects-statuses.service'
import type { ProjectsStatusesForm } from '../types/projects-statuses'
import { toast } from 'sonner'

export function useGetProjectsStatusesList() {
	return useQuery<ProjectsStatusesForm[]>({
		queryKey: ['projects status list'],
		queryFn: async () => {
			return await ProjectsStatusesService.getStatusesList()
		},
	})
}

export function useCreateProjectStatus() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['create project status'],
		mutationFn: async (data: ProjectsStatusesForm) => {
			return await ProjectsStatusesService.createStasus(data)
		},
		onSuccess: () => {
			toast.success("Успешно создан ✅")
			queryClient.invalidateQueries({ queryKey: ['projects status list'] })
		},
	})
}

export function useDeleteProjectStatus(id: string | number) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['delete project delete'],
		mutationFn: async () => {
			return await ProjectsStatusesService.deleteStatus(id)
		},
		onSuccess: () => {
			toast.success("Успешно удалено ✅")
			queryClient.invalidateQueries({ queryKey: ['projects status list'] })
		},
	})
}
