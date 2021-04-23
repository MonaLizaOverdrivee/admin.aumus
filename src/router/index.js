import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/menu",
    name: "Menu",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/Menu.vue"),
  },
  {
    path: "/pages",
    name: "Pages",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/Pages.vue"),
  },
  {
    path: "/pages/:id",
    name: "PagesId",
    props: true,
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/PageEditor.vue"),
  },
  {
    path: "/news",
    name: "News",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/News.vue"),
  },
  {
    path: "/stats",
    name: "Stats",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/Stats.vue"),
  },
  {
    path: "/base",
    name: "Base",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/Base.vue"),
  },
  {
    path: "/access",
    name: "Access",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/Access.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
