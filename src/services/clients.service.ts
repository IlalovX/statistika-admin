import { axiosWithAuth } from '../api/interceptors'
import type { ClientCreateForm } from '../types/clients'

export const ClientsService = {
	async create(data: ClientCreateForm) {
		const res = await axiosWithAuth.post('/admin/clients/add', data)
		return res.data.data
	},
	async getList() {
		const res = await axiosWithAuth.get('/admin/clients/list')
		return res.data.data
	},
	async edit(data: ClientCreateForm, id: string | number) {
		const res = await axiosWithAuth.put(`/admin/clients/update/${id}`, data)
		return res.data.data
	},
	async delete(id: string | number) {
		const res = await axiosWithAuth.delete(`/admin/clients/delete/${id}`)
		return res.data.data
	},
}
