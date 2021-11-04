import moment from 'moment'

export class PromoListWrapper {
  private promos: any[] = []
  private promoMap: { [key: string]: any } = {}
  private empty: boolean = true

  constructor(promos: any[] = []) {
    this.promos = promos
    if (promos !== undefined && promos.length > 0) {
      this.empty = false
      this.promoMap = promos.reduce((partialResult, promo) => {
        partialResult[promo.id] = {
          ...promo,
          bundle: promo.type === 'bundle',
        }
        return partialResult
      }, {})
    }
  }

  getActivePromos(): any[] {
    const now = moment()
    return this.promos.filter((promo) => {
      const startDate = moment(promo['start-date'])
      const endDate = moment(promo['end-date'])
      return startDate.isBefore(now) && endDate.isAfter(now)
    })
  }

  getProductActivePromos(productPromos: any[] = []) {
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

const hasVariations = (product: any) => {
  return (
    product.variations !== undefined &&
    product.variations !== null &&
    Object.keys(product.variations).length > 0
  )
}

const foundPromoIdOnVariations = (
  variations: any[] = [],
  promoId: string
): boolean => {
  let found = false
  for (const variation of variations) {
    found =
      (variation.promos || []).filter((promo: any) => promo.id === promoId)
        .length > 0
    if (found) {
      return true
    }
    found = foundPromoIdOnVariations(variation.options, promoId)
  }
  return found
}

const filterProducts = (products: any[], promoId: string) => {
  return products.filter((product: any) => {
    if (hasVariations(product)) {
      return foundPromoIdOnVariations(product.variations.options, promoId)
    } else {
      return (
        (product.promos || []).filter((promo: any) => promo.id === promoId)
          .length > 0
      )
    }
  })
}

const resolveShop = (shopId: string, shops: any[]) => {
  for (const shop of shops) {
    if (shopId === shop.id) {
      return shop.name
    }
  }
  return ''
}

export const project = (promo: any, products: any, shops: any[]): any => {
  return {
    name: promo.name,
    startDate: moment(promo['start-date']).format('YYYY-MM-DD HH:mm:ss'),
    endDate: moment(promo['end-date']).format('YYYY-MM-DD HH:mm:ss'),
    products: filterProducts(products, promo.id),
    shop: resolveShop(promo.shop, shops),
  }
}

export default (promos: any[]) => {
  const wrapper = new PromoListWrapper()

  if (promos === undefined) {
    return wrapper
  }

  return new PromoListWrapper(promos)
}
