/* eslint-disable */
import { createStore } from 'vuex';
import { auth } from '@/firebase/firebaseSDK';

const state = {
  loginUser: null,
};

const actions = {
  logIn(context, { email, password }) {
    return auth.signInWithEmailAndPassword(email, password)
  },
  logOut() {
    auth.signOut();
  },
  signUp(context, { email, password }) {
    return auth.createUserWithEmailAndPassword(email, password);
  },
  checkAuthState() {
  }
};

const mutations = {

};

const getters = {

};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}
