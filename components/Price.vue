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
import createVariations from '../models/variation'
import createPromoListWrapper from '../models/promos'

export default {
  props: {
    price: {
      type: Number,
      default: 0,
    },
    promos: {
      type: Array,
      default: () => [],
    },
    productPromos: {
      type: Array,
      default: () => [],
    },
    hasVariations: {
      type: Boolean,
      default: false,
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

  fetch() {
    if (!this.hasVariations) {
      this.priceRange = [this.price]
      this.promoPrice = [this.price]
      const promoListWrapper = createPromoListWrapper(this.promos)
      const activePromos = promoListWrapper.getProductActivePromos(
        this.productPromos || []
      )
      if (activePromos.length > 0) {
        this.onSale = true
        this.promoPrice = [activePromos[0].productPrice]
      }
    } else {
      const variations = createVariations(this.variations)
      const priceRangeWrapper = variations.getPriceRange()
      this.priceRange = priceRangeWrapper.toArray()

      const promoPriceRangeWrapper = variations.getPromoPriceRange(this.promos)
      if (promoPriceRangeWrapper.promosFound) {
        this.onSale = true
        this.promoPrice = promoPriceRangeWrapper.toArray()
      }
    }
  },
}
</script>
