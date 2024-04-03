import { LoadingButton } from "@mui/lab"
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import OnSubmitEditUnitForm from "../hooks/Handler/HandleSubmitEditUnit"
import { useSnackbar } from "notistack"

const FormEditUnit = ({ rowUnit, handleClose }) => {
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()

    const formSchema = Yup.object().shape({
        name: Yup
            .string()
            .required('Este campo es obligatorio')
            .min(3, 'Minimo 3 caracteres')
            .max(25, 'Maximo 25 caracteres'),
        type: Yup
            .string()
            .required('Este campo es obligatorio'),
        abbreviation: Yup
            .string()
            .required('Este campo es obligatorio')
    })

    const length = 'length'
    const mass = 'mass'
    const volume = 'volume'

    const formik = useFormik({
        initialValues: {
            type: rowUnit.type,
            name: rowUnit.name,
            abbreviation: rowUnit.abbreviation
        },
        onSubmit: async (values) => {
            setLoading(true)
            try {
                await OnSubmitEditUnitForm(values.name, values.type, values.abbreviation, rowUnit)
                enqueueSnackbar('successfully edit!', { variant: 'success' })
            } catch (error) {
                enqueueSnackbar(error, { variant: 'error' })
            }
            setLoading(false)
            handleClose()
        },
        validationSchema: formSchema
    })

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '500px',
                border: '1px solid #d3d3d3',
                padding: 5,
                borderRadius: 5,
                margin: '0px 0px 32px 0px'
            }}
        >
            <form
                onSubmit={formik.handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <FormControl
                    sx={{
                        width: '80%'
                    }}>
                    <InputLabel id="typeLabel">Type</InputLabel>
                    <Select
                        labelId="typeLabel"
                        name='type'
                        label="Type"
                        sx={{
                            width: '100%'
                        }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.type}
                        error={formik.errors.type}
                        helperText={formik.errors.type}
                    >
                        <MenuItem value={length}>{length}</MenuItem>
                        <MenuItem value={mass}>{mass}</MenuItem>
                        <MenuItem value={volume}>{volume}</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <TextField
                    label="Name"
                    variant="outlined"
                    name="name"
                    sx={{
                        width: '80%'
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    error={formik.errors.name}
                    helperText={formik.errors.name}
                />
                <br />
                <TextField
                    label="Abbreviation"
                    variant="outlined"
                    name="abbreviation"
                    sx={{
                        width: '80%'
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.abbreviation}
                    error={formik.errors.abbreviation}
                    helperText={formik.errors.abbreviation}
                />
                <br />
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    type="submit"
                    sx={{
                        width: '80%'
                    }}
                >
                    Edit
                </LoadingButton>
            </form>
        </Box>
    );
}

export default FormEditUnit