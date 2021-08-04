import Vue from 'vue'

const vueFB = {}

vueFB.install = function install(Vue, options) {
  ;(function (d, s, id) {
    let js
    const fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    // eslint-disable-next-line prefer-const
    js = d.createElement(s)
    js.id = id
    js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js'
    fjs.parentNode.insertBefore(js, fjs)
  })(window.document, 'script', 'facebook-jssdk')

  window.fbAsyncInit = function onSDKInit() {
    // eslint-disable-next-line no-undef
    FB.init(options)
    // eslint-disable-next-line no-undef
    FB.AppEvents.logPageView()
    // eslint-disable-next-line no-undef
    Vue.FB = FB
    window.dispatchEvent(new Event('fb-sdk-ready'))
  }

  Vue.FB = undefined
}

Vue.use(vueFB, {
  appId: '212019520858979',
  autoLogAppEvents: true,
  xfbml: true,
  version: 'v11.0',
})
