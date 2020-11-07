/* eslint-disable no-shadow */
import { createStore } from 'vuex';
import { firestore, storage } from '@/firebase/firebaseSDK';
import Auth from '@/store/auth';

const modules = {
  auth: Auth,
};

const state = {
  messages: [],
  onlineUsers: [],
};
/* eslint-disable */
const actions = {
  sendMessage(context, { message, user, type, fileURL }) {
    const data = {
      message: message || '',
      ts: new Date().getTime(),
      type: type || 'msg',
      fileURL: fileURL || '',
      uid: user.uid,
      name: user.name,
    };
    console.log(data);
    return firestore.collection('messages').add(data)
      .then(() => true)
      .catch((err) => err);
  },
  async sendFile({ dispatch }, { e, loginUser }) {
    const file = e.target.files[0];
    if (!file.type.match(/^image/)) {
      return Promise.reject('Only accept file type: image/*');
    }
    const imgRefs = storage.ref(`imgs/${file.name}`);
    const uploadTask = await imgRefs.put(file);
    const fileURL = await imgRefs.getDownloadURL();
    if (uploadTask.state === 'success') {
      const data = {
        fileURL,
        user: {
          name: loginUser.nickName,
          uid: loginUser.uid
        },
        type: 'file',
      }
      dispatch('sendMessage', data);
    }
  },
  realTimeMessages({ commit }) {
    const msgRef = firestore.collection('messages').orderBy('ts');
    msgRef.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          commit('ADD_NEW_MSG', change.doc.data());
        }
        if (change.type === 'removed') {
          commit('DELETE_MSG', change.doc.data());
        }
      });
    });
  },
  realTimeOnlineUsers({ commit }) {
    const onlineUserRef = firestore.collection('registered').where('expire', '>', new Date().getTime()).orderBy('expire');
    onlineUserRef.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          commit('ADD_NEW_ONLINE_USER', change.doc.data());
        }
        if (change.type === 'removed') {
          commit('DELETE_ONLINE_USER', change.doc.data());
        }
      });
    });
  },
};

const mutations = {
  SET_MSG(state, data) {
    state.messages = data;
  },
  ADD_NEW_MSG(state, message) {
    state.messages.push(message);
  },
  ADD_NEW_ONLINE_USER(state, user) {
    state.onlineUsers.push(user);
  },
  DELETE_ONLINE_USER(state, user) {
    const index = state.onlineUsers.findIndex((el) => el.uid === user.uid);
    state.onlineUsers.splie(index, 0);
  },
};

const getters = {
  messages(state) {
    return state.messages;
  },
  onlineUsers(state) {
    return state.onlineUsers;
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
