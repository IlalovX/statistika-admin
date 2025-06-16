import { axiosClassic, axiosWithAuth } from '../api/interceptors'
import type {
	CreateTourismExternalForm,
	CreateTourismInternalForm,
} from '../types/tourism'

export const TourismService = {
	async getTourismLastUpdate() {
		const res = await axiosClassic.get('/tourism/last_update')
		return res.data.data
	},
	async getTourismCountries() {
		const res = await axiosClassic.get('/tourism/countries')
		return res.data.data
	},
	async getTourismExternal() {
		const res = await axiosWithAuth.get('/tourism/external')
		return res.data.data
	},
	async createTourismExternal(data: CreateTourismExternalForm) {
		const res = await axiosWithAuth.post('/tourism/add/external', data)
		return res.data.data
	},
	async editTourismExternal(
		data: CreateTourismExternalForm,
		id: string | number
	) {
		const res = await axiosWithAuth.put(`/tourism/update/external/${id}`, data)
		return res.data.data
	},
	async getTourismInternal() {
		const res = await axiosWithAuth.get('/tourism/internal')
		return res.data.data
	},
	async createTourismInternal(data: CreateTourismInternalForm) {
		const res = await axiosWithAuth.post('/tourism/add/internal', data)
		return res.data.data
	},
	async editTourismInternal(
		data: CreateTourismInternalForm,
		id: string | number
	) {
		const res = await axiosWithAuth.put(`/tourism/update/internal/${id}`, data)
		return res.data.data
	},

	async deleteTourismTuristData(id: string | number) {
		const res = await axiosWithAuth.delete(`/tourism/turistdata/${id}`)
		return res.data.data
	},
	async getTourismClientOverview() {
		const res = await axiosClassic.get('/tourism/client/overview')
		return res.data.data
	},
	async getTourismClientCountries() {
		const res = await axiosClassic.get('/tourism/tourism/countries')
		return res.data.data
	},
	async getTourismClientSummary() {
		const res = await axiosClassic.get('/tourism/tourism/summary')
		return res.data.data
	},
	async getTourismClientGroupSummary() {
		const res = await axiosClassic.get('/tourism/client/group-summary')
		return res.data.data
	},
}
