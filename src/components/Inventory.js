'use client'

import { Box } from "@mui/material"
import ProductCard from "../Layout/ProductCard"
import FetchAllProducts from '../hooks/Fetchers/FetchAllProducts'
import SimpleBackdrop from '../Layout/Backdrop'

const Inventory = () => {
    const {products, loading} = FetchAllProducts()
    return(
        <Box>
            {products && (
                <ProductCard title='All Products' products={products} />
            )}
            {loading && <SimpleBackdrop open={true}/>}
        </Box>
    )
}

export default Inventory