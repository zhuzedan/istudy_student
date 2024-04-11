import Vue from 'vue'
import Vuex from 'vuex'
import collapse from './collapse'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
            avatar: null,
        },
    },
    getters: {},
    mutations: {
        SET_USER_AVATAR(state, avatar) {
            state.userInfo.avatar = avatar;
        },
    },
    actions: {},
    modules: {
        collapse
    }
})
