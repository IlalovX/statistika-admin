import { axiosClassic } from '../api/interceptors'

export const RegionsService = {
	async getRegionsList() {
		const { data } = await axiosClassic.get('/region')
		return data.data
	},
}
