<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>{{currentQuestion.question}}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <answer :answer="answer(0)" @click="selectAnswer(answer(0).value)"/>
      </v-col>
      <v-col>
        <answer :answer="answer(1)" @click="selectAnswer(answer(1).value)"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <answer :answer="answer(2)" @click="selectAnswer(answer(2).value)"/>
      </v-col>
      <v-col>
        <answer :answer="answer(3)" @click="selectAnswer(answer(3).value)"/>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn :disabled="selectedAnswer === null">Sprawdź i przejdź dalej</v-btn>
    </v-row>
  </div>
</template>

<script>
import Base from './Base'
import Answer from './MillionaireComponents/Answer'

export default {
  name: 'Millionaire',
  components: { Answer },
  extends: Base,
  data: () => ({
    currentStage: 1,
    selectedAnswer: null
  }),
  computed: {
    currentQuestion () {
      return this.exerciseProps.questions.find((question) => question.stage === this.currentStage)
    }
  },
  methods: {
    answer (key) {
      return this.currentQuestion.answers[key]
    },
    selectAnswer (value) {

    }
  }
}
</script>
