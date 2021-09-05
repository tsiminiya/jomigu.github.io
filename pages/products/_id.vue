<template>
  <div class="container product-details bg-white p-4">
    <p class="name">{{ name }}</p>
    <p class="text-center">
      <ShareNetwork
        network="twitter"
        :url="url"
        :title="name"
        :hashtags="hashtags"
        class="mr-2"
      >
        Share on <i class="bi-twitter"></i>
      </ShareNetwork>
      <ShareNetwork
        network="facebook"
        :url="url"
        :title="name"
        :hashtags="hashtags"
      >
        Share on <i class="bi-facebook"></i>
      </ShareNetwork>
    </p>
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
        <PriceDetails
          :price="price"
          :promos="promos"
          :stock="stock"
          :link="link"
          :variations="variations"
        />
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
    const hashtags = product.tags.join(',') + ',jomigu,jomiguonlineshop'

    return {
      id: product.id,
      name: product.name,
      sharingImage: product.sharing_image || product.images[0],
      images: product.images,
      description: product.description,
      price: product.price,
      promos: product.promos,
      stock: product.stock,
      variations: product.variations,
      link: product.link,
      url: `${process.env.baseUrl}/products/${product.id}`,
      hashtags,
    }
  },

  head() {
    return {
      title: this.name,
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.name,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.url,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            process.env.baseUrl +
            require(`~/assets/images/products/${this.sharingImage}`),
        },
      ],
    }
  },
}
</script>

<style lang="scss">
p.price {
  span {
    color: var(--jomigu-price);
    font-weight: bold;
  }

  span.on-sale {
    color: var(--jomigu-color-2);
    font-size: smaller;
    font-weight: normal;
    text-decoration: line-through;
  }
}

.description {
  white-space: pre-line;
}

.product-shop {
  width: 100%;
}

.name {
  font-size: larger;
  font-weight: bold;
  text-align: center;
}
</style>
