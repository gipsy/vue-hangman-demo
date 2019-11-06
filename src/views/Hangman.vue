<template>
  <div 
    class="flex flex-col justify-center lg:h-screen"
  >
    <div 
      class="flex flex-col sm:flex-row justify-center"
    >
      <div 
        class="m-2 max-w-sm mx-auto border-solid border-1 border-purple rounded-full shadow"
        :class="currentPlayer == 1 ? 'is-active' : ''"
      >
        <h3 class="text-center pt-5 player-title">Player 1</h3>
        <p 
          v-if="currentPlayer == 1"
          class="player-turn text-center"
        >guess the letter</p>
        <HangmanDiagram 
          :livesLeft="playerOneLives"
        />
        <p class="text-center pb-5 lives-left">lives left: {{ playerOneLives }}</p>
      </div>

      <div 
        class="m-2 max-w-sm mx-auto border-solid border-1 border-purple rounded-full shadow"
        :class="currentPlayer == 2 ? 'is-active' : ''"
      >
        <h3 class="text-center pt-5 player-title">Player 2</h3>
        <p 
          v-if="currentPlayer == 2"
          class="player-turn text-center"
        >guess the letter</p>
        <HangmanDiagram
          :livesLeft="playerTwoLives"
        />
        <p class="text-center pb-5 lives-left">lives left: {{ playerTwoLives }}</p>
      </div>
    </div>

    <div class="mt-5 flex flex-col">
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
      currentWord: '',
      listOfWords: [],
      usedLetters: [],
      playerOneLives: 1,
      playerTwoLives: 1,
      currentPlayer: 1,
      gameOver: false,
      // entryWordDefinitionUrl: 'https://od-api.oxforddictionaries.com/api/v2/entries/en-gb',
      entryWordDefUrl: 'https://owlbot.info/api/v3/dictionary',
      listOfWordsUrl: 'https://private-09961c-listofwords.apiary-mock.com/words'
    }
  },
  created() {

    fetch(this.listOfWordsUrl, {
      'method': 'GET',
      'headers': {
      }
    })
    .then((res) => res.json())
    .then(data => {
      this.listOfWords = Object.keys(data.results).filter(word => word.match(/^[^_]+$/))
      console.log(this.listOfWords)
      this.currentWord = this.listOfWords[Math.floor(Math.random() * this.listOfWords.length)]
    })
    .catch(err => {
      console.log(err)
    })
  },
  components: {
    HangmanDiagram,
    KeyboardLetter
  },
  methods: {
    selectLetter (letter) {
      this.currentPlayer == 1 
        ? this.currentPlayer = 2 
        : this.currentPlayer = 1
      console.log(letter);
    },
  },
  watch: {
    listOfWords (newVal, oldVal) {
      // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    },
    currentWord (newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)

      fetch(`${this.entryWordDefUrl}/${this.currentWord}`, {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token fbabc071a9d1e0ffc4b680d893ef9fce764eb253'
        },
      })
      .then((res) => res.json())
      .then(data => {
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
  },
}
</script>

<style>
.is-active {
  background-color: #9561e2;
}
.is-active .player-title,
.is-active .lives-left,
.is-active .player-turn {
  color: white;
}
</style>
