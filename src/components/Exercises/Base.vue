<template>
  <div></div>
</template>

<script>
export default {
  name: 'Base',
  props: {
    /* set by parent to fire validation on exercise */
    emitResults: {
      type: Boolean,
      default: false
    },
    /* comes from API, used to set properties on exercise component such as label etc. */
    exerciseProps: {
      type: Object,
      required: true
    }
  },
  watch: {
    emitResults (shouldEmit) {
      if (shouldEmit) {
        this.$emit('validate', this.validate())
      }
    }
  }
}
</script>
