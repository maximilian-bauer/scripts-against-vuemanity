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
import { defineComponent, ComputedRef, computed } from "vue";
import { useStore, Store } from "vuex";
import BlackCard from "@/components/cards/card-black.vue";
import WhiteCard from "@/components/cards/card-white.vue";
import BlackCardModel from "../../../shared/card-black";
import WhiteCardModel from '../../../shared/card-white';
import State from '../../store/state';

export default defineComponent({
  name: "Board",
  components: {
    BlackCard,
    WhiteCard
  },
  setup() {
    const store: Store<any> = useStore();
    const state: State = store.state;
    const black: ComputedRef<BlackCardModel> = computed(() => { return state.room?.board.black || new BlackCardModel("Error", 0) });
    const whites: ComputedRef<WhiteCardModel[]> = computed(() => { return state.room?.board.whites || [new WhiteCardModel("Error")] });

    return { black, whites };
  }
});
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
