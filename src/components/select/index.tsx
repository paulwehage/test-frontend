import React from "react";
import { MenuItem, Select as SelectMaterial, SelectChangeEvent, CircularProgress, Box } from "@mui/material";

type Option = {
    label: string
    value: string | number
}

type Props = {
    options: Option[]
    label: string
    handleChange: (event: SelectChangeEvent<string>) => void
    value: string
    loading: boolean
}

const Loading = () => (
    <Box width="100%" display="flex">
        <CircularProgress style={{ margin: "0 auto" }} />
    </Box>   
)

const Select: React.FC<Props> = ({ options, label, handleChange, value, loading }) => {
    return (
        <SelectMaterial value={value} onChange={handleChange} label={label}> 
        {loading ? <Loading /> : options.map(({ label, value }) => (
                <MenuItem value={value} key={value}>{label}</MenuItem>
            ))}
        </SelectMaterial>
    )
}

export default Select;