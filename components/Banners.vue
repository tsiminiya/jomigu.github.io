<template>
  <div class="container">
    <ul class="row banners narrow-padding">
      <li class="col-md-8">
        <a href="#">
          <img src="~/assets/images/banners/jomigu-7.7.png" />
        </a>
      </li>
      <li class="col-md-4 banner-background">
        <img
          title="Lazada - Jomigu Online Shop"
          src="~/assets/images/banners/jomigu-lazada-7.7.png"
          class="floating-btn-image"
          @click="goToLazada"
        />
        <img
          title="Shopee - Jomigu Online Shop"
          src="~/assets/images/banners/jomigu-shopee-7.7.png"
          class="floating-btn-image"
          @click="goToShopee"
        />
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
