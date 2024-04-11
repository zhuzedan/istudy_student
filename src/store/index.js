import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
            userId: window.localStorage.getItem('userId') || null,
            avatar: window.localStorage.getItem('avatar') || null,
        },
    },
    getters: {},
    mutations: {
        SET_USER_ID(state, userId) {
            state.userInfo.userId = userId;
            window.localStorage.setItem('userId', userId)
        },
        SET_USER_AVATAR(state, avatar) {
            state.userInfo.avatar = avatar;
            window.localStorage.setItem('avatar', avatar)
        }
    },
    actions: {},
    modules: {}
})
