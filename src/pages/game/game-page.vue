<template>
  <div id="game-page">
    <Board id="board" class="game-component" />
    <Hand id="hand" class="game-component" />
    <Roster id="roster" class="game-component" />
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import Board from "@/components/board/board.vue";
import Hand from "@/components/hand/hand.vue";
import Roster from "@/components/roster/roster.vue";

export default defineComponent({
  components: {
    Board,
    Hand,
    Roster
  }
});
</script>

<style lang="less" scoped>
#game-page {
  margin: 0 auto;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;

  max-width: 1010px;
  align-items: center;
}

.game-component {
  width: 100%;
  flex-shrink: 0;
  flex-grow: 0;
}
</style>
