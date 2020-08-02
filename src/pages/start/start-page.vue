<template>
  <div id="join-page">
    <div id="title">{{ appName }}</div>

    <TextInput
      ref="nameInput"
      label="Name"
      id="name-input"
      v-model="name"
      @input="resetInputValidity"
      :valid="nameInputValid"
      :errorText="nameInputErrorText"
    />
    <TextInput
      ref="roomInput"
      label="Room"
      id="room-input"
      v-model="room"
      @input="resetInputValidity"
      :valid="roomInputValid"
      :errorText="roomInputErrorText"
    />

    <Button id="join-button" @click="joinRoom">Join Room</Button>
    <Button id="create-button" @click="createRoom">Create Room</Button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TextInput from "@/components/ui/text-input.vue";
import Button from "@/components/ui/button.vue";

import Config from "../../../config";
const cfg: Config = new Config();

import RoomOptions from "../../../shared/room-options";
import RoomModel from "../../../shared/room";
import PlayerModel from "../../../shared/player";

import JoinRoomResponseType from "../../../shared/join-room-response-type";
import CreateRoomResponseType from "../../../shared/create-room-response-type";

@Component({
  components: {
    TextInput,
    Button
  }
})
export default class StartPage extends Vue {
  appName: string = cfg.appName;

  name = "";
  room = "";

  nameInputValid = true;
  nameInputErrorText = "";

  roomInputValid = true;
  roomInputErrorText = "";

  joinReponseListenerActive = false;
  createReponseListenerActive = false;

  get socket(): SocketIOClient.Socket {
    return this.$store.getters.getSocket;
  }

  get connected(): boolean {
    return this.$store.getters.getConnected;
  }

  joinRoom() {
    console.log("join room");

    if (this.validateInput()) {
      if (!this.joinReponseListenerActive) {
        // HACK: room.players is a Map which cannot be stringified. Even when transmitting without stringifiying, this does not work.
        // Thus players are sent separately as an array.
        this.socket.once(
          "joinRoomResponse",
          (joinRoomResponseString: string) => {
            const joinRoomResponse: {
              type: JoinRoomResponseType;
              room: RoomModel;
              players: Array<Array<string | PlayerModel>>;
            } = JSON.parse(joinRoomResponseString);

            if (joinRoomResponse.type == JoinRoomResponseType.ACCEPT) {
              this.$store.dispatch("setNickname", this.name);

              this.$store.dispatch("setRoom", joinRoomResponse.room);

              const players: Map<string, PlayerModel> = new Map();
              joinRoomResponse.players.forEach(arr =>
                players.set(arr[0] as string, arr[1] as PlayerModel)
              );
              this.$store.dispatch("setPlayers", players);

              this.joinReponseListenerActive = false;
              console.log("resp: " + joinRoomResponse.room.players.keys);
              this.$router.push("game");
            } else if (
              joinRoomResponse.type ==
              JoinRoomResponseType.DENY_ROOM_DOES_NOT_EXIST
            ) {
              this.roomInputErrorText = "A room with this name doesn't exist.";
              this.roomInputValid = false;
            } else if (
              joinRoomResponse.type ==
              JoinRoomResponseType.DENY_PLAYER_ALREADY_CONNECTED
            ) {
              this.nameInputErrorText =
                "A player with this name is already active in this room.";
              this.nameInputValid = false;
            }
          }
        );
        this.joinReponseListenerActive = true;
      }
      if (this.connected) {
        const joinRoomRequest = {
          nickname: this.name,
          roomID: this.room
        };
        this.socket.emit("joinRoomRequest", JSON.stringify(joinRoomRequest));
      }
    }
  }

  createRoom() {
    console.log("create room");

    if (this.validateInput()) {
      if (!this.createReponseListenerActive) {
        this.socket.once(
          "createRoomResponse",
          (createRoomResponse: CreateRoomResponseType) => {
            if (createRoomResponse == CreateRoomResponseType.ACCEPT) {
              // TODO: create page for choosing room options
              const optionsMessage = {
                roomID: this.room,
                options: new RoomOptions(true, 5)
              };

              this.socket.emit(
                "changeRoomOptions",
                JSON.stringify(optionsMessage)
              );

              this.$store.dispatch("setNickname", this.name);

              const room = new RoomModel(this.room, new PlayerModel(this.name));
              this.$store.dispatch("setRoom", room);

              this.createReponseListenerActive = false;

              this.$router.push("game");
            } else if (
              createRoomResponse ==
              CreateRoomResponseType.DENY_ROOM_ALREADY_EXISTS
            ) {
              this.roomInputErrorText = "A room with this name already exists.";
              this.roomInputValid = false;
            }
          }
        );

        this.createReponseListenerActive = true;
      }

      if (this.connected) {
        const createRoomRequest: object = {
          nickname: this.name,
          roomID: this.room
        };
        this.socket.emit(
          "createRoomRequest",
          JSON.stringify(createRoomRequest)
        );
      }
    }
  }

  validateInput(): boolean {
    let valid = true;

    if (!(Boolean(this.name) && this.name.trim().length != 0)) {
      this.nameInputErrorText = "Input must not be empty.";
      this.nameInputValid = false;
      valid = false;
    }

    if (!(Boolean(this.room) && this.room.trim().length != 0)) {
      this.roomInputErrorText = "Input must not be empty.";
      this.roomInputValid = false;
      valid = false;
    }

    return valid;
  }

  resetInputValidity(): void {
    this.nameInputValid = true;
    this.roomInputValid = true;
  }
}
</script>

<style lang="less" scoped>
#join-page {
  text-align: center;
  margin: auto;
}

#title {
  color: #ffffff;
  font-size: 2rem;
  font-weight: bold;

  margin-bottom: 64px;
}

.text-input {
  display: block;
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}

.text-input /deep/ .label {
  color: #ffffff;
}

button {
  display: inline-block;
  height: 32px;
  width: 128px;
}

@button-spacing: 32px;

#join-button {
  margin-right: @button-spacing / 2;
}

#create-button {
  margin-left: @button-spacing / 2;
}
</style>
