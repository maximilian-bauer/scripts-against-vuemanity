<template>
  <div class="card-white">
    <span class="text-white">{{ cardModel.text }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WhiteCardModel from "../../../shared/card-white";

export default defineComponent({
  name: "CardWhite",
  props: {
    cardModel: WhiteCardModel
  }
});
</script>

<style lang="less" scoped>
.card-white {
  background-color: #ffffff;

  height: 140px;
  width: 104px;

  border-radius: 7px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

  padding: 0.75em;
  margin: 8px;

  text-align: left;
}

.text-white {
  color: #000000;
  font-size: 10pt;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: bold;
  hyphens: manual;
  display: inline-block;
}
</style>
