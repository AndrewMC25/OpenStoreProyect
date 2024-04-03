import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup"
import OnSubmitBrandForm from "../hooks/Handler/HandleSubmitBrand";
import { useSnackbar } from "notistack";

const NewBrand = ({ handleClose, setUpdateDOM }) => {
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const formSchema = Yup.object().shape({
        name: Yup.string()
            .required('Este campo es obligatorio')
            .min(3, 'Minimo 3 caracteres')
            .max(25, 'Maximo 25 caracteres')
    })

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        onSubmit: async (values) => {
            setLoading(true)
            try {
                await OnSubmitBrandForm(values.name)
                enqueueSnackbar('successfully edit!', { variant: 'success' })
            } catch (error) {
                enqueueSnackbar(error, { variant: 'error' })
            }
            setLoading(false)
            handleClose()
            setUpdateDOM(1)
        },
        validationSchema: formSchema
    })

    return (
        <Stack
            sx={{
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
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    type="submit"
                    sx={{
                        width: '80%'
                    }}
                >
                    Create
                </LoadingButton>
            </form>
        </Stack>
    )
}

export default NewBrand