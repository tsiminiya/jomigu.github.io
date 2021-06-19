<template>
  <header>
    <ul class="header-details">
      <li class="logo-container">
        <img src="~/assets/images/logo.png" class="logo" />
      </li>
      <li>
        <span class="title">Online Shop</span>
      </li>
      <li class="header-follow-link">
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
