<template>
  <div
    id="meca--autopedia-banner"
    :style="{backgroundImage: 'url(' + carHeadings.heroImage + ')'}">
    <v-container
      fluid
      fill-height
      class="meca--gradient-overlay">
      <v-layout
        align-end
        justify-center
        row
        fill-height>
        <v-flex class="meca--banner-info">
          <h3>{{ carHeadings.make }} - {{ carHeadings.model }}</h3>
          <h6 v-if="carHeadings.year_stop">{{ carHeadings.year_start }} - {{ carHeadings.year_stop }}</h6>
          <h6 v-else>{{ carHeadings.year_start }}</h6>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'AutopediaBanner',
  props: {
    carHeadings: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="sass" scoped>
#meca--autopedia-banner
  background-size: 100%
  background-position: center
  height: 180px

.meca--banner-info
  flex: initial
  padding: 6px 0
  border-top: 3px solid white
  border-bottom: 3px solid white
  color: white
  text-align: center

.meca--gradient-overlay
  background: rgba(255,255,255,0.03)
  background: -moz-linear-gradient(top, rgba(255,255,255,0.03) 26%, rgba(0,0,0,0.6) 100%)
  background: -webkit-gradient(left top, left bottom, color-stop(26%, rgba(255,255,255,0.03)), color-stop(100%, rgba(0,0,0,0.6)))
  background: -webkit-linear-gradient(top, rgba(255,255,255,0.03) 26%, rgba(0,0,0,0.6) 100%)
  background: -o-linear-gradient(top, rgba(255,255,255,0.03) 26%, rgba(0,0,0,0.6) 100%)
  background: -ms-linear-gradient(top, rgba(255,255,255,0.03) 26%, rgba(0,0,0,0.6) 100%)
  background: linear-gradient(to bottom, rgba(255,255,255,0.03) 26%, rgba(0,0,0,0.6) 100%)
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#000000', GradientType=0 )
</style>
