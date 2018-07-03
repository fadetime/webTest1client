import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import timeLocalStorage from 'time-localstorage';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    language:'',
    isAdmin:'',
    landlords:[],
    houses:[],
    clerks:[],
    tenants:[],
    house_tenant_flag:false
  },
  actions: {
    language: ({ commit }, payload) => {
      commit('language', payload);
    },
    load_landlords: ({ commit }, payload) => {
      commit('load_landlords', payload);
    },
    load_clerks: ({ commit }, payload) => {
      commit('load_clerks', payload);
    },
    load_houses_list:({ commit }, payload) => {
      commit('load_houses_list', payload);
    },
    create_house:({ commit }, payload) => {
      commit('create_house', payload);
    },
    create_landlord:({ commit }, payload) => {
      commit('create_landlord', payload);
    },
    create_clerk:({ commit }, payload) => {
      commit('create_clerk', payload);
    },
    house_tenant_flag:({ commit }, payload) => {
      commit('house_tenant_flag', payload);
    },
    load_tenants:({commit},payload)=>{
      commit('load_tenants',payload)
    },
    login:({commit},payload)=>{
      commit('login',payload)
    }
  },
  mutations: {
    language: (state, payload) => {
      state.language = payload
      timeLocalStorage.set('language',state.language,false)
    },
    load_landlords:(state,payload)=>{
      state.landlords=payload
    },
    load_clerks:(state,payload)=>{
      state.clerks=payload
    },
    load_houses_list:(state,payload)=>{
        state.houses=payload.data
    },
    create_house:(state,payload)=>{
      state.houses.push(payload)
    },
    create_landlord:(state,payload)=>{
      state.landlords.push(payload)
    },
    create_clerk:(state,payload)=>{
      state.clerks.push(payload)
    },
    house_tenant_flag:(state,payload)=>{
      state.house_tenant_flag=payload
    },
    load_tenants:(state,payload)=>{
      state.tenants=payload
    },
    login:(state,payload)=>{
      const data = {
        email:payload.email,
        role:payload.role,
        token:payload.token
      }
      state.isAdmin = data
      timeLocalStorage.set('loginInfo',state.isAdmin,false)
    }
  },
  getters: {
    language(state) {
      return state.language;
    },
    loginInfo(state){
      return state.isAdmin
    },
    load_landlords(state){
      return state.landlords
    },
    load_clerks(state){
      return state.clerks
    },
    load_houses_list_up(state){
      return state.houses.sort((a,b)=>{
        return a.price - b.price
      })
    },
    load_houses_list_down(state){
      return state.houses.sort((a,b)=>{
        return b.price - a.price
      })
    },
    load_houses_list(state){
      return state.houses
    },
    house_tenant_flag(state){
      return state.house_tenant_flag
    },
    load_tenants_payment_recall(state) {

      return state.tenants.filter(tenant=> {
        let dateNow = new Date()
        let nowMonth = dateNow.getMonth()+1
        let datePayment = new Date(tenant.paymentTime)
        let paymentMonth = datePayment.getMonth()+1
        return nowMonth > paymentMonth + tenant.cycle - 1
      })
    },
    load_houses_payment_recall(state) {
      return state.houses.filter(house=> {
        let dateNow = new Date()
        let nowMonth = dateNow.getMonth()+1
        let datePayment = new Date(house.paymentTime)
        let paymentMonth = datePayment.getMonth()+1
        console.log(paymentMonth)
        return nowMonth > paymentMonth
      })
    }
  }
});

export default store;
