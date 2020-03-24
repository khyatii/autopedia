<template>
  <v-app>
    <v-content :style="`background-color: ${bgColor}; postion: relative`">
        <v-container fill-height>
          <router-view/>
        </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  computed: {
    bgColor() {
      return this.$store.state.colors.mecaBlue
    }
  }
}
</script>
