<template>
  <header>
    <ul class="header-details">
      <li class="logo-container">
        <a href="/">
          <img src="~/assets/images/logo.png" class="logo" />
        </a>
      </li>
      <li>
        <a href="/">
          <span class="title">Online Shop</span>
        </a>
      </li>
      <li class="header-follow-link">
        <a href="/topics" class="mr-2 text-dark">Blog</a>
        <span class="follow-us-at">Follow us @</span>
        <a
          v-for="site in sites"
          :key="site.id"
          :href="site.url"
          :class="site.style"
        >
          <i :class="`bi-${site.icon}`"></i>
        </a>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {
      sites: [],
    }
  },

  async fetch() {
    this.sites = await this.$content('social-media').fetch()
  },
}
</script>
