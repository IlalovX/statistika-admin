import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { QUERY_KEYS } from '../constants/queryKeys'
import { ProjectsService } from '../services/projects.service'
import type {
	CreateProjectForm,
	EditProjectForm,
	GetProject,
} from '../types/projects'

// CREATE
export function useCreateProject() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.PROJECTS.CREATE],
		mutationFn: (data: CreateProjectForm) =>
			ProjectsService.createProject(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS.LIST] })
			toast.success('Успешно создано ✅')
		},
	})
}

// EDIT
export function useEditProject() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.PROJECTS.EDIT],
		mutationFn: ({
			data,
			id,
		}: {
			data: EditProjectForm
			id: string | number
		}) => ProjectsService.editProject(data, id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS.LIST] })
			toast.success('Успешно изменено ✅')
		},
	})
}

// DELETE
export function useDeleteProject() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.PROJECTS.DELETE],
		mutationFn: (id: string | number) => ProjectsService.deleteProject(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS.LIST] })
			toast.success('Успешно удалено ✅')
		},
	})
}

// GET LIST
export function useGetProjectsList() {
	return useQuery<GetProject[]>({
		queryKey: [QUERY_KEYS.PROJECTS.LIST],
		queryFn: () => ProjectsService.getProjectList(),
	})
}

// GET DETAIL
export function useGetProjectDetail(id: string | number) {
	return useQuery({
		queryKey: [QUERY_KEYS.PROJECTS.DETAIL, id],
		queryFn: () => ProjectsService.getProjectDetail(id),
		enabled: !!id,
	})
}

// GET OVERALL STATUS
export function useGetProjectsOverallStatus(id: string | number) {
	return useQuery({
		queryKey: [QUERY_KEYS.PROJECTS.OVERALL_STATUS, id],
		queryFn: () => ProjectsService.getProjectsOverallStatus(id),
		enabled: !!id,
	})
}
