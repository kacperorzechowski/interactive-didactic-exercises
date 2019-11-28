<template>
  <v-layout>
    <v-col cols="9">
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>{{currentQuestion.question}}</v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <label class="answer" for="answer-one">
            <answer :selected="answer(0).value === selectedAnswer" :answer="answer(0)"/>
            <input v-model="selectedAnswer" id="answer-one" type="radio" name="answer" :value="answer(0).value"/>
          </label>
        </v-col>
        <v-col>
          <label class="answer" for="answer-two">
            <answer :selected="answer(1).value === selectedAnswer" :answer="answer(1)"/>
            <input v-model="selectedAnswer" id="answer-two" type="radio" name="answer" :value="answer(1).value"/>
          </label>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <label class="answer" for="answer-three">
            <answer :selected="answer(2).value === selectedAnswer" :answer="answer(2)"/>
            <input v-model="selectedAnswer" id="answer-three" type="radio" name="answer" :value="answer(2).value"/>
          </label>
        </v-col>
        <v-col>
          <label class="answer" for="answer-four">
            <answer :selected="answer(3).value === selectedAnswer" :answer="answer(3)"/>
            <input v-model="selectedAnswer" id="answer-four" type="radio" name="answer" :value="answer(3).value"/>
          </label>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-btn :disabled="selectedAnswer === null" @click="checkAnswer">Sprawdź</v-btn>
      </v-row>
    </v-col>

    <v-col cols="3">
      <v-card outlined v-for="stage in stages" :key="stage.stage" :color="activeStageColor(stage.stage)">
        <v-card-text class="text-center">{{stage.stagePoints}}</v-card-text>
      </v-card>
    </v-col>

    <v-dialog
      v-model="modal"
      width="500"
    >
      <v-card>
        <v-card-title class="headline">{{ modalHeader }}</v-card-title>
        <v-card-text>{{ modalContent }}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green darken-1" text @click="modal = false">Rozumiem</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
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
    score: 0,
    selectedAnswer: null,
    modal: false,
    modalHeader: '',
    modalContent: ''
  }),
  computed: {
    currentQuestion () {
      return this.exerciseProps.questions.find((question) => question.stage === this.currentStage)
    },
    stages () {
      return this.exerciseProps.questions.map(({ stage, stagePoints }) => ({
        stage,
        stagePoints
      })).reverse()
    }
  },
  methods: {
    answer (key) {
      return this.currentQuestion.answers[key]
    },
    checkAnswer () {
      if (this.isAnswerCorrect()) {
        if (this.isLastAnswer()) {
          this.finishTest()
        } else {
          this.updateStage()
        }
      } else {
        this.failTest()
      }
    },
    isAnswerCorrect () {
      return this.selectedAnswer === this.currentQuestion.expectedValue
    },
    updateStage () {
      this.score = this.currentQuestion.stagePoints
      this.currentStage++
      this.selectedAnswer = null
    },
    failTest () {
      this.fireModal(`Ups! :(`, `Błędna odpowiedź. Twój wynik ${this.score}`)
      this.selectedAnswer = null
      this.currentStage = 1
      this.score = 0
    },
    activeStageColor (stage) {
      let color = ''

      if (stage === this.currentStage) {
        color = 'yellow'
      }

      return color
    },
    fireModal (header, content) {
      this.modal = true
      this.modalHeader = header
      this.modalContent = content
    },
    isLastAnswer () {
      return this.currentStage === this.stages.length
    },
    finishTest () {
      this.fireModal(`Brawo!`, `Zakończyłeś test z największym wynikiem ${this.currentQuestion.stagePoints}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .answer {
    input {
      opacity: 0;
      position: absolute;
    }
  }
</style>
