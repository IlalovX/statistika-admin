import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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

export function useGetIndustryList() {
	return useQuery<GetIndustryList[]>({
		queryKey: ['investment industry list'],
		queryFn: async () => {
			const data = await InvestmentService.getIndustry()
			return data
		},
	})
}
export function useCreateIndustry() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['create industry'],
		mutationFn: async (data: CreateInvestmentIndustryForm) => {
			return await InvestmentService.createIndustry(data)
		},
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['investment industry list'] }),
	})
}
export function useEditIndustry() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['edit industry'],
		mutationFn: async (
			data: CreateInvestmentIndustryForm & { id: string | number }
		) => {
			const { id, ...formData } = data
			return await InvestmentService.editIndustry(formData, id)
		},
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['investment industry list'] }),
	})
}
export function useDeleteIndustry() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['delet industry'],
		mutationFn: async ({ id }: { id: string | number }) => {
			return await InvestmentService.deleteIndustry(id)
		},
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['investment industry list'] }),
	})
}

export function useGetOutput() {
	return useQuery<GetOutputList[]>({
		queryKey: ['output list'],
		queryFn: async () => {
			return await InvestmentService.getOutput()
		},
	})
}
export function useCreateOutput() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['create output'],
		mutationFn: async (data: CreateInvestmentOutputForm) => {
			return await InvestmentService.createOutput(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['output list'] })
		},
	})
}
export function useEditOutput() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['edit output'],
		mutationFn: async (
			data: CreateInvestmentOutputForm & { id: string | number }
		) => {
			const { id, ...formData } = data
			return await InvestmentService.editOutput(formData, id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['output list'] })
		},
	})
}
export function useDeleteOutput() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['create output'],
		mutationFn: async (id: string | number) => {
			return await InvestmentService.deleteOutput(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['output list'] })
		},
	})
}

export function useGetInvestment() {
	return useQuery<GetInvestmentsForm[]>({
		queryKey: ['investment list'],
		queryFn: async () => {
			return await InvestmentService.getInvestments()
		},
	})
}

export function useCreateInvestment() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['create investment'],
		mutationFn: async (data: CreateInvestmentsForm) => {
			return await InvestmentService.createInvestments(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['investment list'] })
		},
	})
}
export function useEditInvestment() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['edit investment'],
		mutationFn: async (
			data: CreateInvestmentsForm & { id: string | number }
		) => {
			const { id, ...formData } = data
			return await InvestmentService.editInvestments(formData, id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['investment list'] })
		},
	})
}
export function useDeleteInvestment() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['delete investment'],
		mutationFn: async ({ id }: { id: string | number }) => {
			return await InvestmentService.deleteInvestments(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['investment list'] })
		},
	})
}

export function useGetProductionDistrict() {
	return useQuery<GetProductionDistrictForm[]>({
		queryKey: ['get production district list'],
		queryFn: async () => {
			return await InvestmentService.getProductionDistrict()
		},
	})
}
export function useCreateProductionDistrict() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['create production district'],
		mutationFn: async (data: CreateProductionDistrictForm) => {
			return await InvestmentService.createProductionDistrict(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['get production district list'],
			})
		},
	})
}
export function useEditProductionDistrict() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['edit production district'],
		mutationFn: async (
			data: CreateProductionDistrictForm & { id: string | number }
		) => {
			const { id, ...formData } = data
			return await InvestmentService.editProductionDistrict(formData, id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['get production district list'],
			})
		},
	})
}
export function useDeletProductionDistrict() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['delete production district'],
		mutationFn: async ({ id }: { id: string | number }) => {
			return await InvestmentService.deleteProductionDistrict(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['get production district list'],
			})
		},
	})
}
