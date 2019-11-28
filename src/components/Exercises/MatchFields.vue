<template>
  <v-layout>
    <v-col v-for="(column, index) in columns" :key="index" :cols="12 / columns.length">
      <v-row v-for="(field, index) in column.fields" :key="index">
        <v-card @click="select(field)" v-show="showField(field)">
          <v-card-title>{{field.label}}</v-card-title>
        </v-card>
      </v-row>
    </v-col>
  </v-layout>
</template>

<script>
import Base from './Base'

export default {
  name: 'MatchFields',
  extends: Base,
  data: () => ({
    cols: 6,
    selectedField: null
  }),
  computed: {
    fields () {
      return this.exerciseProps.fields
    },
    columns () {
      return this.exerciseProps.columns
    }
  },
  methods: {
    select (field) {
      //
    },
    showField (field) {
      return true
    }
  }
}
</script>
