<style scoped>
  .timeline-container {
    text-align: center;
    width: 100vw;
    overflow-y: scroll;
  }
</style>

<template>
  <v-container ref='container' fluid class='timeline-container' :style="{ 'maxHeight':height }">
    <Timeline
      :key='latestTweetId'
      id='hoaxDonalTrump'
      sourceType='profile'
      :options="{ tweetLimit: '10', width: '600' }"
    />
  </v-container>
</template>

<script lang='ts'>
import Vue from 'vue'
import { Timeline } from 'vue-tweet-embed'

declare module 'vue/types/vue' {
  interface Vue {
    latestTweetId: string
  }
}

const APP_BAR_HEIGHT = 64

export default Vue.extend({
  name: 'Tweets',

  components: {
    Timeline
  },

  data: () => ({
    height: ''
  }),

  computed: {
    latestTweetId (): string { return this.$store.state.latestTweetId }
  },

  methods: {
    setContainerHeight () {
      this.height = window.innerHeight - (this.$refs.container as HTMLElement).offsetTop - APP_BAR_HEIGHT + 'px'
    }
  },

  mounted () {
    this.setContainerHeight()
  },

  created () {
    window.addEventListener('resize', this.setContainerHeight)
  }
})
</script>
