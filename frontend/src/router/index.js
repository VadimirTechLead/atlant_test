import Vue from "vue";
import VueRouter from "vue-router";
// import hello from "./components/HelloWorld";
const calculator = () => import("../components/calculator/index");
const comment = () => import("../components/comment");

Vue.use(VueRouter);

const routes = [
  { path: "/calculator", component: calculator },
  { path: "/comment", component: comment }
];

// 3. Создаём экземпляр роутера с опцией `routes`
// Можно передать и другие опции, но пока не будем усложнять
const router = new VueRouter({
  routes // сокращение от `routes: routes`
});

export default router;
