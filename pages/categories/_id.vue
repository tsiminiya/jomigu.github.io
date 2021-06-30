<template>
  <div>
    <AllProducts :filter="'category'" :value="categoryId" />
  </div>
</template>

<script>
export default {
  asyncData({ params }) {
    return { categoryId: params.id }
  },
}
</script>
