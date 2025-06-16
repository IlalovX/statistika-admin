import { axiosWithAuth } from '../api/interceptors'
import type { ProjectsStatusesForm } from '../types/projects-statuses'

export const ProjectsStatusesService = {
	async getStatusesList() {
		const res = await axiosWithAuth.get('/projects/status/list')
		return res.data.data
	},
	async createStasus(data: ProjectsStatusesForm) {
		const res = await axiosWithAuth.post('/projects/status/add', data)
		return res.data.data
	},
	async deleteStatus(id: string | number) {
		const res = await axiosWithAuth.delete(`/projects/status/${id}`)
		return res.data.data
	},
}
