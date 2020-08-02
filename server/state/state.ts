import PlayerModel from "../../shared/player";
import RoomModel from "../../shared/room";

export default class State {

  private static _instance: State;

  socketPlayerMap: Map<SocketIO.Socket, {room: string, nickname: string}> = new Map();

  rooms: Map<string, RoomModel> = new Map();

  static get instance(): State {
    return this._instance || (this._instance = new this());
  }

  constructor() {}
}