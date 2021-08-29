<template>
  <div class="categories container">
    <div class="card card-borderless">
      <div class="card-header card-title-header">Categories</div>
      <div class="card-body">
        <div class="container">
          <ul class="row list-style-none">
            <li
              v-for="category in categories"
              :key="category.id"
              class="col-6 col-md-4 col-lg-3 text-center"
            >
              <a :href="`/categories/${category.id}`">
                <img
                  :src="require(`~/assets/images/categories/${category.image}`)"
                />
                <p class="name">{{ category.name }}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
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

<style lang="scss">
.categories {
  padding: 0;

  .card {
    .card-body {
      div {
        ul {
          li {
            a {
              img {
                width: 75%;
              }

              p.name {
                font-weight: normal;
                font-size: small;
              }
            }
          }
        }
      }
    }
  }
}
</style>
