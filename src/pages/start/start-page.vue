<template>
  <div id="join-page">
    <div id="title">{{ appName }}</div>

    <TextInput
      ref="nameInput"
      label="Name"
      id="name-input"
      v-model.trim="nickname"
      @input="resetInputValidity"
      :valid="nameInputValid"
      :errorText="nameInputErrorText"
    />
    <TextInput
      ref="roomInput"
      label="Room"
      id="room-input"
      v-model.trim="roomID"
      @input="resetInputValidity"
      :valid="roomInputValid"
      :errorText="roomInputErrorText"
    />

    <Button id="join-button" @click="joinRoom">Join Room</Button>
    <Button id="create-button" @click="createRoom">Create Room</Button>
  </div>
</template>

<script lang="ts">
import { ref, Ref, reactive, defineComponent, SetupContext } from "vue";
import TextInput from "@/components/ui/text-input.vue";
import Button from "@/components/ui/button.vue";

import Config from "../../../config";
const cfg: Config = new Config();

import RoomOptions from "../../../shared/room-options";
import RoomModel from "../../../shared/room";
import PlayerModel from "../../../shared/player";

import JoinRoomResponseType from "../../../shared/join-room-response-type";
import CreateRoomResponseType from "../../../shared/create-room-response-type";
import { useStore, Store } from "vuex";
import { useRouter, Router } from "vue-router";

export default defineComponent({
  name: "StartPage",
  components: {
    TextInput,
    Button
  },
  setup(props, context: SetupContext) {
    const appName: string = cfg.appName;

    const nickname: Ref<string> = ref("");
    const roomID: Ref<string> = ref("");

    const nameInputValid: Ref<boolean> = ref(true);
    const nameInputErrorText: Ref<string> = ref("");

    const roomInputValid: Ref<boolean> = ref(true);
    const roomInputErrorText: Ref<string> = ref("");

    let joinReponseListenerActive = false;
    let createReponseListenerActive = false;

    const store: Store<any> = useStore();
    const state = store.state;

    const router: Router = useRouter();

    function validateInput(): boolean {
      let valid = true;

      if (nickname.value.length == 0) {
        nameInputErrorText.value = "Input must not be empty.";
        nameInputValid.value = false;
        valid = false;
      }

      if (roomID.value.length == 0) {
        roomInputErrorText.value = "Input must not be empty.";
        roomInputValid.value = false;
        valid = false;
      }

      return valid;
    }

    function resetInputValidity(): void {
      nameInputValid.value = true;
      roomInputValid.value = true;
    }

    function joinRoom() {
      if (validateInput()) {
        if (!joinReponseListenerActive) {
          // HACK: room.players is a Map which cannot be stringified. Even when transmitting without stringifiying, this does not work.
          // Thus players are sent separately as an array.
          state.socket.once("joinRoomResponse", (joinRoomResponseString: string) => {
            const joinRoomResponse: {
              type: JoinRoomResponseType;
              room: RoomModel;
              players: Array<Array<string | PlayerModel>>;
            } = JSON.parse(joinRoomResponseString);

            if (joinRoomResponse.type == JoinRoomResponseType.ACCEPT) {
              store.dispatch("setNickname", nickname.value);

              store.dispatch("setRoom", joinRoomResponse.room);

              const players: Map<string, PlayerModel> = new Map();
              joinRoomResponse.players.forEach(arr =>
                players.set(arr[0] as string, arr[1] as PlayerModel)
              );
              store.dispatch("setPlayers", players);
              router.push("game");
            } else if (joinRoomResponse.type == JoinRoomResponseType.DENY_ROOM_DOES_NOT_EXIST) {
              roomInputErrorText.value = "A room with this name doesn't exist.";
              roomInputValid.value = false;
            } else if (joinRoomResponse.type == JoinRoomResponseType.DENY_PLAYER_ALREADY_CONNECTED) {
              nameInputErrorText.value = "A player with this name is already active in this room.";
              nameInputValid.value = false;
            }
            joinReponseListenerActive = false;
          }
          );
          joinReponseListenerActive = true;
        }
        if (state.connected) {
          const joinRoomRequest = {
            nickname: nickname.value,
            roomID: roomID.value
          };
          state.socket.emit("joinRoomRequest", JSON.stringify(joinRoomRequest));
        }
      }
    }

    function createRoom() {
      console.log("create room");

      if (validateInput()) {
        if (!createReponseListenerActive) {
          state.socket.once("createRoomResponse", (createRoomResponse: CreateRoomResponseType) => {
            if (createRoomResponse == CreateRoomResponseType.ACCEPT) {
              // TODO: create page for choosing room options
              const optionsMessage = {
                roomID: roomID.value,
                options: new RoomOptions(true, 5)
              };

              state.socket.emit("changeRoomOptions", JSON.stringify(optionsMessage));

              store.dispatch("setNickname", nickname.value);

              const room = new RoomModel(roomID.value, new PlayerModel(nickname.value));
              store.dispatch("setRoom", room);

              router.push("game");
            } else if (createRoomResponse == CreateRoomResponseType.DENY_ROOM_ALREADY_EXISTS) {
              roomInputErrorText.value = "A room with this name already exists.";
              roomInputValid.value = false;
            }
            createReponseListenerActive = false;
          });

          createReponseListenerActive = true;
        }

        if (state.connected) {
          const createRoomRequest: object = {
            nickname: nickname.value,
            roomID: roomID.value
          };
          state.socket.emit("createRoomRequest", JSON.stringify(createRoomRequest));
        }
      }
    }

    return { appName, nickname, roomID, nameInputValid, roomInputValid, nameInputErrorText, roomInputErrorText, resetInputValidity, joinRoom, createRoom };
  }
});
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

.text-input::v-deep .label {
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
