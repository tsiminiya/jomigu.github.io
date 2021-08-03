<template>
  <div class="container">
    <ul class="row banners narrow-padding">
      <li class="col-md-8">
        <a href="/featured/august-2021-promos">
          <img
            title="Jomigu August 2021 Promos"
            src="~/assets/images/banners/jomigu-august-2021-promo_featured.png"
          />
        </a>
      </li>
      <li class="col-md-4">
        <a href="/categories/dbefabad-c4be-4a4b-aeed-79feb1c6c517">
          <img
            title="Home School Kits"
            src="~/assets/images/banners/featuring_home-school-kits.png"
          />
        </a>
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
.banner-background {
  position: relative;
  width: 100%;
  background-image: url(~/assets/images/banners/jomigu-7.7-background.png);
  background-size: cover;
}

.floating-btn-image {
  display: block;
  width: 36%;
  cursor: pointer;
  border-radius: 10px;
  border: 2px solid #333;
  margin: 20px;
}
</style>
