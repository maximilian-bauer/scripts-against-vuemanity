<template>
  <div class="text-input">
    <div class="label">{{ label }}</div>
    <input :class="{ invalid: !valid }" type="text" @input="handleInput" />
    <div class="error-label" v-if="!valid">{{ errorText }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    label: String,
    errorText: String,
    valid: Boolean
  }
})
export default class TextInput extends Vue {
  handleInput(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    if (target != null) {
      this.$emit("input", target.value);
    }
  }
}
</script>

<style lang="less" scoped>
.text-input {
  display: block;
  margin-bottom: 12px;
}

input {
  display: block;
  height: 32px;
  border: none;
  border-radius: 3px;
  margin-left: 0;
  width: inherit;

  padding-left: 8px;
  text-align: left;
}

input.invalid {
  border: 1px solid red;
  box-shadow: 0 0 1.5px 1px red;
}

.label {
  text-align: left;
  margin-bottom: 4px;
}

.error-label {
  font-size: 0.8rem;
  color: red;

  margin: 0 0 2px 0;
  text-align: left;
}
</style>
