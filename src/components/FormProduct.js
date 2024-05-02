import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup"
import EnhancedTable from "./Table";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from "notistack";
import StraightenIcon from '@mui/icons-material/Straighten';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AlertDialog from "../Layout/AlertDialog";
import handleReset from "../utils/handleReset";
import handleDataLoad from "../service/frontend/dataLoadServiceHandler";
import FormBrand from "./FormBrand";
import FormPresentation from "./FormPresentation";
import FormUnit from "./FormUnit";

const FormProduct = ({ brands, units, presentations, products, handleClickOpen }) => {
  const [loading, setLoading] = useState(false)
  const [openBrand, setOpenBrand] = useState(false)
  const [openUnit, setOpenUnit] = useState(false)
  const [openPresentation, setOpenPresentation] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleOpenBrand = () => {
    setOpenBrand(true)
  }
  const handleCloseBrand = () => {
    setOpenBrand(false)
  }
  const handleOpenUnit = () => {
    setOpenUnit(true)
  }
  const handleCloseUnit = () => {
    setOpenUnit(false)
  }
  const handleOpenPresentation = () => {
    setOpenPresentation(true)
  }
  const handleClosePresentation = () => {
    setOpenPresentation(false)
  }

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
      name: '',
      description: '',
      price: '',
      picture: '',
      amount: '',
      brand_id: '',
      presentation_id: '',
      unit_id: '',
      barcode: ''
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
          table: 'Product'
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
    <Stack
      sx={{
        alignItems: 'center',
      }}
    >
      <Stack
        flexDirection='row'
        alignItems='center'
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
            <Typography variant="h5" >Create new product</Typography>
            <br />
            <TextField
              label="Barcode"
              variant="outlined"
              type="number"
              name="barcode"
              sx={{
                width: '100%'
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.barcode}
              error={formik.errors.barcode}
              helperText={formik.errors.barcode}
            />
            <br />
            <Box
              sx={{
                display: 'flex'
              }}
            >
              <Box>
                <TextField
                  label="Name"
                  variant="outlined"
                  name="name"
                  sx={{
                    width: '100%',
                    margin: '0px 0px 8px 0px'
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
                    width: '100%',
                    margin: '0px 0px 8px 0px'
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
                    width: '100%',
                    margin: '0px 0px 8px 0px'
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
                    width: '100%',
                    margin: '0px 0px 8px 0px'
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.picture}
                  error={formik.errors.picture}
                  helperText={formik.errors.picture}
                />
              </Box>
              <Box
                sx={{
                  margin: '0px 0px 0px 8px'
                }}
              >
                <TextField
                  label="Amount"
                  variant="outlined"
                  type="number"
                  name="amount"
                  sx={{
                    width: '100%',
                    margin: '0px 0px 8px 0px'
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
                    width: '100%',
                    margin: '0px 0px 8px 0px'
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
                  >
                    {brands && brands.map(x => (<MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>))}
                  </Select>
                </FormControl>
                <br />
                <FormControl
                  id='unit'
                  sx={{
                    width: '100%',
                    margin: '0px 0px 8px 0px'
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
                  >
                    {units && units.map(x => (<MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>))}
                  </Select>
                </FormControl>
                <br />
                <FormControl
                  id='presentation'
                  sx={{
                    width: '100%',
                    margin: '0px 0px 8px 0px'
                  }}
                >
                  <InputLabel id="presentation_idLabel">Presentation</InputLabel>
                  <Select
                    labelId="presentation_idLabel"
                    label="Presentation"
                    name="presentation_id"
                    sx={{
                      width: '100%',
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.presentation_id}
                    error={formik.errors.presentation_id}
                  >
                    {presentations && presentations.map(x => (<MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <br />
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              sx={{
                width: '100%'
              }}
            >
              Create
            </LoadingButton>
          </form>
        </Stack>
        <Stack
          sx={{
            height: '250px',
            border: '1px solid #d3d3d3',
            borderColor: '#d3d3d3',
            padding: '40px 0 40px 20px',
            borderRadius: '0px 20px 20px 0px',
            justifyContent: 'center'
          }}
        >
          <Button
            onClick={handleOpenBrand}
            variant="text"
            size="large"
            startIcon={<BookmarkIcon/>}
            sx={{
                width: '240px',
                margin: '9px',
                justifyContent: 'flex-start'
            }}
          >
            new brand
          </Button>
          <Button
            onClick={handleOpenUnit}
            variant="text"
            size="large"
            startIcon={<StraightenIcon/>}
            sx={{
                width: '240px',
                margin: '9px',
                justifyContent: 'flex-start'
            }}
          >
            new unit
          </Button>
          <Button
            onClick={handleOpenPresentation}
            variant="text"
            size="large"
            startIcon={<LocalMallIcon/>}
            sx={{
                width: '240px',
                margin: '9px',
                justifyContent: 'flex-start'
            }}
          > 
            new presentation 
          </Button>
        </Stack>
      </Stack>
      <Box
        sx={{
          width: '80%'
        }}
      >
        <EnhancedTable
          title='Products'
          handleClickOpen={handleClickOpen}
          tableTitle='Product'
          visible={false}
          headCells={[
            {
              id: 'name',
              numeric: false,
              disablePadding: true,
              label: 'Name',
            },
            {
              id: 'barcode',
              numeric: true,
              disablePadding: false,
              label: 'Barcode',
            },
            {
              id: 'description',
              numeric: true,
              disablePadding: false,
              label: 'Description',
            },
            {
              id: 'price',
              numeric: true,
              disablePadding: false,
              label: 'Price',
            },
            {
              id: 'amount',
              numeric: true,
              disablePadding: false,
              label: 'Amount',
            },
            {
              id: 'brand_id',
              numeric: true,
              disablePadding: false,
              label: 'Brand',
            },
            {
              id: 'presentation_id',
              numeric: true,
              disablePadding: false,
              label: 'Presentation',
            },
            {
              id: 'unit_id',
              numeric: true,
              disablePadding: false,
              label: 'Unit',
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
          rows={products}
          brands={brands}
          units={units}
          presentations={presentations}
          icon={<DeleteIcon />}
          iconTitle='Delete'
        />
      </Box>
      <AlertDialog title='Create New Brand' open={openBrand} handleClose={handleCloseBrand}>
        <FormBrand isTableVisible={false} />
      </AlertDialog>
      <AlertDialog title='Create New Unit' open={openUnit} handleClose={handleCloseUnit}>
        <FormUnit isTableVisible={false} />
      </AlertDialog>
      <AlertDialog title='Create New Presentation' open={openPresentation} handleClose={handleClosePresentation}>
        <FormPresentation isTableVisible={false} />
      </AlertDialog>
    </Stack>
  );
}


export default FormProduct