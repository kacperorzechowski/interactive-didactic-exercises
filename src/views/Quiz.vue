<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card xs-12 class="pa-5">
          <component
            v-for="(component, key) in componentInstances"
            :key="key"
            :is="component.instance"
            :emit-results="shouldValidate"
            :exercise-props="component.props"
            @validate="handleValidation"
          ></component>
          <v-btn @click="validate">sprawdz</v-btn>
          <v-btn color="secondary" @click="reset">Resetuj</v-btn>
          <div v-if="!showResult">
            Wypelnij pola i kliknij sprawdz
          </div>
          <div v-else>
            Twoj wynik to: {{ result }}
          </div>
        </v-card>
      </v-flex>
    </v-layout>
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
    showResult: false
  }),
  computed: {
    componentInstances () {
      const instances = []

      for (let component of this.components) {
        instances.push({
          instance: () => import(`@/components/Exercises/${component.name}`),
          props: component.props
        })
      }

      return instances
    }
  },
  watch: {
    results () {
      if (this.results.length === this.components.length) {
        this.countResults()
      }
    }
  },
  mounted () {
    axios.get('http://localhost:3000/exercises').then((response) => {
      this.components = response.data
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
      this.result = this.results.map(x => x / this.components.length).reduce((p, c) => p + c)
      this.showResult = true
    }
  }
}
</script>
