import supabase from '../../config/supabaseClient'

const OnSubmitEditBrandForm = async (name, rowBrand) => {

    if (!name) {
        throw new Error('Error, set corret data')
    }

    const { error } = await supabase
        .from('Brand')
        .update([{ name }])
        .eq('id', rowBrand.id)
        .select()

    if (error) {
        throw new Error(error)
    }
}

export default OnSubmitEditBrandForm