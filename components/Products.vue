<template>
  <div class="products container">
    <div class="card card-borderless">
      <div class="card-header card-title-header">Products</div>
      <div class="card-body">
        <div class="container">
          <ul class="row list-style-none">
            <li v-if="products.length < 1" class="col-12 p-5 text-center">
              <span>
                We are currently updating the listing for this category or
                promo. Please come back soon. Thank you.
              </span>
              <p>
                <img src="~/assets/images/logo_inverse.png" class="logo" />
              </p>
            </li>
            <li
              v-for="product in products"
              v-else
              :key="product.id"
              class="col-6 col-sd-4 col-md-4 col-lg-4"
            >
              <nuxt-link :to="`/products/${product.id}`">
                <section class="product-info">
                  <img
                    :src="
                      require(`~/assets/images/products/${product.mainImage}`)
                    "
                  />
                  <p class="mt-1 mb-0 mx-1">
                    <span v-if="product.onSale" class="price promo">{{
                      product.promoPrice | peso_currency
                    }}</span>
                    <span :class="`price ${product.onSale ? 'on-sale' : ''}`"
                      >{{ product.price | peso_currency }}
                    </span>
                  </p>
                  <p class="mb-0 mx-1">
                    <span class="stat">Sold: {{ product.sold }}</span>
                    <span class="stat">Stock: {{ product.stock }}</span>
                  </p>
                  <p class="mx-1">
                    <span class="name">{{ product.name }}</span>
                  </p>
                </section>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import createVariations from '../models/variation'

const getStats = (product) => {
  let stockTotal = 0
  let soldTotal = 0

  const variations = createVariations(product.variations)

  const stock = variations.isEmpty()
    ? product.stock
    : variations.getOverallStats().stock
  Object.entries(stock).forEach((entry) => {
    stockTotal += entry[1]
  })

  const sold = variations.isEmpty()
    ? product.sold
    : variations.getOverallStats().stock
  Object.entries(sold).forEach((entry) => {
    soldTotal += entry[1]
  })

  return { stockTotal, soldTotal }
}

const project = (product, promoIds) => {
  let name = product.name
  const nameLength = name.length
  if (nameLength > 60) {
    name = name.substring(0, 40) + '...'
  }

  const stats = getStats(product)

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
    stock: stats.stockTotal,
    sold: stats.soldTotal,
    mainImage: product.images[0],
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
    showHeader: {
      type: Boolean,
      default: false,
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

<style lang="scss">
.products {
  padding: 0;

  .card {
    .card-body {
      div {
        ul {
          li {
            padding: 5px;

            a {
              .product-info {
                position: relative;
                height: 100%;
                border: 1px solid var(--jomigu-color-3);
                box-shadow: 2px 2px rgba(0, 0, 0, 0.1);

                img {
                  width: 100%;
                  border-bottom: 1px solid var(--jomigu-color-3);
                }

                p {
                  .price {
                    color: var(--jomigu-price);
                    font-weight: bold;
                  }

                  .price.on-sale {
                    color: var(--jomigu-color-5);
                    font-size: xx-small;
                    font-weight: normal;
                    text-decoration: line-through;
                  }

                  .stat {
                    text-transform: uppercase;
                    font-size: xx-small;
                  }

                  .name {
                    font-size: small;
                    font-weight: normal;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
