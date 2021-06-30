<template>
  <div class="container">
    <ul class="row products narrow-padding">
      <li v-if="products.length < 1" class="col-12 p-5 text-center">
        <span>
          We are currently updating the listing for this category or promo.
          Please come back soon. Thank you.
        </span>
        <p>
          <img src="~/assets/images/logo.png" class="logo" />
        </p>
      </li>
      <li
        v-for="product in products"
        v-else
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

const categoryFilters = {
  category(categoryId) {
    return (category) => category.id === categoryId
  },
}

const productFilters = {
  category() {
    return () => true
  },
}

export default {
  props: {
    filter: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    values: {
      type: Array,
      default: () => {},
    },
  },

  data() {
    return {
      products: [],
    }
  },

  async fetch() {
    const categoryFilter = categoryFilters[this.filter]
    const categoryFilterFunc =
      (categoryFilter && categoryFilter(this.values || this.value)) ||
      (() => true)

    const productList = await this.$content('products').fetch()
    const categories = (await this.$content('categories').fetch()).filter(
      categoryFilterFunc
    )

    const productFilter = productFilters[this.filter]
    const productFilterFunc =
      (productFilter && productFilter(this.value)) || (() => true)

    const pushed = {}
    categories.forEach((category) => {
      productList
        .filter((product) => !pushed[product.id])
        .filter((product) => product.categories.includes(category.id))
        .filter(productFilterFunc)
        .forEach((product) => {
          this.products.push(project(product))
          pushed[product.id] = product
        })
    })
  },
}
</script>
