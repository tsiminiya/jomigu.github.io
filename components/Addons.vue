<template>
  <div
    v-if="addonPromo !== null && addonProducts.length > 0"
    class="addons mt-2"
  >
    <div class="card">
      <div class="card-header">Add-ons</div>
      <div class="card-body">
        <b-modal
          ref="addons-view"
          title="Add-on"
          footer-bg-variant="light"
          header-text-variant="light"
          hide-footer
          centered
          ok-only
          ok-title="Close"
        >
          <b-carousel
            id="addons-carousel"
            v-model="addonIndex"
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
              v-for="(addonProduct, index) in addonProducts"
              :key="index"
              :img-src="
                require(`~/assets/images/products/${addonProduct.images[0]}`)
              "
            >
            </b-carousel-slide>
          </b-carousel>
          <p>
            <span>Pay </span>
            <strong>{{ addonProducts[addonIndex].name }}</strong>
            <span> at </span>
            <strong>{{ addonProducts[addonIndex].discount + '%' }}</strong>
            <span> off when you buy it together with </span>
            <strong>{{ name }}</strong>
          </p>
          <p class="text-center my-3 pb-0">
            <a :href="productLink" class="btn btn-success btn-sm"> Buy </a>
            <button class="btn btn-primary btn-sm" @click="hideModal">
              Close
            </button>
          </p>
        </b-modal>
        <ul>
          <li
            v-for="(addon, index) in addonProducts"
            :key="addon.id"
            class="mr-1"
          >
            <img
              class="product-thumbnails"
              :src="require(`~/assets/images/products/${addon.images[0]}`)"
              @click="viewAddonsAt(index)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import optional from '../models/optional'

const appendDiscount = (product, discount) => {
  const updatedProduct = product
  updatedProduct.discount = discount
  return updatedProduct
}

const getProductLink = (link, promo, shops) => {
  const shop = optional(shops)
    .map((list) => list.filter((shop) => shop.id === promo.shop))
    .filter((list) => list.length > 0)
    .map((list) => list[0])
    .orElse(null)
  if (shop !== null) {
    return link[shop.name.toLowerCase()]
  }
  return ''
}

const createProductFinder = (products) => ({
  find(productId) {
    return optional(products.filter((product) => product.id === productId))
      .filter((filteredProducts) => filteredProducts.length > 0)
      .map((filteredProducts) => filteredProducts[0])
      .orElse(null)
  },
})

export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    link: {
      type: Object,
      default: () => ({}),
    },
    shops: {
      type: Array,
      default: () => [],
    },
    productId: {
      type: String,
      default: '',
    },
    promos: {
      type: Array,
      default: () => [],
    },
    products: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      addonPromo: null,
      addonProducts: [],
      addonIndex: 0,
      productLink: '',
    }
  },

  fetch() {
    this.addonPromo = optional(this.promos)
      .map((promos) => promos.filter((promo) => promo.type === 'addon'))
      .filter((promos) => promos.length > 0)
      .map((promos) => promos[0])
      .orElse(null)
    const hasAddon = optional(this.addonPromo)
      .map((promo) => promo['main-products'])
      .map((mainProducts) => mainProducts.map((mainProduct) => mainProduct.id))
      .filter((mainProductIds) => mainProductIds.includes(this.productId))
      .isPresent()
    if (hasAddon) {
      const productFinder = createProductFinder(this.products)
      this.addonProducts = optional(this.addonPromo)
        .map((promo) => promo['addon-products'])
        .map((addons) =>
          addons.map((addon) =>
            appendDiscount(productFinder.find(addon.id), addon.discount)
          )
        )
        .orElse([])
      this.productLink = getProductLink(this.link, this.addonPromo, this.shops)
    }
  },

  methods: {
    viewAddonsAt(index) {
      this.addonIndex = index
      this.$refs['addons-view'].show()
    },

    hideModal() {
      this.$refs['addons-view'].hide()
    },

    onSlideStart(slide) {
      this.addonIndex = slide
    },
  },
}
</script>

<style lang="scss">
.addons {
  .card {
    .card-body {
      ul {
        list-style: none;
        padding-left: 0;

        li {
          display: inline;
        }
      }
    }
  }
}

.product-thumbnails {
  width: 15%;
  border-radius: 10%;
  cursor: pointer;
}
</style>
