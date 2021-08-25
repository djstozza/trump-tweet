<template>
  <v-container fluid>
    <form>
      <v-text-field
        :error-messages='nameErrors'
        :value='name'
        label='Name'
        required
        @input='setName'
        @blur='$v.name.$touch()'
      />
      <v-select
        :items='options'
        :error-messages='selectErrors'
        :value='selectedPhrase'
        item-text='label'
        label='Phrase'
        required
        @change='setSelectedPhrase'
        @blur="$v.selectedPhrase.$touch()"
      />
      <v-btn
        class='mr-4'
        color='primary'
        @click='submit'
        :disabled='!name || !selectedPhrase || submitting'
      >
        submit
      </v-btn>
      <v-btn
        @click='clear'
        :disabled='(!name && !selectedPhrase) || submitting'
      >
        clear
      </v-btn>
    </form>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

import TweetService from '@/services/tweetService'

export default {
  name: 'Form',

  mixins: [validationMixin],

  validations: {
    name: { required },
    selectedPhrase: { required }
  },

  data: () => ({
    submitting: false
  }),

  computed: {
    options () { return this.$store.state.tweetPhraseOptions },
    name () { return this.$store.state.name },
    selectedPhrase () { return this.$store.state.selectedPhrase },
    selectErrors () {
      const errors = []
      if (!this.$v.selectedPhrase.$dirty) return errors
      !this.$v.selectedPhrase.required && errors.push('Phrase is required')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    }
  },

  methods: {
    setSelectedPhrase (label) {
      this.$v.selectedPhrase.$touch()
      const tweetPhrase = this.options.find(option => option.label === label)

      this.$store.commit('setSelectedPhrase', tweetPhrase)
    },
    setName (name) {
      this.$v.name.$touch()
      this.$store.commit('setName', name)
    },
    async submit () {
      this.$v.$touch()
      this.submitting = true

      const { success, errors } = await TweetService.postTweet(this.name, this.selectedPhrase)

      this.submitting = false
      this.$store.commit('setErrors', errors)
      this.$store.commit('setSuccess', success)
    },
    clear () {
      this.$v.$reset()
      this.$store.commit('setSelectedPhrase', null)
      this.$store.commit('setName', '')
    }
  }
}
</script>
