<template>
  <div v-if="promos.length > 0" class="container promos pt-2">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body p-0">
            <img :src="require(`~/assets/images/sharing/${featuredBanner}`)" />
          </div>
          <div class="card-footer">
            <ul>
              <li v-for="promo in promos" :key="promo.id">
                <a :href="`/promos/${promo.id}`">
                  <i class="bi-chevron-right"></i>
                  <span class="promo-name">{{ promo.name }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      featuredBanner: null,
      promos: [],
    }
  },

  async fetch() {
    const now = moment().toDate()

    this.promos = (
      await this.$content('promos')
        .where({
          'end-date': { $gt: now },
        })
        .sortBy('start-date', 'desc')
        .fetch()
    ).filter((promo) => promo.sharing_image !== undefined)

    if (this.promos.length > 0) {
      this.featuredBanner = this.promos[0].sharing_image
    }
  },
}
</script>

<style lang="scss">
.promos {
  padding: 0;

  div {
    div {
      img {
        width: 100%;
        padding: 0;
      }

      ul {
        padding: 0;
        margin-bottom: 0;

        li {
          list-style: none;

          a {
            span {
              font-size: smaller;
            }
          }
        }
      }
    }
  }
}
</style>
