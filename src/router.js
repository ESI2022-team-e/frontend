import { createWebHistory, createRouter } from "vue-router";
import UserHome from "./components/UserHome.vue";
import UserLogin from "./components/UserLogin.vue";
import UserRegister from "./components/UserRegister.vue";

// lazy-loaded
const UserProfile = () => import("./components/UserProfile.vue")
const BoardManager = () => import("./components/BoardManager.vue")
const BoardCustomer = () => import("./components/BoardCustomer.vue")
const CarsList = () => import("./components/CarsList.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: UserHome,
  },
  {
    path: "/home",
    component: UserHome,
  },
  {
    path: "/login",
    component: UserLogin,
  },
  {
    path: "/register",
    component: UserRegister,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: UserProfile,
  },
  {
    path: "/manager",
    name: "manager",
    // lazy-loaded
    component: BoardManager,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardCustomer,
  },
  {
    path: "/cars",
    name: "cars",
    // lazy-loaded
    component: CarsList,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home', '/cars']; // TODO: remove pages that need authentixation from here
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });
export default router;