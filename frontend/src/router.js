import Vue from 'vue';
import Router from 'vue-router';
import Notice from './components/Notice.vue';
import Write from './components/Write.vue';
import Modify from './components/Modify.vue';
import Home from './views/Home.vue';
import Login from './components/Login.vue';
import Management from './views/Management.vue';
import Userlist from './views/UserList.vue';
import Guestbook from './views/Guestbook.vue';
import Priceview from './views/Priceview.vue';
import Starview from './views/Starview.vue';
import Storeview from './views/Storeview.vue';
import Signup from './components/Signup.vue';
import Sitemap from './views/Sitemap.vue';
import store from '@/store';
import ChartApt from './components/ChartApt.vue';
Vue.use(Router);

const requireAuth = () => (to, from, next) => {
  const nextRoute = to.path;

  if (store.getters.getAccessToken || localStorage.getItem('key')) {
    return next();
  } else next('/login' + nextRoute);
};

const routes = [
  //메인 화면
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    //차트
    path: '/chart/:aptName/:dong',
    component: ChartApt,
    props: true,
  },
  {
    //사이트맵
    path: '/sitemap',
    name: 'sitemap',
    component: Sitemap,
  },
  {
    //회원가입
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    //storeview
    path: '/storeview',
    name: 'storeview',
    component: Storeview,
  },
  {
    //Starview
    path: '/starview',
    name: 'starview',
    component: Starview,
    beforeEnter: requireAuth(),
  },
  {
    //pricevuew
    path: '/priceview',
    name: 'priceview',
    component: Priceview,
  },
  {
    // 게시판 작성 페이지로 이동
    path: '/notice',
    name: 'notice',
    component: Notice,
    beforeEnter: requireAuth(),
  },
  {
    // 개인정보 수정 페이지 이동
    path: '/management',
    name: 'management',
    component: Management,
    beforeEnter: requireAuth(),
  },
  {
    // 로그인
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/guestbook',
    name: 'Guestbook',
    component: Guestbook,
    // props: true,
  },
  {
    path: '/login/:nextRoute',
    name: 'LoginNextRoute',
    component: Login,
  },

  {
    //게시글 작성
    path: '/write/:title',
    name: 'write',
    component: Write,
    props: true,
    beforeEnter: requireAuth(),
  },
  {
    path: '/userlist',
    name: 'userlist',
    component: Userlist,
    beforeEnter: requireAuth(),
  },
  {
    //게시글 수정
    path: '/modify/:title/:no',
    name: 'modify',
    component: Modify,
    props: true,
    beforeEnter: requireAuth(),
  },
];
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
