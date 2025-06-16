import { useQueries } from '@tanstack/react-query'
import { useGetTourismGroupList } from '../../hooks/useTourismGroups'
import { TourismGroupsService } from '../../services/tourism-groups.service'
import type { GetTourismSubGroupList } from '../../types/tourism-groups'
import TourismGroupDataTable from './components/group-data/TourismGroupDataTable'
import TourismGroupTable from './components/group/TourismGroupTable'
import TourismSubGroupTable from './components/sub-group/TourismSubGroupTable'

export default function TourismGroupsPage() {
	const { data: groups = [] } = useGetTourismGroupList()

	// массив запросов для подгрупп каждой группы
	const subgroupQueries = useQueries({
		queries: groups.map(group => ({
			queryKey: ['subgroups', group.id],
			queryFn: () => TourismGroupsService.getTourismSubGroupList(group.id),
			enabled: !!group.id,
		})),
	})

	return (
		<div className='space-y-10'>
			<section>
				<h2 className='text-xl font-semibold mb-4'>Группы</h2>
				<TourismGroupTable />
			</section>

			<section>
				<h2 className='text-xl font-semibold mb-4'>Подгруппы</h2>
				<TourismSubGroupTable />
			</section>

			<section>
				<h2 className='text-xl font-semibold mb-4'>Данные</h2>
				<div className='space-y-8'>
					{groups.map((group, index) => {
						const { data: subgroups = [] } = subgroupQueries[index] || {}

						return (
							<div key={group.id} className='space-y-4'>
								<h2 className='text-lg font-semibold'>Группа: {group.name}</h2>
								{subgroups.map((subgroup: GetTourismSubGroupList) => (
									<TourismGroupDataTable
										key={subgroup.id}
										groupId={group.id}
										subgroup={subgroup}
									/>
								))}
							</div>
						)
					})}
				</div>
			</section>
		</div>
	)
}
