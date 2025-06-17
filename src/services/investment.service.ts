import { axiosWithAuth } from '../api/interceptors'
import type {
	CreateInvestmentIndustryForm,
	CreateInvestmentOutputForm,
	CreateInvestmentsForm,
	CreateProductionDistrictForm,
} from '../types/investment'

export const InvestmentService = {
	async getIndustry() {
		const res = await axiosWithAuth.get('/investment/admin/industry')
		return res.data
	},
	async createIndustry(data: CreateInvestmentIndustryForm) {
		const res = await axiosWithAuth.post('/investment/admin/industry', data)
		return res.data.data
	},
	async editIndustry(data: CreateInvestmentIndustryForm, id: string | number) {
		const res = await axiosWithAuth.put(
			`/investment/admin/industry/${id}`,
			data
		)
		return res.data.data
	},
	async deleteIndustry(id: string | number) {
		const res = await axiosWithAuth.delete(
			`/investment/superadmin/industry/${id}`
		)
		return res.data.data
	},
	async getOutput() {
		const res = await axiosWithAuth.get('/investment/admin/output')
		return res.data
	},
	async createOutput(data: CreateInvestmentOutputForm) {
		const res = await axiosWithAuth.post('/investment/admin/output', data)
		return res.data.data
	},
	async editOutput(data: CreateInvestmentOutputForm, id: string | number) {
		const res = await axiosWithAuth.put(`/investment/admin/output/${id}`, data)
		return res.data.data
	},
	async deleteOutput(id: string | number) {
		const res = await axiosWithAuth.delete(`/investment/admin/output/${id}`)
		return res.data.data
	},
	async getInvestments() {
		const res = await axiosWithAuth.get('/investment/admin/investments')
		return res.data.data
	},
	async createInvestments(data: CreateInvestmentsForm) {
		const res = await axiosWithAuth.post('/investment/admin/investments', data)
		return res.data.data
	},
	async editInvestments(data: CreateInvestmentsForm, id: string | number) {
		const res = await axiosWithAuth.put(
			`/investment/admin/investments/${id}`,
			data
		)
		return res.data.data
	},
	async deleteInvestments(id: string | number) {
		const res = await axiosWithAuth.delete(
			`/investment/admin/investments/${id}`
		)
		return res.data.data
	},
	async getProductionDistrict() {
		const res = await axiosWithAuth.get('/investment/admin/production-district')
		return res.data
	},
	async createProductionDistrict(data: CreateProductionDistrictForm) {
		const res = await axiosWithAuth.post(
			'/investment/admin/production-district',
			data
		)
		return res.data.data
	},
	async editProductionDistrict(
		data: CreateProductionDistrictForm,
		id: string | number
	) {
		const res = await axiosWithAuth.put(
			`/investment/admin/production-district/${id}`,
			data
		)
		return res.data.data
	},
	async deleteProductionDistrict(id: string | number) {
		const res = await axiosWithAuth.delete(
			`/investment/admin/production-district/${id}`
		)
		return res.data.data
	},
}
