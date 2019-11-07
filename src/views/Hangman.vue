<template>
  <div 
    class="flex flex-col justify-center md:h-screen w-screen"
  >
    <div 
      class="flex flex-col sm:flex-row justify-center"
    >
      <div 
        class="relative m-2 max-w-sm mx-auto border-solid border-1 border-purple rounded-full shadow"
        :class="currentPlayer == 1 ? 'is-active' : ''"
      >
        <h3 class="text-center pt-5 player-title">You</h3>
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
        >{{ error }}</p>
      </div>

      <div v-if="!loading">
        <h4 class="text-center pb-1">Hint</h4>
        <p class="text-center text-grey-dark m-auto w-2/3">{{ wordDefinition }}</p>
        <GuessWord
          :displayed-letters-arr="displayWordArr"
          :letters-arr="guessWordArr"
        />
      </div>
      <div v-else class="loader loader--flipHoz loader--3d">
        <span class="loader-item m-1 w-10 h-10 pt-3 pb-3 text-center rounded bg-orange">L</span>
        <span class="loader-item m-1 w-10 h-10 pt-3 pb-3 text-center rounded bg-orange">O</span>
        <span class="loader-item m-1 w-10 h-10 pt-3 pb-3 text-center rounded bg-orange">A</span>
        <span class="loader-item m-1 w-10 h-10 pt-3 pb-3 text-center rounded bg-orange">D</span>
        <span class="loader-item m-1 w-10 h-10 pt-3 pb-3 text-center rounded bg-orange">I</span>
        <span class="loader-item m-1 w-10 h-10 pt-3 pb-3 text-center rounded bg-orange">N</span>
        <span class="loader-item m-1 w-10 h-10 pt-3 pb-3 text-center rounded bg-orange">G</span>
      </div>

      <div v-if="gameOver">
        <h2 class="text-center">Game Over!</h2>
        <p v-if="winner == 1" class="text-center">You win.</p>
        <p v-if="winner == 2" class="text-center">Computer win.</p>
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
      <button 
        class="inline-flex justify-center mx-auto w-1/2 text-xs sm:text-xm font-bold rounded-full my-2 sm:my-5 px-1 py-1 sm:px-2 sm:py-2 border border-purple text-purple hover:bg-purple hover:text-white"
        @click="resetGame()"
      >
        New Game
      </button>
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
      hintIndex: 0,
      loading: false,
    }
  },
  created() {
    this.getListOfWords()
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
        console.log(this.checkGotWord())
        if (this.checkGotWord()) {
          this.winner = 2
          this.gameOver = true
          return
        }
        this.computerSelectLetter(randomLetter)
      }

      if (this.checkGotWord()) {
        this.currentPlayer == 1 ? this.winner = 1 : this.winner = 2
        this.gameOver = true
        return
      }

      if (this.playerLives == 0) {
        this.winner = 1
        this.gameOver = true
      }

      if (this.computerLives == 0) {
        this.winner = 2
        this.gameOver = true
      }
    },

    computerSelectLetter (letter) {
      setTimeout(() => { this.selectLetter(letter) },1000)
    },

    checkGotWord () {
      return this.displayWordArr.join('').toLowerCase() == this.guessWordStr 
        ? true 
        : false
    },

    resetGame () {
      console.log('reset game')
      this.getListOfWords()
    },

    getListOfWords () {
      this.loading = true

      fetch(this.listOfWordsUrl, {
        'method': 'GET',
      })
      .then((res) => res.json())
      .then(data => {
        this.listOfWords = Object.keys(data.results).filter(word => word.match(/^[^_]+$/))
        this.guessWordStr = this.listOfWords[Math.floor(Math.random() * this.listOfWords.length)]
        this.guessWordArr = this.guessWordStr.toUpperCase().split('')
        this.displayWordArr = this.guessWordArr.map(() => '')

        this.initValues()
      })
      .catch(err => {
        console.log(err.message)
        this.errors.push(err.message)
        this.loading = false
      })
    },

    initValues () {
      this.usedLetters = []
      this.playerLives = 11
      this.computerLives = 11
      this.currentPlayer = 1
      this.gameOver = false
      this.errors = []
      this.winner = false
      this.loading = false
    }
  },

  watch: {
    guessWordStr () {
      this.loading = true

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
        this.loading = false
      })
      .catch(err => {
        console.log(err.message)
        this.errors.push(err.message)
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
  $itemSize : 50;
  $itemSpacing : 2;
  $squareSize : 40;
  $loaderColor : rgba(61, 92, 126, 0.7);
  $loaderDelay : 100;
  $loaderDuration : 2000;
  $animationTiming: cubic-bezier(.645, .045, .355, 1);

  @keyframes slowFlip {
    0%    { transform: rotateX(0deg);   }
    40%   { transform: rotateX(180deg); }
    100%  { transform: rotateX(180deg); }
  }

  @keyframes flipHoz {
    0%    {  transform: rotateY(0deg);   }
    40%   { transform: rotateY(180deg);  }
    100%  { transform: rotateY(180deg);  }
  }

  @keyframes fade {
    0%    { opacity: 0;  }
    50%   { opacity: 1;  }
    100%  { opacity: 0;  }
  }

  @keyframes flipDelay {
    0% {
      transform: rotateX(0deg);
      transform-origin: 0 0 0;
      opacity: 1;
    }
    30% {
      transform: rotateX(90deg);
      transform-origin: 0 0 0;
      opacity: 0;
    }
    40% {
      transform-origin: 0 0 0;
    }
    60% {
      transform: rotateX(90deg);
      opacity: 0;
      transform-origin: 0 100% 0;
    }
    90% {
      transform: rotateX(0deg);
      opacity: 1;
      transform-origin: 0 100% 0;
    }
  }

  @keyframes slideDown {
    0%  { transform: rotateX(0deg);  }
    50% { transform: rotateX(90deg); }
  }
  @keyframes slideBoth {
    0%    { transform: rotateX(0deg);   }
    100%  { transform: rotateX(360deg); }
  }

  .is-active {
    background-color: #6cb2eb;
    transition: all 0.3s;
  }
  .is-active .player-title,
  .is-active .lives-left,
  .is-active .player-turn {
    color: white;
  }

  .loader {
    @apply flex justify-center items-center pt-5 pb-5 px-0;
  }

  .loader--3d {
    transform-style: preserve-3d;
    perspective: 800px;
  }

  .loader-item {
    animation-duration: $loaderDuration + ms;
    animation-timing-function: $animationTiming;
    animation-iteration-count: infinite;
    
    @for $i from 1 through 6 {
      &:nth-child(#{$i}) {
        animation-delay: ($i * $loaderDelay) + ms;
      }
    }

    .loader--flipHoz & {
      animation-name: flipHoz;
    }

    .loader--flipHoz & {
      @for $i from 1 through 6 {
        &:nth-child(#{$i}) {
          animation-delay: ($i * $loaderDelay*1.5) + ms;
        }
      }
    }
  }
</style>
