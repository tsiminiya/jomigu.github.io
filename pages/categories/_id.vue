<template>
  <div>
    <div class="container p-0">
      <p class="name text-center bg-white px-0 py-3 m-0 font-weight-bold">
        {{ name }}
      </p>
    </div>
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
