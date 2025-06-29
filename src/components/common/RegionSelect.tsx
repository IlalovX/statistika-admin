import { Autocomplete, TextField } from '@mui/material'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useGetRegionsList } from '../../hooks/useRegions'

interface RegionSelectProps<T extends FieldValues> {
	control: Control<T>
	name: FieldPath<T>
	error?: string
	disabled?: boolean
}
export const RegionSelect = <T extends FieldValues>({
	control,
	name,
	error,
	disabled,
}: RegionSelectProps<T>) => {
	const { data: regions = [] } = useGetRegionsList()

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => {
				const selectedRegion = regions.find(r => r.id === field.value) || null

				return (
					<Autocomplete
						options={regions}
						getOptionLabel={option => option.region_name}
						isOptionEqualToValue={(option, value) => option.id === value.id}
						value={selectedRegion}
						onChange={(_, value) => {
							field.onChange(value ? value.id : 0)
						}}
						renderInput={params => (
							<TextField
								{...params}
								label='Регион'
								error={!!error}
								helperText={error}
								disabled={disabled}
							/>
						)}
						ListboxProps={{
							sx: {
								maxHeight: 200,
							},
						}}
					/>
				)
			}}
		/>
	)
}
