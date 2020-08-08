<template>
  <div class="card-black">
    <div class="text-black">{{ cardModel.text }}</div>
    <div class="text-pick">Pick {{ cardModel.blanks }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BlackCardModel from "../../../shared/card-black";

export default defineComponent({
  name: "CardBlack",
  props: {
    cardModel: BlackCardModel
  }
});
</script>

<style lang="less" scoped>
.card-black {
  background-color: #000000;

  height: 140px;
  width: 100px;

  border-radius: 7px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

  padding: 0.75em;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}

.text-black {
  color: #ffffff;
  font-size: 9pt;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: bold;
  word-wrap: break-word;
}

.text-pick {
  color: #ffffff;
  font-size: 9pt;
  font-family: "Helvetica Neue", sans-serif;

  text-align: right;
}
</style>
