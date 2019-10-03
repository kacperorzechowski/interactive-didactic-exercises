<template>
  <div>
    <v-card :color="color" outlined hover>
      <v-card-text>{{answer.label}}</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Answer',
  props: {
    answer: {
      required: true,
      type: Object
    },
    selected: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  computed: {
    color () {
      return this.selected ? 'amber lighten-4' : ''
    }
  }
}
</script>
