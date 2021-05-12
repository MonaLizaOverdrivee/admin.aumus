import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import(/* webpackChunkName: "auth" */ "../views/Auth/index.vue"),
    meta: {
      layout: "auth",
    },
  },
  {
    path: "/menu",
    name: "Menu",
    component: () => import(/* webpackChunkName: "menu" */ "../views/Menu.vue"),
  },
  {
    path: "/pages",
    name: "Pages",
    component: () => import(/* webpackChunkName: "pages" */ "../views/Pages/index.vue"),
  },
  {
    path: "/pages/:id",
    name: "PagesId",
    component: () =>
      import(/* webpackChunkName: "pagesId" */ "../views/PageEditor/index.vue"),
  },
  {
    path: "/pages/new",
    name: "PagesNew",
    component: () =>
      import(/* webpackChunkName: "pagesNew" */ "../views/PageEditor/index.vue"),
  },
  {
    path: "/news",
    name: "News",
    component: () => import(/* webpackChunkName: "news" */ "../views/News.vue"),
  },
  {
    path: "/stats",
    name: "Stats",
    component: () => import(/* webpackChunkName: "stats" */ "../views/Stats.vue"),
  },
  {
    path: "/base",
    name: "Base",
    component: () => import(/* webpackChunkName: "base" */ "../views/Base.vue"),
  },
  {
    path: "/access",
    name: "Access",
    component: () => import(/* webpackChunkName: "access" */ "../views/Access.vue"),
  },
  {
    path: "/errors",
    name: "Errors",
    component: () => import(/* webpackChunkName: "errors" */ "../views/Errors.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const checkPageData = Object.keys(store.getters["pages/editablePage"]).length === 0 && to.name === "PagesId"

  if (checkPageData) {
    next("/pages");
  } else {
    next();
  }
});

export default router;
