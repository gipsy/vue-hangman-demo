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
          <circle cx="230" cy="90" style="fill:red; stroke:black;" r="20" />
          <line x1="230" y1="110" x2="230" y2="170" style="stroke:black;" />
          <line x1="230" y1="140" x2="250" y2="120" style="stroke:black;" />
          <line x1="230" y1="140" x2="210" y2="120" style="stroke:black;" />
          <line x1="230" y1="170" x2="250" y2="200" style="stroke:black;" />
          <line x1="230" y1="170" x2="210" y2="200" style="stroke:black;" />
        </svg>
        <router-link 
          to="/hangman" 
          tag="button"
          class="text-6xl font-normal rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white"
        >Start Hangman Game</router-link>
      </div>
    </div>
    <!-- <AppHangman msg="Welcome to Hangman Game"/> -->
  </div>
</template>

<script>
// import Hangman from '@/components/Hangman.vue'

export default {
  name: 'home',
  // components: {
  //   AppHangman: Hangman
  // }
}
</script>
