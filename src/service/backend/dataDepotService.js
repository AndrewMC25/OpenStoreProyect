import * as db from '../../lib/database';

const dataDepot = async (data) => {
    try {
        const response = await db.createItem(data.elements, data.table);
        return response;
    } catch (error) {
        console.error(error)
    }
}

export default dataDepot;