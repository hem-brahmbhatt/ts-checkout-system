import { Checkout } from './checkout';

describe('Checkout', () => {
  it('should create an empty basket', () => {
    const checkout = new Checkout();
    expect(checkout.items).toEqual([]);
  });

  describe('.scan()', () => {
    it('should add an item to the basket', () => {
      const checkout = new Checkout();
      const productCode = 'SR1';
      checkout.scan(productCode);
      expect(checkout.items).toEqual([
        {
          code: 'SR1',
          name: 'Strawberries',
          price: 500,
          quantity: 1,
        }
      ])
    });
    
    it('should be able to add multiple items to the basket', () => {
      const checkout = new Checkout();
      checkout.scan('SR1');
      checkout.scan('FR1')
      expect(checkout.items).toEqual([
        {
          code: 'SR1',
          name: 'Strawberries',
          price: 500,
          quantity: 1,
        },
        {
          code: 'FR1',
          name: 'Fruit Tea',
          price: 311,
          quantity: 1,
        }
      ])
    });

    it('should increase the quantity of an item that already exists in the basket', () => {
      const checkout = new Checkout();
      checkout.scan('SR1');
      checkout.scan('SR1');
      expect(checkout.items).toEqual([
        {
          code: 'SR1',
          name: 'Strawberries',
          price: 500,
          quantity: 2,
        }
      ])
    });

    it('should throw if product is not found', () => {
      const checkout = new Checkout();
      expect(() => checkout.scan('NOT_FOUND')).toThrow();
    });

    it.skip('should add two of an item if "buy-one-get-one-free" rule applies', () => {
      const checkout = new Checkout({
        'FR1': [
          {
            name: 'buy-one-get-one-free',
          }
        ]
      })
      checkout.scan('FR1')
      expect(checkout.items).toEqual([
        {
          code: 'FR1',
          name: 'Fruit Tea',
          price: 311,
          quantity: 2,
        }
      ])
    });
  });

  describe('.total()', () => {
    let checkout: Checkout;

    beforeEach(() => {
      checkout = new Checkout();
    });

    it('should return the total price of the empty basket as zero', () => {
      const total = checkout.total();

      expect(total).toEqual(0);
    });

    it('should return the total price of a basket containing a single item', () => {
      checkout.scan('SR1');
      const total = checkout.total();

      expect(total).toEqual(500);
    });

    it('should return the total price of a basket with multiple quantities of an item', () => {
      checkout.scan('SR1');
      checkout.scan('SR1');
      const total = checkout.total();

      expect(total).toEqual(1000)
    });

    it('should return the total price of a basket with multiple items', () => {
      checkout.scan('SR1');
      checkout.scan('FR1');
      const total = checkout.total();

      expect(total).toEqual(811)
    });

    describe('when pricing rules are specified', () => {
      it.skip('should return total discounted price when "bulk-quantity-discount" rule applies', () => {
        checkout = new Checkout({
          'SR1': [
            {
              name: 'bulk-quantity-discount',
              quantity: 3,
              discountedPricePerItem: 450,
            }
          ]
        })

        checkout.scan('SR1');
        checkout.scan('SR1');
        checkout.scan('SR1');

        expect(checkout.total()).toEqual(1350)
      });
    })
  });
});