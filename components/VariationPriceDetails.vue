<template>
  <div>
    <p v-if="onSale" class="price price-larger">
      <span class="price promo">{{
        priceRange.lowerPromo | peso_currency
      }}</span>
      <span class="price promo"> - </span>
      <span class="price promo">{{
        priceRange.upperPromo | peso_currency
      }}</span>
      <span class="price on-sale">{{ priceRange.lower | peso_currency }}</span>
      <span class="price on-sale"> - </span>
      <span class="price on-sale">{{ priceRange.upper | peso_currency }}</span>
    </p>
    <p v-else class="price price-larger">
      <span class="price">{{ priceRange.lower | peso_currency }}</span>
      <span class="price"> - </span>
      <span class="price">{{ priceRange.upper | peso_currency }}</span>
    </p>
  </div>
</template>

<script>
import moment from 'moment'
import createVariations from '../models/variation'

export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      shops: [],
      stockPerShop: [],
      onSale: false,
      priceRange: [],
    }
  },

  async fetch() {
    const variations = createVariations(this.product.variations)

    const now = moment().toDate()
    const promos = await this.$content('promos')
      .where({
        'start-date': { $lt: now },
        'end-date': { $gt: now },
      })
      .fetch()
    const promoIds = promos.map((promo) => promo.id)

    this.priceRange = variations.buildPriceRange(promoIds)
    this.onSale = this.priceRange.onSale
  },
}
</script>
