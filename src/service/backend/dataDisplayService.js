import * as db from '../../lib/database';

const dataDisplay = async (rule) => {
    const response = await db.readItem(rule.table, rule.rule)
    return response;
}

export default dataDisplay;