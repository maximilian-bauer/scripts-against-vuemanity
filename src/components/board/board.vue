<template>
  <div id="board">
    <h2 id="board-title">Board</h2>
    <div id="black-container" class="card-container">
      <BlackCard id="black" :cardModel="black" />
    </div>
    <div id="white-container" class="card-container">
      <WhiteCard
        class="white"
        v-for="white in whites"
        :key="white.text"
        :cardModel="white"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BlackCard from "@/components/cards/card-black.vue";
import WhiteCard from "@/components/cards/card-white.vue";
import BlackCardModel from "../../../shared/card-black";

@Component({
  components: {
    BlackCard,
    WhiteCard
  }
})
export default class Board extends Vue {
  black = new BlackCardModel("text", 1); //this.$store.state.room.board.black;
  whites = this.$store.state.room.board.whites;
}
</script>

<style lang="less" scoped>
@import "@/style/colors.less";
#board {
  margin: 8px 0;
  padding: 8px;
  background-color: @color-orange2;
  border-radius: 3px;
}

#board-title {
  text-align: center;
  margin: 8px;
  color: #000000;
}

.card-container {
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
}

#black {
  margin: 8px;
}

#white-container {
  flex-flow: row wrap;
}
</style>
