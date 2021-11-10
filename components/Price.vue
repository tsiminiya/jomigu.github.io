<template>
  <p :class="styleClass">
    <span v-if="onSale" class="price promo">{{
      promoPrice | peso_currency
    }}</span>
    <span :class="`price ${onSale ? 'on-sale' : ''}`"
      >{{ priceRange | peso_currency }}
    </span>
    <!-- <a v-if="bundlePromo !== undefined" :href="`/promos/${bundlePromo.id}`">
      <span class="badge badge-dark text-white"
        >Buy {{ bundlePromo['bundle-count'] }} and get
        {{ bundlePromo['bundle-discount'] }}% off
      </span>
    </a> -->
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
      activePromo: undefined,
      bundlePromo: undefined,
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
        const bundlePromos = activePromos.filter((promo) => promo.bundle)
        if (bundlePromos.length > 0) {
          this.bundlePromo = bundlePromos[0]
        }

        let activePromo
        const nonBundlePromos = activePromos.filter((promo) => !promo.bundle)
        if (nonBundlePromos.length > 0) {
          activePromo = nonBundlePromos[0]
        } else {
          activePromo = activePromos[0]
        }

        this.onSale = nonBundlePromos.length > 0
        this.activePromo = activePromo
        if (activePromo.bundle) {
          this.promoPrice = [this.price]
        } else {
          this.promoPrice = [activePromo.productPrice]
        }
      }
    } else {
      const variations = createVariations(this.variations)
      const priceRangeWrapper = variations.getPriceRange()
      if (priceRangeWrapper.hasRange()) {
        this.priceRange = priceRangeWrapper.toArray()
      } else {
        this.priceRange = [priceRangeWrapper.toArray()[0]]
      }

      const promoPriceRangeWrapper = variations.getPromoPriceRange(this.promos)
      if (promoPriceRangeWrapper.promosFound) {
        this.onSale = true
        if (promoPriceRangeWrapper.hasRange()) {
          this.promoPrice = promoPriceRangeWrapper.toArray()
        } else {
          this.promoPrice = [promoPriceRangeWrapper.toArray()[0]]
        }
      }
    }
  },
}
</script>
