<template>
  <main>
    <Header />
    <div class="content-wrapper">
      <Nuxt />
    </div>
    <div class="fb-customerchat" page_id="100375768626200" />
    <Footer />
  </main>
</template>

<script>
export default {
  mounted() {
    // window.FB.CustomerChat.show(true)
  },
}
</script>
