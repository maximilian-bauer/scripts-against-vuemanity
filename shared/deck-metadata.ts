export default class DeckMetadata {
  name: string;
  nsfw: boolean;
  icon: string;
  groups: string[];

  constructor(name: string, nsfw: boolean, icon: string, groups: string[]) {
    this.name = name;
    this.nsfw = nsfw;
    this.icon = icon;
    this.groups = groups;
  }
}