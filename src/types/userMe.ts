import type { AxiosError } from 'axios'

export interface UsersMeSuccessType {
	name: string
	is_superadmin: boolean
	username: string
	region_id: number
	region: string
	category: string
}
export type UsersMeErrorType = AxiosError<{
	message: { [key: string]: string }
}>
