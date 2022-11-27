import OnlyHeader from "../Layout/OnlyHeader/OnlyHeader";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/home/:require', component: Home },
    { path: '/home/:require/:id', component: Home },
    { path: '/Login-page', component: Login, layout: OnlyHeader },
    { path: '/Signup', component: Signup, layout: OnlyHeader }
]

export {publicRoutes}