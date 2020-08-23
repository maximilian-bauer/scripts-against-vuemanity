import ServerConfig from "../config"
const cfg : ServerConfig = new ServerConfig();
import DeckModel from "../classes/deck"
import ServerRoomModel from "../classes/server-room";

import fs from "fs";

export default class State {

  private static _instance: State;

  socketPlayerMap: Map<SocketIO.Socket, {room: string, nickname: string}> = new Map();

  deckMap: Map<string, DeckModel> = new Map();

  rooms: Map<string, ServerRoomModel> = new Map();

  static get instance(): State {
    return this._instance || (this._instance = new this());
  }

  constructor() {
    console.log("### Initializing state ###");
    
    // load deck Map
    console.log("Loading decks");
    // Path relative to process.cwd(). This can be affected by changing the cwd in the 'server' script of package.json.
    const deckFiles = fs.readdirSync("./server/" + cfg.decksPath);
    
    console.log(`Found ${deckFiles.length} deck${deckFiles.length === 1 ? "" : "s"}`);

    deckFiles.forEach(deckFile => {
      const deck = require(`../${cfg.decksPath}/${deckFile}`);
      this.deckMap.set(deck.metadata!.name, deck);
    });
    
    console.log("Done loading decks");

    console.log("### DONE Initializing state ###");
  }
}