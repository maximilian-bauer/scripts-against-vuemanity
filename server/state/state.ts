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

  constructor() {}
}