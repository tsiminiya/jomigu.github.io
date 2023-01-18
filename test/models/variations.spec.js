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

describe('Variations Model', () => {
  it('should tally sold items per shop and stock available', () => {
    const variation = createVariation(sampleVariation)
    const overallStats = variation.getOverallStats()
    expect(overallStats).toEqual({
      floating: {},
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
