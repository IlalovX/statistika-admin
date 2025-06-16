export interface CreateYieldForm {
	year: number
	month: number
	country_code: string
	product: string
	type: string // например: 'export' или 'import'
	value: number
	unit: string
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

export interface CreateDistrictForm {
	year: number
  region_id: number
  product: string
  weight: number
  area: number
  export: number
  local_market: number
  water_limit: number
}
