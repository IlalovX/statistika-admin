import { axiosWithAuth } from '../api/interceptors'
import type { AdminCreateForm } from '../types/users'

export const UserService = {
	async getUserList() {
		const res = await axiosWithAuth.get('/admin/list')
		return res.data.data
	},
	async createAdmin(data: AdminCreateForm) {
		const res = await axiosWithAuth.post('/admin/new_admin', data)
		return res.data.data
	},
	async editAdmin(data: AdminCreateForm, id: string | number) {
		const res = await axiosWithAuth.post(`/admin/update/${id}`, data)
		return res.data.data
	},
	async deleteAdmin(id: string) {
		const res = await axiosWithAuth.delete(`/admin/delete/${id}`)
		return res.data.data
	},
}
