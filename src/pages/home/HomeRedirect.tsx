import { Navigate } from 'react-router'
import { useAppSelector } from '../../utils/helpers'

export default function HomeRedirect() {
	const user = useAppSelector(state => state.user_me.user)

	if (!user) return <Navigate to='/auth' replace />
	if (user.is_superadmin) return <Navigate to='/users' replace />
	return <Navigate to={`/${user.category}`} replace />
}
