<template>
  <a class="sorting-links" @click="onChangeSort(name)">
    <span>{{ title }}</span>
    <i
      v-if="sortBy === name"
      :class="`${ascending ? 'bi-chevron-down' : 'bi-chevron-up'}`"
    ></i>
  </a>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    sortBy: {
      type: String,
      default: 'name',
    },
    ascending: {
      type: Boolean,
      default: true,
    },
    onChangeSort: {
      type: Function,
      default: () => () => {},
    },
  },
}
</script>
