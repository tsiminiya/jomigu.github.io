<template>
  <table class="table table-dark">
    <thead>
      <tr>
        <th>
          <table-header-sort-link
            name="name"
            title="Product Name"
            :sort-by="sortBy"
            :ascending="ascending"
            :on-change-sort="onChangeSort"
          />
        </th>
        <th>
          <table-header-sort-link
            name="stock"
            title="Stock"
            :sort-by="sortBy"
            :ascending="ascending"
            :on-change-sort="onChangeSort"
          />
        </th>
        <th>
          <table-header-sort-link
            name="floating"
            title="Floating"
            :sort-by="sortBy"
            :ascending="ascending"
            :on-change-sort="onChangeSort"
          />
        </th>
        <th>
          <table-header-sort-link
            name="sold"
            title="Sold"
            :sort-by="sortBy"
            :ascending="ascending"
            :on-change-sort="onChangeSort"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in sortedProducts" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.stock }}</td>
        <td
          :class="`${
            product.floating > 0 ? 'text-warning font-weight-bold' : ''
          }`"
        >
          {{ product.floating }}
        </td>
        <td>{{ product.sold }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { project, sort } from '../models/product'

export default {
  props: {
    sortBy: {
      type: String,
      default: 'name',
    },
    ascending: {
      type: Boolean,
      default: true,
    },
    onChangeSort: {
      type: Function,
      default: () => () => {},
    },
  },

  data() {
    return {
      products: [],
    }
  },

  async fetch() {
    const products = await this.$content('products').fetch()
    this.products = products.map(project)
  },

  computed: {
    sortedProducts() {
      return sort(this.products, this.sortBy, this.ascending)
    },
  },
}
</script>

<style>
a.sorting-links {
  cursor: pointer;
  color: #fff;
}
</style>
