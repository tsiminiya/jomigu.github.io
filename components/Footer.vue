<template>
  <footer>
    <div class="container-fluid p-4 bg-jomigu-2 text-blue">
      <p class="text-center">
        Have questions?
        <a href="mailto:inquire@jomigu.com" class="text-dark">
          inquire@jomigu.com
        </a>
      </p>
      <p class="text-center">
        Read our <a href="/topics" class="text-dark"><strong>Blog</strong></a>
        <span>|</span>
        <span>Follow us at</span>
      </p>
      <ul class="shops list-style-none row">
        <li
          v-for="(shop, index) in shops"
          :key="shop.id"
          :class="`${index === 0 ? 'offset-md-3 ' : ''}col-12 col-md-3`"
        >
          <p>
            <a :href="shop.url">
              <img :src="require(`~/assets/images/shops/${shop.image}`)" />
            </a>
          </p>
        </li>
      </ul>
      <ul class="sites list-style-none row">
        <li
          v-for="(site, index) in sites"
          :key="site.id"
          :class="`${index === 0 ? 'offset-md-3  ' : ''}col-12 col-md-3`"
        >
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
      padding: 0 15px;
      text-align: center;
      color: var(--jomigu-color-2);

      li {
        display: inline-block;
        padding: 0 10px;

        p {
          a {
            color: var(--jomigu-color-2);
            text-decoration: none;

            img {
              width: 40%;
            }
          }
        }
      }
    }
  }
}
</style>
