import BlackCardModel from "../../shared/card-black";
import WhiteCardModel from "../../shared/card-white";
import DeckMetadata from "../../shared/deck-metadata";


export default class DeckModel {
    metadata?: DeckMetadata;
    blacks: Array<BlackCardModel> = [];
    whites: Array<WhiteCardModel> = [];

    shuffle() {
        for (let j, x, i = this.blacks.length; i; j = Math.floor(Math.random() * i), x = this.blacks[--i], this.blacks[i] = this.blacks[j], this.blacks[j] = x);
        for (let j, x, i = this.whites.length; i; j = Math.floor(Math.random() * i), x = this.whites[--i], this.whites[i] = this.whites[j], this.whites[j] = x);
    }

    addDeck(deckToAdd: DeckModel) {
        this.blacks.push(...deckToAdd.blacks);
        this.whites.push(...deckToAdd.whites);

        if (this.metadata == undefined) {
            this.metadata = new DeckMetadata("multiple", false, "multiple", [])
        }

        if (deckToAdd.metadata!.nsfw) {
            this.metadata.nsfw = true;
        }
    }

    drawBlack(): BlackCardModel | undefined {
        return this.blacks.pop();
    }

    drawWhites(amount: number): WhiteCardModel[] {
        return this.whites.splice(this.whites.length - amount);
    }
}

