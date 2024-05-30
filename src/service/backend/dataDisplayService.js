import * as db from '../../lib/database';

const dataDisplay = async (rule) => {
    const response = await db.readItem(rule.table, rule.rule, rule.userId)
    return response;
}

export default dataDisplay;