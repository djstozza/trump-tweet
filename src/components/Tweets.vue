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

<script>
import { Timeline } from 'vue-tweet-embed'

export default {
  name: 'Tweets',

  components: {
    Timeline
  },

  data: () => ({
    latestTweetId: '',
    timer: undefined
  }),

  sockets: {
    broadcastTweet: function (data) {
      this.latestTweetId = data
    }
  }
}
</script>
