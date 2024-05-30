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

export const readItem = async (table, rule, userId) => {
    if (table === 'Users') {
        const { data, error } = await supabase
        .from(table)
        .select()
        .eq(rule.condition, rule.conditionValue)
        if (error) {
            console.error(error)
            throw new Error(error)
        }
        return data;
    } else {
        const { data, error } = await supabase
        .from(table)
        .select()
        .eq('user_id', userId)
        .eq(rule.condition, rule.conditionValue)
        if (error) {
            console.error(error)
            throw new Error(error)
        }
        return data;
    }
};

export const updateItem = async (props, table, row, id, userId) => {
    if (!props) {
        throw new Error('Error, set corret data')
    }
    if(table === 'Users'){
        const { error } = await supabase
        .from(table)
        .update([ props ])
        .eq(id, row)
        .select()
        if (error) {
            console.error(error)
            throw new Error(error)
        }
    } else {
        const { error } = await supabase
        .from(table)
        .update([ props ])
        .eq('user_id', userId)
        .eq(id, row)
        .select()
        if (error) {
            console.error(error)
            throw new Error(error)
        }
    }
};

export const deleteItem = async (table, id, userId) => {
    if(table === 'User'){
        try {
            const { error } = await supabase
                .from(table)
                .delete()
                .eq('id', id)
                .select()
        if (error) {
            throw error;
        }
        } catch (err) {
            console.error('Error deleting item:', err.message || err);
            throw new Error(`Error deleting item: ${err.message || JSON.stringify(err)}`);
        }
    } else {
        try {
            const { error } = await supabase
                .from(table)
                .delete()
                .eq('user_id', userId)
                .eq('id', id)
                .select()
        if (error) {
            throw error;
        }
        } catch (err) {
            console.error('Error deleting item:', err.message || err);
            throw new Error(`Error deleting item: ${err.message || JSON.stringify(err)}`);
        }
    }
  };