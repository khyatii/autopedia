<template>
    <div>
        <!-- <i class="fas fa-user-circle fa-10x"></i> -->
        <!-- <i class="fa fa-user-circle fa-2x" aria-hidden="true" style="color:#1f568c"></i>
    <span>{{publication.userId.userName}}</span> -->
  <v-card class="mb-2 pa-2">
    <v-img
      :src="publication.file[0].path"
      height="200px" />
  </v-card>
  <span style="color:#1f568c">{{publication.file[0].name}}</span>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'
export default {
  name: 'publication',
  data() {
    return {
    }
  },
  props: {
    publication: {
      type: Object,
      default: null
    }
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style scoped>
.fas{
  font-size: 18px !important;
  padding-left: 7px !important;

}
</style>
