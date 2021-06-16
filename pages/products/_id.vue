<template>
  <div>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const products = await $content('products').fetch()
    if (!params.id) {
      return { products }
    }
    return {
      products: products.filter((product) => product.id === params.id),
    }
  },
}
</script>
