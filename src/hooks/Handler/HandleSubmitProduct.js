import supabase from '../../config/supabaseClient'

const OnSubmitProductForm = async (name, description, price, picture, amount, brand_id, presentation_id, unit_id, barcode) => {

    if (!name || !description || !price || !picture || !amount || !brand_id || !presentation_id || !unit_id || !barcode) {
        throw new Error('Error, set corret data')
    }

    const { error } = await supabase
        .from('Product')
        .insert([{ name, description, price, picture, amount, brand_id, presentation_id, unit_id, barcode }])
        .select()

    if (error) {
        throw new Error(error)
    }
}

export default OnSubmitProductForm