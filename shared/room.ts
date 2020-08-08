import BoardModel from "./board";
import GamePhase from "./game-phase"
import PlayerModel from "./player"
import RoomOptions from "./room-options"
import deck from "./deck";

export default class RoomModel {  

  id: string;

  players: Map<string, PlayerModel> = new Map();
  
  phase: GamePhase;

  czar?: string;

  options?: RoomOptions;

  board: BoardModel = new BoardModel();

  deck: deck = new deck();

  constructor(id: string, initialPlayer: PlayerModel) {
    this.phase = GamePhase.SELECTING_OPTIONS;
    this.id = id;
    this.players.set(initialPlayer.nickname, initialPlayer);
    console.log("players: " + JSON.stringify(this.players.size));
  }
}