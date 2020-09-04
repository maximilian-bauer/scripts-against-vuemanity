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
import { defineComponent } from "vue";
import PlayerModel from "../../../shared/player";

export default defineComponent({
  name: "PlayerInfo",
  setup(props) {
    console.log(props.playerModel);
  },
  // No type provided because players are stored in a Map and .values() called in roster.vue returns an Iterator over Objects,
  // which destroys the type and leads to a warning when playerModel has a type. The type is effectively PlayerModel.
  props: ["playerModel"]
});
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
