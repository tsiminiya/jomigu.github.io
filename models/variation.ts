import createPromoListWrapper, { PromoListWrapper } from './promos'

export class PriceRange {
  min: number | undefined
  max: number | undefined
  minName: string = ''
  maxName: string = ''
  promoListWrapper: PromoListWrapper | undefined
  promosFound: boolean = false

  withPromoListWrapper(promos: any[]) {
    const priceRange = new PriceRange()
    priceRange.min = this.min
    priceRange.max = this.max
    priceRange.minName = this.minName
    priceRange.maxName = this.maxName
    priceRange.promoListWrapper = createPromoListWrapper(promos)
    priceRange.promosFound = this.promosFound
    return priceRange
  }

  toArray() {
    return [this.min, this.max]
  }
}

export class Variations {
  name: string = ''
  price: number | undefined
  stock: { [key: string]: number } = {}
  sold: { [key: string]: number } = {}
  image: string | undefined
  options: Variations[] | undefined
  promos: any[] | undefined

  private empty: boolean = true

  constructor() {
    this.mergeStats = this.mergeStats.bind(this)
    this.evaluatePriceRange = this.evaluatePriceRange.bind(this)
    this.evaluatePromoPriceRange = this.evaluatePromoPriceRange.bind(this)
  }

  getPromoPriceRange(promos: any[]): PriceRange {
    return this.traverseAndAccumulate(
      this,
      this.getPriceRange().withPromoListWrapper(promos),
      this.evaluatePromoPriceRange
    )
  }

  evaluatePromoPriceRange(partialResult: PriceRange, variation: Variations) {
    if (
      variation.price !== undefined &&
      variation.promos !== undefined &&
      partialResult.promoListWrapper !== undefined
    ) {
      const activePromos =
        partialResult.promoListWrapper.getProductActivePromos(variation.promos)
      if (activePromos.length > 0) {
        partialResult.promosFound = true

        const activePromo = activePromos[0]
        if (
          partialResult.min === undefined ||
          activePromo.productPrice < partialResult.min
        ) {
          partialResult.min = activePromo.productPrice
          partialResult.minName = variation.name
        }
        if (
          partialResult.max === undefined ||
          partialResult.maxName === variation.name
        ) {
          partialResult.max = activePromo.productPrice
          partialResult.maxName = variation.name
        }
      }
    }
    return partialResult
  }

  getPriceRange(): PriceRange {
    return this.traverseAndAccumulate(
      this,
      new PriceRange(),
      this.evaluatePriceRange
    )
  }

  private evaluatePriceRange(partialResult: PriceRange, variation: Variations) {
    if (variation.price !== undefined) {
      if (
        partialResult.min === undefined ||
        variation.price < partialResult.min
      ) {
        partialResult.min = variation.price
        partialResult.minName = variation.name
      }
      if (
        partialResult.max === undefined ||
        variation.price > partialResult.max
      ) {
        partialResult.max = variation.price
        partialResult.maxName = variation.name
      }
    }
    return partialResult
  }

  getOverallStats() {
    return this.traverseAndAccumulate(this, {}, this.mergeStats)
  }

  private mergeStats(
    partialResult: { [key: string]: { [key: string]: number } },
    variation: Variations
  ): any {
    let overallStats = this.copyHash(partialResult)
    overallStats = this.addStatsToField(variation.stock, overallStats, 'stock')
    overallStats = this.addStatsToField(variation.sold, overallStats, 'sold')
    return overallStats
  }

  private traverseAndAccumulate<T>(
    variation: Variations,
    initialValue: T,
    accumulationFunc: Function
  ) {
    let partialResult = accumulationFunc(initialValue, variation)
    variation.options?.forEach((option: Variations) => {
      partialResult = this.traverseAndAccumulate(
        option,
        partialResult,
        accumulationFunc
      )
    })
    return partialResult
  }

  private addStatsToField(
    stats: { [key: string]: number },
    overallStats: { [key: string]: { [key: string]: number } },
    fieldName: string
  ): { [key: string]: { [key: string]: number } } {
    const singleStat: { [key: string]: number } = overallStats[fieldName] || {}
    Object.entries(stats).forEach((entry: [string, number]) => {
      const key: string = entry[0]
      const value: number = entry[1]
      singleStat[key] = (singleStat[key] || 0) + value
    })
    overallStats[fieldName] = singleStat
    return overallStats
  }

  private copyHash<T>(hash: { [key: string]: T }) {
    const target: { [key: string]: T } = {}
    Object.entries(hash).forEach((entry: [string, T]) => {
      target[entry[0]] = entry[1]
    })
    return target
  }

  isEmpty() {
    return this.empty
  }

  static mapVariation(variation: any) {
    const v = new Variations()
    v.name = variation.name
    v.price = variation.price
    v.promos = variation.promos
    v.stock = Variations.mapStats(variation.stock)
    v.sold = Variations.mapStats(variation.sold)
    v.image = variation.image
    v.options = (variation.options || []).map(Variations.mapVariation)
    v.empty = false
    return v
  }

  private static mapStats(data: { [key: string]: unknown } = {}) {
    return Variations.reduceMapEntries(
      Object.entries(data).map((entry: [string, unknown]) => ({
        [entry[0]]: entry[1] as number,
      }))
    )
  }

  private static reduceMapEntries<T>(entries: { [key: string]: T }[]) {
    return entries.reduce(
      (partial: { [key: string]: T }, current: { [key: string]: T }) => {
        Object.entries(current).forEach((e: [string, T]) => {
          partial[e[0]] = e[1]
        })
        return partial
      },
      {}
    )
  }
}

export default (variation: any) => {
  if (variation === undefined || Object.keys(variation).length === 0) {
    return new Variations()
  }
  return Variations.mapVariation(variation)
}
