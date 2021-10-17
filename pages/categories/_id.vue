<template>
  <div>
    <div class="container p-0">
      <p class="name text-center bg-white px-0 py-3 m-0 font-weight-bold">
        {{ name }}
      </p>
    </div>
    <Products :filter="'category'" :value="categoryId" :promos="promos" />
  </div>
</template>

<script>
import moment from 'moment'
import createPromoListWrapper from '../../models/promos'

export default {
  async asyncData({ $content, params }) {
    const now = moment().toDate()

    const category = (await $content('categories').fetch()).filter(
      (c) => c.id === params.id
    )[0]

    const promoList = await $content('promos')
      .where({
        'start-date': { $lt: now },
        'end-date': { $gt: now },
      })
      .fetch()

    return { categoryId: params.id, name: category.name, promoList }
  },

  computed: {
    promos() {
      return createPromoListWrapper(this.promoList).getActivePromos()
    },
  },
}
</script>
