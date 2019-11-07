<template>
  <div>
    <ul class="list-none flex justify-center pt-5 pb-5 px-0">
      <li
        v-for="(letter, i) in lettersArr"
        :key="`${letter}_${i}`"
        class="letter inline-flex text-6xl m-1"
      >
        <span 
          v-if="displayedLettersArr[i] === letter"
          class="w-8 h-8 sm:w-10 sm:h-10 text-center text-sm sm:text-6xl pt-2 sm:pt-3 pb-2 font-bold rounded bg-orange"
        >{{letter}}</span>
        <span 
          v-else
          class="w-8 h-8 sm:w-10 sm:h-10 text-6xl pt-2 pb-2 font-bold rounded border-2"
        ></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'word',
  props: [
    'displayedLettersArr',
    'lettersArr'
  ]
}
</script>
