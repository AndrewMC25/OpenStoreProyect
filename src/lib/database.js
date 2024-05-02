import supabase from '../config/supabaseClient'

export const createItem = async (props, table) => {
    if (!props) {
        throw new Error('Error, set corret data')
    }

    const { error } = await supabase
        .from(table)
        .insert([ props ])
        .select()

    if (error) {
        throw new Error(error)
    }
}

export const readItem = async (table, rule) => {
    const { data, error } = await supabase
        .from(table)
        .select()
        .eq(rule.condition, rule.conditionValue)

    if (error) {
        throw new Error(error)
    }

    return data;
};

export const updateItem = async (props, table, row, id) => {
    if (!props) {
        throw new Error('Error, set corret data')
    }

    const { error } = await supabase
        .from(table)
        .update([ props ])
        .eq(id, row)
        .select()

    if (error) {
        throw new Error(error)
    }
};

export const deleteItem = async () => {};