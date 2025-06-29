import { useQuery } from '@tanstack/react-query'
import { userMeService } from '../services/user-me.service'

export function useGetUserMe() {
	return useQuery({
		queryKey: ['user'],
		queryFn: async () => {
			return await userMeService.getMe()
		},

		staleTime: 1000 * 60 * 5, // 5 минут
	})
}
