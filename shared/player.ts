export default class PlayerModel {
  nickname: string;

  points: number;

  connected: boolean;

  constructor(nickname: string) {
    this.nickname = nickname;
    this.points = 0;
    this.connected = true;
  }
}