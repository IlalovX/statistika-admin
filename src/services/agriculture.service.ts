import { axiosWithAuth } from '../api/interceptors'
import type {
	CreateDistrictForm,
	CreatePlacementForm,
	CreateYieldForm,
} from '../types/agriculture'

export const AgricultureService = {
	async getYield() {
		const res = await axiosWithAuth.get('/agriculture/yield')
		return res.data.data
	},
	async createYield(data: CreateYieldForm) {
		const res = await axiosWithAuth.post('/agriculture/yield', data)
		return res.data.data
	},
	async editYield(data: CreateYieldForm, id: string | number) {
		const res = await axiosWithAuth.put(`/agriculture/yield/${id}`, data)
		return res.data.data
	},
	async deleteYield(id: string | number) {
		const res = await axiosWithAuth.delete(`/agriculture/yield/${id}`)
		return res.data.data
	},
	async getPlacement() {
		const res = await axiosWithAuth.get('/agriculture/placement')
		return res.data.data
	},
	async createPlacement(data: CreatePlacementForm) {
		const res = await axiosWithAuth.post('/agriculture/placement', data)
		return res.data.data
	},
	async editPlacement(data: CreatePlacementForm, id: string | number) {
		const res = await axiosWithAuth.put(`/agriculture/placement/${id}`, data)
		return res.data.data
	},
	async deletePlacement(id: string | number) {
		const res = await axiosWithAuth.delete(`/agriculture/placement/${id}`)
		return res.data.data
	},
	async getDistrict() {
		const res = await axiosWithAuth.get('/agriculture/district')
		return res.data.data
	},
	async createDistrict(data: CreateDistrictForm) {
		const res = await axiosWithAuth.post('/agriculture/district', data)
		return res.data.data
	},
	async editDistrict(data: CreateDistrictForm, id: string | number) {
		const res = await axiosWithAuth.put(`/agriculture/district/${id}`, data)
		return res.data.data
	},
	async deleteDistrict(id: string | number) {
		const res = await axiosWithAuth.get(`/agriculture/district/${id}`)
		return res.data.data
	},
}
