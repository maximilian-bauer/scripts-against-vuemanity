import RoomModel from "../../shared/room";
import WhiteCardModel from "../../shared/card-white";

export default class State {
  public nickname?: string;

  public socket?: SocketIOClient.Socket;
  public connected = false;

  public hand: Array<WhiteCardModel> = [];

  public played = false;

  public czar = false;

  public room?: RoomModel;
}
