import { useQuery } from '@tanstack/react-query'
import { axiosWithAuth } from '../api/interceptors'

export type Category = {
	id: string
	category_name: string
}

export const useCategoriesList = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const { data } = await axiosWithAuth.get<{ data: Category[] }>(
				'/category/list'
			)
			return data.data
		},
	})
}
