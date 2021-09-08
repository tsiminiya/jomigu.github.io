<template>
  <div class="price-details">
    <Price
      :price="price"
      :promos="promos"
      :has-variations="true"
      :variations="variations"
      style-class="price price-larger"
    />
    <Shops :stock="stock" :link="link" />
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
}
</script>
