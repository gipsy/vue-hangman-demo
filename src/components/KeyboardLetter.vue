<template>
  <button
    class="text-xs font-normal rounded-full m-1 px-3 sm:px-4 sm:py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white"
    :id="letter"
    :disabled="checkIfDisabled() || disabled"
    @click="clicked()"
  >{{ letter }}</button>
</template>

<script>
export default {
  props: [
    'letter', 
    'selectedLettersArr',
    'loading',
    'gameOver'
  ],
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    clicked () {
      this.$emit('letter-selected')
    },
    checkIfDisabled () {
      return this.selectedLettersArr.includes(this.letter)
    }
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
    color: white;
    background-color: #ccc;
    border-color: #ccc;
  }
</style>
