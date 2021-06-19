<template>
  <ul class="categories">
    <li v-for="category in categories" :key="category.id">
      <a href="#">
        <img
          :src="require(`~/assets/images/categories/${category.image}`)"
          class="category"
        />
        <p>
          {{ category.name }}
        </p>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
    }
  },

  async fetch() {
    this.categories = await this.$content('categories').fetch()
  },
}
</script>
