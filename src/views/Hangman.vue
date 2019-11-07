<template>
  <div 
    class="flex flex-col justify-center sm:h-screen"
  >
    <div 
      class="flex flex-col sm:flex-row justify-center"
    >
      <div 
        class="relative m-2 max-w-sm mx-auto border-solid border-1 border-purple rounded-full shadow"
        :class="currentPlayer == 1 ? 'is-active' : ''"
      >
        <h3 class="text-center pt-5 player-title">You</h3>
        <h1 
          v-if="winner == 1"
          class="text-center"
        >Win!</h1>
        <p 
          v-if="currentPlayer == 1"
          class="absolute w-full text-center text-white"
        >guess the letter</p>

        <HangmanBox :livesLeft="playerLives"/>

        <p class="text-center pb-5 lives-left">lives left: {{ playerLives }}</p>
      </div>

      <div 
        class="relative m-2 max-w-sm mx-auto border-solid border-1 border-purple rounded-full shadow"
        :class="currentPlayer == 2 ? 'is-active' : ''"
      >
        <h3 class="text-center pt-5 player-title">Computer</h3>
        <h1 
          v-if="winner == 2"
          class="text-center"
        >Win!</h1>
        <p 
          v-if="currentPlayer == 2"
          class="absolute w-full text-center text-white"
        >guess the letter</p>

        <HangmanBox :livesLeft="computerLives"/>

        <p class="text-center pb-5 lives-left">lives left: {{ computerLives }}</p>
      </div>
    </div>

    <div class="mt-5 flex flex-col">

      <div v-if="errors.length > 0">
        <h5 class="text-center text-red">Something wrong happens!</h5>
        <p 
          v-for="(error, i) in errors"
          :key="i"
          class="text-center font-bold text-red"
        >{{ error[i] }}</p>
      </div>

      <div v-else>
        <h4 class="text-center pb-1">Hint</h4>
        <p class="text-center text-grey-dark m-auto w-2/5">{{ wordDefinition }}</p>
        <GuessWord
          :displayed-letters-arr="displayWordArr"
          :letters-arr="guessWordArr"
        />
      </div>

      <div
        v-for="(row, key) in letters"
        :key="key"
        class="inline-flex justify-center"
      >
        <KeyboardLetter
          v-for="letter in row"
          :letter="letter"
          :selectedLettersArr="usedLetters"
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
import HangmanBox from '@/components/HangmanBox'
import KeyboardLetter from '@/components/KeyboardLetter'
import GuessWord from '@/components/GuessWord'

export default {
  name: 'hangman-view',
  data () {
    return {
      letters: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
      ],
      guessWordStr: '',
      guessWordArr: [],
      displayWordArr: [],
      listOfWords: [],
      wordDefinition: '',
      usedLetters: [],
      playerLives: 11,
      computerLives: 11,
      currentPlayer: 1,
      gameOver: false,
      entryWordDefUrl: 'https://owlbot.info/api/v3/dictionary',
      listOfWordsUrl: 'https://private-09961c-listofwords.apiary-mock.com/words',
      errors: [],
      winner: false,
      hintIndex: 0
    }
  },
  created() {

    fetch(this.listOfWordsUrl, {
      'method': 'GET',
    })
    .then((res) => res.json())
    .then(data => {
      this.listOfWords = Object.keys(data.results).filter(word => word.match(/^[^_]+$/))
      this.guessWordStr = this.listOfWords[Math.floor(Math.random() * this.listOfWords.length)]
      this.guessWordArr = this.guessWordStr.toUpperCase().split('')
      this.displayWordArr = this.guessWordArr.map(() => '')
    })
    .catch(err => {
      console.log(err)
      this.errors.push(err)
    })
  },
  components: {
    HangmanBox,
    GuessWord,
    KeyboardLetter
  },
  methods: {
    selectLetter (letter) {

      if (this.usedLetters.includes(letter)) {
        return
      }

      this.usedLetters.push(letter)
      let match = false

      for (let i = 0; i < this.guessWordArr.length; i++) {
        if (letter === this.guessWordArr[i]) {
          this.displayWordArr.splice(i, 1, letter)
          match = true
        }
      }

      if (!match && this.currentPlayer == 1) {
        this.playerLives--
      }

      if (!match && this.currentPlayer == 2) {
        this.computerLives--
      }

      if (!match) {
        this.currentPlayer == 1 ? this.currentPlayer = 2 : this.currentPlayer = 1
      }

      if (this.currentPlayer == 2) {
        let unusedLetters = [].concat(...this.letters).filter(letter => !this.usedLetters.includes(letter))
        let randomLetter = unusedLetters[Math.floor(Math.random() * unusedLetters.length)]
        this.computerSelectLetter(randomLetter)
      }
      // if (this.usedLetters.length == this.letters.length) {
      //   this.gameOver = true
      // }
    },

    computerSelectLetter (letter) {
      console.log('computerSelectLetter')
      console.log(letter)
      setTimeout(() => { this.selectLetter(letter) },5000)
    },
  },

  watch: {
    guessWordStr () {

      fetch(`${this.entryWordDefUrl}/${this.guessWordStr}`, {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token fbabc071a9d1e0ffc4b680d893ef9fce764eb253'
        },
      })
      .then((res) => res.json())
      .then(data => {
        console.log(data)
        this.wordDefinition = data.definitions[this.hintIndex].definition
      })
      .catch(err => {
        console.log(err)
        this.errors.push(err)
      })
    },

    gameOver (newVal) {
      console.log('gameOver')
      console.log(newVal)
      // this.playerLives > this.computerLives ? this.winner = 1 : this.winner = 2
    }
  }
}
</script>

<style>
.is-active {
  background-color: #6cb2eb;
  transition: all 0.3s;
}
.is-active .player-title,
.is-active .lives-left,
.is-active .player-turn {
  color: white;
}
</style>
