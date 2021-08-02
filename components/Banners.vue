<template>
  <div class="container">
    <ul class="row banners narrow-padding">
      <li class="col-md-8">
        <NuxtLink to="/featured/july-2021-shopee-promo">
          <img
            title="Jomigu July 2021 Promo at Shopee"
            src="~/assets/images/banners/jomigu-july-2021-promo_featured.png"
          />
        </NuxtLink>
      </li>
      <li class="col-md-4">
        <NuxtLink to="/products/6c0a4460-47de-4540-a7d1-ab615c7f3ae8">
          <img
            title="Atomic Habits"
            src="~/assets/images/banners/featuring_atomic-habits.png"
          />
        </NuxtLink>
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
