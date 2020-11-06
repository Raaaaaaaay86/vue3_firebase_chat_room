/* eslint-disable no-shadow */
import { createStore } from 'vuex';
import { firestore } from '@/firebase/firebaseSDK';
import Auth from '@/store/auth';

const modules = {
  auth: Auth,
};

const state = {
  messages: [],
  currentUsers: [],
};

const actions = {
  sendMessage(context, { message }) {
    const data = {
      message,
      ts: new Date().getTime(),
      type: 'msg',
      uid: '',
    };
    return firestore.collection('messages').add(data)
      .then(() => true)
      .catch((err) => err);
  },
  sendFile() {
  },
  realTimeMessage({ state, commit }) {
    const msgRef = firestore.collection('messages').orderBy('ts');
    const data = [];
    msgRef.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (state.messages.length === 0) {
          data.push(change.doc.data());
        }
        if (change.type === 'added') {
          commit('ADD_NEW_MSG', change.doc.data());
        }
        if (change.type === 'removed') {
          commit('DELETE_MAG', change.doc.data());
        }
      });
    });
  },
  realTimeUser() {
  },
};

const mutations = {
  SET_MSG(state, data) {
    state.messages = data;
  },
  ADD_NEW_MSG(state, message) {
    state.messages.push(message);
  },
};

const getters = {
  messages(state) {
    return state.messages;
  },
};

export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules,
});

// export default createStore({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   },
// });
