<template>
  <!-- <v-app> -->
    <v-content :style="` postion: relative; padding:0 !important`">
        <v-container fill-height>
          <router-view/>
        </v-container>
    </v-content>
  <!-- </v-app> -->
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
