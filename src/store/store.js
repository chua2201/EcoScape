import { createStore } from 'vuex';

const store = createStore({
  state: {
    isLoggedIn: false,
  },
  mutations: {
    setLoggedIn(state) {
      state.isLoggedIn = true;
    },
    setLoggedOut(state) {
      state.isLoggedIn = false;
    }
  },
  actions: {
    login(context) {
      // Simulate an async operation, e.g., an API call
      setTimeout(() => {
        context.commit('setLoggedIn');
      }, 1000);
    },
    logout(context) {
      context.commit('setLoggedOut');
    }
  },
  getters: {
    // Your getters
    isUserLoggedIn(state) {
      return state.isLoggedIn; // Modify this based on your actual state structure
    },
  },
});

export default store;
