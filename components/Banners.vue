<template>
  <div class="banners container">
    <ul class="row list-style-none">
      <li class="col-md-8">
        <a href="/products/ad12e553-b0ae-4e2b-aba8-fa658ca40140">
          <img
            title="Custom YL Sticker Promo"
            src="~/assets/images/banners/custom-yl-stickers-promo-september-2021.png"
          />
        </a>
      </li>
      <li class="col-md-4">
        <a href="/promos/b3786142-669a-476d-983a-1c930756733f">
          <img
            title="Best Seller Books"
            src="~/assets/images/banners/best-seller-books-on-sale.png"
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
