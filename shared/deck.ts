import BlackCardModel from "./card-black";
import WhiteCardModel from "./card-white";
import DeckMetadata from "./deck-metadata"
import GermanCards from "../src/assets/decks/cards_german.json"


export default class Deck {
    metadata?: DeckMetadata;
    blacks: Array<BlackCardModel> = [];
    whites: Array<WhiteCardModel> = [];


    constructor() {
        this.metadata = GermanCards.metadata;
        this.whites = GermanCards.whites;
        this.blacks = GermanCards.blacks;
        this.shuffle();
    }
    shuffle() {
        for (let j, x, i = this.blacks.length; i; j = Math.floor(Math.random() * i), x = this.blacks[--i], this.blacks[i] = this.blacks[j], this.blacks[j] = x);
        for (let j, x, i = this.whites.length; i; j = Math.floor(Math.random() * i), x = this.whites[--i], this.whites[i] = this.whites[j], this.whites[j] = x);
    }
}

