import * as db from '../../lib/database';

const dataDelete = async (data) => {
    try {
        await db.deleteItem(data.table, data.row, data.userId);
    } catch (error) {
        console.error(error.message || error);
        throw new Error(error);
    };
};

export default dataDelete;