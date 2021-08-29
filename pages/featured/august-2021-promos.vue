<template>
  <div>
    <div class="container">
      <h1 class="text-center mt-5">Jomigu August 2021 Promos</h1>
      <ul class="row products list-style-none">
        <li class="col-12">
          <img
            :src="require(`~/assets/images/featured/jomigu-books.png`)"
            class="featured-image"
          />
          <p class="font-weight-bold">Big discounts on books at Jomigu!</p>
          <p>
            Promo runs until August 31, 2021 so, hurry and grab your copies now.
          </p>
        </li>
      </ul>
    </div>
    <Products
      :current-time="currentTime"
      filter="promo"
      value="a752d847-0c32-4756-acdd-f5aeb2a935a7"
    />
    <div class="container">
      <h2 class="text-center mt-5">Other Promos</h2>
      <ul class="row products list-style-none">
        <li class="col-12">
          <img
            :src="
              require(`~/assets/images/banners/featuring_home-school-kits.png`)
            "
            class="featured-image"
          />
          <p class="font-weight-bold">
            Big discounts on home school kits at Jomigu!
          </p>
          <p>
            Just in time before the start of the school year. Promo is active
            until August 31.
          </p>
        </li>
      </ul>
    </div>
    <Products filter="category" value="dbefabad-c4be-4a4b-aeed-79feb1c6c517" />
  </div>
</template>

<script>
import moment from 'moment'
import sharingImage from '../../assets/images/sharing/august-2021-books-and-home-school-kits.png'

const TITLE = 'Jomigu August 2021 Promos'

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
          content: 'https://shop.jomigu.com/featured/august-2021-promos/',
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
            'Great discounts on books and home school kits. You can even get more discount in price and shipping using our store vouchers. Visit and follow our shops to learn more and get updates on our future promotions.',
        },
      ],
    }
  },
}
</script>

<style scoped>
.featured-image {
  float: left;
  width: 100%;
  margin-right: 10px;
}
</style>
