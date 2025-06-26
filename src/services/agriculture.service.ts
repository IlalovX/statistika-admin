import { axiosWithAuth } from '../api/interceptors'
import type {
	CreateDistrictForm,
	CreateFirms,
	CreatePlacementForm,
	CreateYieldForm,
} from '../types/agriculture'

export const AgricultureService = {
	async getYield(params: { year: number }) {
		const res = await axiosWithAuth.get('/agriculture/yield', { params })
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
	async getPlacement(params: { year: number }) {
		const res = await axiosWithAuth.get('/agriculture/placement', { params })
		return res.data
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
	async getDistrict(params: { year: number }) {
		const res = await axiosWithAuth.get('/agriculture/district', { params })
		return res.data
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
		const res = await axiosWithAuth.delete(`/agriculture/district/${id}`)
		return res.data.data
	},
	async getFirms() {
		const res = await axiosWithAuth.get('/agriculture/firms')
		return res.data
	},
	async createFirms(data: CreateFirms) {
		const res = await axiosWithAuth.post('/agriculture/firms', data)
		return res.data.data
	},
	async editFirms(data: CreateFirms, id: string | number) {
		const res = await axiosWithAuth.put(`/agriculture/firms/${id}`, data)
		return res.data.data
	},
	async deleteFirms(id: string | number) {
		const res = await axiosWithAuth.delete(`/agriculture/firms/${id}`)
		return res.data.data
	},
}
