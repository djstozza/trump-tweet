<template>
  <v-container fluid>
    <div>
      Enter your name or Twitter handle and select a phrase from the form below to get 'The Donald' to insult you.
        #MGTA (Make Twitter Great Again)!
    </div>
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
      <v-snackbar
        v-model='showSuccess'
        color='success'
        :timeout="5000"
      >
        {{ success }}
      </v-snackbar>
      <v-snackbar
        :style="{'margin-bottom':calcMargin(i)}"
        v-for="(error, i) in errors"
        v-model='showErrors'
        color='error'
        :key="i"
        :timeout="5000"
      >
        {{ error }}
      </v-snackbar>
    </form>
  </v-container>
</template>

<script lang='ts'>
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

import TweetService from '@/services/tweetService'
import { TweetPhraseOption } from '../../types'

declare module 'vue/types/vue' {
  interface Vue {
    name: string,
    options: TweetPhraseOption[],
    resetResponses: () => void,
    selectedPhrase: TweetPhraseOption
  }
}

export default Vue.extend({
  name: 'Form',

  mixins: [validationMixin],

  validations: {
    name: { required },
    selectedPhrase: { required }
  },

  data: () => ({
    submitting: false,
    showSuccess: false,
    showErrors: false
  }),

  computed: {
    options (): string { return this.$store.state.tweetPhraseOptions },
    name () { return this.$store.state.name },
    selectedPhrase () { return this.$store.state.selectedPhrase },
    selectErrors () {
      const errors: string[] = []
      if (!this.$v.selectedPhrase.$dirty) return errors
      !this.$v.selectedPhrase.required && errors.push('Phrase is required')
      return errors
    },
    nameErrors () {
      const errors: string[] = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    errors () {
      return this.$store.state.errors
    },
    success () {
      return this.$store.state.success
    }
  },

  methods: {
    setSelectedPhrase (label: string): void {
      this.$v.selectedPhrase.$touch()
      const tweetPhrase = this.options.find(option => option.label === label)

      this.$store.commit('setSelectedPhrase', tweetPhrase)
    },
    setName (name: string): void {
      this.$v.name.$touch()
      this.$store.commit('setName', name)
    },
    resetResponses (): void {
      this.$store.commit('setErrors', [])
      this.$store.commit('setSuccess', '')
      this.showSuccess = false
      this.showErrors = false
    },
    async submit (): Promise<void> {
      this.$v.$touch()
      this.submitting = true
      this.resetResponses()

      const { success, errors } = await TweetService.postTweet(this.name, this.selectedPhrase)

      this.submitting = false
      this.$store.commit('setErrors', errors)
      this.$store.commit('setSuccess', success)
      this.showSuccess = Boolean(success)
      this.showErrors = Boolean(errors.length)
    },
    clear (): void {
      this.$v.$reset()
      this.$store.commit('setSelectedPhrase', null)
      this.$store.commit('setName', '')
      this.resetResponses()
    },
    calcMargin (i: number): string {
      return (i * 60) + 'px'
    }
  }
})
</script>
