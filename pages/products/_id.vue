<template>
  <div class="container">
    <div class="product bg-white p-4">
      <p class="name">{{ name }}</p>
      <div class="row">
        <div class="col-md-6">
          <div>
            <b-carousel
              id="carousel-1"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333"
            >
              <b-carousel-slide
                v-for="(image, index) in images"
                :key="index"
                :img-src="require(`~/assets/images/products/${image}`)"
              ></b-carousel-slide>
            </b-carousel>
          </div>
        </div>
        <div class="col-md-6">
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const products = await $content('products').fetch()

    if (!params.id) {
      return { product: null }
    }

    const filtered = products.filter((product) => product.id === params.id)
    if (!filtered.length) {
      return { product: null }
    }

    const product = filtered[0]

    return {
      name: product.name,
      images: product.images,
      description: product.description,
    }
  },
}
</script>
