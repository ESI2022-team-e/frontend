import {createRouter, createWebHistory} from "vue-router";
import UserHome from "./views/UserHome.vue";
import UserLogin from "./views/UserLogin.vue";
import UserRegister from "./views/UserRegister.vue";
import InvoicePage from "@/views/InvoicePage";
import CarDetails from "@/views/CarDetails";

// lazy-loaded
const UserProfile = () => import("./views/UserProfile.vue")
const BoardManager = () => import("./views/BoardManager.vue")
const BoardCustomer = () => import("./views/BoardCustomer.vue")
const CarsList = () => import("./views/CarsList.vue")

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
    {
        path: "/invoices",
        name: "invoices",
        // lazy-loaded
        component: InvoicePage,
    },
    {
        path: "/car/:carId/details",
        name: "details",
        component: CarDetails,
        props: true,
    }
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