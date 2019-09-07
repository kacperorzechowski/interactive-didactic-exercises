<template>
  <div>
    <v-card outlined hover>
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
    }
  }
}
</script>
