import type { CountryCode } from './tourism-groups'

export interface CreateYieldForm {
	year: number
	month: number
	country_code: string
	product: string
	type: string // например: 'export' или 'import'
	value: string
	unit: string
}
export interface GetYieldForm {
	id: number
	country: CountryCode
	year: number
	month: number
	product: string
	type: string // например: "export" или "local"
	unit: string // например: "ton", "kg"
	value: number
}

export interface CreatePlacementForm {
	year: number
	product: string
	area: number
	planted: number
	harvested: number
	forecast: number
	percent: number
}

export interface GetPlacementForm {
	id: number
	year: number
	product: string
	area: number
	planted: number
	harvested: number
	forecast: number
	percent: number
}

export interface CreateDistrictForm {
	year: number
	month: number
	region_id: number
	product: string
	weight: number
	area: number
	export: number
	local_market: number
	water_limit: number
}

export interface GetDistrictForm {
	year: number
	id: number
	region_id: number
	product: string
	area: number
	weight: number
	export: number
	local_market: number
	water_limit: number
}

export interface CreateFirms {
	id?: string | number
	year: number
	firm_count: number
}
