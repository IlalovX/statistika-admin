export const QUERY_KEYS = {
	USERS: {
		LIST: 'users_list',
		CREATE: 'create_user',
		EDIT: 'edit_user',
		CREATE_CLIENT: 'create_client',
	},

	CLIENTS: {
		LIST: 'get_clients_list',
		CREATE: 'create_new_client',
		EDIT: 'edit_client',
		DELETE: 'delete_client',
	},

	AGRICULTURE: {
		YIELD_LIST: 'get_yield_list',
		YIELD_EDIT: 'edit_yield_list',
		YIELD_DELETE: 'delete_yield_list',

		PLACEMENT_LIST: 'get_placement_list',
		PLACEMENT_CREATE: 'create_placement_list',
		PLACEMENT_EDIT: 'edit_placement_list',
		PLACEMENT_DELETE: 'delete_placement_list',

		DISTRICT_LIST: 'get_district_list',
		DISTRICT_CREATE: 'create_district',
		DISTRICT_EDIT: 'edit_district',
		DISTRICT_DELETE: 'delete_district',

		FIRMS_LIST: 'get_firms_list',
		FIRMS_CREATE: 'create_firms',
		FIRMS_EDIT: 'edit_firms',
		FIRMS_DELETE: 'delete_firms',
	},

	INVESTMENT: {
		INDUSTRY_LIST: 'investment_industry_list',
		INDUSTRY_CREATE: 'create_industry',
		INDUSTRY_EDIT: 'edit_industry',
		INDUSTRY_DELETE: 'delete_industry',

		OUTPUT_LIST: 'output_list',
		OUTPUT_CREATE: 'create_output',
		OUTPUT_EDIT: 'edit_output',
		OUTPUT_DELETE: 'delete_output',

		INVESTMENT_LIST: 'investment_list',
		INVESTMENT_CREATE: 'create_investment',
		INVESTMENT_EDIT: 'edit_investment',
		INVESTMENT_DELETE: 'delete_investment',

		PRODUCTION_DISTRICT_LIST: 'production_district_list',
		PRODUCTION_DISTRICT_CREATE: 'create_production_district',
		PRODUCTION_DISTRICT_EDIT: 'edit_production_district',
		PRODUCTION_DISTRICT_DELETE: 'delete_production_district',
	},

	PROJECTS: {
		LIST: 'projects_list',
		CREATE: 'create_project',
		EDIT: 'edit_project',
		DELETE: 'delete_project',
		DETAIL: 'project_detail',
		OVERALL_STATUS: 'project_overall_status',
	},

	PROJECT_STATUSES: {
		LIST: 'projects_status_list',
		CREATE: 'create_project_status',
		DELETE: 'delete_project_status',
	},

	TOURISM: {
		EXTERNAL: {
			LIST: 'tourism_external_list',
			CREATE: 'create_external',
			EDIT: 'edit_external',
		},
		INTERNAL: {
			LIST: 'tourism_internal_list',
			CREATE: 'create_internal',
			EDIT: 'edit_internal',
		},
		DELETE: 'delete_both_tourism',
	},

	TOURISM_GROUPS: {
		GROUP: {
			LIST: 'tourism_group_list',
			CREATE: 'create_tourism_group',
			EDIT: 'edit_tourism_group',
			DELETE: 'delete_tourism_group', // 👈 добавь
		},
		SUBGROUP: {
			LIST: 'tourism_subgroup_list',
			CREATE: 'create_tourism_subgroup',
			EDIT: 'edit_tourism_subgroup',
			DELETE: 'delete_tourism_subgroup', // 👈 добавь
		},
		GROUP_DATA: {
			LIST: 'tourism_group_data_list',
			CREATE: 'create_tourism_group_data',
			EDIT: 'edit_tourism_group_data',
			DELETE: 'delete_tourism_group_data', // 👈 добавь
		},
	},
}
