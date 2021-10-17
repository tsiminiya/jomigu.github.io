<template>
  <div>
    <div class="container">
      <h1 class="text-center mt-5">Products Stats</h1>
      <p>{{ timestamp }}</p>
      <stats-table
        :sort-by="sortBy"
        :ascending="ascending"
        :on-change-sort="onChangeSort"
      />
    </div>
  </div>
</template>

<script>
import StatsTable from '~/components/StatsTable.vue'

export default {
  components: { StatsTable },

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
