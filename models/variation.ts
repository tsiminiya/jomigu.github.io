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

  hasRange() {
    return this.min !== this.max
  }

  toArray() {
    return [this.min, this.max]
  }
}

export class Variations {
  name: string = ''
  price: number | undefined
  stock: { [key: string]: number } = {}
  'actual-stock': number = 0
  sold: { [key: string]: number } = {}
  floating: { [key: string]: number } = {}
  image: string | undefined
  options: Variations[] | undefined
  promos: any[] | undefined
  count: number = 0

  private empty: boolean = true

  constructor() {
    this.mergeStats = this.mergeStats.bind(this)
    this.evaluatePriceRange = this.evaluatePriceRange.bind(this)
    this.evaluatePromoPriceRange = this.evaluatePromoPriceRange.bind(this)
    this.traverseUniqueVariant = this.traverseUniqueVariant.bind(this)
  }

  getUniqueVariations(): Variations[] {
    const namesMap: { [key: string]: Variations } = this.traverseUniqueVariant(
      this,
      '',
      {}
    )

    const variantNames: Variations[] = []

    Object.entries(namesMap).forEach((entry: [string, Variations]) => {
      if (entry[1].count === 1) {
        variantNames.push(entry[1])
      }
    })

    return variantNames
  }

  traverseUniqueVariant(
    variation: Variations,
    name: string,
    namesMap: { [key: string]: Variations }
  ): { [key: string]: Variations } {
    if (variation.price !== undefined && variation.price > 0) {
      const updatedVariation = Variations.mapVariation(variation)
      updatedVariation.name = name
      updatedVariation.count = updatedVariation.count + 1
      namesMap[name] = updatedVariation
      return namesMap
    } else {
      let partialResult = namesMap
      variation.options?.forEach((option: Variations) => {
        partialResult = this.traverseUniqueVariant(
          option,
          `${option.name} ${name}`.trim(),
          partialResult
        )
      })
      return partialResult
    }
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
    overallStats = this.addStatsToField(
      variation.floating,
      overallStats,
      'floating'
    )

    const actualStock: { [key: string]: number } = {
      lazada: variation['actual-stock'],
    }
    overallStats = this.addStatsToField(
      actualStock,
      overallStats,
      'actual-stock'
    )
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

  isPromoFound(promoId: string): boolean {
    return this.findPromo(promoId, this) !== null
  }

  private findPromo(promoId: string, variation: Variations): any {
    const promos = variation.promos || []

    const found = promos.filter((promo) => promo.id === promoId)
    if (found.length > 0) {
      return found[0]
    }

    const options = variation.options || []
    for (const option of options) {
      const promo = this.findPromo(promoId, option)
      if (promo !== null) {
        return promo
      }
    }

    return null
  }

  static mapVariation(variation: any) {
    const v = new Variations()
    v.name = variation.name
    v.price = variation.price
    v.promos = variation.promos
    v.stock = Variations.mapStats(variation.stock)
    v['actual-stock'] = variation['actual-stock']
    v.sold = Variations.mapStats(variation.sold)
    v.floating = Variations.mapStats(variation.floating)
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

export default (variation: any): Variations => {
  if (variation === undefined || Object.keys(variation).length === 0) {
    return new Variations()
  }
  return Variations.mapVariation(variation)
}
