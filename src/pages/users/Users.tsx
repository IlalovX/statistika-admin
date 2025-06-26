import { Typography } from '@mui/material'
import UsersAddModal from './components/admins/UsersAddModal'
import UsersTable from './components/admins/UsersTable'
import ClientsAddModal from './components/clients/ClientsAddModal'
import ClientsTable from './components/clients/ClientsTable'

function Users() {
	return (
		<div className='space-y-10'>
			<section className='space-y-5'>
				<div className='flex justify-between items-center'>
					<Typography variant='h4'>Админы</Typography>
					<UsersAddModal />
				</div>
				<UsersTable />
			</section>
			<section className='space-y-5'>
				<div className='flex justify-between items-center'>
					<Typography variant='h4'>Клиенты</Typography>
					<ClientsAddModal />
				</div>
				<ClientsTable />
			</section>
		</div>
	)
}

export default Users
