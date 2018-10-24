<template>
    <section class="dola-advance-exit boxsiz">
        <TitleBar :title="title"></TitleBar>
        <i class="ico"></i>
        <p class="t1">计划到期前提前退出将收取您<span>0</span>元 管理费</p>
        <div class="text">
            <template v-if="exit_fee_type == 1">
                <p class="text-t1">退出方式与费用</p>
                <p class="text-t2">1、到期自动退出：免费</p>
                <p class="text-t2">2、将于24小时内退回至可用余额，若用户在此期间未登陆操作，则平台默认将用户在投资金提前退出至可用余额。</p>
            </template>
            <template v-else-if="exit_fee_type == 2">
                <p class="text-t1">退出方式与费用</p>
                <p class="text-t2">1、到期自动退出：免费</p>
                <p class="text-t2">2、将于24小时内退回至可用余额，若用户在此期间未登陆操作，则平台默认将用户在投资金提前退出至可用余额。</p>
            </template>
        </div>
        <div class="advance-input clr">
            <div class="advance-input-txt">
                <input type="password" placeholder="输入安全密码" class="pwd" v-model="password" v-on:input="inputFun(password)">
            </div>
            <a href="/user/forget_loginpass" class="fr r">忘记密码?</a>
        </div>
        <div class="advance-btn">
            <input type="button" value="确认退出" class="btn" :class="{'btn-end':active}" @click="submit()">
        </div>
    </section>
</template>
<script>
    import TitleBar from '../common/TitleBar.vue'
    import {Toast} from 'mint-ui'

    export default {
        name: 'advance-exit',
        data() {
            return {
                title: '提前退出',
                password: '',
                active: true,
                money: '',
                user_plan_id: '',
                sequel_status: '',
                exit_fee_type: ''
            }
        },
        created() {
            var money = this.$route.query.exit_fee;
            var user_plan_id = this.$route.query.user_plan_id;
            var sequel_status = this.$route.query.sequel_status;
            var exit_fee_type = this.$route.query.exit_fee_type;
            if (user_plan_id != undefined && sequel_status != undefined) {
                this.user_plan_id = user_plan_id;
                this.sequel_status = sequel_status;
                this.money = money;
                this.exit_fee_type = exit_fee_type;
            }
        },
        methods: {
            inputFun(val) {
                if (val.length >= 1) {
                    this.active = false
                } else {
                    this.active = true;
                }
            },
            submit() {
                if (this.password == '') {
                    let instance = Toast({
                        message: '请输入安全密码',
                        duration: 2000
                    });
                } else {
                    this.$store.dispatch({
                        type: 'exitPlan',
                        user_plan_id: this.user_plan_id,
                        sequel_status: this.sequel_status,
                        safe_password: this.password
                    });
                }
            }
        },
        components: {
            TitleBar
        }
    }
</script>
<style scoped>
    @import "../../assets/css/wap/advance_exit.css";
</style>
