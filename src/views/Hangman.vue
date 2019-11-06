<template>
  <div 
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
  </div>
</template>

<script>
import HangmanDiagram from '@/components/HangmanDiagram'
import KeyboardLetter from '@/components/KeyboardLetter'

import axios from 'axios'
// import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'hangman-view',
  data () {
    return {
      letters: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
      ],
      word: '',
      words: [],
      usedLetters: [],
      playerOneLives: 0,
      playerTwoLives: 0,
      currentPlayer: 0,
      gameOver: false,
    }
  },
  created() {
    // const url = 'https://od-api.oxforddictionaries.com/api/v2/domains/en-gb'
    const url = 'https://private-09961c-listofwords.apiary-mock.com/words'
    axios.get(url)
      // headers: {
      //})
    .then(response => {
      console.log('axios response')
      console.log(response.data)
      // console.log(this)
      // JSON responses are automatically parsed.
      // this.posts = response.data
      this.words = Object.keys(response.data.results)
    })
    .catch(e => {
      console.log(e)
      // this.errors.push(e)
    })

    // axios({ method: 'GET', 'url': url }).then(result => {
    //   // this.ip = result.data.origin;
    //   console.log(result.data
    // }, error => {
    //   console.error(error);
    // })
  },
  components: {
    HangmanDiagram,
    KeyboardLetter
  },
  methods: {
    selectLetter (letter) {
      console.log(letter);
    },
  },
  computed: {
  },
}
</script>

<style>
</style>
