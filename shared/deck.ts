import BlackCardModel from "./card-black";
import WhiteCardModel from "./card-white";
import CardsGerman from "../src/assets/decks/cards_german.json";


export default class Deck {
    blacks: Array<BlackCardModel> = [];
    whites: Array<WhiteCardModel> = [];

    constructor() {
        const deck = CardsGerman['All'];
        let black = deck.black.map((index: number) => CardsGerman.blackCards[index]);
        black = this.shuffle(black);
        black.forEach(blackCards => this.blacks.push(new BlackCardModel(blackCards.text, blackCards.pick)));
        let white = deck.white.map((index: number) => CardsGerman.whiteCards[index]);
        white = this.shuffle(white);
        console.log(white);
        white.forEach(whiteCards => this.whites.push(new WhiteCardModel(whiteCards)));
    }

    shuffle(o: any[]) {
        for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
}

