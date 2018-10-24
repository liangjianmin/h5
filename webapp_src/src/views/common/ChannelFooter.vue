<template>
    <nav class="dola-nav boxsiz" v-if="tokencheck !=null">
        <router-link to="/fanli" tag="a" active-class="curr">
            <i class="icn-2"></i>
            <p>投资</p>
        </router-link>
        <template v-if="tokencheck == false">
            <a href="/user/login">
                <i class="icn-3"></i>
                <p>我的</p>
            </a>
        </template>
        <template v-if="tokencheck == true">
            <router-link to="/user/detail" tag="a" active-class="curr">
                <i class="icn-3"></i>
                <p>我的</p>
            </router-link>
        </template>
    </nav>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        name: 'footers',
        computed: mapState({
            tokencheck: state => state.home.tokencheck
        }),
        watch: {
            $route(to) {
                this.getToken();
            }
        },
        created() {
            this.getToken();
        },
        methods: {
            getToken() {
                this.$store.dispatch({
                    type: 'tokenCheck'
                });
            }
        }
    }
</script>
