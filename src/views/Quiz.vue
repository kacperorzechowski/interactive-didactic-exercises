<template>
  <v-container style="height: 100%">
    <v-card xs-12 class="pa-5" :loading="!isLoaded">
      <component
        v-for="(component, key) in componentInstances"
        :key="key"
        :is="component.instance"
        :emit-results="shouldValidate"
        :exercise-props="component.props"
        @validate="handleValidation"
      ></component>

      <v-row class="buttons mt-5" v-if="!options.disableActions">
        <v-btn @click="validate" :disabled="shouldValidate && showResult">sprawdz</v-btn>
        <v-btn color="secondary" @click="reset">Resetuj</v-btn>
        <div class="ml-3" v-if="!showResult">
          Dopasuj pola i kliknij sprawdz
        </div>
        <div class="ml-3" v-else>
          Twoj wynik to: {{ result }}
        </div>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Quiz',

  data: () => ({
    shouldValidate: false,
    components: [],
    result: 0,
    results: [],
    showResult: false,
    isLoaded: false
  }),
  computed: {
    exercise () {
      return this.$route.params.exercise
    },
    exercises () {
      return this.components[this.exercise] !== undefined ? this.components[this.exercise].exercises : []
    },
    options () {
      return this.components[this.exercise] !== undefined ? this.components[this.exercise].options : []
    },
    componentInstances () {
      const instances = []

      for (let component of this.exercises) {
        instances.push({
          instance: () => import(`@/components/Exercises/${component.componentName}`),
          props: component.props
        })
      }

      return instances
    }
  },
  watch: {
    results () {
      if (this.results.length === this.exercises.length) {
        this.countResults()
      }
    }
  },
  async mounted () {
    await axios.get('http://localhost:3000/tests')
      .then((response) => {
        this.components = response.data
        this.isLoaded = true
      })
      .catch(() => {
        this.isLoaded = true
      })
  },
  methods: {
    validate () {
      this.results = []
      this.shouldValidate = true
    },
    reset () {
      this.result = 0
      this.results = []
      this.showResult = false
      this.shouldValidate = false
    },
    handleValidation (result) {
      this.results.push(result)
    },
    countResults () {
      this.result = this.results.map(x => x / this.exercises.length)
        .reduce((p, c) => p + c)
      this.showResult = true
    }
  }
}
</script>
