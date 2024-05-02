import * as db from '../../lib/database';

const dataDepot = async (data) => {
    const response = await db.createItem(data.elements, data.table);
    return response;
}

export default dataDepot;