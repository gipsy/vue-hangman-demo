<template>
  <div class="hangman">
    <h1>This is an hangman page</h1>
    <div
      v-for="(row, key) in letters"
      :key="key"
      class="row"
    >
      <KeyboardLetter
        v-for="letter in row"
        :letter="letter"
        :game-over="gameOver"
        :two-players="twoPlayers"
        :key="letter"
        @check="check(letter)"
        v-cloak
      />
    </div>
  </div>
</template>

<script>
import KeyboardLetter from '@/components/KeyboardLetter';

export default {
  name: 'hangman',
  components: {
    KeyboardLetter
  }
}
</script>

<style>
</style>
