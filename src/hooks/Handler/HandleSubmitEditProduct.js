import supabase from '../../config/supabaseClient'

const OnSubmitEditProductForm = async (name, description, price, picture, amount, brand_id, presentation_id, unit_id, barcode, rowProduct) => {

    if (!name || !description || !price || !picture || !amount || !brand_id || !presentation_id || !unit_id || !barcode) {
        throw new Error('Error, set corret data')
    }

    const { error } = await supabase
        .from('Product')
        .update([{ name, description, price, picture, amount, brand_id, presentation_id, unit_id, barcode }])
        .eq('id', rowProduct.id)
        .select()

    if (error) {
        throw new Error(error)
    }
}

export default OnSubmitEditProductForm