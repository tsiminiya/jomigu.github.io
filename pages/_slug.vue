<template>
  <div class="topics container bg-white p-3">
    <h1 class="text-center my-5">{{ doc.title }}</h1>
    <div class="row">
      <div :class="`col-12 ${doc.allTextCentered ? 'text-center' : ''}`">
        <nuxt-content :document="doc" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const doc = await $content(params.slug || 'index').fetch()
    return { doc }
  },
}
</script>
