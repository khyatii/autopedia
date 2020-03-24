<template>
  <div
    id="meca--contribute"
    class="mt-2 mx-2">
    <v-dialog v-model="dialog">
      <v-btn
        slot="activator"
        class="ma-0"
        color="green accent-4"
        block
        dark>
        Je contribue
      </v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title>
          Contribuer à Mecanicus
        </v-card-title>

        <v-card-text>
          <p class="meca--txt-justify">
            Il sera bientôt possible de contribuer à la base de donnée Mecanicus car c'est votre outil.
          </p>
          <p class="meca--txt-justify">
            Vous pourrez poster vos vidéos, photos et articles favoris. Vous pourrez y ajouter ou modifier des informations que vous trouverez manquantes ou imprécises et même ajouter un prix d'achat ou de vente afin d'affiner la cote d'un véhicule.
          </p>
          <p class="text-xs-center ma-0">
            Mecanicus, un outil créé par des passionnés pour les passionnés.
          </p>
        </v-card-text>

        <v-divider/>

        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            flat
            @click="dialog = false">
            Fermer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style lang="sass" scoped>
#meca--contribute
  .v-dialog__container
    display: block !important
  button
    border-radius: 0
    height: 40px
  // background-color: green
</style>
