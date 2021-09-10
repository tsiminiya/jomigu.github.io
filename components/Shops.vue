<template>
  <div>
    <table class="stock table table-bordered table-sm my-2">
      <thead class="thead-light">
        <tr>
          <th v-for="shop in shops" :key="shop.slug" class="text-center">
            <span v-if="shopNameHeader">{{ shop.name }}</span>
            <img
              v-else
              class="product-shop"
              :src="require(`~/assets/images/shops/${shop.logo}`)"
            />
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
              :class="`buy-btn btn btn-small ${
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
            <span v-else class="not-available"
              >Not available at {{ shopStock.name }}</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    promoShops: {
      type: Array,
      default: () => [],
    },
    stock: {
      type: Object,
      default: () => ({}),
    },
    link: {
      type: Object,
      default: () => ({}),
    },
    shopNameHeader: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      shops: [],
    }
  },

  async fetch() {
    const shops = await this.$content('shops').fetch()

    for (const shop of shops) {
      const shopStock = {
        key: shop.slug,
        name: shop.name,
        stock: this.stock[shop.slug],
        link: this.link[shop.slug],
        onSale: this.promoShops.includes(shop.id),
      }
      this.stockPerShop.push(shopStock)
    }

    this.shops = shops.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      logo: s.logo,
    }))
  },

  computed: {
    stockPerShop() {
      const stockPerShop = []

      for (const shop of this.shops) {
        const shopStock = {
          key: shop.slug,
          name: shop.name,
          stock: this.stock[shop.slug],
          link: this.link[shop.slug],
          onSale: this.promoShops.includes(shop.id),
        }
        stockPerShop.push(shopStock)
      }

      return stockPerShop
    },
  },
}
</script>
