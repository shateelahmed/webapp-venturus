export const state = () => ({
  murmurs: [],
  message: {
    alertType: '',
    text: '',
  },
})

export const mutations = {
  SET_MURMURS(state, murmurs) {
    state.murmurs = murmurs
  },
  SET_MESSAGE(state, message) {
    state.message = message
  },
  UNSET_MESSAGE(state) {
    state.message.alertType = ''
    state.message.text = ''
  }
}

export const actions = {
  setMessage({ commit }, message) {
    commit(SET_MESSAGE, message)
  },
  unsetMessage({ commit }) {
    commit(SET_MESSAGE, '', '')
  }
}