import Cookies from 'js-cookie'

enum EnumTokens {
	ACCESS_TOKEN = 'access_token',
	REFRESH_TOKEN = 'refresh_token',
}

export function getAccessToken() {
	const access_token = Cookies.get(EnumTokens.ACCESS_TOKEN)
	return access_token
}
export function getRefreshToken() {
	const refresh_token = Cookies.get(EnumTokens.REFRESH_TOKEN)
	return refresh_token
}

export function saveTokens(access_token: string, refresh_token?: string) {
	Cookies.set(EnumTokens.ACCESS_TOKEN, access_token, {
		sameSite: 'strict',
		expires: 1 / 24,
	})
	if (refresh_token) {
		Cookies.set(EnumTokens.REFRESH_TOKEN, refresh_token as string, {
			sameSite: 'strict',
			expires: 1 * 7,
		})
	}
}

export function removeTokens() {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
	Cookies.remove(EnumTokens.REFRESH_TOKEN)
}
