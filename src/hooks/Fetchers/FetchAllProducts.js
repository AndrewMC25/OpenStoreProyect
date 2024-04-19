import { useEffect, useState } from "react"
import supabase from '../../config/supabaseClient'
import { useSnackbar } from "notistack"

const FetchAllProducts = ( updateDOM ) => {
    const { enqueueSnackbar } = useSnackbar()

    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fecthProducts = async () => {
            const { data, error } = await supabase
                .from('Product')
                .select()
                .is('visible', true)
            if (error) {
                console.log(error)
                setProducts(null)
                enqueueSnackbar(error.message, { variant: 'error' })
            }
            if (data) {
                setProducts(data)
            }
        }
        fecthProducts()
        setLoading(false)
    }, [ updateDOM ])

    return { products, loading }
}

export default FetchAllProducts