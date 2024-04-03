import supabase from '../../config/supabaseClient'

const OnSubmitBrandForm = async (name) => {
    if (!name) {
        throw new Error('Error, set corret data')
    }

    const { error } = await supabase
        .from('Brand')
        .insert([{ name }])
        .select()

    if (error) {
        throw new Error(error)
    }
}

export default OnSubmitBrandForm