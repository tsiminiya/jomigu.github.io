export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    base: '/',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Jomigu Online Shop',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'This is Jomigu Online Shop. Visit our site to get updates and to know more about the products we offer.',
      },
      {
        hid: 'fb:app_id',
        property: 'fb:app_id',
        content: '1476032742574888',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://shop.jomigu.com',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'page',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Jomigu Online Shop',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Jomigu Online Shop',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'This is Jomigu Online Shop. Visit our site to get updates and to know more about the products we offer.',
      },
      {
        hid: 'og:image:width',
        property: 'og:image:width',
        content: '1200',
      },
      {
        hid: 'og:image:height',
        property: 'og:image:height',
        content: '630',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // Peso Currency Filter
    '@/plugins/peso-currency.js',
    // Date Utils
    '@/plugins/date-utils.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://github.com/nicolasbeauvais/vue-social-sharing
    'vue-social-sharing/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    port: 4000,
  },

  env: {
    baseUrl: process.env.BASE_URL || 'https://shop.jomigu.com',
  },
}
