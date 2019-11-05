<template>
  <div class="">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="350px" height="260px" viewBox="0 0 350 275"
      preserveAspectRatio="xMidYMid meet">
      <line v-if="wrongAttempts > 0" x1="80" y1="257" x2="260" y2="257" style="stroke:black;fill:none;stroke-width:2px;" />
      <line v-if="wrongAttempts > 1" x1="100" y1="257" x2="100" y2="40" style="stroke:black;fill:none;stroke-width:2px;" />
      <line v-if="wrongAttempts > 2" x1="100" y1="40" x2="230" y2="40" style="stroke:black;fill:none;stroke-width:2px;" />
      <line v-if="wrongAttempts > 3" x1="100" y1="80" x2="130" y2="40" style="stroke:black;fill:none;stroke-width:2px;" />
      <line v-if="wrongAttempts > 4" x1="230" y1="40" x2="230" y2="80" style="stroke:black;fill:none;stroke-width:2px;" />
      <circle v-if="wrongAttempts > 5" cx="230" cy="90" style="fill:khaki;stroke:black;stroke-width:2px;" r="20" />
      <line v-if="wrongAttempts > 6" x1="230" y1="110" x2="230" y2="170" style="stroke:black;fill:none;stroke-width:2px;" />
      <line v-if="wrongAttempts > 7" x1="230" y1="140" x2="250" y2="120" style="stroke:black;fill:none;stroke-width:2px;" />
      <line v-if="wrongAttempts > 8" x1="230" y1="140" x2="210" y2="120" style="stroke:black;fill:none;stroke-width:2px;" />
      <line v-if="wrongAttempts > 9" x1="230" y1="170" x2="250" y2="200" style="stroke:black;fill:none;stroke-width:2px;" />
      <line v-if="wrongAttempts > 10" x1="230" y1="170" x2="210" y2="200" style="stroke:black;fill:none;stroke-width:2px;" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'hangman',
  props: [
    'wrongAttempts'
  ]
}
</script>

<style scoped>
</style>
