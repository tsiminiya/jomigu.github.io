<template>
  <div class="banners container">
    <ul class="row list-style-none">
      <li class="col-md-8">
        <a href="/categories/0229bef0-bef5-4c2b-80e2-aa5c5d31f174">
          <img
            title="Just for you"
            src="~/assets/images/banners/just-for-you-jomigu_sharing.png"
          />
        </a>
      </li>
      <li class="col-md-4">
        <a href="/products/5ac258d0-6f96-46ab-92c5-2c9b7c601383">
          <img
            title="Try me!"
            src="~/assets/images/banners/try-my-budget-planner_sharing.png"
          />
        </a>
      </li>
      <li class="col-md-12">
        <a href="/categories/2d45aac8-2d54-4a5b-a9f3-1b73ce57510e">
          <img
            title="YL Bottle Cap Label Stickers"
            src="~/assets/images/banners/yl-most-wanted-and-top-10-stickers_sharing.png"
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
