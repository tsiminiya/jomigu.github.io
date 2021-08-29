<template>
  <header class="sticky-top">
    <div class="container">
      <ul class="header-details">
        <li>
          <nuxt-link to="/">
            <img src="~/assets/images/strips/jomigu-20210827_strips.png" />
          </nuxt-link>
        </li>
        <li class="float-right mt-3">
          <a
            v-for="site in sites"
            :key="site.id"
            :href="site.url"
            :class="`${site.style} mr-2`"
          >
            <i :class="`bi-${site.icon}`"></i>
          </a>
        </li>
      </ul>
    </div>
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

<style lang="scss">
header {
  background-color: var(--jomigu-header-background);
  border-bottom: 3px solid var(--jomigu-color-1);
  height: 60px;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;

  div.container {
    ul.header-details {
      padding-left: 0;
      list-style: none;

      li {
        display: inline;

        a {
          color: var(--jomigu-color-3);
          font-size: larger;
        }
      }
    }
  }
}
</style>
