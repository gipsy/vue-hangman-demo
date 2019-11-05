<template>
  <div v-if="!isLoading"
    class="flex flex-col justify-center h-screen"
  >
    <HangmanDiagram 
    />
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
    <p v-if="isLoading">Loading Words...</p>
    <p v-if="isError">Can't load words</p>
  </div>
</template>

<script>
import HangmanDiagram from '@/components/HangmanDiagram'
import KeyboardLetter from '@/components/KeyboardLetter'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'hangman-view',
  async mounted () {
    await this.loadAllWords()
  },
  data () {
    return {
      letters: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
      ],
      word: '',
      usedLetters: [],
      playerOneLives: 0,
      playerTwoLives: 0,
      currentPlayer: 0,
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
    },
    ...mapActions({
      loadAllWords: 'words/loadAll',
    }),
  },
  computed: {
    ...mapGetters({
      isLoading: 'words/isLoading',
      isError: 'words/isError',
      allWordss: 'words/all',
    }),
  }
}
</script>

<style>
</style>
