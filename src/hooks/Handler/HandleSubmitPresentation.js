import supabase from '../../config/supabaseClient'

const OnSubmitPresentationForm = async (name, description) => {

    if (!name || !description) {
        throw new Error('Error, set corret data')
    }

    const { error } = await supabase
        .from('ProductPresentation')
        .insert([{ name, description }])
        .select()

    if (error) {
        throw new Error(error)
    }
}

export default OnSubmitPresentationForm