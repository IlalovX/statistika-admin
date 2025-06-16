import { axiosWithAuth } from '../api/interceptors'
import type { UserCreateForm } from '../types/users'

export const UserService = {
	async getUserList() {
		const res = await axiosWithAuth.get('/admin/list')
		return res.data.data
	},
	async create(data: UserCreateForm) {
		const res = await axiosWithAuth.post('/admin/new_admin', data)
		return res.data.data
	},
}
