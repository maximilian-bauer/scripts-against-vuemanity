<template>
  <div id="player-info">
    <div id="information-elements-left" class="information-element">
      <div
        id="status-indicator"
        class="information-element"
        :style="{
          'background-color': playerModel.connected ? '#00ff00' : '#ff0000'
        }"
      ></div>
      <div id="player-name" class="information-element">
        {{ playerModel.nickname }}
      </div>
    </div>
    <div id="player-points" class="information-element">
      {{ playerModel.points }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PlayerModel from "../../../shared/player";

@Component({
  props: {
    playerModel: PlayerModel
  }
})
export default class PlayerInfo extends Vue {}
</script>

<style lang="less" scoped>
@import "@/style/colors.less";

#player-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0;
}

.information-element {
  display: inline-block;
}

#information-elements-left {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

#status-indicator {
  width: 20px;
  height: 20px;

  border-radius: 10px;

  margin-right: 8px;
}
</style>
