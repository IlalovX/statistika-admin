import { Autocomplete, TextField } from '@mui/material'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { MONTHS } from '../../constants/months'

interface MonthSelectProps<T extends FieldValues> {
	control: Control<T>
	name: FieldPath<T>
	error?: string
	defaultValue?: number
}

export const MonthSelect = <T extends FieldValues>({
	control,
	name,
	error,
	defaultValue = new Date().getMonth() + 1,
}: MonthSelectProps<T>) => {
	return (
		<Controller
			control={control}
			name={name}
			defaultValue={defaultValue as T[typeof name]}
			render={({ field }) => (
				<Autocomplete
					options={MONTHS}
					getOptionLabel={option => option.label}
					isOptionEqualToValue={(option, value) => option.value === value.value}
					value={MONTHS.find(m => m.value === field.value) || null}
					onChange={(_, newValue) => field.onChange(newValue?.value ?? '')}
					renderInput={params => (
						<TextField
							{...params}
							label='Месяц'
							fullWidth
							error={!!error}
							helperText={error}
						/>
					)}
					sx={{
						'.MuiAutocomplete-paper': {
							maxHeight: 200,
						},
					}}
				/>
			)}
		/>
	)
}
