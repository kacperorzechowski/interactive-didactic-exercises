<template>
  <div>
    <v-text-field :label="exerciseProps.label" v-model="testValue"></v-text-field>
  </div>
</template>

<script>
import Base from './Base'

/*
Tests input value by comparing it to expected value from prop
 */
export default {
  name: 'TestInputValue',
  extends: Base,
  data: () => ({
    testValue: null
  }),
  methods: {
    validate () {
      let score = 0

      console.log({
        db: this.exerciseProps.expectedValue,
        input: this.testValue
      })

      if (this.testValue === this.exerciseProps.expectedValue) {
        score = 100
      }

      return score
    }
  }
}
</script>
