<template>
  <button
    class="text-xs font-normal rounded-full m-1 px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white"
    :id="letter"
    :disabled="disabled"
    @click="clicked()"
  >{{ letter }}</button>
</template>

<script>
export default {
  props: [
    'letter', 
    'gameOver'
  ],
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    clicked () {
      this.disabled = true
      this.$emit('letter-selected')
    },
  },
  watch: {
    gameOver (newValue) {
      this.disabled = newValue
    }
  }
}
</script>

<style scoped>
button:disabled {
  color: #CCC;
}
</style>
