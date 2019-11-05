<template>
  <div class="flex flex-col justify-center h-screen">
    <HangmanDiagram />
    <div
      v-for="(row, key) in letters"
      :key="key"
      class="inline-flex justify-center"
    >
      <KeyboardLetter
        v-for="letter in row"
        :letter="letter"
        :game-over="gameOver"
        :key="letter"
        @letter-selected="selectLetter(letter)"
        v-cloak
      />
    </div>
  </div>
</template>

<script>
import HangmanDiagram from '@/components/HangmanDiagram'
import KeyboardLetter from '@/components/KeyboardLetter'

export default {
  name: 'hangman-view',
  data () {
    return {
      letters: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
      ],
      gameOver: false
    }
  },
  components: {
    HangmanDiagram,
    KeyboardLetter
  },
  methods: {
    selectLetter (letter) {
      console.log(letter);
    }
  }
}
</script>

<style>
</style>
