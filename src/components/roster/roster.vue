<template>
  <div class="roster">
    <h2 class="roster-title">Players</h2>
    <PlayerInfo
      v-for="player in players.values()"
      :key="player.nickname"
      :playerModel="player"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayerInfo from "./player-info.vue";
import { useStore } from "vuex";
import PlayerModel from "../../../shared/player";

export default defineComponent({
  name: "Roster",
  components: {
    PlayerInfo
  },
  setup() {
    const players: Map<string, PlayerModel> = useStore().state.room.players;

    return { players };
  }
});
</script>

<style lang="less" scoped>
@import "@/style/colors.less";

.roster {
  margin: 8px;
  padding: 8px;
  background-color: @color-blue;
  border-radius: 3px;
  color: #ffffff;
}

.roster-title {
  margin: 8px;
  text-align: center;
}
</style>
