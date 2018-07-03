<template>
  <div>
      <nav class="nav-bg" v-if="this.language==='ch'">
        <div class="container">
        <div class="nav-wrapper">
          <a class="brand-logo" style="cursor: pointer" @click="toLogin">租房系统</a>
          <a style="cursor: pointer" data-activates="mobile-ch" class="button-collapse"><i class="material-icons">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li v-if="this.isAdmin.role==='admin'"><router-link to="/dashboard">信息中心</router-link></li>
            <li v-if="this.isAdmin.role==='admin'"><router-link to="/clerks">业务员管理</router-link></li>
            <li v-if="this.isAdmin.role==='admin'"><router-link to="/houses">房屋管理</router-link></li>
            <li v-if="this.isAdmin.role==='clerk'"><router-link to="/houses">房屋列表</router-link></li>
            <li v-if="this.isAdmin.role==='admin'"><router-link to="/landlords">房东管理</router-link></li>
            <li v-if="this.isAdmin.role==='admin'"><router-link to="/tenants">住户管理</router-link></li>
            <li><a class="btn black" @click="onLanguage(0)">English</a></li>
            <li v-if="this.isAdmin"><a class="btn blue" @click="onLogout">Log OUt</a></li>
          </ul>
          <ul class="side-nav" id="mobile-ch">
            <li v-if="this.isAdmin.role==='admin'"><router-link to="/dashboard">信息中心</router-link></li>
            <li v-if="this.isAdmin.role==='admin'"><router-link to="/clerks">业务员管理</router-link></li>
            <li v-if="this.isAdmin.role==='admin'"><router-link to="/houses">房屋管理</router-link></li>
            <li v-if="this.isAdmin.role==='clerk'"><router-link to="/houses">房屋列表</router-link></li>
            <li v-if="this.isAdmin.role==='admin'"><router-link to="/landlords">房东管理</router-link></li>
            <li v-if="this.isAdmin.role==='admin'"><router-link to="/tenants">住户管理</router-link></li>
            <li><a class="btn black" @click="onLanguage(0)">English</a></li>
            <li v-if="this.isAdmin"><a class="btn blue" @click="onLogout">Log OUt</a></li>
          </ul>
        </div>
        </div>
      </nav>
<!--英文！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！-->
  <nav class="nav-bg" v-if="this.language==='en'">
    <div class="container">
      <div class="nav-wrapper">
        <a class="brand-logo" style="cursor: pointer" @click="toLogin">Housing</a>
        <a style="cursor: pointer" data-activates="mobile-en" class="button-collapse"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
          <li v-if="this.isAdmin.role==='admin'"><router-link to="/dashboard">Dashboard</router-link></li>
          <li v-if="this.isAdmin.role==='admin'"><router-link to="/clerks">Clerk</router-link></li>
          <li v-if="this.isAdmin.role==='admin'"><router-link to="/houses">House</router-link></li>
          <li v-if="this.isAdmin.role==='clerk'"><router-link to="/houses">House List</router-link></li>
          <li v-if="this.isAdmin.role==='admin'"><router-link to="/landlords">Landlord</router-link></li>
          <li v-if="this.isAdmin.role==='admin'"><router-link to="/tenants">Tenant</router-link></li>
          <li><a class="btn black" @click="onLanguage(1)">中文</a></li>
          <li v-if="this.isAdmin"><a class="btn blue" @click="onLogout">Log OUt</a></li>
        </ul>
        <ul class="side-nav" id="mobile-en">
          <li v-if="this.isAdmin.role==='admin'"><router-link to="/dashboard">Dashboard</router-link></li>
          <li v-if="this.isAdmin.role==='admin'"><router-link to="/clerks">Clerk</router-link></li>
          <li v-if="this.isAdmin.role==='admin'"><router-link to="/houses">House</router-link></li>
          <li v-if="this.isAdmin.role==='clerk'"><router-link to="/houses">House List</router-link></li>
          <li v-if="this.isAdmin.role==='admin'"><router-link to="/landlords">Landlord</router-link></li>
          <li v-if="this.isAdmin.role==='admin'"><router-link to="/tenants">Tenant</router-link></li>
          <li><a class="btn black" @click="onLanguage(1)">中文</a></li>
          <li v-if="this.isAdmin"><a class="btn blue" @click="onLogout">Log OUt</a></li>
        </ul>
      </div>
    </div>
  </nav>
  </div>
</template>

<script>
  import init from "@/assets/js/myjs"
    export default {
        name: "navbar",
      created(){
          init.init_all()
      },
      computed:{
          language(){
            return this.$store.getters.language
          },
          isAdmin(){
            return this.$store.getters.loginInfo
          }
      },
      methods:{
        onLanguage(state){
          if(state===0){
            this.$store.dispatch('language','en')
          }
          if(state===1){
            this.$store.dispatch('language','ch')
          }
          window.location.reload();
        },
        toLogin(){
          this.$router.push('/')
        },
        onLogout(){
          localStorage.clear()
          this.$router.push('/')
        }
      }
    }
</script>

<style scoped>
.nav-bg{
  background: linear-gradient(-45deg,#311b92,#536dfe,#304ffe)
}
  .container{
    width: 88%;
  }
</style>
