<template>
  <div class="banners container">
    <ul class="row list-style-none">
      <li class="col-md-8">
        <a href="/products/ad12e553-b0ae-4e2b-aba8-fa658ca40140">
          <img
            title="Jomigu August 2021 Promos"
            src="~/assets/images/banners/custom-yl-stickers-promo-september-2021.png"
          />
        </a>
      </li>
      <li class="col-md-4">
        <a href="/promos/9a56cfe1-82b9-42c6-92c3-1382c8c3c40a">
          <img
            title="Home School Kits"
            src="~/assets/images/banners/lazada-9.9-sale.png"
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
