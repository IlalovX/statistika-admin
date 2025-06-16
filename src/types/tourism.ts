export interface CreateTourismExternalForm {
	year: number
	month: number
	country_code: string
	inbound_tourists: number
	outbound_tourists: number
	tourism_profit: string
	avg_trip_duration: number
}

export interface EditTourismExternalForm extends CreateTourismExternalForm {
	id: string | number
}
export interface CreateTourismInternalForm {
	year: number
	month: number
	domestic_tourists: number
	tourism_profit: string
}
export interface EditTourismInternalForm extends CreateTourismInternalForm {
	id: string | number
}
export interface GetTourismExternal {
	year: number
	month: number
	country_code: {
		official: string
		common: string
	} | null
	inbound_tourists: number
	outbound_tourists: number
	tourism_profit: string
	avg_trip_duration: number
}

export interface GetTourismInternal {
	id: number
	year: number
	month: number
	domestic_tourists: number | null
	tourism_profit: number | null
}
