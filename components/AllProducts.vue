<template>
  <div class="container">
    <ul class="row products narrow-padding">
      <li
        v-for="product in products"
        :key="product.id"
        class="col-6 col-sd-4 col-md-3 col-lg-2"
      >
        <a :href="`/products/${product.id}`">
          <img
            :src="require(`~/assets/images/products/${product.mainImage}`)"
            class="category"
          />
          <p class="mt-1">{{ product.name }}</p>
          <p class="mb-2">
            <span class="price">{{ product.price | peso_currency }}</span>
            <span> | </span>
            <small>Stock: {{ product.stock }}</small>
          </p>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
const project = (product) => {
  let name = product.name
  const nameLength = name.length
  if (nameLength > 50) {
    name = name.substring(0, 45) + '...'
  }

  return {
    id: product.id,
    name,
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
