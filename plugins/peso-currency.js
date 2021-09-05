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
    if (value.length) {
      return value.map((e) => `${PESO_FORMATTER.format(e)}`).join(' - ')
    }
    return `${PESO_FORMATTER.format(value)}`
  })
}
