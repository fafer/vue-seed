// initial state
const state = () => ({
  user: {},
});

// getters
const getters = {
  getUser: (state) => {
    return state.user;
  },
};

// actions
const actions = {
  async setUser({ commit }) {
    commit('setUser', {});
  },
};

// mutations
const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
