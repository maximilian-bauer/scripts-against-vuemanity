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
import Vue from "vue";
import Component from "vue-class-component";
import PlayerInfo from "./player-info.vue";

@Component({
  components: {
    PlayerInfo
  }
})
export default class Roster extends Vue {
  // FIXME: does not work, because in Vue 2, Maps are not reactive
  players = this.$store.state.room.players;
}
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
