import * as db from '../../lib/database'

async function UpdateAmountSold(userData) {
    try {
        for (const product of userData.products) {
            const data = await db.readItem('Product', {condition: "id", conditionValue: product.id}, userData.user.id )
            if (data) {
                const originalAmount = data[0].amount;
                const soldAmount = product.amount;
                const newAmount = originalAmount - soldAmount;
                const amount = { amount: newAmount }
                await db.updateItem(amount, 'Product', product.id, 'id', userData.user.id)
            }
        }
    } catch (error) {
        console.error(error.message);
    }
}

export default UpdateAmountSold
