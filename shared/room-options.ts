export default class RoomOptionsModel {

  decks: string[];
  allowBlanks: boolean;
  blanks: number;

  constructor(decks: string[], allowBlanks: boolean, blanks: number) {
    this.decks = decks;
    this.allowBlanks = allowBlanks;
    this.blanks = blanks;
  }
}