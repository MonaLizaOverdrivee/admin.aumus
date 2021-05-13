import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: {
      layout: "admin",
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import(/* webpackChunkName: "auth" */ "../views/Auth"),
    meta: {
      layout: "auth",
    },
  },
  {
    path: "/menu",
    name: "Menu",
    component: () => import(/* webpackChunkName: "menu" */ "../views/Menu.vue"),
    meta: {
      layout: "admin",
    },
  },
  {
    path: "/pages",
    name: "Pages",
    component: () => import(/* webpackChunkName: "pages" */ "../views/Pages"),
    meta: {
      layout: "admin",
    },
  },
  {
    path: "/pages/:id",
    name: "PagesId",
    component: () =>
      import(/* webpackChunkName: "pagesId" */ "../views/PageEditor"),
      meta: {
        layout: "admin",
      },
  },
  {
    path: "/pages/new",
    name: "PagesNew",
    component: () =>
      import(/* webpackChunkName: "pagesNew" */ "../views/PageEditor"),
      meta: {
        layout: "admin",
      },
  },
  {
    path: "/news",
    name: "News",
    component: () => import(/* webpackChunkName: "news" */ "../views/News.vue"),
    meta: {
      layout: "admin",
    },
  },
  {
    path: "/stats",
    name: "Stats",
    component: () => import(/* webpackChunkName: "stats" */ "../views/Stats.vue"),
    meta: {
      layout: "admin",
    },
  },
  {
    path: "/base",
    name: "Base",
    component: () => import(/* webpackChunkName: "base" */ "../views/Base.vue"),
    meta: {
      layout: "admin",
    },
  },
  {
    path: "/access",
    name: "Access",
    component: () => import(/* webpackChunkName: "access" */ "../views/Access"),
    meta: {
      layout: "admin",
    },
  },
  {
    path: "/errors",
    name: "Errors",
    component: () => import(/* webpackChunkName: "errors" */ "../views/Errors.vue"),
    meta: {
      layout: "admin",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const checkPageData =
    Object.keys(store.getters["pages/editablePage"]).length === 0 &&
    to.name === "PagesId";

  const token = localStorage.getItem("token");
  const auth = !token && to.path !== "/auth";

  if (checkPageData) {
    next("/pages");
  } else if (auth) {
    next("/auth");
  } else {
    next();
  }
});

export default router;
