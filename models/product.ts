import createVariations from './variation'

export const getStats = (product: any, variations: any) => {
  let stockTotal = 0
  let floatingTotal = 0
  let soldTotal = 0

  const stock = variations.isEmpty()
    ? product.stock
    : variations.getOverallStats().stock
  Object.entries(stock).forEach((entry: [any, any]) => {
    stockTotal += entry[1]
  })

  const sold = variations.isEmpty()
    ? product.sold
    : variations.getOverallStats().sold
  Object.entries(sold).forEach((entry: [any, any]) => {
    soldTotal += entry[1]
  })

  const floating = variations.isEmpty()
    ? product.floating
    : variations.getOverallStats().floating
  Object.entries(floating).forEach((entry: [any, any]) => {
    floatingTotal += entry[1]
  })

  return { stockTotal, soldTotal, floatingTotal }
}

export const project = (product: any) => {
  const variations = createVariations(product.variations)

  const stats = getStats(product, variations)

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    stock: stats.stockTotal,
    sold: stats.soldTotal,
    floating: stats.floatingTotal,
    mainImage: product.images[0],
    promos: product.promos,
    variations: product.variations,
    hasVariations: !variations.isEmpty(),
  }
}

export const sort = (
  products: any[],
  sortBy: string = 'name',
  ascending: boolean = true
) => {
  products.sort((p1, p2) => {
    if (typeof p1[sortBy] === 'string' && typeof p2[sortBy] === 'string') {
      if (p1[sortBy].toString() < p2[sortBy].toString()) {
        return ascending ? -1 : 1
      } else if (p1[sortBy].toString() > p2[sortBy].toString()) {
        return ascending ? 1 : -1
      }
      return 0
    }
    return ascending ? p1[sortBy] - p2[sortBy] : p2[sortBy] - p1[sortBy]
  })

  return products
}

export const productFilters = {
  category(categoryId: string) {
    return (product: any) => {
      const categories = product.categories || []
      const found = categories.filter((id: string) => id === categoryId)
      return found.length > 0
    }
  },
  promo(promoId: string) {
    return (product: any) => {
      const promos = product.promos || []

      const found = promos
        .map((promo: any) => promo.id)
        .filter((id: string) => id === promoId)
      if (found.length > 0) {
        return true
      }

      const variations = createVariations(product.variations)

      return variations.isPromoFound(promoId)
    }
  },
}
