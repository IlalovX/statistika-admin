import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UsersMeSuccessType } from '../../types/userMe'

type UserState = {
	user: UsersMeSuccessType | null
}

const initialState: UserState = {
	user: JSON.parse(localStorage.getItem('stat_user') as string),
}

export const userMeSlice = createSlice({
	name: 'userMe',
	initialState,
	reducers: {
		updateUserMe: (state, action: PayloadAction<UsersMeSuccessType>) => {
			state.user = { ...action.payload }
			localStorage.setItem('stat_user', JSON.stringify(action.payload))
		},
		logout: state => {
			state.user = null
			localStorage.removeItem('stat_user')
		},
	},
})

export const { updateUserMe, logout } = userMeSlice.actions

export default userMeSlice.reducer
