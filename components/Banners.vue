<template>
  <div class="banners container">
    <ul class="row list-style-none">
      <li class="col-md-8">
        <nuxt-link to="/featured/august-2021-promos">
          <img
            title="Jomigu August 2021 Promos"
            src="~/assets/images/banners/jomigu-august-2021-promo_featured.png"
          />
        </nuxt-link>
      </li>
      <li class="col-md-4">
        <nuxt-link to="/categories/dbefabad-c4be-4a4b-aeed-79feb1c6c517">
          <img
            title="Home School Kits"
            src="~/assets/images/banners/featuring_home-school-kits.png"
          />
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    goToShopee() {
      window.location.href = 'https://shopee.ph/mm2021'
    },

    goToLazada() {
      window.location.href = 'https://www.lazada.com.ph/shop/jomigu'
    },
  },
}
</script>

<style lang="scss">
.banners {
  ul {
    margin-bottom: 0;

    li {
      padding: 0;

      a {
        img {
          width: 100%;
          padding: 0;
        }
      }
    }
  }
}
</style>
