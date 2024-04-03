import { Box, Typography } from "@mui/material"
import EnhancedTable from "../utils/Table"
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import FetchHiddenBrands from "../hooks/Fetchers/FetchHiddenBrands"
import FetchHiddenProducts from "../hooks/Fetchers/FetchHiddenProducts"
import FetchHiddenUnits from "../hooks/Fetchers/FetchHiddenUnits"
import FetchHiddenPresentations from "../hooks/Fetchers/FetchHiddenPresentations"

const AllHiddenMenu = ({ brands, units, presentation }) => {

    const hiddenBrands = FetchHiddenBrands()
    const hiddenProducts = FetchHiddenProducts()
    const hiddenUnits = FetchHiddenUnits()
    const hiddenPresentation = FetchHiddenPresentations()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
            }}
        >
            {hiddenProducts.length ?
                <Box
                    sx={{
                        width: '80%'
                    }}
                >
                    <EnhancedTable
                        title='Hidden Products'
                        tableTitle='Product'
                        visible={true}
                        icon={<RestoreFromTrashIcon />}
                        iconTitle='Restore'
                        headCells={[
                            { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
                            { id: 'barcode', numeric: true, disablePadding: false, label: 'Barcode' },
                            { id: 'description', numeric: true, disablePadding: false, label: 'Description' },
                            { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
                            { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
                            { id: 'brand_id', numeric: true, disablePadding: false, label: 'Brand' },
                            { id: 'presentation_id', numeric: true, disablePadding: false, label: 'Presentation' },
                            { id: 'unit_id', numeric: true, disablePadding: false, label: 'Unit' },
                            { id: 'createdAt', numeric: true, disablePadding: false, label: 'Created At' }
                        ]}
                        rows={hiddenProducts}
                        brands={brands}
                        units={units}
                        presentation={presentation}
                    />
                </Box> : null
            }
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        width: '100%'
                    }}
                >
                    {hiddenBrands.length ?
                        <EnhancedTable
                            title='Hidden Brands'
                            tableTitle='Brand'
                            visible={true}
                            icon={<RestoreFromTrashIcon />}
                            iconTitle='Restore'
                            headCells={[
                                { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
                                { id: 'createdAt', numeric: true, disablePadding: false, label: 'Created At' }
                            ]}
                            rows={hiddenBrands}
                        /> : null
                    }
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        width: '100%'
                    }}
                >
                    {hiddenUnits.length ?
                        <EnhancedTable
                            title='Hidden Units'
                            tableTitle='UnitType'
                            visible={true}
                            icon={<RestoreFromTrashIcon />}
                            iconTitle='Restore'
                            headCells={[
                                { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
                                { id: 'type', numeric: true, disablePadding: false, label: 'Type' },
                                { id: 'abbreviation', numeric: true, disablePadding: false, label: 'Abbreviation' },
                                { id: 'createdAt', numeric: true, disablePadding: false, label: 'Created At' }
                            ]}
                            rows={hiddenUnits}
                        /> : null
                    }
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        width: '100%'
                    }}
                >
                    {hiddenPresentation.length ?
                        <EnhancedTable
                            title='Hidden Presentations'
                            tableTitle='ProductPresentation'
                            visible={true}
                            icon={<RestoreFromTrashIcon />}
                            iconTitle='Restore'
                            headCells={[
                                { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
                                { id: 'description', numeric: true, disablePadding: false, label: 'Description' },
                                { id: 'createdAt', numeric: true, disablePadding: false, label: 'Created At' }
                            ]}
                            rows={hiddenPresentation}
                        /> : null
                    }
                </Box>
            </Box>
            {(hiddenProducts.length || hiddenBrands.length || hiddenUnits.length || hiddenPresentation.length) ? null : <Typography color='#b3b3b3'>Paper bin is empty...</Typography>}
        </Box>
    )
}

export default AllHiddenMenu