import Config from "../../../config";
const cfg: Config = new Config();
import { Store } from "vuex";
import State from "../state";

import io from "socket.io-client";
import PlayerModel from "shared/player";
import WhiteCardModel from "shared/card-white";
import BlackCardModel from 'shared/card-black';
import GamePhase from 'shared/game-phase';

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
  
  socket.on("phaseChange", (phaseChangeMessage: string) => {
    const phase: GamePhase = JSON.parse(phaseChangeMessage);
    store.dispatch("updatePhase", phase);
  });

  socket.on("dealWhites", (whitesMessage: string) => {
    const whites: WhiteCardModel[] = JSON.parse(whitesMessage);
    //console.log(whites);
    store.dispatch("replenishHand", whites);
  });

  socket.on("dealBlack", (blackMessage: string) => {
    console.log("blackMessage: " + blackMessage);
    const black: BlackCardModel = JSON.parse(blackMessage);
    store.dispatch("updateBlack", black);
  });

  socket.on("whitePlayed", (whiteMessage: string) => {
    const white = JSON.parse(whiteMessage);
    console.log("white played: " + whiteMessage);
    store.dispatch("whitePlayed", white)
  });

  socket.on("setPlayed", (setPlayedMessage: boolean) => {
    store.dispatch("setPlayed", setPlayedMessage);
  })
}

export default function createWebSocketPlugin() {
  return (store: Store<State>) => {
    setupWS(store);
  };
}
