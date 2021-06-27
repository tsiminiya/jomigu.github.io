<template>
  <div class="container product-details bg-white p-4">
    <p class="name">{{ name }}</p>
    <div class="row">
      <div class="col-md-6">
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
      <div class="col-md-6 pt-3">
        <PriceDetails :price="price" :stock="stock" :link="link" />
      </div>
      <div class="col-md-12 pt-2">
        <strong>Description: </strong>
        <p class="description mt-2">{{ description }}</p>
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
      id: product.id,
      name: product.name,
      mainImage: product.images[0],
      images: product.images,
      description: product.description,
      price: product.price,
      stock: product.stock,
      link: product.link,
    }
  },

  head() {
    return {
      title: this.name,
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.baseUrl}/products/${this.id}`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            process.env.baseUrl +
            require(`~/assets/images/products/${this.mainImage}`),
        },
      ],
    }
  },
}
</script>
