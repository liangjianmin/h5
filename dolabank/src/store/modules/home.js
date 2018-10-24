import {
  apis,
  getData
} from '../../api/index';
import Util from '../../util/index';
import {
  Indicator
} from 'mint-ui';
import {
  Toast
} from 'mint-ui';

const state = {
  appindex: {},
  broadList: []
}

const getters = {
//   broadList: state => state.appindex.public_message
};

const mutations = {
  appIndex(state, payload) {
    state.appindex = payload.res.data;
    state.broadList = payload.res.data.public_message.data;
  }
}

const actions = {
  appIndex({
    commit
  }, payload) {

    Indicator.open({
      text: '拼命加载...',
      spinnerType: 'triple-bounce'
    });

    getData({
      url: apis.appIndex,
      success: (data) => {
        console.log(data);
        Indicator.close();
        commit({
          type: 'appIndex',
          res: data
        });
      },
      error(data) {
        Indicator.close();
        Toast({
          message: data.msg,
          duration: 1500
        });
      }
    }).catch(function (err) {
      Indicator.close();
    });
  }
}



export default {
  state,
  mutations,
  getters,
  actions
};
