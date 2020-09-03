<template>
  <button>
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button"
});
</script>

<style lang="less" scoped>
@bg-color: royalblue;

button {
  color: #ffffff;
  background-color: @bg-color;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

  border: none;
  border-radius: 3px;

  margin: 8px;
}

button:hover {
  background-color: lighten(@bg-color, 5%);
}

button:active {
  background-color: @bg-color;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5) inset;
}

button:disabled {
  color: rgba(255, 255, 255, 0.35);
  background-color: rgba(@bg-color, 0.35);
  box-shadow: none;
}
</style>
