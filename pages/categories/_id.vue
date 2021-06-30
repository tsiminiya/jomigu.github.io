<template>
  <div>
    <p class="name text-center px-5 pt-3 pb-1 font-weight-bold">
      {{ name }}
    </p>
    <Products :filter="'category'" :value="categoryId" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const category = (await $content('categories').fetch()).filter(
      (c) => c.id === params.id
    )[0]
    return { categoryId: params.id, name: category.name }
  },
}
</script>
