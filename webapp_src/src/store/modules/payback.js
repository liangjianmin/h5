import {services as Services} from '../../api/index'
import Util from '../../util/index'
import {Indicator, Toast} from 'mint-ui'


const state = {
    paybackCalendar: [],
    calendarCurr: [],
    paybackCalendarForDay: [],
    paybackCalendarForDayData:{}
}

const mutations = {
    paybackCalendar(state, payload) {
        state.paybackCalendar = payload.res.data;
        if (payload.res.data.length > 0) {
            for (var i = 0; i < payload.res.data.length; i++) {
                state.calendarCurr.push({
                    date: payload.res.data[i].formatetime.replace(/-/g, '/'),
                    title: i
                });
            }
        } else {
            state.calendarCurr = [];
        }
    },
    paybackCalendarForDay(state, payload) {
        state.paybackCalendarForDayData = payload.res.data;
        if (payload.condition) {
            state.paybackCalendarForDay = [];
            state.paybackCalendarForDay = state.paybackCalendarForDay.concat(payload.res.data.data);
        } else {
            state.paybackCalendarForDay = state.paybackCalendarForDay.concat(payload.res.data.data);
        }
    }
}

const actions = {
    paybackCalendar({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            start_date: payload.start_date,
            page: payload.page,
            page_size: payload.page_size
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params);
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.paybackCalendar(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'paybackCalendar',
                    res: data
                });
                Indicator.close();
            } else {
                Toast({
                    message: data.msg,
                    duration: 1500
                });
                Indicator.close();
            }
        }).catch(function (err) {
            Indicator.close();
            Toast({
                message: '网路不通，请刷新重试',
                duration: 1500
            });
        })
    },
    paybackCalendarForDay({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            start_date: payload.start_date,
            page: payload.page,
            page_size: payload.page_size,
            condition: payload.condition
        }
        let params = Util.getParams('wechat', token, paramsdata);
        console.log(params);
        params = Util.encryption(Codekey, params, 'code');
        if (payload.loading) {
            Indicator.open({
                text: '拼命加载...',
                spinnerType: 'triple-bounce'
            });
        }
        Services.paybackCalendarForDay(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'paybackCalendarForDay',
                    res: data,
                    condition: payload.condition
                });
                Indicator.close();
            } else {
                Toast({
                    message: data.msg,
                    duration: 1500
                });
                Indicator.close();
            }
        }).catch(function (err) {
            Indicator.close();
            Toast({
                message: '网路不通，请刷新重试',
                duration: 1500
            });
        })
    }
}

const getters = {}

export default {
    state,
    mutations,
    getters,
    actions
}
