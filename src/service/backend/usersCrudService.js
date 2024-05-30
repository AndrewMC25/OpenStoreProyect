import * as db from '../../lib/database'

export const createUser = async (props) => {
    try {
        await db.createItem(props, 'Users');
    } catch (error) {
        console.error(error)
    }
}

export const readUser = async (rule) => {
    try {
        const user = await db.readItem('Users', rule);
        return user;
    } catch (error) {
        console.error(error)
    }
}

export const updateUser = async (props, row, id) => {
    try{
        await db.updateItem(props, 'Users', row, id)
    } catch (error) {
        console.error(error);
    }
}

export const deleteUser = async (data) => {
    try{
        await db.deleteItem('Users', data.row, data.id)
    } catch (error) {
        console.error(error);
    }
}