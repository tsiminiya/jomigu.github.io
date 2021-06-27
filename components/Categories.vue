<template>
  <div class="container">
    <ul class="row categories narrow-padding">
      <li v-for="category in categories" :key="category.id" class="col-4">
        <a v-if="category.name" href="#">
          <img :src="require(`~/assets/images/categories/${category.image}`)" />
          <p>
            {{ category.name }}
          </p>
        </a>
      </li>
    </ul>
  </div>
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
