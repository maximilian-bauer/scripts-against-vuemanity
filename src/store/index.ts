import Vue from "vue";
import Vuex, { Store } from "vuex";

import State from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import createWebSocketPlugin from "./plugins/socket";

Vue.use(Vuex, {});

const state = new State();

const store: Store<State> = new Vuex.Store({
  actions,
  state,
  getters,
  mutations,
  plugins: [createWebSocketPlugin()]
});

export default store;
