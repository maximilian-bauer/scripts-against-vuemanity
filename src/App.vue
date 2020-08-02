<template>
  <div id="app">
    <div id="connection-banner" :hidden="connected">
      Not connected to server
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  get connected() {
    return this.$store.state.connected;
  }
}
</script>

<style lang="less">
@import "style/colors.less";

html,
body {
  background-color: @color-bg;
}
#app {
  background-color: @color-bg;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}

#connection-banner {
  position: absolute;
  left: 0px;
  top: 0px;
  text-align: center;

  padding: 4px 0;

  background-color: #e53935;
  color: white;
  width: 100%;
}
</style>
