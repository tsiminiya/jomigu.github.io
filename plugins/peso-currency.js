import Vue from 'vue'

export default () => {
  const PESO_FORMATTER = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  })

  Vue.filter('peso_currency', function (value) {
    if (!value) {
      return ''
    }
    return `${PESO_FORMATTER.format(value)}`
  })
}
