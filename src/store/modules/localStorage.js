import axios from "axios";

const state = {
  serverPath: 'http://localhost:8000',
  token: undefined,
  user: undefined,
  avatar: undefined
}

const getters = {
  serverPath: (state) => state.serverPath,
  token: (state) => state.token,
  user: (state) => state.user,
  avatar: (state) => state.avatar,
}

const mutations = {  // это сеттеры
  setToken(state, newToken) {
    state.token = newToken
  },
  setUser(state, newUser) {
    state.user = newUser
  },
  setAvatar(state, newAvatar) {
    state.avatar = newAvatar
  },
}

const actions = {
  updateProfileImage({ commit }, avatar) {
    commit('setAvatar', avatar);
  },

  async handleErrorMessage({ dispatch }, { err, locale }) {
    if (locale === 'en') {
      return err.response.data.message ?  err.response.data.message : err.message
    } else {
      return err.response.data.message
        ? await dispatch('translate', err.response.data.message)
        : await dispatch('translate', err.message)
    }
  },

  async translate({ commit }, text) {
    try {
      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: text,
          langpair: 'en|uk'
        },
        withCredentials: false
      });
      return response.data.responseData.translatedText
    } catch (err) {
      console.log('translate error: ' + err)
      throw err
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
