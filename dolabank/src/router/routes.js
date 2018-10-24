// import Home from '../views/home/Home.vue';
const Home = () =>
  import ('../views/home/Home');
// const Product = resolve => require(['../views/product/Product.vue'], resolve);
const Product = () =>
  import ('../views/product/Product');
const ProductDetail = () =>
  import ('../views/product/ProductDetail');
const TransferDetail = () =>
  import ('../views/transfer/TransferDetail');
const User = () =>
  import ('../views/user/User');
const More = () =>
  import ('../views/more/More');

const Login = resolve => require(['../views/login/Login'], resolve); // 登录
const Register = resolve => require(['../views/register/Register'], resolve); // 注册
const ForgetPass = resolve => require(['../views/login/ForgetPass'], resolve); // 忘记密码

const Notice = r => require.ensure([], () => r(require('../views/more/Notice')), 'group-home'); // 公告
// import Notice from '../views/more/Notice.vue';

const routes = [{
  path: '/home',
  name: 'home',
  component: Home,
  alias: '/index',
  meta: {
    title: '多啦首页'
  }
}, {
  path: '/product',
  name: 'product',
  component: Product,
  meta: {
    title: '多啦产品'
  }
}, {
  path: '/product_detail/:proID',
  name: 'product_detail',
  component: ProductDetail,
  meta: {
    title: '多啦产品详情'
  }
}, {
  path: '/transfer_detail/:proID',
  name: 'transfer_detail',
  component: TransferDetail,
  meta: {
    title: '多啦转让详情'
  }
}, {
  path: '/user',
  name: 'user',
  component: User,
  meta: {
      title: '个人中心',
      auth: true
  }
}, {
  path: '/more',
  name: 'more',
  component: More,
  meta: {
    title: '更多'
  }
}, {
  path: '/login',
  name: 'login',
  component: Login,
  meta: {
    title: '登录'
  }
}, {
  path: '/register',
  name: 'register',
  component: Register,
  meta: {
    title: '注册'
  }
}, {
  path: '/forgetpass',
  name: 'forgetpass',
  component: ForgetPass,
  meta: {
    title: '忘记密码'
  }
}, {
  path: '/notice',
  name: 'notice',
  component: Notice,
  meta: {
    title: '公告'
  }
}, {
  path: '*',
  //  redirect: '/home'
  redirect: to => {
    if (to.path === '/regular') {
      return '/product';
    } else {
      return '/home';
    }
  }
}]

export default routes;
