<template>
  <div class="container bg-white p-3">
    <small class="float-right">{{ blog.published | format_date_time }}</small>
    <h1 class="text-center my-5">{{ blog.title }}</h1>
    <p class="text-right">
      <ShareNetwork
        network="facebook"
        :url="url"
        :title="blog.title"
        :hashtags="blog.hashtags"
      >
        Share on <i class="bi-facebook"></i>
      </ShareNetwork>
    </p>
    <div class="row">
      <div :class="`col-12 ${blog.allTextCentered ? 'text-center' : ''}`">
        <nuxt-content :document="blog" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const blog = await $content('blog', params.slug).fetch()
    return {
      blog,
      slug: params.slug,
      url: `${process.env.baseUrl}/blog/${params.slug}`,
    }
  },

  head() {
    return {
      title: this.blog.title,
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.blog.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.blog.subtitle,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.url,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.baseUrl + this.blog.sharing_image,
        },
      ],
    }
  },
}
</script>

<style>
img {
  width: auto;
  max-height: 650px;
}

em {
  color: rgb(76, 75, 80);
}

table {
  width: 50%;
  margin: 50px auto;
}

thead {
  background-color: #000;
  color: #fff;
}

th,
td {
  text-align: center;
}
</style>
