import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { InvestmentService } from '../services/investment.service'
import type {
	CreateInvestmentIndustryForm,
	CreateInvestmentOutputForm,
	CreateInvestmentsForm,
	CreateProductionDistrictForm,
	GetIndustryList,
	GetInvestmentsForm,
	GetOutputList,
	GetProductionDistrictForm,
} from '../types/investment'

// INDUSTRY
export function useGetIndustryList() {
	return useQuery<GetIndustryList[]>({
		queryKey: [QUERY_KEYS.INVESTMENT.INDUSTRY_LIST],
		queryFn: () => InvestmentService.getIndustry(),
	})
}

export function useCreateIndustry() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.INVESTMENT.INDUSTRY_CREATE],
		mutationFn: (data: CreateInvestmentIndustryForm) =>
			InvestmentService.createIndustry(data),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.INVESTMENT.INDUSTRY_LIST],
			}),
	})
}

export function useEditIndustry() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.INVESTMENT.INDUSTRY_EDIT],
		mutationFn: (
			data: CreateInvestmentIndustryForm & { id: string | number }
		) => {
			const { id, ...formData } = data
			return InvestmentService.editIndustry(formData, id)
		},
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.INVESTMENT.INDUSTRY_LIST],
			}),
	})
}

export function useDeleteIndustry() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.INVESTMENT.INDUSTRY_DELETE],
		mutationFn: ({ id }: { id: string | number }) =>
			InvestmentService.deleteIndustry(id),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.INVESTMENT.INDUSTRY_LIST],
			}),
	})
}

// OUTPUT
export function useGetOutput() {
	return useQuery<GetOutputList[]>({
		queryKey: [QUERY_KEYS.INVESTMENT.OUTPUT_LIST],
		queryFn: () => InvestmentService.getOutput(),
	})
}

export function useCreateOutput() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.INVESTMENT.OUTPUT_CREATE],
		mutationFn: (data: CreateInvestmentOutputForm) =>
			InvestmentService.createOutput(data),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.INVESTMENT.OUTPUT_LIST],
			}),
	})
}

export function useEditOutput() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.INVESTMENT.OUTPUT_EDIT],
		mutationFn: (
			data: CreateInvestmentOutputForm & { id: string | number }
		) => {
			const { id, ...formData } = data
			return InvestmentService.editOutput(formData, id)
		},
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.INVESTMENT.OUTPUT_LIST],
			}),
	})
}

export function useDeleteOutput() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.INVESTMENT.OUTPUT_DELETE],
		mutationFn: (id: string | number) => InvestmentService.deleteOutput(id),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.INVESTMENT.OUTPUT_LIST],
			}),
	})
}

// INVESTMENT
export function useGetInvestment() {
	return useQuery<GetInvestmentsForm[]>({
		queryKey: [QUERY_KEYS.INVESTMENT.INVESTMENT_LIST],
		queryFn: () => InvestmentService.getInvestments(),
	})
}

export function useCreateInvestment() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.INVESTMENT.INVESTMENT_CREATE],
		mutationFn: (data: CreateInvestmentsForm) =>
			InvestmentService.createInvestments(data),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.INVESTMENT.INVESTMENT_LIST],
			}),
	})
}

export function useEditInvestment() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.INVESTMENT.INVESTMENT_EDIT],
		mutationFn: (data: CreateInvestmentsForm & { id: string | number }) => {
			const { id, ...formData } = data
			return InvestmentService.editInvestments(formData, id)
		},
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.INVESTMENT.INVESTMENT_LIST],
			}),
	})
}

export function useDeleteInvestment() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.INVESTMENT.INVESTMENT_DELETE],
		mutationFn: ({ id }: { id: string | number }) =>
			InvestmentService.deleteInvestments(id),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.INVESTMENT.INVESTMENT_LIST],
			}),
	})
}

// PRODUCTION DISTRICT
export function useGetProductionDistrict() {
	return useQuery<GetProductionDistrictForm[]>({
		queryKey: [QUERY_KEYS.INVESTMENT.PRODUCTION_DISTRICT_LIST],
		queryFn: () => InvestmentService.getProductionDistrict(),
	})
}

export function useCreateProductionDistrict() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.INVESTMENT.PRODUCTION_DISTRICT_CREATE],
		mutationFn: (data: CreateProductionDistrictForm) =>
			InvestmentService.createProductionDistrict(data),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.INVESTMENT.PRODUCTION_DISTRICT_LIST],
			}),
	})
}

export function useEditProductionDistrict() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.INVESTMENT.PRODUCTION_DISTRICT_EDIT],
		mutationFn: (
			data: CreateProductionDistrictForm & { id: string | number }
		) => {
			const { id, ...formData } = data
			return InvestmentService.editProductionDistrict(formData, id)
		},
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.INVESTMENT.PRODUCTION_DISTRICT_LIST],
			}),
	})
}

export function useDeleteProductionDistrict() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [QUERY_KEYS.INVESTMENT.PRODUCTION_DISTRICT_DELETE],
		mutationFn: ({ id }: { id: string | number }) =>
			InvestmentService.deleteProductionDistrict(id),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.INVESTMENT.PRODUCTION_DISTRICT_LIST],
			}),
	})
}
