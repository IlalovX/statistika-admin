import UsersAddModal from './UsersAddModal'
import UsersTable from './UsersTable'

function Users() {
	return (
		<div className='space-y-5'>
			<div className='flex justify-end items-center'>
				<UsersAddModal />
			</div>
			<UsersTable />
		</div>
	)
}

export default Users
