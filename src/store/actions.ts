import State from "./state";
import { ActionContext } from "vuex";
import WhiteCardModel from "shared/card-white";
import RoomModel from "shared/room";
import PlayerModel from "shared/player";

export default {
  setNickname(context: ActionContext<State, State>, nickname: string) {
    context.commit("SET_NICKNAME", nickname);
  },

  setSocket(
    context: ActionContext<State, State>,
    socket: SocketIOClient.Socket
  ) {
    context.commit("SET_SOCKET", socket);
  },

  setConnected(context: ActionContext<State, State>, connected: boolean) {
    context.commit("SET_CONNECTED", connected);
  },

  setRoom(context: ActionContext<State, State>, room: RoomModel) {
    context.commit("SET_ROOM", room);
  },

  setPlayers(
    context: ActionContext<State, State>,
    players: Map<string, PlayerModel>
  ) {
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
  }
};
