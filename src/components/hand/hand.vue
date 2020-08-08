<template>
  <div id="hand" v-on:click="addCard">
    <h2 id="hand-title">Hand</h2>
    <div id="card-container">
      <WhiteCard
        v-for="card in cards"
        :key="card.text"
        :cardModel="card"
        @click="playWhite(card)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import WhiteCard from "@/components/cards/card-white.vue";
import WhiteCardModel from "../../../shared/card-white";

@Component({
  components: {
    WhiteCard
  }
})
export default class Hand extends Vue {
  cards: Array<WhiteCardModel> = this.$store.state.hand;

  addCard() {
    this.$store.state.hand.push(this.$store.state.room.deck.whites.pop());
  }

  playWhite(white: WhiteCardModel) {
    white.player = this.$store.getters.getNickname;

    this.$store.dispatch("playWhite", white);
  }
}
</script>

<style lang="less" scoped>
@import "@/style/colors.less";
#hand {
  margin: 8px 0;
  padding: 8px;
  background-color: @color-green;
  border-radius: 3px;
}

#hand-title {
  margin: 8px;
  text-align: center;
  color: #000000;
}

#card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
