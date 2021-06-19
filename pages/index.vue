<template>
  <div>
    <Banners />
    <Categories />
    <AllProducts />
  </div>
</template>

<script>
import featured from '../assets/images/sharing/facebook-sharing-image-june-2021.png'

export default {
  head() {
    return {
      title: 'Jomigu Online Shop',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [
        {
          charset: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'This is Jomigu Online Shop. Visit our site to get updates and to know more about the products we offer.',
        },
        {
          hid: 'fb:app_id',
          property: 'fb:app_id',
          content: '1476032742574888',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://shop.jomigu.com',
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'page',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Jomigu Online Shop',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'This is Jomigu Online Shop. Visit our site to get updates and to know more about the products we offer.',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `https://shop.jomigu.com${featured}`,
        },
      ],
    }
  },
}
</script>
