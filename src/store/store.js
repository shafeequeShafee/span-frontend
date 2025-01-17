import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      isAuthenticated: false,
      userDetails: {
        logoUrl: "",
        companyName: "",
      },
    };
  },
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated;
    },

    getUserDetails: (state) => {
      return state.userDetails;
    },
  },

  mutations: {
    login: (state, payload) => {
      state.isAuthenticated = true;
      state.userDetails.companyName = payload?.companyName;
      state.userDetails.logoUrl = payload?.logoUrl;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userDetails.companyName = "";
      state.userDetails.logoUrl = "";
    },
  },
  actions: {
    login({ commit }, payload) {
      commit("login", payload);
    },

    logout({ commit }) {
      commit("logout");
    },
  },
  modules: {},
});
