import BlackCardModel from "./card-black";
import WhiteCardModel from "./card-white";

export default class BoardModel {

  black?: BlackCardModel = new BlackCardModel("Test", 2);
  whites: Array<WhiteCardModel> = [];
}