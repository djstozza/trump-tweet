<template>
  <div>
    <Form />
    <Tweets />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Timeline } from 'vue-tweet-embed'
import Form from '@/components/Form.vue'
import Tweets from '@/components/Tweets.vue'

export default Vue.extend({
  name: 'Home',

  components: {
    Form,
    Tweets
  }
})
</script>
