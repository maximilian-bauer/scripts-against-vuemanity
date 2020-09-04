<template>
  <div id="app">
    <div id="connection-banner" :hidden="state.connected">
      Not connected to server
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  setup() {
    const state = useStore().state;

    return { state };
  }
});
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
