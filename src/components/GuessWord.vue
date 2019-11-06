<template>
  <div>
    <ul class="list-none flex justify-center p-10">
      <li
        v-for="(letter, i) in lettersArr"
        :key="`${letter}_${i}`"
        class="inline-flex text-6xl m-1"
      >
        <span 
          v-if="displayedLettersArr[i] === letter"
          class="text-6xl pt-2 pb-1 pl-2 pr-2 font-bold rounded bg-orange"
        >{{letter}}</span>
        <span 
          v-else
          class="text-6xl pt-2 pb-1 pl-2 pr-2 font-bold rounded border-orange"
        >_</span>
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
