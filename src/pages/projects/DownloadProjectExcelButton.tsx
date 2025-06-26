import DownloadIcon from '@mui/icons-material/Download'
import { Button } from '@mui/material'
import { axiosWithAuth } from '../../api/interceptors'

const DownloadProjectsExcelButton = () => {
	const handleDownload = async () => {
		try {
			const response = await axiosWithAuth.get(
				'/projects/download', // путь к API
				{
					responseType: 'blob', // обязательно
				}
			)

			const blob = new Blob([response.data], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			})
			const url = window.URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', 'projects.xlsx')
			document.body.appendChild(link)
			link.click()
			link.remove()
		} catch (error) {
			console.error('Ошибка при скачивании файла:', error)
		}
	}

	return (
		<Button
			variant='contained'
			color='primary'
			startIcon={<DownloadIcon />}
			onClick={handleDownload}
		>
			Скачать
		</Button>
	)
}

export default DownloadProjectsExcelButton
