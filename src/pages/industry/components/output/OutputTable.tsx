import { Delete, Edit } from '@mui/icons-material'
import {
	Button,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material'
import { useState } from 'react'
import { useDeleteOutput, useGetOutput } from '../../../../hooks/useInvestment'
import type { GetOutputList } from '../../../../types/investment'
import OutputAddModal from './OutputAddModal'
import OutputEditModal from './OutputEditModal'

export default function OutputTable() {
	const { data: outputs = [], isLoading } = useGetOutput()
	const { mutate: deleteOutput } = useDeleteOutput()

	const [addOpen, setAddOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [selected, setSelected] = useState<GetOutputList | null>(null)

	if (isLoading) return <p>Загрузка...</p>

	return (
		<div>
			<Button variant='contained' onClick={() => setAddOpen(true)}>
				Добавить
			</Button>

			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Год</TableCell>
						<TableCell>Тип отрасли</TableCell>
						<TableCell>Объем</TableCell>
						<TableCell align='right'>Действия</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{outputs?.map(row => (
						<TableRow key={row.id}>
							<TableCell>{row.year}</TableCell>
							<TableCell>{row.industry_type}</TableCell>
							<TableCell>{row.ind_amount}</TableCell>
							<TableCell align='right'>
								<IconButton
									onClick={() => {
										setSelected(row)
										setEditOpen(true)
									}}
								>
									<Edit />
								</IconButton>
								<IconButton onClick={() => deleteOutput(+row.id)}>
									<Delete color='error' />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<OutputAddModal open={addOpen} onClose={() => setAddOpen(false)} />
			<OutputEditModal
				open={editOpen}
				onClose={() => setEditOpen(false)}
				data={selected}
			/>
		</div>
	)
}
