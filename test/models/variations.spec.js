import createVariation from '../../models/variation'

const sampleVariation = {
  name: 'Color',
  options: [
    {
      name: 'White',
      price: 100,
      image: 'white.png',
      stock: {
        lazada: 10,
        shopee: 15,
      },
      sold: {
        lazada: 90,
        shopee: 85,
      },
    },
    {
      name: 'Blue',
      price: 120,
      image: 'blue.png',
      stock: {
        lazada: 0,
        shopee: 10,
      },
      sold: {
        lazada: 100,
        shopee: 90,
      },
    },
  ],
}

const sampleVariation2 = {
  name: 'Color',
  options: [
    {
      name: 'White',
      image: 'white.png',
      options: [
        {
          name: 'Size',
          options: [
            {
              name: '1x1',
              price: 100,
              stock: {
                lazada: 10,
                shopee: 5,
              },
              sold: {
                lazada: 0,
                shopee: 5,
              },
            },
            {
              name: '2x2',
              price: 120,
              stock: {
                lazada: 1,
                shopee: 9,
              },
              sold: {
                lazada: 9,
                shopee: 1,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Blue',
      image: 'blue.png',
      options: [
        {
          name: 'Size',
          options: [
            {
              name: '1x1',
              price: 100,
              stock: {
                lazada: 2,
                shopee: 2,
              },
              sold: {
                lazada: 8,
                shopee: 8,
              },
            },
            {
              name: '2x2',
              price: 120,
              stock: {
                lazada: 10,
                shopee: 9,
              },
              sold: {
                lazada: 0,
                shopee: 1,
              },
            },
          ],
        },
      ],
    },
  ],
}

describe('Variations Model', () => {
  it('should tally sold items per shop and stock available', () => {
    const variation = createVariation(sampleVariation)
    const overallStats = variation.getOverallStats()
    expect(overallStats).toEqual({
      stock: {
        lazada: 10,
        shopee: 25,
      },
      sold: {
        lazada: 190,
        shopee: 175,
      },
    })
  })
})
