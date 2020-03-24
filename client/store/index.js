export const strict = false

export const state = () => ({
  colors: {
    mecaBlue: '',
    bgBeige: '#EE5BE9'
  },
  headerHeight: 56,
  resultsVisible: false,
  activeFooterTab: null,
  srcurl: '',
  frontpage: true,
  gotocamera: false
  // activeFooterTab: 'autopedia',
})

export const mutations = {
  updateFooterTab(state, tabName) {
    state.activeFooterTab = tabName
  },

  stickyTabs() {
    window.onscroll = function() {
      toggleSticky()
    }

    let tabs = document.querySelector('.meca--tabs')
    let content = document.querySelector('.meca--tabs-content')
    let header = document.getElementById('meca--header')
    let banner = document.getElementById('meca--autopedia-banner')
    let bannerHeight = 0

    if (banner) {
      bannerHeight = banner.clientHeight
    }
    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function toggleSticky() {
      if (window.pageYOffset > header.clientHeight + bannerHeight) {
        tabs.classList.add('meca--sticky-tabs')
        content.style.paddingTop = tabs.clientHeight + 'px'
      } else {
        tabs.classList.remove('meca--sticky-tabs')
        content.style.paddingTop = 0
      }
    }
  },
  showResults(state) {
    document.body.classList.add('meca--search-results-on')
    state.resultsVisible = true
  },
  hideResults(state) {
    document.body.classList.remove('meca--search-results-on')
    state.resultsVisible = false
  }
}
