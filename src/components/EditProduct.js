import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup"
import { useSnackbar } from "notistack";
import handleDataUpdate from "../service/frontend/dataUpdateServiceHandler";

const FormEditProduct = ({ brands, units, presentations, rowProduct, handleClose }) => {
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()

    const formSchema = Yup.object().shape({
        name: Yup
            .string()
            .required('Este campo es obligatorio')
            .min(3, 'Minimo 3 caracteres')
            .max(25, 'Maximo 25 caracteres'),
        description: Yup
            .string()
            .min(5, 'Minimo 5 caracteres')
            .required('Este campo es obligatorio'),
        price: Yup
            .number()
            .required('Este campo es obligatorio')
            .min(3, 'Minimo 3 caracteres'),
        picture: Yup
            .string()
            .required('Este campo es obligatorio'),
        amount: Yup
            .number()
            .required('Este campo es obligatorio'),
        brand_id: Yup
            .string()
            .required('Este campo es obligatorio'),
        presentation_id: Yup
            .string()
            .required('Este campo es obligatorio'),
        unit_id: Yup
            .string()
            .required('Este campo es obligatorio'),
        barcode: Yup
            .number()
            .required('Este campo es obligatorio')

    })

    const formik = useFormik({
        initialValues: {
            name: rowProduct.name,
            description: rowProduct.description,
            price: rowProduct.price,
            picture: rowProduct.picture,
            amount: rowProduct.amount,
            brand_id: rowProduct.brand_id,
            presentation_id: rowProduct.presentation_id,
            unit_id: rowProduct.unit_id,
            barcode: rowProduct.barcode
        },
        onSubmit: async (values) => {
            setLoading(true)
            const data = {
                elements: {
                  name: values.name,
                  description: values.description,
                  price: values.price,
                  picture: values.picture,
                  amount: values.amount,
                  brand_id: values.brand_id,
                  presentation_id: values.presentation_id,
                  unit_id: values.unit_id,
                  barcode: values.barcode
                },
                table: 'Product',
                row: rowProduct.id,
                id: 'id'
            }
            try {
                await handleDataUpdate(data)
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
                <TextField
                    label="Barcode"
                    variant="outlined"
                    type="number"
                    name="barcode"
                    sx={{
                        width: '80%'
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.barcode}
                    error={formik.errors.barcode}
                    helperText={formik.errors.barcode}
                />
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
                    label="Description"
                    variant="outlined"
                    name="description"
                    sx={{
                        width: '80%'
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    error={formik.errors.description}
                    helperText={formik.errors.description}
                />
                <br />
                <TextField
                    label="Price"
                    variant="outlined"
                    type="number"
                    name="price"
                    sx={{
                        width: '80%'
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                    error={formik.errors.price}
                    helperText={formik.errors.price}
                />
                <br />
                <TextField
                    label="Picture"
                    variant="outlined"
                    name="picture"
                    sx={{
                        width: '80%'
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.picture}
                    error={formik.errors.picture}
                    helperText={formik.errors.picture}
                />
                <br />
                <TextField
                    label="Amount"
                    variant="outlined"
                    type="number"
                    name="amount"
                    sx={{
                        width: '80%'
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.amount}
                    error={formik.errors.amount}
                    helperText={formik.errors.amount}
                />
                <br />
                <FormControl
                    id='brand'
                    sx={{
                        width: '80%'
                    }}
                >
                    <InputLabel id="brand_idLabel">Brand</InputLabel>
                    <Select
                        labelId="brand_idLabel"
                        label="Brand"
                        name="brand_id"
                        sx={{
                            width: '100%'
                        }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.brand_id}
                        error={formik.errors.brand_id}
                        helperText={formik.errors.brand_id}
                    >
                        {brands && brands.map(x => (<MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>))}
                    </Select>
                </FormControl>
                <br />
                <FormControl
                    id='unit'
                    sx={{
                        width: '80%'
                    }}
                >
                    <InputLabel id="unit_idLabel">Unit</InputLabel>
                    <Select
                        labelId="unit_idLabel"
                        label="Unit"
                        name="unit_id"
                        sx={{
                            width: '100%'
                        }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.unit_id}
                        error={formik.errors.unit_id}
                        helperText={formik.errors.unit_id}
                    >
                        {units && units.map(x => (<MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>))}
                    </Select>
                </FormControl>
                <br />
                <FormControl
                    id='presentation'
                    sx={{
                        width: '80%'
                    }}
                >
                    <InputLabel id="presentation_idLabel">Presentation</InputLabel>
                    <Select
                        labelId="presentation_idLabel"
                        label="Presentation"
                        name="presentation_id"
                        sx={{
                            width: '100%'
                        }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.presentation_id}
                        error={formik.errors.presentation_id}
                        helperText={formik.errors.presentation_id}
                    >
                        {presentations && presentations.map(x => (<MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>))}
                    </Select>
                </FormControl>
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

export default FormEditProduct