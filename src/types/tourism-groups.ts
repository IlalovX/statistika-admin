export interface CreateTourismSubGroupForm {
	group_id: string | number
	group_name: string
}
export interface EditTourismSubGroupForm {
	subgroup_id: string | number
	group_name: string
}

export interface GetTourismSubGroupList {
	id: number
	name: string
	created_at: string
}

export interface CountryCode {
	official: string
	common: string
}

export interface GetTourismGroupData {
	id: number
	year: number
	month: number
	country_code: CountryCode
	group: string
	subgroup: string
	tourist_count: number
	created_at: string
}

export interface CreateTourismGroupForm {
	group_name: string
}
export interface GetTourismGroupList {
	id: number
	name: string
}

export interface CreateTourismGroupData {
	group_id: number
	subgroup_id: number
	year: number
	month: number // 1–12
	country_code: string // ISO alpha-3 код, например "UZB"
	tourist_count: number
}
export interface GetTourismGroupData {
	id: number
	group_id: number
	subgroup_id: number
	year: number
	month: number // 1–12
	country_code: CountryCode // ISO alpha-3 код, например "UZB"
	tourist_count: number
}
