export interface CreateProjectForm {
	region_id: number
	project_initiator: string
	project_name: string
	project_budget: string
	jobs_created: string
	planned_date: string
	responsible_party?: string
	project_status_id: number
	status_reason?: string
	overall_status?: string
}
export interface EditProjectForm {
	region_id: number
	project_initiator: string
	project_name: string
	project_budget: string
	jobs_created: number
	planned_date: string
	responsible_party: string
	project_status_id: number
	status_reason: string
	overall_status: string
}

export interface GetProject {
	id: number
	project_name: string
	initiator: string
	budget: number
	jobs_created: string
	planned_date: string
	last_update: string
	responsible_party: string
	project_status: {
		value: string
		color: string
	}
	region: {
		id: number
		name: string
	}
	overall_status: string
}
