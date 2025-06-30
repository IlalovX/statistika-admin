import { axiosWithAuth } from '../api/interceptors'

export const CountryService = {
	async getCounrtyList() {
		const res = await axiosWithAuth.get('/country/')
		return res.data
	},
}
