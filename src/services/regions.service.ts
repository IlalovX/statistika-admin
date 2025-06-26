import { axiosWithAuth } from '../api/interceptors'

export const RegionsService = {
	async getRegionsList() {
		const { data } = await axiosWithAuth.get('/region')
		return data.data
	},
}
