import Vue from 'vue'
import Vuex from 'vuex'
import collapse from './collapse'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
            avatar: window.localStorage.getItem('avatar') || null,
        },
    },
    getters: {},
    mutations: {
        SET_USER_AVATAR(state, avatar) {
            state.userInfo.avatar = avatar;
            window.localStorage.setItem('avatar',avatar)
        },
    },
    actions: {},
    modules: {
        collapse
    }
})
