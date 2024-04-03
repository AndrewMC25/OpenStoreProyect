import { useEffect, useState } from "react"
import { useSnackbar } from "notistack"
import supabase from '../../config/supabaseClient'

const FetchAllBrands = ( updateDOM ) => {
    const { enqueueSnackbar } = useSnackbar()

    const [brands, setBrands] = useState(null)
    const [brandsError, setBrandsError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fecthBrands = async () => {
            const { data, error } = await supabase
                .from('Brand')
                .select()
                .is('visible', true)

            if (error) {
                setBrandsError(error.message)
                setBrands(null)
                enqueueSnackbar(brandsError, { variant: 'error' })
            }
            if (data) {
                setBrands(data)
                setBrandsError(null)
            }
        }
        fecthBrands()
        setLoading(false)
    }, [ updateDOM ])

    return {brands, loading}
}

export default FetchAllBrands