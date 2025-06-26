import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEditTourismGroupData } from '../../../../hooks/useTourismGroups'
import type { GetTourismGroupData } from '../../../../types/tourism-groups'

interface Props {
	data: GetTourismGroupData
	onClose: () => void
	open: boolean
}

const schema = z.object({
	year: z.number().min(1900).max(new Date().getFullYear()),
	month: z.number().min(1).max(12),
	country_code: z.string().length(3, '3-буквенный ISO код'),
	tourist_count: z.number().min(0),
})

type FormData = z.infer<typeof schema>

export function TourismGroupDataEditModal({ data, open, onClose }: Props) {
	const { mutateAsync, isPending } = useEditTourismGroupData()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			year: data.year,
			month: data.month,
			country_code: data.country_code.official,
			tourist_count: data.tourist_count,
		},
	})

	useEffect(() => {
		if (open) {
			reset({
				year: data.year,
				month: data.month,
				country_code: data.country_code.official,
				tourist_count: data.tourist_count,
			})
		}
	}, [data, open, reset])

	const onSubmit = (form: FormData) => {
		mutateAsync(
			{
				...form,
				id: data.id,
				group_id: data.group_id,
				subgroup_id: data.subgroup_id,
			},
			{
				onSuccess: () => {
					onClose()
				},
			}
		)
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Редактировать данные</DialogTitle>
			<DialogContent className='!space-y-4 pt-4'>
				<TextField
					label='Год'
					fullWidth
					type='number'
					error={!!errors.year}
					helperText={errors.year?.message}
					{...register('year', { valueAsNumber: true })}
				/>
				<TextField
					label='Месяц'
					fullWidth
					type='number'
					error={!!errors.month}
					helperText={errors.month?.message}
					{...register('month', { valueAsNumber: true })}
				/>
				<TextField
					label='Код страны (ISO alpha-3)'
					fullWidth
					error={!!errors.country_code}
					helperText={errors.country_code?.message}
					{...register('country_code')}
				/>
				<TextField
					label='Количество туристов'
					fullWidth
					type='number'
					error={!!errors.tourist_count}
					helperText={errors.tourist_count?.message}
					{...register('tourist_count', { valueAsNumber: true })}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Отмена</Button>
				<Button
					onClick={handleSubmit(onSubmit)}
					disabled={isPending}
					variant='contained'
				>
					Сохранить
				</Button>
			</DialogActions>
		</Dialog>
	)
}
