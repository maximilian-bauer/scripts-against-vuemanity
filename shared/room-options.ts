export default class RoomOptionsModel {

  decks: string[];

  handSize: number;

  allowBlanks: boolean;
  blanks: number;

  constructor(decks: string[], handSize: number, allowBlanks: boolean, blanks: number) {
    this.decks = decks;
    this.handSize = handSize;
    this.allowBlanks = allowBlanks;
    this.blanks = blanks;
  }
}