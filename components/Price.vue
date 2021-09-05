<template>
  <p :class="styleClass">
    <span v-if="onSale" class="price promo">{{
      promoPrice | peso_currency
    }}</span>
    <span :class="`price ${onSale ? 'on-sale' : ''}`"
      >{{ priceRange | peso_currency }}
    </span>
  </p>
</template>

<script>
import moment from 'moment'
import createVariations from '../models/variation'
import createPromoListWrapper from '../models/promos'

export default {
  props: {
    price: {
      type: Number,
      default: 0,
    },
    productPromos: {
      type: Array,
      default: () => [],
    },
    variations: {
      type: Object,
      default: () => ({}),
    },
    styleClass: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      onSale: false,
      promoPrice: 0,
      priceRange: undefined,
      promoPriceRange: undefined,
    }
  },

  async fetch() {
    const variations = createVariations(this.variations)
    if (variations.isEmpty()) {
      this.priceRange = [this.price]
    } else {
      const priceRangeWrapper = variations.getPriceRange()
      this.priceRange = priceRangeWrapper.toArray()
    }

    const now = moment().toDate()
    const promos = await this.$content('promos')
      .where({
        'start-date': { $lt: now },
        'end-date': { $gt: now },
      })
      .fetch()

    if (variations.isEmpty()) {
      this.promoPrice = [this.price]
      const promoListWrapper = createPromoListWrapper(promos)
      const activePromos = promoListWrapper.getProductActivePromos(
        this.productPromos || []
      )
      if (activePromos.length > 0) {
        this.onSale = true
        this.promoPrice = [activePromos[0].productPrice]
      }
    } else {
      const promoPriceRangeWrapper = variations.getPromoPriceRange(promos)
      if (promoPriceRangeWrapper.promosFound) {
        this.onSale = true
        this.promoPrice = promoPriceRangeWrapper.toArray()
      }
    }
  },
}
</script>
