import Vue from '../vue.esm.browser.js'
import Vuex from '../vuex.esm.browser.js'
import document from './document.js'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    document
  }
});
