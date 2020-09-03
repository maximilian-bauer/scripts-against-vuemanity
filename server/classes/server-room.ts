import RoomModel from "../../shared/room";
import DeckModel from "./deck";
import State from "../state/state"
import ServerPlayerModel from "./server-player";
import PlayerModel from "../../shared/player";

export default class ServerRoomModel extends RoomModel {
  deck?: DeckModel;
  players: Map<string, ServerPlayerModel> = new Map();


  constructor(id: string, initialPlayer: ServerPlayerModel) {
    super(id, initialPlayer as PlayerModel);
    this.players.set(initialPlayer.nickname, initialPlayer);
    console.log("Room instantiated with players: " + this.players.values.length);
  }
  loadDecks() {
    // either instantiate or clear the current deck
    this.deck = new DeckModel();

    const deckNames: string[] | undefined = this.options?.decks;

    if (deckNames !== undefined) {
      // add all decks to this room
      deckNames.forEach(deckName => {
        const deckToAdd: DeckModel | undefined = State.instance.deckMap.get(deckName);
        if (deckToAdd !== undefined) {
          this.deck!.addDeck(deckToAdd);
        }
      });
      // shuffle the deck
      this.deck.shuffle();
    }
  }
}