/* eslint-disable object-curly-newline */
/* eslint-disable no-shadow */
import { createStore } from 'vuex';
import { firestore, storage } from '@/firebase/firebaseSDK';
import auth from '@/store/auth';
import modal from '@/store/modal';

const modules = {
  auth,
  modal,
};

const state = {
  messages: [],
  onlineUsers: [],
};
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
    // Push new message to Firestore('message')
    return firestore.collection('messages').add(data)
      .then(() => true)
      .catch((err) => err);
  },
  async sendFile({ dispatch }, { e, loginUser }) {
    const file = e.target.files[0];

    // Only accept image to upload
    if (!file.type.match(/^image/)) {
      return Promise.reject(new Error('Only accept file type: image/*'));
    }

    const imgRefs = storage.ref(`imgs/${file.name}`);
    const uploadTask = await imgRefs.put(file);
    const fileURL = await imgRefs.getDownloadURL();

    // If update success, wrap the URL as messageData and push it to FireStore('message')
    if (uploadTask.state === 'success') {
      const messageData = {
        fileURL,
        user: {
          name: loginUser.nickName,
          uid: loginUser.uid,
        },
        type: 'file',
      };
      await dispatch('sendMessage', messageData);
    }
    return Promise.resolve();
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
    const onlineUserRef = firestore.collection('registered')
      .where('expire', '>', new Date().getTime())
      .orderBy('expire');

    onlineUserRef.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          commit('UPDATE_ONLINE_USER', change.doc.data());
        }
        if (change.type === 'added') {
          commit('ADD_NEW_ONLINE_USER', change.doc.data());
        }
        if (change.type === 'removed') {
          commit('DELETE_ONLINE_USER', change.doc.data());
        }
      });
    });
  },
  async updateProfile(context, { name, profileFile, uid, registeredRef }) {
    if (profileFile) {
      const profileRef = storage.ref(`registerd/${uid}`);

      await profileRef.put(profileFile);
      const newProfileURL = await profileRef.getDownloadURL();

      firestore.doc(registeredRef)
        .update({
          nickName: name,
          profileURL: newProfileURL,
        });
    } else {
      firestore.doc(registeredRef)
        .update({ nickName: name });
    }
    console.log(context);
    return Promise.resolve(true);
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
  UPDATE_ONLINE_USER(state, user) {
    const index = state.onlineUsers.findIndex((el) => el.uid === user.uid);
    state.onlineUsers[index] = user;
  },
  DELETE_ONLINE_USER(state, user) {
    const index = state.onlineUsers.findIndex((el) => el.uid === user.uid);
    state.onlineUsers.splie(index, 0);
  },
  CLEAN_ONLINE_USER(state) {
    state.onlineUsers = [];
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
