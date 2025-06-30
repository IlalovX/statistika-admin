import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MonthSelect } from '../../../../components/common/MonthSelect'
import { useCreateTourismGroupData } from '../../../../hooks/useTourismGroups'
import type { GetTourismSubGroupList } from '../../../../types/tourism-groups'
import { CountrySelect } from '../../../../components/common/CountrySelect'

interface Props {
	groupId: number
	subgroup: GetTourismSubGroupList
	open: boolean
	onClose: () => void
}

const schema = z.object({
	year: z.number().min(1900),
	month: z.number().min(1).max(12),
	country_code: z.string().length(3, '3-буквенный ISO код'),
	tourist_count: z.number().min(0),
})

type FormData = z.infer<typeof schema>

export function TourismGroupDataAddModal({
	groupId,
	subgroup,
	open,
	onClose,
}: Props) {
	const { mutateAsync, isPending } = useCreateTourismGroupData()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		control,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			year: 0,
			month: 0,
			country_code: 'UZB',
			tourist_count: 0,
		},
	})

	const onSubmit = (data: FormData) => {
		mutateAsync(
			{
				...data,
				group_id: groupId,
				subgroup_id: subgroup.id,
			},
			{
				onSuccess: () => {
					reset()
					onClose()
				},
			}
		)
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Добавить данные</DialogTitle>

			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogContent className='!space-y-4 pt-4'>
					<TextField
						label='Год'
						fullWidth
						type='number'
						error={!!errors.year}
						helperText={errors.year?.message}
						{...register('year', { valueAsNumber: true })}
					/>
					<MonthSelect
						control={control}
						name='month'
						error={errors.month?.message}
					/>
					<CountrySelect
						control={control}
						name='country_code'
						error={errors.country_code?.message}
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
					<Button type='submit' disabled={isPending} variant='contained'>
						Сохранить
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}
