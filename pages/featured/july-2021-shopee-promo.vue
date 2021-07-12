<template>
  <div>
    <h1 class="text-center mt-5">Jomigu July 2021 Promo</h1>
    <p class="text-center">
      <span style="font-size: xx-large">at </span>
      <a href="https://shp.ee/bqz68zz">
        <img src="~/assets/images/shops/shopee-small.png" />
      </a>
    </p>
    <p class="text-center">
      <small>From July 9 to July 31</small>
    </p>
    <p class="text-center">
      <span
        >Up to 40% off. Don't miss this chance. Visit and follow our shop at
      </span>
      <a href="https://shp.ee/bqz68zz">Shopee</a>
      <span>to learn more and updates in the future.</span>
    </p>
    <Products
      :current-time="currentTime"
      filter="promo"
      value="9b9a5e4d-7f4a-4677-ab6e-cdaa3108d6e4"
    />
  </div>
</template>

<script>
import moment from 'moment'
import sharingImage from '../../assets/images/sharing/july-2021-promo.png'

const TITLE = 'Jomigu July 2021 Promo'

export default {
  asyncData() {
    return { currentTime: moment().toDate() }
  },
  head() {
    return {
      title: TITLE,
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://shop.jomigu.com/featured/july-2021-shopee-promo/',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: TITLE,
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: TITLE,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${process.env.baseUrl + sharingImage}`,
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: '1200',
        },
      ],
    }
  },
}
</script>
