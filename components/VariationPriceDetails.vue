<template>
  <div class="price-details">
    <Price
      :price="price"
      :promos="promos"
      :has-variations="true"
      :variations="variations"
      style-class="price price-larger"
    />
    <Shops :promo-shops="promoShops" :stock="stock" :link="link" />
    <VariationsList :variations="variationList" />
  </div>
</template>

<script>
import createPromoListWrapper from '../models/promos'
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
      default: undefined,
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
      variationList: [],
      promoShops: [],
    }
  },

  fetch() {
    const variations = createVariations(this.variations)
    this.variationList = variations.getUniqueVariations().map((variation) => {
      const promoListWrapper = createPromoListWrapper(this.promos)
      const activePromos = promoListWrapper.getProductActivePromos(
        variation.promos
      )
      const hasPromo = activePromos.length > 0

      return {
        name: variation.name,
        price: variation.price,
        hasPromo,
        promoPrice: hasPromo ? activePromos[0].productPrice : undefined,
        stock: variation.stock,
        sold: variation.sold,
        promos: variation.promos,
        image: variation.image,
      }
    })

    const promoListWrapper = createPromoListWrapper(this.promos)
    const variationPromos = this.variationList.reduce(
      (partialResult, variation) => {
        variation.promos.forEach((promo) => partialResult.push(promo))
        return partialResult
      },
      []
    )
    const activePromos =
      promoListWrapper.getProductActivePromos(variationPromos)
    this.promoShops = activePromos.map((promo) => promo.shop)
  },
}
</script>
