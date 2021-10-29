<template>
  <table class="table table-dark">
    <thead>
      <tr>
        <th>
          <table-header-sort-link
            name="name"
            title="Promo Name"
            :sort-by="sortBy"
            :ascending="ascending"
            :on-change-sort="onChangeSort"
          />
        </th>
        <th>
          <table-header-sort-link
            name="startDate"
            title="Start Date"
            :sort-by="sortBy"
            :ascending="ascending"
            :on-change-sort="onChangeSort"
          />
        </th>
        <th>
          <table-header-sort-link
            name="endDate"
            title="End Date"
            :sort-by="sortBy"
            :ascending="ascending"
            :on-change-sort="onChangeSort"
          />
        </th>
        <th>
          <table-header-sort-link
            name="shop"
            title="Shop"
            :sort-by="sortBy"
            :ascending="ascending"
            :on-change-sort="onChangeSort"
          />
        </th>
        <th>
          <span>Products</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="promo in sortedPromos" :key="promo.id">
        <td>
          <small>{{ promo.name }}</small>
        </td>
        <td>
          <small>{{ promo.startDate }}</small>
        </td>
        <td>
          <small>{{ promo.endDate }}</small>
        </td>
        <td>
          <small>{{ promo.shop }}</small>
        </td>
        <td>
          <ul>
            <li v-for="product in promo.products" :key="product.id">
              <small>{{ product.name }}</small>
            </li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import moment from 'moment'
import { project } from '../models/promos'
import { sort } from '../models/product'

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
      promos: [],
    }
  },

  async fetch() {
    const now = moment().toDate()
    const products = await this.$content('products').fetch()
    const shops = await this.$content('shops').fetch()
    const promos = await this.$content('promos')
      .where({
        'end-date': { $gt: now },
      })
      .fetch()
    this.promos = promos.map((promo) => project(promo, products, shops))
  },

  computed: {
    sortedPromos() {
      return sort(this.promos, this.sortBy, this.ascending)
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
