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
    // cardModel effectively is of type WhiteCardModel.
    // Since it is often used with v-for, iterating over an reactive array whose elements have a __v_reactive property,
    // specifying WhiteCardModel as the type leads to ugly warning messages on the console because the elements are not recognized as WhiteCardModel.
    // Thus the more generic type Object is used. A more elegant solution would be appreciated.
    cardModel: Object
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
