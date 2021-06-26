<template>
  <div class="container">
    <ul class="products">
      <li v-for="product in products" :key="product.id">
        <div>
          <a :href="`/products/${product.id}`">
            <img
              :src="require(`~/assets/images/products/${product.mainImage}`)"
              class="category"
            />
            <p>{{ product.name }}</p>
            <p>
              <span class="price">{{ product.price }}</span>
              <span> | </span>
              <small>Stock: {{ product.stock }}</small>
            </p>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
const project = (product) => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    stock: (product.stock.lazada || 0) + (product.stock.shopee || 0),
    mainImage: product.images[0],
  }
}

export default {
  data() {
    return {
      products: [],
    }
  },

  async fetch() {
    const productList = await this.$content('products').fetch()
    const categories = await this.$content('categories').fetch()
    categories.forEach((category) => {
      productList
        .filter((product) => product.categories.includes(category.id))
        .forEach((product) => this.products.push(project(product)))
    })
  },
}
</script>
