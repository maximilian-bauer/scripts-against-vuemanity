<template>
  <div id="hand">
    <h2 id="hand-title">Hand</h2>
    <div id="card-container">
      <WhiteCard
        v-for="card in cards"
        v-bind:style="{ 'background-color': played || czar ? 'grey' : 'white' }"
        :key="card.text"
        :cardModel="card"
        @click="playWhite(card)"
      />
    </div>
    <Button v-on:click="replenishHand">Replenish hand</Button>
  </div>
</template>

<script lang="ts">
import Vue, { watch } from "vue";
import { ref, defineComponent, reactive } from "vue";
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
  watch: {
    played: function() {
      console.log("Prop Changed");
    }
  },
  setup() {
    const store: Store<any> = useStore();
    const state: State = store.state;
    const cards: Array<WhiteCardModel> = reactive(store.state.hand);
    let played = ref(state.played);
    const czar: boolean = store.state.czar;

    replenishHand();

    function playWhite(white: WhiteCardModel) {
      //FIXME: Rather ugly fix for non-working reactivity of played attribute
      played = ref(store.state.played);
      if (!ref(played).value) {
        console.log(ref(played).value);
        white.player = store.getters.getNickname;

        store.dispatch("playWhite", white);
      }
    }

    // TODO: Temporary function, only for testing. Once the neccessary logic is implemented, the server will decide, when to deal cards.
    // Same goes for the replenish button.
    function replenishHand() {
      if (state.connected) {
        state.socket!.emit("drawWhites");
      }
    }

    return { cards, played, czar, playWhite, replenishHand };
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
