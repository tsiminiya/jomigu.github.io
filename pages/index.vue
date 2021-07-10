<template>
  <div>
    <Banners />
    <Categories />
    <Products :current-time="currentTime" />
  </div>
</template>

<script>
import featured from '../assets/images/sharing/facebook-sharing-image-june-2021.png'
import products from '../assets/videos/products/jomigu-7.7-products.mp4'

export default {
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
    currentTime: () => new Date(),
  },
}
</script>
