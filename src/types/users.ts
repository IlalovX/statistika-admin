export interface UsersSuccessType {
	id: string
	name: string
	username: string
	region: string
	category: string
}
export interface AdminCreateForm {
	name: string
	username: string
	password: string
	region_id: number
	category_id: string
}


