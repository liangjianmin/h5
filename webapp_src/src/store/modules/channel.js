import {services as Services} from '../../api/index'
import Util from '../../util/index'
import {Indicator, Toast} from 'mint-ui'


const state = {
    channelFanli: '',
}

const mutations = {
    channelFanli(state, payload) {
        state.channelFanli = payload.res.data;
    }
}

const actions = {
    channelFanli({commit}, payload) {
        let Codekey = Util.getRrandomStr();
        let token = Util.getCookie('token');
        let params = Util.getParams('wechat', token, '');
        console.log(params);
        params = Util.encryption(Codekey, params, 'code');
        Indicator.open({
            text: '拼命加载...',
            spinnerType: 'triple-bounce'
        });
        Services.plans(Codekey, params).then(function (res) {
            var key = res.headers['x-dola-edoc'];
            var data = res.data;
            var str = Util.decrypt(key, data, 'code')
            var data = JSON.parse(str);
            console.log(data);
            if (data.code == 0) {
                commit({
                    type: 'channelFanli',
                    res: data
                });
                Indicator.close();
            } else {
                Indicator.close();
                Toast({
                    message: data.msg,
                    duration: 1500
                });
            }
        }).catch(function (err) {
            Toast({
                message: '网路不通，请重试',
                duration: 1500
            });
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
