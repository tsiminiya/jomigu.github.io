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
        <a :href="`/products/${product.id}`">
          <img
            :src="require(`~/assets/images/products/${product.mainImage}`)"
            class="category"
          />
          <p class="mt-1">{{ product.name }}</p>
          <p class="mb-2">
            <span v-if="product.onSale" class="price promo">{{
              product.promoPrice | peso_currency
            }}</span>
            <span :class="`price ${product.onSale ? 'on-sale' : ''}`">{{
              product.price | peso_currency
            }}</span>
            <span> | </span>
            <small>Stock: {{ product.stock }}</small>
          </p>
        </a>
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
  if (nameLength > 50) {
    name = name.substring(0, 45) + '...'
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

  return {
    id: product.id,
    name,
    price: product.price,
    promoPrice,
    onSale,
    stock: stockTotal,
    mainImage: product.images[0],
  }
}

const categoryFilters = {
  category(categoryId) {
    return (category) => category.id === categoryId
  },
}

const productFilters = {
  category() {
    return () => true
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
      default: '',
    },
    values: {
      type: Array,
      default: () => {},
    },
  },

  data() {
    return {
      products: [],
    }
  },

  async fetch() {
    const categoryFilter = categoryFilters[this.filter]
    const categoryFilterFunc =
      (categoryFilter && categoryFilter(this.values || this.value)) ||
      (() => true)

    const productList = await this.$content('products').fetch()
    const categories = (await this.$content('categories').fetch()).filter(
      categoryFilterFunc
    )

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
    categories.forEach((category) => {
      productList
        .filter((product) => !pushed[product.id])
        .filter((product) => product.categories.includes(category.id))
        .filter(productFilterFunc)
        .forEach((product) => {
          this.products.push(project(product, promoIds))
          pushed[product.id] = product
        })
    })
  },
}
</script>
