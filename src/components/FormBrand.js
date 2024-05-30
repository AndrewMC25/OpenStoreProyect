import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup"
import EnhancedTable from "./Table";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import handleReset from '../utils/handleReset'
import handleDataLoad from '../service/frontend/dataLoadServiceHandler'
import { useSnackbar } from "notistack";
import { useUserContext } from "../context/userContext";
import { useBrands } from "../hooks/FetchItems";

const FormBrand = ({ brands, handleClickOpen, isTableVisible, handleClose }) => {
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const user = useUserContext();
    const { handleUpdateBrands } = useBrands();

    const formSchema = Yup.object().shape({
        name: Yup.string()
            .required('Este campo es obligatorio')
            .min(3, 'Minimo 3 caracteres')
            .max(25, 'Maximo 25 caracteres')
            .test(
                'is-first-letter-uppercase',
                'La primera letra debe ser mayúscula',
                value => value && value.charAt(0) === value.charAt(0).toUpperCase()
            )
    })

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        onSubmit: async (values) => {
            setLoading(true)
            const data = {
                elements: {
                    name: values.name,
                    user_id: user.id
                },
                table: 'Brand'
            }
            try {
                await handleDataLoad(data)
                enqueueSnackbar('successfully edit!', { variant: 'success' })
                handleUpdateBrands();
                if(isTableVisible === false ){
                    handleClose()
                };
            } catch (error) {
                enqueueSnackbar(error, { variant: 'error' })
            }
            setLoading(false)
            handleReset(formik)
        },
        validationSchema: formSchema
    })

    return (
        <Stack
            sx={{
                alignItems: 'center',
            }}
        >
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
                    <Typography variant="h5" >Create new Brand</Typography>
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
            {
                isTableVisible &&
                    <EnhancedTable
                title='Brands'
                handleClickOpen={handleClickOpen}
                tableTitle='Brand'
                visible={false}
                headCells={[
                    {
                        id: 'name',
                        numeric: false,
                        disablePadding: true,
                        label: 'Name',
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
                rows={brands}
                icon={<DeleteIcon />}
                iconTitle='Delete'
            />
            }
        </Stack>

    );
}

export default FormBrand