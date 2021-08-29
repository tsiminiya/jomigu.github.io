<template>
  <footer>
    <div class="container-fluid p-4 bg-jomigu-2 text-blue">
      <p class="text-center">
        Read our <a href="/topics" class="text-dark"><strong>Blog</strong></a>
        <span>|</span>
        <span>Follow us at</span>
      </p>
      <ul class="shops list-style-none">
        <li v-for="shop in shops" :key="shop.id">
          <p>
            <a :href="shop.url">
              <img :src="require(`~/assets/images/shops/${shop.image}`)" />
            </a>
          </p>
        </li>
      </ul>
      <ul class="sites list-style-none">
        <li v-for="site in sites" :key="site.id">
          <p>
            <a :href="site.url">
              <i :class="`bi-${site.icon} ${site.style}`"></i>
              <span>{{ site.name }}</span>
            </a>
          </p>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      shops: [],
      sites: [],
    }
  },

  async fetch() {
    this.shops = await this.$content('shops').fetch()
    this.sites = await this.$content('social-media').fetch()
  },
}
</script>

<style lang="scss">
footer {
  background-color: var(--jomigu-page-background);
  color: var(--jomigu-color-2);

  div {
    p {
      a {
        text-decoration: underline;
      }
    }

    ul.shops,
    ul.sites {
      text-align: center;
      color: var(--jomigu-color-2);

      li {
        display: inline-block;
        padding: 15px;

        p {
          a {
            color: var(--jomigu-color-2);

            img {
              width: 50%;
            }
          }
        }
      }
    }
  }
}
</style>
