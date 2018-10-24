import * as types from './type'

const state = {
    headShow: true,
    token: localStorage.getItem('token') || ''
}

const mutations = {
    /*header*/
    [types.HEAD_SHOW_SUCCESS](state) {
        state.headShow = true;
    },
    [types.HEAD_SHOW_FAIL](state) {
        state.headShow = false;
    },
    /*token*/
    [types.USER_TOKEN](state, token) {
        localStorage.removeItem('token');
        localStorage.setItem('token', token);
        state.token = localStorage.getItem('token');
    },
    [types.USER_TOKEN_EXIT](state, token) {
        if (localStorage.getItem('token') != null) {
            localStorage.setItem('token', '');
            state.token = localStorage.getItem('token');
        }
    },
}

const getters = {
    headShow(state) {
        return state.headShow
    }
}

export default {
    state,
    mutations,
    getters
}