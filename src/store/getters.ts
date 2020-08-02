import State from "./state";

export default {
  getNickname(state: State) {
    return state.nickname;
  },

  getSocket(state: State) {
    return state.socket;
  },

  getConnected(state: State) {
    return state.connected;
  },

  getHand(state: State) {
    return state.hand;
  }
};
