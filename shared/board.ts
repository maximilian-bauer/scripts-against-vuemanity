import BlackCardModel from "./card-black";
import WhiteCardModel from "./card-white";

export default class BoardModel {

  black?: BlackCardModel;
  whites: Array<WhiteCardModel> = [];
}