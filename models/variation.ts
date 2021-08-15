export class Variations {
  name: string = ''
  price: number | undefined
  stock: { [key: string]: number } = {}
  sold: { [key: string]: number } = {}
  image: string | undefined
  options: Variations[] | undefined

  private empty: boolean = true

  getOverallStats() {
    return this.traverseAndAccumulate(this, {})
  }

  isEmpty() {
    return this.empty
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

  static mapVariation(variation: any) {
    const v = new Variations()
    v.name = variation.name
    v.price = variation.price
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
  if (variation === undefined) {
    return new Variations()
  }
  return Variations.mapVariation(variation)
}
