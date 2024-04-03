import supabase from '../../config/supabaseClient'

const OnSubmitEditUnitForm = async (name, type, abbreviation, rowUnit) => {
    
    if (!name || !type || !abbreviation) {
        throw new Error('Error, set corret data')
    }

    const { error } = await supabase
        .from('UnitType')
        .update([{ type, name, abbreviation }])
        .eq('id', rowUnit.id)
        .select()

    if (error) {
        throw new Error(error)
    }
}

export default OnSubmitEditUnitForm