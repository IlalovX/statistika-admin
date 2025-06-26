import { Autocomplete, TextField } from '@mui/material'
import type {
	Control,
	ControllerRenderProps,
	FieldPath,
	FieldValues,
} from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useGetRegionsList } from '../../hooks/useRegions'

interface RegionSelectProps<T extends FieldValues> {
	control: Control<T>
	name: FieldPath<T>
	error?: string
}

export const RegionSelect = <T extends FieldValues>({
	control,
	name,
	error,
}: RegionSelectProps<T>) => {
	const { data: regions = [] } = useGetRegionsList()

	return (
		<Controller
			name={name}
			control={control}
			render={({
				field,
			}: {
				field: ControllerRenderProps<T, FieldPath<T>>
			}) => {
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
							/>
						)}
						ListboxProps={{
							sx: {
								maxHeight: 200, // Примерно 4 элемента
							},
						}}
					/>
				)
			}}
		/>
	)
}
