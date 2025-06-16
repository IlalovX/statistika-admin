import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { InvestmentService } from '../services/investment.service'
import type {
	CreateInvestmentIndustryForm,
	CreateInvestmentOutputForm,
	GetIndustryList,
	GetOutputList,
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
