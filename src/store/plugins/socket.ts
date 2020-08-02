import Config from "../../../config";
const cfg: Config = new Config();
import { Store } from "vuex";
import State from "../state";

import io from "socket.io-client";
import PlayerModel from "shared/player";

function setupWS(store: Store<State>): void {
  console.log("Trying to connect WebSocket on " + cfg.wsServerUrl);

  const socket = io.connect(cfg.wsServerUrl, cfg.wsOptions);

  socket.on("connect", () => {
    console.log("WebSocket connected.");
    store.dispatch("setSocket", socket);
    store.dispatch("setConnected", true);
  });

  socket.on("disconnect", () => {
    store.dispatch("setSocket", undefined);
    store.dispatch("setConnected", false);
  });

  socket.on("playerJoin", (playerJoinMessage: string) => {
    const player: PlayerModel = JSON.parse(playerJoinMessage);
    store.dispatch("addPlayer", player);
  });

  socket.on("playerDisconnect", (playerDisconnectMessage: string) => {
    const player: PlayerModel = JSON.parse(playerDisconnectMessage);
    store.dispatch("updatePlayer", player);
  });
}

export default function createWebSocketPlugin() {
  return (store: Store<State>) => {
    setupWS(store);
  };
}
