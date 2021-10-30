<template>
  <div>
    <Banners />
    <Promos />
    <Categories />
    <Products :promos="promos" :show-header="true" />
  </div>
</template>

<script>
import createPromoListWrapper from '../models/promos'
import featured from '../assets/images/sharing/facebook-sharing-image-october-2021.png'
import products from '../assets/videos/products/jomigu-7.7-products.mp4'

export default {
  async asyncData({ $content }) {
    // The following query will take all promos
    // on the time the project was build.
    const promoList = await $content('promos').fetch()

    return { promoList }
  },

  head() {
    return {
      title: 'Jomigu Online Shop',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${process.env.baseUrl + featured}`,
        },
        {
          hid: 'og:video',
          property: 'og:video',
          content: `${process.env.baseUrl + products}`,
        },
        {
          hid: 'og:video:url',
          property: 'og:video:url',
          content: `${process.env.baseUrl + products}`,
        },
        {
          hid: 'og:video:secure_url',
          property: 'og:video:secure_url',
          content: `${process.env.baseUrl + products}`,
        },
        {
          hid: 'og:video:type',
          property: 'og:video:type',
          content: 'video/mp4',
        },
        {
          hid: 'og:video:width',
          property: 'og:video:width',
          content: '1200',
        },
        {
          hid: 'og:video:height',
          property: 'og:video:height',
          content: '630',
        },
      ],
    }
  },

  computed: {
    promos() {
      return createPromoListWrapper(this.promoList).getActivePromos()
    },
  },
}
</script>

<style lang="scss">
#__layout > main > div > div > div.container.promos > div > div > div {
  border: 0;
  border-radius: 0;
}
div.container.promos > div > div > div > div.card-body.p-0 > a > img {
  border-radius: 0;
}
</style>
