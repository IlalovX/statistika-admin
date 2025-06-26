import { useQuery } from '@tanstack/react-query'
import { RegionsService } from '../services/regions.service'
import type { Region } from '../types/regios'

export function useGetRegionsList() {
	return useQuery<Region[]>({
		queryKey: ['regions_list'],
		queryFn: async () => {
			return await RegionsService.getRegionsList()
		},
	})
}
