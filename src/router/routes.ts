import { RouteConfig } from 'vue-router'
import { routeBuilder } from 'utils/index'

/****** Layout ******/
const Index = () => import(/* webpackChunkName: "index" */ 'layouts/Index.vue')
const Login = () => import(/* webpackChunkName: "login" */ 'layouts/Login.vue')

/****** Index ******/
const Test = () => import(/* webpackChunkName: "test" */ 'views/Test.vue')
const Test1 = () => import(/* webpackChunkName: "test" */ 'views/Test1.vue')
const Test2 = () => import(/* webpackChunkName: "test" */ 'views/Test2.vue')

export const IndexRoutes = [
  /* 无 tab 菜单项 用做默认菜单 */
  {
    sides: [
      {
        name: 'i-t',
        url: 'i-t',
        component: Test,
        icon: 'icon-vip',
      },
      {
        name: 'i-t2',
        url: 'i-t2',
        component: Test,
        icon: 'icon-vip',
      },
      {
        name: 'i-g',
        children: [
          {
            name: 'i-g-t1',
            url: 'i-g-t1',
            component: Test1,
            icon: 'icon-vip',
          },
          {
            name: 'i-g-t2',
            url: 'i-g-t2',
            component: Test2,
            icon: 'icon-vip',
          },
        ],
      },
      {
        name: 'i-g-1',
        children: [
          {
            name: 'i-g1-t1',
            url: 'i-g1-t1',
            component: Test1,
            icon: 'icon-vip',
          },
          {
            name: 'i-g1-t2',
            url: 'i-g1-t2',
            component: Test2,
            icon: 'icon-vip',
          },
        ],
      },
    ],
  },
  /* 具名 tab 菜单项 需点击顶部菜单按钮后选中对应菜单 */
  {
    title: 'o-title',
    url: 'mall',
    sides: [
      /* 默认菜单项 直接展示 */
      {
        name: 'o-t',
        url: 'o-t',
        component: Test,
        icon: 'icon-vip',
      },
      /* 子菜单项 */
      {
        name: 'o-g',
        children: [
          {
            name: 'o-g-t1',
            url: 'o-g-t1',
            component: Test1,
            icon: 'icon-vip',
          },
          {
            name: '0-g-t2',
            url: '0-g-t2',
            component: Test2,
            icon: 'icon-vip',
          },
        ],
      },
    ],
  },
  /* 外部链接菜单按钮 直接跳出 */
  {
    title: 'screen',
    url: 'http://www.baidu.com',
  },
  {
    title: 'setting',
    url: 'setting',
    hide: true, // 隐藏菜单项 不在顶部显示
    sides: [
      {
        name: 's-t',
        url: 's-t',
        component: Test,
        icon: 'icon-vip',
      },
      {
        name: 's-g',
        children: [
          {
            name: 's-g-t1',
            url: 's-g-t1',
            component: Test1,
            icon: 'icon-vip',
          },
          {
            name: 's-g-t2',
            url: 's-g-t2',
            component: Test2,
            icon: 'icon-vip',
          },
        ],
      },
    ],
  },
]

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      { path: '', redirect: { name: 'I-t' } },
      ...routeBuilder(IndexRoutes),
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

export default routes
