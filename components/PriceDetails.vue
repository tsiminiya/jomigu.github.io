<template>
  <div class="price-details">
    <Price
      :price="price"
      :promos="promos"
      :product-promos="productPromos"
      :variations="variations"
      style-class="price price-larger"
    />
    <Shops
      :shops="shops"
      :promo-shops="promoShops"
      :stock="stock"
      :link="link"
    />
  </div>
</template>

<script>
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
    shops: {
      type: Array,
      default: undefined,
    },
    promoShops: {
      type: Array,
      default: undefined,
    },
    productPromos: {
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
}
</script>
