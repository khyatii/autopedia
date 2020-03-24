<template>
  <v-card class="px-2 mb-2">
    <v-subheader>{{ sectionTitle }}</v-subheader>
    <v-divider/>
    <v-card flat>
      <v-card-text class="overflow-hidden px-0 py-2">
        <v-layout
          row
          class="horiz-scroll">

          <!-- videos -->
          <slot
            :videos="videos"
            :base-page="basePage"
            name="videos">
            <v-flex
              v-for="video in videos"
              :key="`${basePage}-vid-${video.id}`"
              class="meca--no-line-height mr-2">
              <no-ssr placeholder="Chargement...">
                <!-- :src="`https://www.youtube.com/embed/'${video.youtubeId}?showinfo=0&rel=0&hl=fr&cc_lang_pref=fr&iv_load_policy=3`" -->
                <iframe
                  :src="`https://www.youtube.com/embed/${video.youtubeId}?showinfo=0`"
                  width="300px"
                  height="200px"
                  type="text/html"
                  seamless
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen/>
              </no-ssr>
            </v-flex>
          </slot>

          <!-- photos -->
          <slot
            :photos="photos"
            :base-page="basePage"
            name="photos">
            <v-flex
              v-for="photo in photos"
              :key="`${basePage}-pho-${photo.id}`"
              class="meca--no-line-height mr-2">
              <nuxt-link :to="'/single/photo/' + photo.id">
                <div
                  :style="{backgroundImage: 'url(' + photo.src + ')'}"
                  class="meca--x-scroll-photos"/>
              </nuxt-link>
            </v-flex>
          </slot>

          <!-- articles -->
          <slot
            :articles="articles"
            :base-page="basePage"
            name="articles">
            <v-flex
              v-for="article in articles"
              :key="`${basePage}-pho-${article.id}`"
              class="meca--no-line-height mr-2">

              <v-card class="meca--full-height meca--article-tile">
                <nuxt-link :to="'/single/article/' + article.id">
                  <v-card-text class="md-2 meca--full-height">
                    <article>
                      <v-layout
                        align-center
                        justify-center
                        row
                        fill-height
                        class="meca--article-title-layout pb-2">
                        <v-flex>
                          <h4>{{ article.title }}</h4>
                        </v-flex>
                      </v-layout>
                      <p
                        class="caption ma-0 mt-3 meca--txt-justify"
                        v-html="articlePreview(article.content)"/>
                        <!-- <p class="caption ma-0 mt-3 meca--txt-justify" v-html="">{{ articlePreview(article.content) }}</p> -->
                    </article>
                  </v-card-text>
                </nuxt-link>
              </v-card>
            </v-flex>
          </slot>

          <!-- autopedia -->
          <slot
            :autopedia-pages="autopediaPages"
            :base-page="basePage"
            name="autopediaPages">
            <v-flex
              v-for="autopediaPage in autopediaPages"
              :key="`${basePage}-aut-${autopediaPage.id}`"
              class="meca--no-line-height mr-2">
              <v-card>
                <nuxt-link :to="'/autopedia/car/' + autopediaPage.id">
                  <v-img
                    :src="autopediaPage.heroImage"
                    :title="`${autopediaPage.make} - ${autopediaPage.model}`"
                    height="200px"
                    width="260px"/>

                  <v-card-text
                    primary-title
                    class="pb-2 pt-3">
                    <h4>{{ autopediaPage.make }} - {{ autopediaPage.model }}</h4>
                    <!-- <span class="grey--text ma-0 mt-2">{{ autopediaPage.year_start }} - {{ autopediaPage.year_stop }}</span> -->
                    <span
                      v-if="autopediaPage.year_stop"
                      class="grey--text ma-0 mt-2">
                      {{ autopediaPage.year_start }} - {{ autopediaPage.year_stop }}
                    </span>
                    <span
                      v-else
                      class="grey--text ma-0 mt-2">
                      {{ autopediaPage.year_start }}
                    </span>
                  </v-card-text>
                </nuxt-link>
              </v-card>
            </v-flex>
          </slot>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: 'XScroll',

  props: {
    basePage: {
      type: String,
      default: 'mecanicus'
    },
    sectionTitle: {
      type: String,
      default: 'Propositions'
    },
    videos: {
      type: Array,
      default: null
    },
    photos: {
      type: Array,
      default: null
    },
    articles: {
      type: Array,
      default: null
    },
    autopediaPages: {
      type: Array,
      default: null
    }
  },

  computed: {
    articlePreview(content) {
      return content => content.slice(0, 200) + ' ...'
    }
  }
}
</script>

<style lang="sass" scoped>
.overflow-hidden
  overflow: hidden
  .horiz-scroll
    overflow-y: hidden
    overflow-x: scroll
    -webkit-overflow-scrolling: touch

.meca--x-scroll-photos
  width: 300px
  height: 250px
  background-size: cover
  background-position: center

article, h4, span
  white-space: initial
  line-height: initial

.meca--article-tile
  background-color: #ECEFF1
  article
    min-width: 260px
    width: 100%
    .meca--article-title-layout
      min-height: 48px
      border-bottom: 1px solid #C62828
</style>
