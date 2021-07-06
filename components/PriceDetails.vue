<template>
  <div>
    <p class="price price-larger">
      <span>{{ price | peso_currency }}</span>
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
                class="btn btn-primary btn-sm"
                :href="shopStock.link"
              >
                Buy at {{ shopStock.name }}
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
import createVariations from '../models/variation'

export default {
  props: {
    price: {
      type: Number,
      default: 0,
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
    }
  },

  async fetch() {
    const shops = await this.$content('shops').fetch()

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
      }
      this.stockPerShop.push(shopStock)
    }

    this.shops = shops.map((s) => ({ slug: s.slug, image: s.image }))
  },
}
</script>
