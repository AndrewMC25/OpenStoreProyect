'use client'

import { Box } from "@mui/material"
import ProductCard from "../Layout/ProductCard"
import SimpleBackdrop from '../Layout/Backdrop'
import { useProducts } from '../hooks/useProducts'

const Inventory = () => {
    const {products, loading} = useProducts()
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