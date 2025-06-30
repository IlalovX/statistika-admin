import { Autocomplete, TextField } from '@mui/material'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useGetCountry } from '../../hooks/useCountry'

interface CountrySelectProps<T extends FieldValues> {
	control: Control<T>
	name: FieldPath<T>
	error?: string
	disabled?: boolean
}

export const CountrySelect = <T extends FieldValues>({
	control,
	name,
	error,
	disabled,
}: CountrySelectProps<T>) => {
	const { data: countries = [], isLoading } = useGetCountry()

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => {
				const selectedCountry =
					countries.find((c) => c.alpha3Code === field.value) || null

				return (
					<Autocomplete
						options={countries}
						getOptionLabel={(option) => option.name}
						isOptionEqualToValue={(option, value) =>
							option.alpha3Code === value.alpha3Code
						}
						value={selectedCountry}
						onChange={(_, value) => {
							field.onChange(value ? value.alpha3Code : '')
						}}
						loading={isLoading}
						renderInput={(params) => (
							<TextField
								{...params}
								label='Страна'
								error={!!error}
								helperText={error}
								disabled={disabled}
							/>
						)}
						ListboxProps={{
							sx: {
								maxHeight: 250,
							},
						}}
					/>
				)
			}}
		/>
	)
}
