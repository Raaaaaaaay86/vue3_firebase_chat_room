/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-shadow */
// eslint-disable-next-line no-unused-vars
const state = {
  showModal: false,
  message: '',
  modalTopic: '',
  modalType: '',
};

const actions = {
};

const mutations = {
  CLOSE_MODAL(state) {
    state.showModal = false;
  },
  ALERT_MODAL(state, { type, message, topic }) {
    state.modalType = type;
    state.showModal = true;
    state.message = message;
    state.modalTopic = topic;
  },
  PROFILE_MODAL(state, { type, topic }) {
    state.modalType = type;
    state.showModal = true;
    state.modalTopic = topic;
  },
};

const getters = {
  showModal(state) {
    return state.showModal;
  },
  message(state) {
    return state.message;
  },
  modalTopic(state) {
    return state.modalTopic;
  },
  modalType(state) {
    return state.modalType;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
