const main = require('../main');

describe('print receipt', () => {
    it('should print receipt to console correctly when print receipt given multiple barcodes',
        () => {
            const barcodes = [
                'ITEM000000',
                'ITEM000000',
                'ITEM000000',
                'ITEM000000',
                'ITEM000000',
                'ITEM000001',
                'ITEM000001',
                'ITEM000004'
            ];

            const expectReceipt = `
***<store earning no money>Receipt ***
Name: Coca-Cola, Quantity: 5, Unit price: 3 (yuan), Subtotal: 15 (yuan)
Name: Sprite, Quantity: 2, Unit price: 3 (yuan), Subtotal: 6 (yuan)
Name: Battery, Quantity: 1, Unit price: 2 (yuan), Subtotal: 2 (yuan)
----------------------
Total: 23 (yuan)
**********************`


            console.log = jest.fn();

            main.printReceipt(barcodes);

            expect(console.log).toHaveBeenCalledWith(expectReceipt);
        });
});


describe('calculate quantity', () => {
    it('should calculate quantity by barcode and return array with item which includes barcode and quantity',
        () => {
            const barcodes = [
                'ITEM000000',
                'ITEM000000',
                'ITEM000001',
                'ITEM000001',
                'ITEM000004'
            ];
            expect(main.calculateQuantity(barcodes)).toMatchObject([
                {
                    barcode: 'ITEM000000',
                    quantity: 2
                },
                {
                    barcode: 'ITEM000001',
                    quantity: 2
                },
                {
                    barcode: 'ITEM000004',
                    quantity: 1
                }
            ])

        });
});


describe('find all items by barCodes', () => {
    it('should calculate quantity by barcode',
        () => {
            const barcodes = [
                'ITEM000000',
                'ITEM000000',
                'ITEM000001',
                'ITEM000001',
                'ITEM000004'
            ];
            expect(main.calculateQuantity(barcodes)).toMatchObject([
                {
                    barcode: 'ITEM000000',
                    quantity: 2
                },
                {
                    barcode: 'ITEM000001',
                    quantity: 2
                },
                {
                    barcode: 'ITEM000004',
                    quantity: 1
                }
            ])

        });
});

describe('generate format receipt detail', () => {
    it('should print receipt to console correctly when print receipt given multiple barcodes',
        () => {
            const expectReceipt = `
***<store earning no money>Receipt ***
Name: Battery, Quantity: 1, Unit price: 2 (yuan), Subtotal: 2 (yuan)
----------------------
Total: 2 (yuan)
**********************`
            expect(main.generateFormatReceiptDetail([{
                barcode: 'ITEM000004',
                name: 'Battery',
                price: 2,
                quantity: 1
            }
            ])).toEqual(expectReceipt);
        })
});