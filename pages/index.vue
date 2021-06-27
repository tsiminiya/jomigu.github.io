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
          hid: 'og:image',
          property: 'og:image',
          content: `${process.env.baseUrl + featured}`,
        },
      ],
    }
  },
}
</script>
