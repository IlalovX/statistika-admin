import { useQuery } from '@tanstack/react-query'
import { CountryService } from '../services/country.service'
import type { Country } from '../types/country.interface'

export function useGetCountry() {
	return useQuery<Country[]>({
		queryKey: ['get_country_list'],
		queryFn: () => CountryService.getCounrtyList(),
	})
}
