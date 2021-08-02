<template>
  <div class="container">
    <ul class="row products narrow-padding">
      <li v-if="products.length < 1" class="col-12 p-5 text-center">
        <span>
          We are currently updating the listing for this category or promo.
          Please come back soon. Thank you.
        </span>
        <p>
          <img src="~/assets/images/logo.png" class="logo" />
        </p>
      </li>
      <li
        v-for="product in products"
        v-else
        :key="product.id"
        class="col-6 col-sd-4 col-md-3 col-lg-2"
      >
        <NuxtLink :to="`/products/${product.id}`" no-prefetch="">
          <img
            :src="require(`~/assets/images/products/${product.mainImage}`)"
            class="category"
          />
          <p class="mt-1">{{ product.name }}</p>
          <p v-if="product.hasVariants && product.onSale">
            <span class="price promo">{{
              product.priceRange.lowerPromo | peso_currency
            }}</span>
            <span class="price promo"> - </span>
            <span class="price promo">{{
              product.priceRange.upperPromo | peso_currency
            }}</span>
            <span class="price on-sale">{{
              product.priceRange.lower | peso_currency
            }}</span>
            <span class="price on-sale"> - </span>
            <span class="price on-sale">{{
              product.priceRange.upper | peso_currency
            }}</span>
          </p>
          <p v-else-if="product.hasVariants && !product.onSale">
            <span class="price">{{
              product.priceRange.lower | peso_currency
            }}</span>
            <span class="price"> - </span>
            <span class="price">{{
              product.priceRange.upper | peso_currency
            }}</span>
          </p>
          <p v-else>
            <span v-if="product.onSale" class="price promo">{{
              product.promoPrice | peso_currency
            }}</span>
            <span :class="`price${product.onSale ? ' on-sale' : ''}`">{{
              product.price | peso_currency
            }}</span>
          </p>
          <p class="mb-2">
            <small>Stock: {{ product.stock }}</small>
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script>
import moment from 'moment'
import createVariations from '../models/variation'

const project = (product, promoIds) => {
  let name = product.name
  const nameLength = name.length
  if (nameLength > 60) {
    name = name.substring(0, 55) + '...'
  }

  const variations = createVariations(product.variations)
  const stock = variations.isEmpty()
    ? product.stock
    : variations.getOverallStats().stock
  let stockTotal = 0
  Object.entries(stock).forEach((entry) => {
    stockTotal += entry[1]
  })

  let promoPrice = product.price
  let onSale = false
  const productPromos = product.promos || []
  if (promoIds && promoIds.length > 0) {
    const activePromos = productPromos.filter((promo) =>
      promoIds.includes(promo.id)
    )
    if (activePromos.length > 0) {
      promoPrice = activePromos[0].price
      onSale = true
    }
  }

  const priceRange = variations.buildPriceRange(promoIds)
  const hasVariants = priceRange !== undefined
  if (hasVariants) {
    onSale = priceRange.onSale
  }

  return {
    id: product.id,
    name,
    price: product.price,
    promoPrice,
    onSale,
    stock: stockTotal,
    mainImage: product.images[0],
    hasVariants,
    priceRange,
  }
}

const productFilters = {
  category(categoryId) {
    return (product) => {
      const categories = product.categories || []
      const found = categories.filter((id) => id === categoryId)
      return found.length > 0
    }
  },
  promo(promoId) {
    return (product) => {
      const promos = product.promos || []
      const found = promos
        .map((promo) => promo.id)
        .filter((id) => id === promoId)
      return found.length > 0
    }
  },
}

export default {
  props: {
    filter: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: undefined,
    },
    values: {
      type: Array,
      default: () => undefined,
    },
  },

  data() {
    return {
      products: [],
    }
  },

  async fetch() {
    const productList = await this.$content('products').fetch()

    const productFilter = productFilters[this.filter]
    const productFilterFunc =
      (productFilter && productFilter(this.value)) || (() => true)

    const now = moment().toDate()

    const promoIds = (
      await this.$content('promos')
        .where({
          'start-date': { $lt: now },
          'end-date': { $gt: now },
        })
        .fetch()
    ).map((promo) => promo.id)

    const pushed = {}
    productList
      .filter((product) => !pushed[product.id])
      .filter(productFilterFunc)
      .forEach((product) => {
        this.products.push(project(product, promoIds))
        pushed[product.id] = product
      })
  },
}
</script>
