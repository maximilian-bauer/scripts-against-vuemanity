import StartPage from "@/pages/start/start-page.vue";
import GamePage from "@/pages/game/game-page.vue";
import Vue from "vue";
import Router, { Route } from "vue-router";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

function gameGuard(to: Route, from: Route, next: Function) {
  if (store.state.room == undefined) {
    next("/start");
  } else {
    next();
  }
}

const router = new Router({
  mode: "history",
  base: "/",
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
      path: "*",
      redirect: "/start"
    }
  ]
});

export default router;
