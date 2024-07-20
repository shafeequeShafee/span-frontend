import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      isAuthenticated: true,
    };
  },
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated;
    },
  },

  mutations: {
    login: (state) => {
      console.log("login");
      state.isAuthenticated = true;
    },
    logout: (state) => {
      console.log("logout");
      state.isAuthenticated = false;
    },
  },
  actions: {
    login({ commit }) {
      commit("login");
    },

    logout({ commit }) {
      commit("logout");
    },
  },
  modules: {},
});
