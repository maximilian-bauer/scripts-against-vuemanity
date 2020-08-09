<template>
  <div id="hand" v-on:click="addCard">
    <h2 id="hand-title">Hand</h2>
    <div id="card-container">
      <WhiteCard v-for="card in cards" :key="card.text" :cardModel="card" @click="playWhite(card)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { defineComponent, reactive } from "vue";
import WhiteCard from "@/components/cards/card-white.vue";
import WhiteCardModel from "../../../shared/card-white";
import { useStore, Store } from 'vuex';

export default defineComponent({
  name: "Hand",
  components: {
    WhiteCard
  },
  setup() {
    const store: Store<any> = useStore();
    const cards: Array<WhiteCardModel> = reactive(store.state.hand);

    // Only for testing. Modifying the state directly is discouraged.
    function addCard() {
      store.state.hand.push(store.state.room.deck.whites.pop());
    }

    function playWhite(white: WhiteCardModel) {
      white.player = store.getters.getNickname;

      store.dispatch("playWhite", white);
    }

    return { cards, addCard, playWhite };
  }

});
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
