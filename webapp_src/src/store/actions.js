import * as types from './type'
export default {
    /*header*/
    showhead: ({commit}) => {
        commit(types.HEAD_SHOW_SUCCESS);
    },
    hidehead: ({commit}) => {
        commit(types.HEAD_SHOW_FAIL);
    },
    /*token*/
    [types.USER_TOKEN]({commit}, token) {
        commit(types.USER_TOKEN, token)
    },
    [types.USER_TOKEN_EXIT]({commit}, token) {
        commit(types.USER_TOKEN_EXIT, token)
    }
}