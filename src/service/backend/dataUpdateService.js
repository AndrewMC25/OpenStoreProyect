import * as db from '../../lib/database';

const dataUpdate = async (data) => {
    const response = await db.updateItem(data.elements, data.table, data.row, data.id);
    return response;
}

export default dataUpdate;