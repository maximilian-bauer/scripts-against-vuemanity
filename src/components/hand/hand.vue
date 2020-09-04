<template>
  <div id="hand">
    <h2 id="hand-title">Hand</h2>
    <div id="card-container">
      <WhiteCard
        v-for="card in cards"
        :key="card.text"
        :cardModel="card"
        @click="playWhite(card)"
      />
    </div>
    <Button v-on:click="replenishHand">Replenish hand</Button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { defineComponent, reactive } from "vue";
import WhiteCard from "@/components/cards/card-white.vue";
import Button from "@/components/ui/button.vue";
import WhiteCardModel from "../../../shared/card-white";
import { useStore, Store } from "vuex";
import State from "../../store/state";

export default defineComponent({
  name: "Hand",
  components: {
    WhiteCard,
    Button
  },
  setup() {
    const store: Store<any> = useStore();
    const state: State = store.state;
    const cards: Array<WhiteCardModel> = reactive(store.state.hand);

    replenishHand();

    function playWhite(white: WhiteCardModel) {
      white.player = store.getters.getNickname;

      store.dispatch("playWhite", white);
    }

    // TODO: Temporary function, only for testing. Once the neccessary logic is implemented, the server will decide, when to deal cards.
    // Same goes for the replenish button.
    function replenishHand() {
      if (state.connected) {
        state.socket!.emit("drawWhites");
      }
    }

    return { cards, playWhite, replenishHand };
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
