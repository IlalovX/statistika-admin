import { type JSX } from 'react'
import { Navigate } from 'react-router'
import { logout } from '../../features/slices/UserMeSlice'
import { useGetUserMe } from '../../hooks/useUserMe'
import {
	getAccessToken,
	getRefreshToken,
	removeTokens,
} from '../../services/auth-token.service'
import { useAppDispatch } from '../../utils/helpers'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const { data: user } = useGetUserMe()
	const accessToken = getAccessToken()
	const refreshToken = getRefreshToken()
	const dispatch = useAppDispatch()

	if (!accessToken || !refreshToken) {
		removeTokens()
		dispatch(logout())
		return <Navigate to='/auth' replace />
	}

	if (location.pathname === '/') {
		if (user.is_superadmin) {
			return <Navigate to='/users' replace />
		} else {
			return <Navigate to={`/${user.category}`} replace />
		}
	}

	return children
}
