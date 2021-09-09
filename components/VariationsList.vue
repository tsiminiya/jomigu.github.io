<template>
  <div class="variations-list">
    <div class="card">
      <div class="card-header">
        There are
        {{ variations.length }}
        variations
        <i class="bi-chevron-right"></i>
        <button
          class="btn btn-secondary btn-sm float-right"
          @click="viewVariations"
        >
          View
        </button>
      </div>
      <div class="card-body">
        <b-modal
          ref="variations-view"
          title="Variations"
          footer-bg-variant="light"
          header-text-variant="light"
          centered
          ok-only
          ok-title="Close"
        >
          <b-carousel
            id="carousel-2"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333"
            @sliding-start="onSlideStart"
          >
            <b-carousel-slide
              v-for="(variation, index) in variations"
              :key="index"
              :caption="variation.name"
              :img-src="require(`~/assets/images/products/${variation.image}`)"
            ></b-carousel-slide>
          </b-carousel>
          <table class="table table-sm mt-3">
            <thead class="thead-light">
              <tr>
                <th></th>
                <th v-for="shop in shops" :key="shop.slug" class="text-center">
                  {{ shop.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span class="selling-price">
                    {{
                      (variations[variationIndex].promoPrice ||
                        variations[variationIndex].price) | peso_currency
                    }}
                  </span>
                  <small class="on-sale">
                    {{ variations[variationIndex].price | peso_currency }}
                  </small>
                </td>
                <td v-for="shop in shops" :key="shop.slug" class="text-center">
                  {{ variations[variationIndex].stock[shop.slug] }}
                </td>
              </tr>
            </tbody>
          </table>
        </b-modal>
        <img
          v-for="(variation, index) in variations"
          :key="index"
          :src="require(`~/assets/images/products/${variation.image}`)"
          class="m-1 product-thumbnails"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    variations: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      shops: [],
      variationIndex: 0,
    }
  },

  async fetch() {
    const shops = await this.$content('shops').fetch()
    this.shops = shops.map((s) => ({
      slug: s.slug,
      name: s.name,
      logo: s.logo,
    }))
  },

  methods: {
    viewVariations() {
      this.$refs['variations-view'].show()
    },
    onSlideStart(slide) {
      this.variationIndex = slide
    },
  },
}
</script>

<style lang="scss">
span.selling-price {
  color: var(--jomigu-color-1);
  font-weight: bold;
}

small.on-sale {
  text-decoration: line-through;
}

.product-thumbnails {
  width: 15%;
  border-radius: 10%;
}
</style>
