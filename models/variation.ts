export class Pricing {
  name: string = ''
  price: number | undefined
  stock: { [key: string]: number } = {}
  sold: { [key: string]: number } = {}
  variant: Pricing | undefined
}

export class PriceDetails {
  pricingList: Pricing[] | undefined
  headerNames: string[] | undefined
}

export class Variations {
  name: string = ''
  price: number | undefined
  stock: { [key: string]: number } = {}
  sold: { [key: string]: number } = {}
  promos = []
  image: string | undefined
  options: Variations[] | undefined

  private empty: boolean = true

  getOverallStats() {
    return this.traverseAndAccumulate(this, {})
  }

  isEmpty() {
    return this.empty
  }

  buildPriceRange(promoIds = []) {
    if (this.isEmpty()) {
      return undefined
    }

    const prices: number[] = []
    const discountedPrices: number[] = []
    this.traverseAndExtractPrices([this], prices, discountedPrices, promoIds)

    if (prices.length < 1) {
      return undefined
    }

    const onSale = discountedPrices.length > 0

    return {
      lower: Math.min(...prices),
      upper: Math.max(...prices),
      onSale,
      lowerPromo: onSale ? Math.min(...discountedPrices) : undefined,
      upperPromo: onSale ? Math.max(...discountedPrices) : undefined,
    }
  }

  private traverseAndExtractPrices(
    options: Variations[],
    prices: number[],
    discountedPrices: number[],
    promoIds: string[]
  ) {
    for (const variation of options) {
      if (variation.price) {
        prices.push(variation.price)
        if (variation.promos && variation.promos.length > 0) {
          variation.promos
            .filter((promo: any) => promoIds.includes(promo.id))
            .forEach((promo: any) => {
              discountedPrices.push(promo.price)
            })
        }
      } else if (variation.options) {
        this.traverseAndExtractPrices(
          variation.options,
          prices,
          discountedPrices,
          promoIds
        )
      }
    }
  }

  buildPriceDetails() {
    const priceDetails = new PriceDetails()
    return priceDetails
  }

  private traverseAndAccumulate(
    variation: Variations,
    stats: { [key: string]: { [key: string]: number } }
  ) {
    let overallStats = this.copyHash(stats)
    overallStats = this.addStatsToField(variation.stock, overallStats, 'stock')
    overallStats = this.addStatsToField(variation.sold, overallStats, 'sold')
    variation.options?.forEach((option: Variations) => {
      overallStats = this.traverseAndAccumulate(option, overallStats)
    })
    return overallStats
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

  static mapVariation(variation: any = {}) {
    const v = new Variations()
    v.name = variation.name
    v.price = variation.price
    v.stock = Variations.mapStats(variation.stock)
    v.sold = Variations.mapStats(variation.sold)
    v.promos = variation.promos
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

export default (variations: any) => {
  if (variations == null) {
    return new Variations()
  }
  return Variations.mapVariation(variations)
}
