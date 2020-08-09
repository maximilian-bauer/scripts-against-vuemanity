import { Store, createStore } from "vuex";

import State from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import createWebSocketPlugin from "./plugins/socket";

const state = new State();

const store: Store<State> = createStore({
  actions,
  state,
  getters,
  mutations,
  plugins: [createWebSocketPlugin()]
});

export default store;
