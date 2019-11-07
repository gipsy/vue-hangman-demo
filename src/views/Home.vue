<template>
  <div class="flex justify-center h-screen">
    <div class="m-auto max-w-sm max-h-sm overflow-hidden">
      <div class="sm:flex flex-col sm:items-center p-8">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="350px" height="275px" viewBox="0 0 350 300" preserveAspectRatio="xMidYMid meet">
          <line x1="80" y1="257" x2="260" y2="257" style="stroke:black;" />
          <line x1="100" y1="257" x2="100" y2="40" style="stroke:black;" />
          <line x1="100" y1="40" x2="230" y2="40" style="stroke:black;" />
          <line x1="100" y1="80" x2="130" y2="40" style="stroke:black;" />
          <line x1="230" y1="40" x2="230" y2="80" style="stroke:black;" />
          <circle cx="230" cy="90" style="fill: #9561e2; stroke:black;" r="20" />
          <line x1="230" y1="110" x2="230" y2="170" style="stroke:black;" />
          <line x1="230" y1="140" x2="250" y2="120" style="stroke:black;" />
          <line x1="230" y1="140" x2="210" y2="120" style="stroke:black;" />
          <line x1="230" y1="170" x2="250" y2="200" style="stroke:black;" />
          <line x1="230" y1="170" x2="210" y2="200" style="stroke:black;" />
        </svg>
        <router-link 
          to="/hangman" 
          tag="button"
          class="text-6xl text-center font-normal rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white w-full sm:w-auto"
        >Start Hangman Game with random word</router-link>
        <p class="text-center p-2 font-bold text-purple">OR</p>
        <button 
          class="text-center font-normal rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white w-full sm:w-auto"
          @click="startGame()"
        >
          <span>Input </span>
            <input 
              class="text-center font-bold italic outline-none text-purple"
              v-model="suggestedWord" 
              placeholder="<suggested word here>"
              @click.stop
              @keyup.enter="startGame()"
            >
          <span> manually</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-view',
  data () {
    return {
      suggestedWord: ''
    }
  },
  methods: {
    startGame() {
      this.$router.push({ 
        name: 'hangman', 
        params: { suggestedWord: this.suggestedWord} 
      })
    }
  },
}
</script>
