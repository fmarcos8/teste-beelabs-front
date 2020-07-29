export default {
  namespaced: true,
  state: {
    loading: false,
    sidebarShow: 'responsive',
    sidebarMinimize: false
  },
  mutations: {
    setIsLoading: (state, payload) => {
      state.loading = payload;
    },
    toggleSidebarDesktop (state) {
      const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile (state) {
      const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set (state, [variable, value]) {
      state[variable] = value
    }
  },
  actions: {
    loading: ({ commit }, payload) => {
			commit('setIsLoading', payload);
		}
  },
  getters: {
    isLoading: state => state.loading,
  }
}