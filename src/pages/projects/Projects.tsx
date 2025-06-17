import { Button } from '@mui/material'
import { useNavigate } from 'react-router'
import { useGetProjectsStatusesList } from '../../hooks/useProjectsStatuses'
import { useGetRegionsList } from '../../hooks/useRegions'
import DownloadProjectsExcelButton from './DownloadProjectExcelButton'
import ProjectsAddModal from './ProjectsAddModal'
import { ProjectTable } from './ProjectsTable'

function Projects() {
	const navigate = useNavigate()
	const { data: regions = [] } = useGetRegionsList()
	const { data: statuses = [] } = useGetProjectsStatusesList()
	return (
		<div className='space-y-5'>
			<header className='flex justify-between items-center  gap-5'>
				<Button
					variant='contained'
					onClick={() => navigate('/projects/statuses')}
				>
					Статусы
				</Button>
				<div className='flex gap-5'>
					<DownloadProjectsExcelButton />
					<ProjectsAddModal regions={regions} statuses={statuses} />
				</div>
			</header>
			<ProjectTable regions={regions} statuses={statuses} />
		</div>
	)
}

export default Projects
