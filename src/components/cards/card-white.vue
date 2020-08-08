<template>
  <div class="card-white" @click="emitClick">
    <span class="text-white">{{ cardModel.text }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import WhiteCardModel from "../../../shared/card-white";

@Component({
  props: {
    cardModel: WhiteCardModel
  }
})
export default class WhiteCard extends Vue {
  emitClick() {
    this.$emit("click");
  }
}
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
  word-break: break-word;
  display: inline-block;
}
</style>
