import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ProjectsService } from '../services/projects.service'
import type { CreateProjectForm, EditProjectForm, GetProject } from '../types/projects'
import { toast } from 'sonner'

export function useCreateProject() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['create project'],
		mutationFn: async (data: CreateProjectForm) => {
			return await ProjectsService.createProject(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects list'] })
			toast.success("Успешно создано ✅")
		},
	})
}

export function useEditProject() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['edit project'],
		mutationFn: async ({
			data: data,
			id: id,
		}: {
			data: EditProjectForm
			id: string | number
		}) => {
			return await ProjectsService.editProject(data, id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects list'] })
			toast.success("Успешно изменено ✅")
		},
	})
}

export function useDeleteProject() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['delete project'],
		mutationFn: async (id: string | number) => {
			return await ProjectsService.deleteProject(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects list'] })
			toast.success("Успешно удалено ✅")
		},
	})
}

export function useGetProjectsList() {
	return useQuery<GetProject[]>({
		queryKey: ['projects list'],
		queryFn: async () => {
			return await ProjectsService.getProjectList()
		},
	})
}

export function useGetProjectDetail(id: string | number) {
	return useQuery({
		queryKey: ['project detail'],
		queryFn: async () => {
			return ProjectsService.getProjectDetail(id)
		},
	})
}

export function useGetProjectsOverallStatus(id: string | number) {
	return useQuery({
		queryKey: ['project overall status'],
		queryFn: async () => {
			return ProjectsService.getProjectsOverallStatus(id)
		},
	})
}
