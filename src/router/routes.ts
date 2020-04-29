import { RouteConfig } from 'vue-router'

/****** Layout ******/
const Home = () => import(/* webpackChunkName: "home" */ 'views/Home.vue')
const Login = () => import(/* webpackChunkName: "login" */ 'views/Login.vue')

/****** Index ******/
const Test = () => import(/* webpackChunkName: "home" */ 'views/home/Test.vue')

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: '', redirect: { name: 'Test' } },
      {
        path: 'test',
        name: 'Test',
        component: Test,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

export default routes
