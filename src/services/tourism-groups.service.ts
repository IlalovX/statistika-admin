import { axiosWithAuth } from '../api/interceptors'
import type {
	CreateTourismGroupData,
	CreateTourismGroupForm,
	CreateTourismSubGroupForm,
	EditTourismSubGroupForm,
} from '../types/tourism-groups'

export const TourismGroupsService = {
	async getTourismGroupList() {
		const res = await axiosWithAuth.get('/tourism/group/list')
		return res.data.data
	},
	async createTourismGroup(data: CreateTourismGroupForm) {
		const res = await axiosWithAuth.post('/tourism/group/add', data)
		return res.data.data
	},
	async editTourismGroup(data: CreateTourismGroupForm, id: string | number) {
		const res = await axiosWithAuth.put(`/tourism/group/update/${id}`, data)
		return res.data.data
	},
	async deleteTourismGroup(id: string | number) {
		const res = await axiosWithAuth.delete(`/tourism/group/delete/${id}`)
		return res.data.data
	},
	async getTourismSubGroupList(id: string | number) {
		const res = await axiosWithAuth.get(`/tourism/subgroup/${id}`)
		return res.data.data
	},
	async createTourismSubGroup(data: CreateTourismSubGroupForm) {
		const res = await axiosWithAuth.post('/tourism/subgroup/add', data)
		return res.data.data
	},
	async editTourismSubGroup(
		data: EditTourismSubGroupForm,
		id: string | number
	) {
		const res = await axiosWithAuth.put(`/tourism/subgroup/update/${id}`, data)
		return res.data.data
	},
	async deleteTourismSubGroup(id: string | number) {
		const res = await axiosWithAuth.delete(`/tourism/subgroup/delete/${id}`)
		return res.data.data
	},
	async getTourismGroupData() {
		const res = await axiosWithAuth.get('/tourism/group/data/list')
		return res.data.data
	},
	async creatTourismGroupData(data: CreateTourismGroupData) {
		const res = await axiosWithAuth.post('/tourism/group/data/add', data)
		return res.data.data
	},
	async editTourismGroupData(data: CreateTourismGroupData, id: number) {
		const res = await axiosWithAuth.put(
			`/tourism/group/data/update/${id}`,
			data
		)
		return res.data.data
	},
	async deleteTourismGroupData(id: number) {
		const res = await axiosWithAuth.delete(`/tourism/group/data/delete/${id}`)
		return res.data.data
	},
}
