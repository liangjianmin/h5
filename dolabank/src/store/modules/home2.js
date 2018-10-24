import home from '../../api/home';

const state = {
  homeData: {},
  novice: {}
}

const actions = {
  getHomeData({
    commit
  }) {
    home.getHome(data => {
        console.log(data);
      commit('getHomeData', data.ad);
      commit('novice', data.batch_novice);
    })
  }
}

const mutations = {
  getHomeData(state, data) {
    state.homeData = data
  },
  novice(state, novice) {
      state.novice = novice;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}