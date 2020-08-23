import RoomModel from "../../shared/room";
import DeckModel from "./deck";
import State from "../state/state"

export default class ServerRoomModel extends RoomModel {
  deck?: DeckModel;

  loadDecks() {
    // either instantiate or clear the current deck
    this.deck = new DeckModel();

    const deckNames: string[] | undefined = this.options?.decks;

    if(deckNames !== undefined) {
      // add all decks to this room
      deckNames.forEach(deckName => {
        const deckToAdd: DeckModel | undefined = State.instance.deckMap.get(deckName);
        if(deckToAdd !== undefined){
          this.deck!.addDeck(deckToAdd);
        }
      });
      // shuffle the deck
      this.deck.shuffle();
    }
  }
}