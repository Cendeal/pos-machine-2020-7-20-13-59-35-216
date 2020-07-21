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

function printReceipt(barCodes) {
    const items = findAllItemsByBarCodes(barCodes)
    const withQuantityItems = handleCartItems(items)
    console.log(generateFormatReceiptDetail(withQuantityItems))
}

function findAllItemsByBarCodes(barCodes) {
    const items = []
    barCodes.forEach(barcode => {
        const data = DATA_SOURCE.find(item => {
            return barcode === item.barcode
        })
        if (data) {
            items.push(data)
        }
    })
    return items
}

function handleCartItems(items) {
    let cart = {}
    items.forEach(item => {
        if (item.barcode in cart) {
            cart[item.barcode].quantity++
        } else {
            cart[item.barcode] = {
                info: item,
                quantity: 1
            }
        }
    })
    return Object.values(cart)
}

function generateFormatReceiptDetail(withQuantityItems) {
    const itemDetails = calculateItemDetailInfo(withQuantityItems)
    const total = calculateTotal(withQuantityItems)
    return `
***<store earning no money>Receipt ***
${itemDetails.join('\n')}
----------------------
Total: ${total} (yuan)
**********************`
}

function calculateItemDetailInfo(withQuantityItems) {
    let itemDetails = []
    withQuantityItems.forEach(item => {
        itemDetails.push(`Name: ${item.info.name}, Quantity: ${item.quantity}, Unit price: ${item.info.price} (yuan), Subtotal: ${item.quantity * item.info.price} (yuan)`)
    })
    return itemDetails

}

function calculateTotal(withQuantityItems) {
    return withQuantityItems.reduce((total, currentValue) => {
        return total + currentValue.quantity * currentValue.info.price
    }, 0)
}

module.exports = {
    printReceipt
};