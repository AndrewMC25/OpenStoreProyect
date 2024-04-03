import supabase from '../../config/supabaseClient'

const SalesFunction = async (barcode, value, product) => {
    if(value > product[0].amount) {
        throw new Error('insufficient amount')
    }else{
        const amount = (product[0].amount - value)
        const { error } = await supabase
        .from('Product')
        .update([{ amount }])
        .eq('barcode', barcode)
        .select()
        if (error) {
            throw new Error(error)
        }
    }
}

export default SalesFunction