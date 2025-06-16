import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import LoadingFallback from './components/common/LoadingFallback'
import { ProtectedRoute } from './components/common/ProtectRoute'
function App() {
	const Auth = lazy(() => import('./pages/auth/Auth'))
	const NotFound = lazy(() => import('./pages/not-found/NotFound'))
	const Layout = lazy(() => import('./components/layout/Layout'))

	const Users = lazy(() => import('./pages/users/Users'))
	const Profile = lazy(() => import('./pages/profile/Profile'))
	const Projects = lazy(() => import('./pages/projects/Projects'))
	const ProjectsStatuses = lazy(
		() => import('./pages/projects-statuses/ProjectsStatuses')
	)
	const Industry = lazy(() => import('./pages/industry/Industry'))
	const Agriculture = lazy(() => import('./pages/agriculture/Agriculture'))
	const Tourism = lazy(() => import('./pages/tourism/Tourism'))
	const TourismGroups = lazy(
		() => import('./pages/tourism-groups/ToursimGroups')
	)
	const HomeRedirect = lazy(() => import('./pages/home/HomeRedirect'))
	return (
		<Routes>
			<Route
				path='/'
				element={
					<Suspense fallback={<LoadingFallback />}>
						<ProtectedRoute>
							<HomeRedirect />
						</ProtectedRoute>
					</Suspense>
				}
			/>

			<Route
				path='/auth'
				element={
					<Suspense fallback={<LoadingFallback />}>
						<Auth />
					</Suspense>
				}
			/>
			<Route
				element={
					<Suspense>
						<Layout />
					</Suspense>
				}
			>
				<Route
					path='/projects'
					element={
						<Suspense fallback={<LoadingFallback />}>
							<ProtectedRoute>
								<Projects />
							</ProtectedRoute>
						</Suspense>
					}
				/>
				<Route
					path='/projects/statuses'
					element={
						<Suspense fallback={<LoadingFallback />}>
							<ProtectedRoute>
								<ProjectsStatuses />
							</ProtectedRoute>
						</Suspense>
					}
				/>
				<Route
					path='/industry'
					element={
						<Suspense fallback={<LoadingFallback />}>
							<ProtectedRoute>
								<Industry />
							</ProtectedRoute>
						</Suspense>
					}
				/>
				<Route
					path='/agriculture'
					element={
						<Suspense fallback={<LoadingFallback />}>
							<ProtectedRoute>
								<Agriculture />
							</ProtectedRoute>
						</Suspense>
					}
				/>
				<Route
					path='/tourism'
					element={
						<Suspense fallback={<LoadingFallback />}>
							<ProtectedRoute>
								<Tourism />
							</ProtectedRoute>
						</Suspense>
					}
				/>
				<Route
					path='/tourism/groups'
					element={
						<Suspense fallback={<LoadingFallback />}>
							<ProtectedRoute>
								<TourismGroups />
							</ProtectedRoute>
						</Suspense>
					}
				/>
				<Route
					path='/users'
					element={
						<Suspense fallback={<LoadingFallback />}>
							<ProtectedRoute>
								<Users />
							</ProtectedRoute>
						</Suspense>
					}
				/>
				<Route
					path='/profile'
					element={
						<Suspense fallback={<LoadingFallback />}>
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						</Suspense>
					}
				/>
			</Route>
			<Route
				path='*'
				element={
					<Suspense fallback={<LoadingFallback />}>
						<NotFound />
					</Suspense>
				}
			/>
		</Routes>
	)
}

export default App
