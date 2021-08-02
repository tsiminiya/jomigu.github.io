<template>
  <div>
    <p class="price price-larger">
      <span v-if="onSale" class="price promo">{{
        promoPrice | peso_currency
      }}</span>
      <span :class="`price ${onSale ? 'on-sale' : ''}`">{{
        product.price | peso_currency
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
export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
    shopList: {
      type: Array,
      default: () => [],
    },
    promoList: {
      type: Array,
      default: () => [],
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

  fetch() {
    console.log(this.shopList)
    console.log(this.promoList)
    const promoIds = this.promoList.map((promo) => promo.id)

    this.promoPrice = this.product.price
    const productPromos = this.product.promos || []
    let activePromos = []
    if (promoIds && promoIds.length > 0) {
      activePromos = productPromos.filter((promo) =>
        promoIds.includes(promo.id)
      )
      if (activePromos.length > 0) {
        this.promoPrice = activePromos[0].price
        this.onSale = true
      }
    }

    const activePromoIds = activePromos.map((promo) => promo.id)
    const promoShops = this.promoList
      .filter((promo) => activePromoIds.includes(promo.id))
      .map((promo) => promo.shop)

    for (const shop of this.shopList) {
      const shopStock = {
        key: shop.slug,
        name: shop.name,
        stock: this.product.stock[shop.slug],
        link: this.product.link[shop.slug],
        onSale: promoShops.includes(shop.id),
      }
      this.stockPerShop.push(shopStock)
    }

    this.shops = this.shopList.map((s) => ({ slug: s.slug, image: s.image }))
  },
}
</script>
