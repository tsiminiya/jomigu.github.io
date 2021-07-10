<template>
  <div>
    <p class="price price-larger">
      <span v-if="onSale" class="price promo">{{
        promoPrice | peso_currency
      }}</span>
      <span :class="`price ${onSale ? 'on-sale' : ''}`">{{
        price | peso_currency
      }}</span>
    </p>
    <div>
      <strong>Stock:</strong>
      <table class="stock table table-bordered mt-2">
        <thead class="thead-light">
          <tr>
            <th v-for="shop in shops" :key="shop.slug" class="text-center">
              <img :src="require(`~/assets/images/shops/${shop.image}`)" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              v-for="shopStock in stockPerShop"
              :key="shopStock.key"
              class="count text-center"
            >
              {{ shopStock.stock }}
            </td>
          </tr>
          <tr>
            <td
              v-for="shopStock in stockPerShop"
              :key="shopStock.key"
              class="text-center"
            >
              <a
                v-if="shopStock.stock"
                :class="`buy-btn btn ${
                  shopStock.onSale ? 'btn-success' : 'btn-primary'
                } btn-sm`"
                :href="shopStock.link"
              >
                {{
                  `Buy ${
                    shopStock.onSale ? 'Sale Price' : `at ${shopStock.name}`
                  }`
                }}
              </a>
              <span v-else>Not available at {{ shopStock.name }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import createVariations from '../models/variation'

export default {
  props: {
    price: {
      type: Number,
      default: 0,
    },
    promos: {
      type: Array,
      default: undefined,
    },
    stock: {
      type: Object,
      default: () => {},
    },
    variations: {
      type: Object,
      default: undefined,
    },
    link: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      shops: [],
      stockPerShop: [],
      onSale: false,
      promoPrice: 0,
    }
  },

  async fetch() {
    const shops = await this.$content('shops').fetch()

    const now = moment().toDate()
    const promos = await this.$content('promos')
      .where({
        'start-date': { $lt: now },
        'end-date': { $gt: now },
      })
      .fetch()
    const promoIds = promos.map((promo) => promo.id)
    const promoShops = promos.map((promo) => promo.shop)

    this.promoPrice = this.price
    const productPromos = this.promos || []
    if (promoIds && promoIds.length > 0) {
      const activePromos = productPromos.filter((promo) =>
        promoIds.includes(promo.id)
      )
      if (activePromos.length > 0) {
        this.promoPrice = activePromos[0].price
        this.onSale = true
      }
    }

    const variations = createVariations(this.variations)
    const stock = variations.isEmpty()
      ? this.stock
      : variations.getOverallStats().stock

    for (const shop of shops) {
      const shopStock = {
        key: shop.slug,
        name: shop.name,
        stock: stock[shop.slug],
        link: this.link[shop.slug],
        onSale: promoShops.includes(shop.id),
      }
      this.stockPerShop.push(shopStock)
    }

    this.shops = shops.map((s) => ({ slug: s.slug, image: s.image }))
  },
}
</script>
