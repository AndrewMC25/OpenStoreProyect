import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup"
import EnhancedTable from "./Table";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from "notistack";
import handleReset from "../utils/handleReset";
import handleDataLoad from "../service/frontend/dataLoadServiceHandler";
import { useUserContext } from "../context/userContext";
import { useUnits } from "../hooks/FetchItems";

const FormUnit = ({ units, handleClickOpen, isTableVisible, handleClose }) => {
    const [loading, setLoading] = useState(false);
    const user = useUserContext();
    const { enqueueSnackbar } = useSnackbar();
    const { handleUpdateUnits } = useUnits();

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
            type: '',
            name: '',
            abbreviation: '',
        },
        onSubmit: async (values) => {
            setLoading(true)
            const data = {
                elements: {
                    name: values.name,
                    type: values.type,
                    abbreviation: values.abbreviation,
                    user_id: user.id
                },
                table: 'UnitType'
            }
            try {
                await handleDataLoad(data);
                enqueueSnackbar('successfully edit!', { variant: 'success' });
                handleUpdateUnits();
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
                    <Typography variant="h5" >Create new unit of measurement</Typography>
                    <br />
                    <FormControl
                        id='type-unit'
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
                        Create
                    </LoadingButton>
                </form>
            </Box>
            {
                isTableVisible &&
                    <EnhancedTable
                        title='Units of measurement'
                        handleClickOpen={handleClickOpen}
                        tableTitle='UnitType'
                        visible={false}
                        headCells={[
                            {
                                id: 'name',
                                numeric: false,
                                disablePadding: true,
                                label: 'Name',
                            },
                            {
                                id: 'type',
                                numeric: true,
                                disablePadding: false,
                                label: 'Type',
                            },
                            {
                                id: 'abbreviation',
                                numeric: true,
                                disablePadding: false,
                                label: 'Abbreviation',
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
                        rows={units}
                        icon={<DeleteIcon />}
                        iconTitle='Delete'
                    />
            }
        </Box>
    );
}

export default FormUnit