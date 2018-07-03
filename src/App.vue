<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import axios from 'axios';
  import Config from '@/data/config'
  import timeLocalStorage from 'time-localstorage';
export default {
  name: 'App',
  created(){
    var language = timeLocalStorage.get('language')
    if(!language){
      language='ch'
    }
    this.$store.dispatch('language',language)
    this.onLoad_clerks()
    var isAdmin = timeLocalStorage.get('loginInfo')
    this.$store.dispatch('login',isAdmin)
  },
  methods:{
    onLoad_clerks(){
      axios({
        method:'get',
        url:Config._ipAddress+'/clerks'
      })
        .then((res)=>{
          this.$store.dispatch('load_clerks',res.data)
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }
}
</script>

<style>
  html{
    font-family: 'Proxima Nova Soft','Helvetica Neue',sans-serif;
  }
</style>
