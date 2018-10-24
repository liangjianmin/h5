import {services as Services} from '../../api/index'
import Util from '../../util/index'
import {Indicator, Toast} from 'mint-ui';


const state = {
    activity: {},
    activitydata: [],
    hasLayer: {}
}

const mutations = {
    getActivitylist(state, payload) {
        state.activity = payload.res.data;
        state.activitydata = state.activitydata.concat(payload.res.data.list);
    },
    hasLayer(state, payload) {
        state.hasLayer = payload.res.data;
    }
}

const actions = {
    getActivitylist({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        var paramsdata = {
            page: payload.page
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
        Services.getActivitylist(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data)
            if (data.code == 0) {
                commit({
                    type: 'getActivitylist',
                    res: data
                });
                Indicator.close();
            } else {
                Indicator.close();
                Toast({
                    message: data.msg,
                    duration: 1500
                });
                setTimeout(() => {
                    window.location.href = '/'
                }, 1500)
            }
        }).catch(function (err) {
            Indicator.close();
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
