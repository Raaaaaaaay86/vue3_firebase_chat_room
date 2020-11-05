import { createStore } from 'vuex';
import { fireStore } from '@/firebase/firebaseSDK';

const modules = {

};

const state = {

};

const actions = {
  sendMessage(context, message) {
    console.log(message);
    const docRef = fireStore.collection('Q1').doc('LA');
    // const data = {
    //   name: 'Liu',
    //   age: 23,
    //   job: 'cooker',
    // };

    class City {
      constructor() {
        this.name = 'Taipei';
        this.population = 1000;
      }

      doublePopulation() {
        return this.population * 2;
      }
    }

    const cityConverter = {
      toFirestore(city) {
        return {
          name: city.name,
          state: city.state,
          country: city.country,
        };
      },
      fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return new City(data.name, data.state, data.country);
      },
    };

    docRef
      .withConverter(cityConverter)
      .set(new City())
      .catch((err) => console.log(err));
  },
};

const mutations = {

};

const getters = {

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
