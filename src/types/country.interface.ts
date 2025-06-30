export interface Country {
	alpha2Code: string
	alpha3Code: string
	altSpellings: string[]
	area: number
	borders: string[]
	callingCodes: string[]
	capital: string
	currencies: {
		code: string
		name: string
		symbol: string
	}[]
	demonym: string
	flag: string
	gini: number
	languages: {
		iso639_1: string
		iso639_2: string
		name: string
		nativeName: string
	}[]
	latlng: [number, number]
	name: string
	nativeName: string
	numericCode: string
	population: number
	region: string
	regionalBlocs: {
		acronym: string
		name: string
	}[]
	subregion: string
	timezones: string[]
	topLevelDomain: string[]
	translations: Record<string, string>
	cioc: string
}
