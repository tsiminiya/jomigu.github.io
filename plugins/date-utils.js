import Vue from 'vue'
import moment from 'moment'

export default () => {
  Vue.filter('format_date_time', function (value) {
    const parsed = moment(value, "YYYY-MM-DD'T'HH:mm:ss")
    return parsed.format('MMMM DD, YYYY hh:mm A ')
  })
}
