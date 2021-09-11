<template>
  <div>
    <div class="container featured">
      <img
        :src="require(`~/assets/images/sharing/${sharingImage}`)"
        class="featured-image"
      />
    </div>
    <Products :current-time="currentTime" filter="promo" :value="promoId" />
  </div>
</template>

<script>
import moment from 'moment'

export default {
  async asyncData({ $content, params }) {
    const promo = (await $content('promos').fetch()).filter(
      (p) => p.id === params.id
    )[0]

    return {
      promoId: promo.id,
      name: promo.name,
      sharingImage: promo.sharing_image,
      currentTime: moment().toDate(),
      description: promo.name,
    }
  },

  head() {
    const title = this.name

    return {
      title,
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://shop.jomigu.com/promos/${this.promoId}`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: title,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            process.env.baseUrl +
            require(`~/assets/images/sharing/${this.sharingImage}`),
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.featured {
  padding: 0;
}

.featured-image {
  width: 100%;
  padding: 0;
}
</style>
