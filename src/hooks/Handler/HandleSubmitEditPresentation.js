import supabase from '../../config/supabaseClient'

const OnSubmitEditPresentationForm = async (name, description, rowPresentation) => {
    if (!name || !description) {
        throw new Error('Error, set corret data')
    }

    const { error } = await supabase
        .from('ProductPresentation')
        .update([{ name, description }])
        .eq('id', rowPresentation.id)
        .select()

    if (error) {
        throw new Error(error)
    }
}

export default OnSubmitEditPresentationForm