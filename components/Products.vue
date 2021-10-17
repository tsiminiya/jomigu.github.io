<template>
  <div class="products container">
    <div class="card card-borderless">
      <div class="card-header card-title-header">{{ title }}</div>
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
              class="col-6 col-sd-4 col-md-3 col-lg-2"
            >
              <a :href="`/products/${product.id}`">
                <section class="product-info">
                  <img
                    :src="
                      require(`~/assets/images/products/${product.mainImage}`)
                    "
                  />
                  <Price
                    :price="product.price"
                    :promos="promos"
                    :product-promos="product.promos"
                    :variations="product.variations"
                    :has-variations="product.hasVariations"
                    style-class="mt-1 mb-0 mx-1 px-1"
                  />
                  <p class="mb-0 mx-1 px-1">
                    <span class="stat">Stock: {{ product.stock }}</span>
                  </p>
                  <p class="mx-1 lh-1 px-1">
                    <span class="name">{{ product.name }}</span>
                  </p>
                  <p
                    v-if="product.stock < 1"
                    class="badge badge-secondary out-of-stock"
                  >
                    Out of Stock
                  </p>
                </section>
              </a>
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
import { project } from '../models/product'

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
      if (found.length > 0) {
        return true
      }

      const variations = createVariations(product.variations)

      return variations.isPromoFound(promoId)
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
    title: {
      type: String,
      default: 'Products',
    },
  },

  data() {
    return {
      products: [],
      promoIds: [],
      promos: [],
    }
  },

  async fetch() {
    const productList = await this.$content('products').fetch()
    const now = moment().toDate()
    this.promos = await this.$content('promos')
      .where({
        'start-date': { $lt: now },
        'end-date': { $gt: now },
      })
      .fetch()

    const productFilter = productFilters[this.filter]
    const productFilterFunc =
      (productFilter && productFilter(this.value)) || (() => true)

    const pushed = {}
    productList
      .filter((product) => !pushed[product.id])
      .filter(productFilterFunc)
      .forEach((product) => {
        this.products.push(project(product))
        pushed[product.id] = product
      })
  },
}
</script>

<style lang="scss">
p.lh-1 {
  line-height: 1;
}

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
                    color: var(--jomigu-color-2);
                    font-size: x-small;
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

                p.out-of-stock {
                  position: absolute;
                  top: 5px;
                  left: 5px;
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
