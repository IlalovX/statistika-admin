export interface CreateInvestmentIndustryForm {
	month: number
	year: number
	region_id: number
	product_weight: string
	product_profit: string
}
export interface CreateInvestmentOutputForm {
	year: number
	month: number
	industry_type: string
	ind_amount: string
}

export interface CreateInvestmentsForm {
	country_code: string
	year: number
	month: number
	region_id: number
	project_name: string
	project_count: number
	project_workplaces: number
	investment_amount: string
}

export interface CreateProductionDistrictForm {
	year: number
	month: number
	region_id: number
	product: string
	area: string
	weight: string
	percent: string
}

export interface GetIndustryList {
	id: number // если используется при редактировании
	year: number
	month: number
	region_id: number
	product_weight: string
	product_profit: string
}

export interface GetOutputList {
	id: number
	year: number
	month: number
	industry_type: string
	ind_amount: string
}
