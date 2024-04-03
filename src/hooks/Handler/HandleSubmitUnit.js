import supabase from '../../config/supabaseClient'

const OnSubmitUnitForm = async (name, type, abbreviation) => {

    if (!name || !type || !abbreviation) {
        throw new Error('Error, set corret data')
    }

    const { error } = await supabase
        .from('UnitType')
        .insert([{ type, name, abbreviation }])
        .select()

    if (error) {
        throw new Error(error)
    }
}

export default OnSubmitUnitForm