<style scoped>
  .timeline-container {
    text-align: center;
  }
</style>

<template>
  <v-container class='timeline-container'>
    <Timeline
      :key='latestTweetId'
      id='hoaxDonalTrump'
      sourceType='profile'
      :options="{ tweetLimit: '3', width: '600' }"
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

export default Vue.extend({
  name: 'Tweets',

  components: {
    Timeline
  },

  data: () => ({
    latestTweetId: ''
  }),

  sockets: {
    broadcastTweet (data: string): void {
      this.latestTweetId = data
    }
  }
})
</script>
