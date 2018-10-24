<template>
    <section class="dola-repayments">
        <div class="calbox">
            <vue-event-calendar @select-changed="handleSelect" @day-changed="handleDayChanged" @month-changed="handleMonthChanged"></vue-event-calendar>
        </div>
        <div class="dola-repayments-details">
            <template v-if="selectFlag">
                <dl>
                    <dt>{{paybackCalendarForDayData.formate_time}}&nbsp;回款明细</dt>
                    <template v-if="paybackCalendarForDayData.total > 0">
                        <router-link class="clr boxsiz" tag="dd" :to="'/repaymentsdetail?startDate='+paybackCalendarForDayData.formate_time.replace(/-/g,'')">
                            <span class="fl l">回款计划</span>
                            <div class="fr r">
                                <p class="lineBlock va-m">
                                    <span>{{paybackCalendarForDayData.total}}</span>
                                    <em>笔</em>
                                </p>
                                <i class="lineBlock va-m"></i>
                            </div>
                        </router-link>
                    </template>
                    <template v-else>
                        <dd class="clr boxsiz nobor">
                            <div class="no-data-box">
                                <i class="no-data"></i>
                                <p>空空如也...</p>
                            </div>
                        </dd>
                    </template>
                </dl>
            </template>
        </div>
        <!--选择年月-->
        <mt-datetime-picker ref="picker" :startDate='startDate' type="date" v-model="value" year-format="{value}年" month-format="{value}月" date-format="{value} 日" @confirm="handleChange"></mt-datetime-picker>
    </section>
</template>
<script>
    import Vue from 'vue'
    import {mapState} from 'vuex'
    import vueEventCalendar from '../../components/calendar/index.js'
    import Util from '../../util/index'
    import {Toast, DatetimePicker} from 'mint-ui'
    import TitleBar from '../common/TitleBar.vue'

    Vue.use(vueEventCalendar, {locale: 'zh'})
    Vue.component(DatetimePicker.name, DatetimePicker);
    let today = new Date()

    export default {
        name: 'repayments',
        computed: mapState({
            paybackCalendar: state => state.payback.paybackCalendar,
            calendarCurr: state => state.payback.calendarCurr,
            paybackCalendarForDayData: state => state.payback.paybackCalendarForDayData
        }),
        data() {
            return {
                title: '回款日历',
                value: null,
                start_date: '',
                page: 1,
                page_size: 10,
                startDate: new Date(new Date().getFullYear(), 0, 1),
                selectFlag: true
            }
        },
        created() {
            //设置年月日格式
            var year = `${today.getFullYear()}`;
            var month = `${today.getMonth() + 1}`;
            var day = `${today.getDate()}`;
            this.start_date = year + Util.p(month) + Util.p(day);
            this.getPaybackCalendarForDay(this.start_date, true, true);
        },
        methods: {
            getPaybackCalendarForDay(time, loading, condition) {
                this.$store.dispatch({
                    type: 'paybackCalendarForDay',
                    start_date: time,
                    page: this.page,
                    page_size: this.page_size,
                    loading: loading,
                    condition: condition
                });
            },
            getPayBackData(time) {
                this.$store.dispatch({
                    type: 'paybackCalendar',
                    start_date: time,
                    page: this.page,
                    page_size: this.page_size
                });
            },
            handleSelect(data) {
                this.$refs.picker.open();
            },
            handleChange(value) {
                console.log('选择的日期是：' + value);
                var myDate = value;
                var year = myDate.getFullYear();
                var month = Util.p(myDate.getMonth() + 1);
                this.start_date = year + month + '01';
                this.$EventCalendar.toDate(year + '-' + month);
            },
            handleDayChanged(data) {
                this.selectFlag = true;
                console.log('date-changed', data);
                var timeArr = data.date.split('/');
                var year = timeArr[0];
                var month = Util.p(timeArr[1]);
                var day = Util.p(timeArr[2]);
                var time = year + '-' + month + '-' + day;
                console.log(time + " 00:00:00");

                var year_now = `${today.getFullYear()}`;
                var month_now = `${today.getMonth() + 1}`;
                var day_now = `${today.getDate()}`;
                var time_now = year_now + '-' + month_now + '-' + day_now;

                console.log(time_now + " 00:00:00");
                //不支持查看当前日期前的回款计划
                var timestamp1 = new Date(time_now + " 00:00:00").getTime();
                var timestamp2 = new Date(time + " 00:00:00").getTime();
                if (timestamp1 > timestamp2) {
                    let instance = Toast({
                        message: '暂不支持查看历史回款计划',
                        duration: 2000
                    });
                } else {
                    this.$router.push({path: '/repaymentsdetail', query: {startDate: time.replace(/-/g, '')}});
                }
            },
            handleMonthChanged(data) {
                this.selectFlag = false;
                console.log('month-changed', data);
                var date = data.replace('年', '-').replace('月', '');
                var dataArr = date.split('-');
                if (dataArr[0] < parseInt(`${today.getFullYear()}`)) {
                    let instance = Toast({
                        message: '暂不支持查看历史回款计划',
                        duration: 2000
                    });
                } else if (dataArr[0] == parseInt(`${today.getFullYear()}`) && dataArr[1] < parseInt(`${today.getMonth() + 1}`)) {
                    let instance = Toast({
                        message: '暂不支持查看历史回款计划',
                        duration: 2000
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
    @import "../../assets/css/wap/calendar.css";
    @import "../../assets/css/wap/repayments.css";
</style>
