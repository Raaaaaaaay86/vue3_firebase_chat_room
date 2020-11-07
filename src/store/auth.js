/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-shadow */
// eslint-disable-next-line no-unused-vars
import { auth, firestore } from '@/firebase/firebaseSDK';

const state = {
  loginUser: {},
};

const actions = {
  async logIn({ commit }, { email, password }) {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const querySnapshot = await firestore.collection('registered')
      .where('uid', '==', userCredential.user.uid).get(); // get the data which equals to userCredential's uid

    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      const path = data.registeredRef.split('/');
      const registeredRef = firestore.collection(path[0]).doc(path[1]);

      commit('SET_USER_INFO', data);

      try {
        const statusAndLogInTime = {
          ts: new Date().getTime(),
          expire: new Date().getTime() + 3600000,
        };

        registeredRef.update(statusAndLogInTime); // Update the FireStore('registerd') userStatus and LogInTime

        return Promise.resolve(true);
      } catch (error) {
        return Promise.reject(error);
      }
    });
  },
  async logOut({ commit }) {
    await auth.signOut();
    commit('LOG_OUT');
    return Promise.resolve(true);
  },
  async signUp(context, { email, password, nickName }) {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const registeredRef = firestore.collection('registered').doc();
    const userData = {
      nickName,
      email,
      registeredRef: registeredRef.path,
      uid: userCredential.user.uid,
      profileURL: 'https://firebasestorage.googleapis.com/v0/b/vue3chat.appspot.com/o/logo.png?alt=media&token=e821f1bb-8c54-4250-80e0-35fd05c4ddd1',
    };
    return registeredRef.set(userData); // set new userData to FireStore('registered')
  },
  checkAuthState() {
  },
  setUserInfo({ commit }, user) {
    commit('SET_USER_INFO', user);
  },
};

const mutations = {
  SET_USER_INFO(state, user) {
    state.loginUser = user;
  },
  LOG_OUT(state) {
    state.loginUser.uid = null;
  },
};

const getters = {
  loginUser(state) {
    return state.loginUser;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
