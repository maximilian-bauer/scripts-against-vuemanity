import StartPage from "@/pages/start/start-page.vue";
import GamePage from "@/pages/game/game-page.vue";
import {createRouter, createWebHistory, RouteLocationNormalized} from "vue-router";
import store from "../store";

function gameGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) {
  if (store.state.room == undefined) {
    next("/start");
  } else {
    next();
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/start",
      component: StartPage,
      name: "start"
    },
    {
      path: "/game",
      beforeEnter: gameGuard,
      component: GamePage,
      name: "game"
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/start"
    }
  ]
});

export default router;
