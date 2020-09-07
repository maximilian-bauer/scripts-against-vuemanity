import ServerConfig from "../config"
const cfg: ServerConfig = new ServerConfig();
import DeckModel from "../classes/deck"
import ServerRoomModel from "../classes/server-room";
const hyphenopoly = require("hyphenopoly");
const hyphenator = hyphenopoly.config({
  "require": ["de", "en-us"],
  "hyphen": '\u00ad',
  "exceptions": {
      "en-us": "en-han-ces"
  }
});
import fs from "fs";
import { Socket } from "socket.io";
import ServerPlayerModel from "../classes/server-player";
import BlackCardModel from "../../shared/card-black";

export default class State {

  private static _instance: State;

  socketPlayerMap: Map<SocketIO.Socket, { room: string, nickname: string }> = new Map();

  deckMap: Map<string, DeckModel> = new Map();

  rooms: Map<string, ServerRoomModel> = new Map();

  static get instance(): State {
    return this._instance || (this._instance = new this());
  }

  constructor() {
    console.log("### Initializing state ###");

    this.loadDecks();

    console.log("Done loading decks");

    console.log("### DONE Initializing state ###");
  }

  loadDecks() {
    // load deck Map
    console.log("Loading decks");
    // Path relative to process.cwd(). This can be affected by changing the cwd in the 'server' script of package.json.
    const deckFiles = fs.readdirSync("./server/" + cfg.decksPath);

    console.log(`Found ${deckFiles.length} deck${deckFiles.length === 1 ? "" : "s"}`);

    deckFiles.forEach(deckFile => {
      let deck: DeckModel = require(`../${cfg.decksPath}/${deckFile}`);
      this.deckMap.set(deck.metadata!.name, deck);
      // If the deck has not been hyphenated yet, run hyphenopoly on it
      if((deck.metadata?.hyphenated) == false) {
        this.hyphenateDeck_de(deck,deckFile);
      }
    });
  }

  /**
   * Adds optional hyphenisation symbols to the card text of the given deck
   * according to german hyphenisation rules *EXPERIMENTAL*
   * 
   * @param deck The deck to hyphenize
   * @param name The name of the deck (used for naming the output JSON file)
   */

  async hyphenateDeck_de(deck: DeckModel, name: String) {
    const hyphen = await hyphenator.get("de");
    deck.blacks.forEach(blackCard => {
      blackCard.text = hyphen(blackCard.text);
    });
    deck.whites.forEach(whiteCard => {
      whiteCard.text = hyphen(whiteCard.text);
    });
    deck.metadata!.hyphenated = true;
    console.log(deck.whites);
    fs.writeFileSync(`../${cfg.decksPath}/${name}`, JSON.stringify(deck));
    this.loadDecks();
  }

  /**
   * Look up the player and room for a socket.
   * - retrieve player identifier (nickname and room id) from `socketPlayerMap`
   * - retrieve room from `rooms` map
   * - retrieve player from rooms `players` map
   * 
   * @returns
   * - the player and the room
   * - only the room, when a room but no player can be found
   * - an empty object if no room can be found
   * @param socket the socket for which to look up the player
   */
  lookupPlayer(socket: Socket): { player?: ServerPlayerModel, room?: ServerRoomModel } {
    const playerIdentifier = this.socketPlayerMap.get(socket);
    if (playerIdentifier === undefined) {
      console.warn(`No player indentifier found in socketPlayerMap for socket ${socket}. This propably indicates a bigger problem.`);
      return {};
    }

    const room = this.rooms.get(playerIdentifier.room);
    if (room === undefined) {
      console.warn(`No room found matching the room id ${playerIdentifier.room}.`);
      return {};
    }

    const player = room.players.get(playerIdentifier.nickname);
    if (player === undefined) {
      console.warn(`No player found in room ${playerIdentifier.room} with nickname ${playerIdentifier.nickname}`);
      return { room };
    }

    return { player, room };
  }


}