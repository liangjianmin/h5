<template>
    <section class="dola-user">
        <pre>
            User -- {{ username }} -- {{ $route.params.id }}
        </pre>

        <router-link to="user/foo/child1">child1</router-link>
        <router-link to="user/foo/child2">child2</router-link>
        <router-view></router-view>

        <button @click="pushRouter">pushRouter</button>

        <dl-nav></dl-nav>
    </section>
</template>

<script>
import dlNav from "../../components/nav/dlNav.vue";

export default {
  computed: {
    username() {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.id;
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    pushRouter() {
        // this.$router.push('/login');

        // this.$router.push({name: 'login'});

        this.$router.push({ path: '/home', query: {plan_id: 123} });
    }
  },
//   watch: {
//     $route(to, from) {
//       // 对路由变化作出响应...
//       console.log(to);
//       console.log(from);

//       if (to.params.id === "foo") {
//         console.log("foo");
//       }
//     }
//   },
  beforeRouteUpdate(to, from, next) {
    console.log(to);
    console.log(from);
    console.log(next);

    next();
  },
  components: {
    "dl-nav": dlNav
  }
};
</script>

<style>
</style>