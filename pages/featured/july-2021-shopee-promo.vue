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
    <div class="container py-5">
      <div class="row">
        <div class="col-12">
          <h2 class="text-center mb-4">Other promos</h2>
        </div>
        <div class="col-lg-6 bg-white p-3">
          <p style="font-size: large">
            <span>Now at only </span>
            <span style="font-size: x-large; font-weight: bold; color: #f00"
              >₱800</span
            >
            <span>from our Lazada store.</span>
          </p>
          <a href="/products/6c0a4460-47de-4540-a7d1-ab615c7f3ae8">
            <img
              src="~/assets/images/banners/featuring_atomic-habits.png"
              style="width: 100%"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import sharingImage from '../../assets/images/sharing/july-2021-promo_wide.png'

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
          hid: 'og:description',
          property: 'og:description',
          content:
            "Up to 40% off. Don't miss this chance. Visit and follow our shop at Shopeeto learn more and updates in the future.",
        },
      ],
    }
  },
}
</script>
