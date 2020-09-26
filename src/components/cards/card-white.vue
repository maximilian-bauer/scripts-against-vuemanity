<template>
  <div class="card-white">
    <div class="text-white">{{ cardText }}</div>
    <div class="text-player">{{ cardPlayer }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ComputedRef, computed } from "vue";
import { Store, useStore } from "vuex";
import State from "../../store/state"
import WhiteCardModel from "../../../shared/card-white";
import GamePhase from '../../../shared/game-phase';

export default defineComponent({
  name: "CardWhite",
  props: {
    // cardModel effectively is of type WhiteCardModel.
    // Since it is often used with v-for, iterating over State warning messages on the console because the elements are not recognized as WhiteCardModel.
    // Thus the more generic type Object is used. A more elegant solution would be appreciated.
    cardModel: Object
  },

  setup(props) {
    const store: Store<any> = useStore();
    const state: State = store.state;
    const gamePhase: ComputedRef<GamePhase> = computed(() => { return state.room!.phase });
    const thisPlayerName: ComputedRef<string> = computed(() => { return state.nickname! });
    const cardPlayerName: string = props.cardModel!.player;

    console.log(cardPlayerName)

    const cardText: ComputedRef<string> = computed(() => { // decide when to show the card's text
      if (
        (gamePhase.value == GamePhase.JUDGING || gamePhase.value == GamePhase.ROUND_FINISHED)
        || thisPlayerName.value == cardPlayerName
        || cardPlayerName == undefined // when card is in hand, the card has no player
      ) {
        return props.cardModel!.text;
      }
      return "";
    });

    const cardPlayer: ComputedRef<string> = computed(() => { // decide when to show the card's player
      if (
        (gamePhase.value == GamePhase.PICKING || gamePhase.value == GamePhase.ROUND_FINISHED)
        || thisPlayerName.value == cardPlayerName
      ) {
        return cardPlayerName;
      }
      return "";
    });

    return { cardText, cardPlayer }

  }
});
</script>

<style lang="less" scoped>
.card-white {
  background-color: #ffffff;

  height: 140px;
  width: 100px;

  border-radius: 7px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

  padding: 0.75em;
  margin: 8px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}

.text-white {
  color: #000000;
  font-size: 10pt;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: bold;
  word-wrap: break-word;
}

.text-player {
  color: #000000;
  font-size: 9pt;
  font-family: "Helvetica Neue", sans-serif;

  text-align: right;
}
</style>
