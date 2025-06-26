import { axiosWithAuth } from '../api/interceptors'
import type { CreateProjectForm, EditProjectForm } from '../types/projects'

export const ProjectsService = {
	async createProject(data: CreateProjectForm) {
		const res = await axiosWithAuth.post('/projects/add', data)
		return res.data.data
	},
	async editProject(data: EditProjectForm, id: string | number) {
		const res = await axiosWithAuth.put(`/projects/update/${id}`, data)
		return res.data.data
	},
	async deleteProject(id: string | number) {
		const res = await axiosWithAuth.delete(`/projects/delete/${id}`)
		return res.data.data
	},
	async getProjectList() {
		const res = await axiosWithAuth.get('/projects/list')
		return res.data.data
	},
	async getProjectDetail(id: string | number) {
		const res = await axiosWithAuth.get(`/projects/get/${id}`)
		return res.data.data
	},
	async getProjectsOverallStatus(id: string | number) {
		const res = await axiosWithAuth.get(`/projects/overall-status/${id}`)
		return res.data.data
	},
	async getProjectsLastUpdate() {
		const res = await axiosWithAuth.get('/projects/last_update')
		return res.data.data
	},
	async getProjectsSearch() {
		const res = await axiosWithAuth.get('/projects/search')
		return res.data.data
	},
}
