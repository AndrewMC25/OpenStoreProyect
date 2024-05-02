import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup"
import EnhancedTable from "./Table";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from "notistack";
import handleDataLoad from "../service/frontend/dataLoadServiceHandler";
import handleReset from "../utils/handleReset";

const FormPresentation = ({ presentations, handleClickOpen, isTableVisible }) => {
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
            .required('Este campo es obligatorio')
            .min(5, 'Minimo 5 caracteres')
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        onSubmit: async (values) => {
            setLoading(true)
            const data = {
                elements: {
                    name: values.name,
                    description: values.description
                },
                table: 'ProductPresentation'
            }
            try {
                await handleDataLoad(data)
                enqueueSnackbar('successfully edit!', { variant: 'success' })
            } catch (error) {
                enqueueSnackbar(error, { variant: 'error' })
            }
            setLoading(false)
            handleReset(formik)
        },
        validationSchema: formSchema
    })

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
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
                    <Typography variant="h5" >Create new product presentation</Typography>
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
            </Box>
            {
                isTableVisible &&
                    <EnhancedTable
                        title='Product presentation'
                        handleClickOpen={handleClickOpen}
                        tableTitle='ProductPresentation'
                        visible={false}
                        headCells={[
                            {
                                id: 'name',
                                numeric: false,
                                disablePadding: true,
                                label: 'Name',
                            },
                            {
                                id: 'description',
                                numeric: true,
                                disablePadding: false,
                                label: 'Description',
                            },
                            {
                                id: 'createdAt',
                                numeric: true,
                                disablePadding: false,
                                label: 'Created At',
                            },
                            {
                                id: 'option',
                                numeric: true,
                                disablePadding: false,
                                label: <ArrowDropDownIcon />,
                            }
                        ]}
                        rows={presentations}
                        icon={<DeleteIcon />}
                        iconTitle='Delete'
                    />
            }
        </Box>
    );
}

export default FormPresentation