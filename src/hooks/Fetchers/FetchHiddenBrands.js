import { useEffect, useState } from "react"
import supabase from '../../config/supabaseClient'
import { useSnackbar } from "notistack"

const FetchHiddenBrands = () => {
    const { enqueueSnackbar } = useSnackbar()

    const [hiddenBrands, setHiddenBrands] = useState([])
    const [hiddenBrandsError, setHiddenBrandsError] = useState(null)

    useEffect(() => {
        const fetchBrands = async () => {
            const { data, error } = await supabase
                .from('Brand')
                .select()
                .is('visible', false)

            if (error) {
                setHiddenBrandsError(error.message)
                setHiddenBrands(null)
                enqueueSnackbar(hiddenBrandsError, { variant: 'error' })
            }
            if (data) {
                setHiddenBrands(data)
                setHiddenBrandsError(null)
            }
        }
        fetchBrands()
    }, [])

    return hiddenBrands
}

export default FetchHiddenBrands