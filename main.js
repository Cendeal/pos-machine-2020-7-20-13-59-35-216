const DATA_SOURCE = [
    {
        barcode: 'ITEM000000',
        name: 'Coca-Cola',
        price: 3
    },
    {
        barcode: 'ITEM000001',
        name: 'Sprite',
        price: 3
    },
    {
        barcode: 'ITEM000002',
        name: 'Apple',
        price: 5
    },
    {
        barcode: 'ITEM000003',
        name: 'Litchi',
        price: 15
    },
    {
        barcode: 'ITEM000004',
        name: 'Battery',
        price: 2
    },
    {
        barcode: 'ITEM000005',
        name: 'Instant Noodles',
        price: 4
    }
]

/**
 * @param barCodes:[string]
 */
function printReceipt(barCodes) {
    const withQuantityItems = calculateQuantity(barCodes)
    const detailItems = findAllItemsByBarCodes(withQuantityItems)
    console.log(generateFormatReceiptDetail(detailItems))
}


/**
 * @param barCodes
 * @returns {[{
 *     barcode:'',
 *     quantity:1
 * }]}
 */
function calculateQuantity(barCodes) {
    let cart = {}
    barCodes.forEach(barcode => {
        if (barcode in cart) {
            cart[barcode].quantity++
        } else {
            cart[barcode] = {
                barcode: barcode,
                quantity: 1
            }
        }
    })
    return Object.values(cart)
}

/**
 * @param withQuantityItems
 * @returns {[{
 *      barcode: '',
        name: '',
        price: 1,
        quantity:1

 * }]}
 */
function findAllItemsByBarCodes(withQuantityItems) {
    const detailItems = []
    withQuantityItems.forEach(withQuantityItem => {
        const data = DATA_SOURCE.find(item => {
            return withQuantityItem.barcode === item.barcode
        })
        if (data) {
            detailItems.push(Object.assign({}, withQuantityItem, data))
        }
    })
    return detailItems
}

/**
 * @param detailItems
 * @returns {string}
 */
function generateFormatReceiptDetail(detailItems) {
    const itemDetailMsgs = calculateItemDetailInfo(detailItems)
    const total = calculateTotal(detailItems)
    return `
***<store earning no money>Receipt ***
${itemDetailMsgs.join('\n')}
----------------------
Total: ${total} (yuan)
**********************`
}

/**
 * @param withQuantityItems
 * @returns {[string]}
 */
function calculateItemDetailInfo(withQuantityItems) {
    let itemDetails = []
    withQuantityItems.forEach(item => {
        itemDetails.push(`Name: ${item.name}, Quantity: ${item.quantity}, Unit price: ${item.price} (yuan), Subtotal: ${item.quantity * item.price} (yuan)`)
    })
    return itemDetails
}

/**
 * @param withQuantityItems
 * @returns {number}
 */
function calculateTotal(withQuantityItems) {
    return withQuantityItems.reduce((total, currentValue) => {
        return total + currentValue.quantity * currentValue.price
    }, 0)
}

module.exports = {
    printReceipt,
    calculateQuantity,
    findAllItemsByBarCodes,
    generateFormatReceiptDetail,
    calculateItemDetailInfo,
    calculateTotal
};