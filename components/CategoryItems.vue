<template>
  <b-container v-if="products.length > 0" fluid class="p-0 text-center">
    <p>
      <strong>Here are the items on the same category of {{ name }}</strong>
    </p>
    <b-link
      v-for="product in products"
      :key="product.id"
      :href="`/products/${product.id}`"
    >
      <b-img
        thumbnail
        fluid
        rounded
        width="80"
        height="80"
        class="m-1"
        :src="require(`~/assets/images/products/${product.images[0]}`)"
      />
    </b-link>
  </b-container>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: '',
    },
    excludedProducts: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return { products: [] }
  },

  async fetch() {
    const productList = await this.$content('products').fetch()

    const categoryMatched = (productCategories) => {
      for (const category of productCategories) {
        if (this.categories.includes(category)) {
          return true
        }
      }
      return false
    }

    this.products = productList
      .filter((product) => categoryMatched(product.categories))
      .filter((product) => !this.excludedProducts.includes(product.id))
  },
}
</script>

<style lang="scss">
.category-items {
  div {
    ul {
      padding: 0;
      overflow-x: scroll;

      li {
        display: inline-block;
        list-style: none;

        a {
          img {
            width: 20vw;
          }
        }
      }
    }
  }
}
</style>
