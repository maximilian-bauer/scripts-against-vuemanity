export default class RoomOptionsModel {

  allowBlanks: boolean;
  blanks: number;

  constructor(allowBlanks: boolean, blanks: number) {
    this.allowBlanks = allowBlanks;
    this.blanks = blanks;
  }
}