import { Delete, Edit } from '@mui/icons-material'
import {
	Button,
	IconButton,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
	useDeleteTourismGroupData,
	useGetTourismGroupData,
	useGetTourismSubGroupList,
} from '../../../../hooks/useTourismGroups'
import type {
	GetTourismGroupData,
	GetTourismSubGroupList,
} from '../../../../types/tourism-groups'
import { getMonthLabel } from '../../../../utils/getMontsLabel'
import { TourismGroupDataAddModal } from './TourismGroupDataAddModal'
import { TourismGroupDataEditModal } from './TourismGroupDataEditModal'
interface Props {
	groupId: number
	subgroup: GetTourismSubGroupList[]
}

export default function TourismGroupDataTable({ groupId, subgroup }: Props) {
	const { data: allData = [], refetch } = useGetTourismGroupData()
	const { data: subgroups = [] } = useGetTourismSubGroupList(groupId)
	const [editing, setEditing] = useState<GetTourismGroupData | null>(null)
	const [openAdd, setOpenAdd] = useState(false)

	// Безопасная инициализация
	const initialSubgroupName =
		subgroup.length > 0 ? subgroup[0].name : subgroups[0]?.name || ''
	const [selectedSubgroup, setSelectedSubgroup] =
		useState<string>(initialSubgroupName)

	const deleteMutation = useDeleteTourismGroupData()

	const handleDelete = async (id: number) => {
		try {
			await deleteMutation.mutateAsync(id)
			toast.success('Успешно удалено ✅')
			refetch()
		} catch {
			toast.error('Ошибка при удалении ❌')
		}
	}

	const filtered = allData.filter(
		(row: GetTourismGroupData) => row.subgroup === selectedSubgroup
	)

	const selectedSubgroupObject =
		subgroups.find(sg => sg.name === selectedSubgroup) ?? null

	useEffect(() => {
		if (!selectedSubgroup && subgroups.length > 0) {
			setSelectedSubgroup(subgroups[0].name)
		}
	}, [subgroups, selectedSubgroup])

	return (
		<>
			<div className='flex justify-between items-center mb-4'>
				<div className='flex gap-4 items-center'>
					<h2 className='text-lg font-semibold'>Подгруппа:</h2>
					<Select
						value={selectedSubgroup}
						onChange={e => setSelectedSubgroup(e.target.value)}
						sx={{ minWidth: 200 }}
					>
						{subgroups?.map(sg => (
							<MenuItem key={sg.id} value={sg.name}>
								{sg.name}
							</MenuItem>
						))}
					</Select>
				</div>
				<Button
					onClick={() => setOpenAdd(true)}
					variant='contained'
					disabled={!selectedSubgroupObject}
				>
					Добавить запись
				</Button>
			</div>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Год</TableCell>
							<TableCell>Месяц</TableCell>
							<TableCell>Страна</TableCell>
							<TableCell>Туристы</TableCell>
							<TableCell align='right'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filtered.map((row: GetTourismGroupData) => (
							<TableRow key={row.id}>
								<TableCell>{row.id}</TableCell>
								<TableCell>{row.year}</TableCell>
								<TableCell>{getMonthLabel(row.month)}</TableCell>
								<TableCell>{row.country_code?.data.official}</TableCell>
								<TableCell>{row.tourist_count}</TableCell>
								<TableCell align='right'>
									<Tooltip title='Редактировать'>
										<IconButton color='primary' onClick={() => setEditing(row)}>
											<Edit />
										</IconButton>
									</Tooltip>
									<IconButton
										color='error'
										size='small'
										onClick={() => handleDelete(row.id)}
									>
										<Delete />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{editing && (
				<TourismGroupDataEditModal
					data={editing}
					open={true}
					onClose={() => {
						setEditing(null)
						refetch()
					}}
				/>
			)}

			{selectedSubgroupObject && (
				<TourismGroupDataAddModal
					open={openAdd}
					onClose={() => {
						setOpenAdd(false)
						refetch()
					}}
					groupId={groupId}
					subgroup={selectedSubgroupObject}
				/>
			)}
		</>
	)
}
