<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>Wybierz ćwiczenie</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-toolbar-items>
        <v-btn :to="{name: 'Exercise', params: { exercise: 'choiceFields'}}" text>Pola wyboru</v-btn>
        <v-btn :to="{name: 'Exercise', params: { exercise: 'matchFields'}}" text>Dopasuj pola</v-btn>
        <v-btn :to="{name: 'Exercise', params: { exercise: 'millionaire'}}" text>Milionerzy</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
