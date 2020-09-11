import State from "./state";
import { ActionContext, ActionObject } from "vuex";
import WhiteCardModel from "shared/card-white";
import RoomModel from "shared/room";
import PlayerModel from "shared/player";

export default {
  setNickname(context: ActionContext<State, State>, nickname: string) {
    context.commit("SET_NICKNAME", nickname);
  },

  setSocket(context: ActionContext<State, State>, socket: SocketIOClient.Socket) {
    console.log("setSocket")
    context.commit("SET_SOCKET", socket);
  },

  setConnected(context: ActionContext<State, State>, connected: boolean) {
    context.commit("SET_CONNECTED", connected);
  },

  setPlayed(context: ActionContext<State, State>, played: boolean) {
    context.commit("SET_PLAYED", played);
  },

  setCzar(context: ActionContext<State, State>, czar: boolean) {
    context.commit("SET_CZAR", czar);
  },

  setRoom(context: ActionContext<State, State>, room: RoomModel) {
    context.commit("SET_ROOM", room);
  },

  setPlayers(context: ActionContext<State, State>, players: Map<string, PlayerModel>) {
    context.commit("SET_PLAYERS", players);
  },

  addPlayer(context: ActionContext<State, State>, player: PlayerModel) {
    context.commit("ADD_PLAYER", player);
  },

  updatePlayer(context: ActionContext<State, State>, player: PlayerModel) {
    context.commit("UPDATE_PLAYER", player);
  },

  playWhite(context: ActionContext<State, State>, white: WhiteCardModel) {
    if (context.state.connected) {
      context.commit("PLAY_WHITE", white);

      const message: object = {
        white: white
      };
      context.state.socket?.emit("playWhite", JSON.stringify(message));
    }
  },

  replenishHand(context: ActionContext<State, State>, whites: WhiteCardModel[]) {
    context.commit("REPLENISH_HAND", whites);
  },

  whitePlayed(context: ActionContext<State, State>, white: WhiteCardModel) {
    context.commit("WHITE_PLAYED", white);
  }

};
