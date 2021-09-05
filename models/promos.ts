export class PromoListWrapper {
  private promos: any[] = []
  private promoMap: { [key: string]: any } = {}
  private empty: boolean = true

  constructor(promos: any[] = []) {
    this.promos = promos
    if (promos !== undefined && promos.length > 0) {
      this.empty = false
      this.promoMap = promos.reduce((partialResult, promo) => {
        partialResult[promo.id] = promo
        return partialResult
      }, {})
    }
  }

  getProductActivePromos(productPromos: any[]) {
    const promoIds = this.toPromoIdList()
    if (promoIds && promoIds.length > 0) {
      const activePromos = productPromos.filter((promo) =>
        promoIds.includes(promo.id)
      )
      if (activePromos.length > 0) {
        return activePromos.map((promo) => ({
          ...this.promoMap[promo.id],
          productPrice: promo.price,
        }))
      }
    }
    return []
  }

  toPromoIdList() {
    return this.promos.map((promo) => promo.id)
  }

  isEmpty() {
    return this.empty
  }
}

export default (promos: any[]) => {
  const wrapper = new PromoListWrapper()

  if (promos === undefined) {
    return wrapper
  }

  return new PromoListWrapper(promos)
}
