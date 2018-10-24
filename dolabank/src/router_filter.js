import router from "./router";
import Util from './util';

router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.meta.title) {
    document.title = to.meta.title;
    next();
  }
  if (to.matched.some(record => record.meta.auth)) {
    if (Util.getCookie('token') !== "") {
      next();
    } else {
      // 防止无限循环
      if (to.name === 'login') {
        next();
        return;
      }
      next({
        path: '/login'
      });
    }
  } else {
    next(); // 若点击的是不需要验证的页面,则进行正常的路由跳转
  }

});
