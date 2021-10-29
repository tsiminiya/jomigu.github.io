<template>
  <div>
    <div class="container">
      <h1 class="text-center mt-5">Promos</h1>
      <p>{{ timestamp }}</p>
      <promos-table
        :sort-by="sortBy"
        :ascending="ascending"
        :on-change-sort="onChangeSort"
      />
    </div>
  </div>
</template>

<script>
import PromosTable from '~/components/PromosTable.vue'

export default {
  components: { PromosTable },

  data() {
    return {
      sortBy: 'name',
      ascending: true,
    }
  },

  computed: {
    timestamp() {
      return new Date()
    },
  },

  methods: {
    onChangeSort(sortBy) {
      this.ascending = this.sortBy !== sortBy || !this.ascending
      this.sortBy = sortBy
    },
  },
}
</script>
