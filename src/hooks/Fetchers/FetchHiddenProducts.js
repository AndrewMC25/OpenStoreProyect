import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import supabase from '../../config/supabaseClient'

const FetchHiddenProducts = () => {
    const { enqueueSnackbar } = useSnackbar()

    const [hiddenProducts, setHiddenProducts] = useState([])
    const [hiddenProductsError, setHiddenProductsError] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from('Product')
                .select()
                .is('visible', false)

            if (error) {
                setHiddenProductsError(error.message)
                setHiddenProducts(null)
                enqueueSnackbar(hiddenProductsError, { variant: 'error' })
            }
            if (data) {
                setHiddenProducts(data)
                setHiddenProductsError(null)
            }
        }
        fetchProducts()
    }, [])

    return hiddenProducts
}

export default FetchHiddenProducts