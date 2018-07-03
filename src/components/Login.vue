<template>
  <div class="hello">
      <div class="container">
        <div class="row">
          <!--中文登录！！！！！！！！！！！！！！！！！！！！！！！！！！！！！-->
          <div class="col s12 m8 offset-m2" v-if="this.language==='ch'">
            <div class="center biaoji white-text" style="padding: 20px">

                <div class="yuyan waves-effect waves-light" @click="onLanguage(0)">English</div>

            </div>
            <div class="center card-input z-depth-5">
              <div class="card-content">
                <div class="row">
                  <div class="input-field col s12">
                    <i class="material-icons prefix">email</i>
                    <input id="icon_email" type="email" class="validate center" v-model="email">
                    <label for="icon_email" data-error="邮箱账号格式不正确">邮箱账号</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <i class="material-icons prefix">lock</i>
                    <input id="icon_password" type="password" class="validate center" v-model="password">
                    <label for="icon_password">密码</label>
                  </div>
                </div>
                <div class="row">
                  <div @click="onLogin" class="btn waves-effect waves-light nav-bg">登录</div>
                </div>
              </div>
            </div>
          </div>
          <!--English Login !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
          <div class="col s12 m8 offset-m2" v-if="this.language==='en'">
            <div class="center biaoji white-text" style="padding: 20px">
              <div class="yuyan waves-effect waves-light" @click="onLanguage(1)">中文</div>
            </div>
            <div class="center card-input z-depth-5">
              <div class="card-content">
                <div class="row">
                  <div class="input-field col s12">
                    <i class="material-icons prefix">email</i>
                    <input id="icon_email" type="email" class="validate center" v-model="email">
                    <label for="icon_email" data-error="must be the email format">Email Account</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <i class="material-icons prefix">lock</i>
                    <input id="icon_password" type="password" class="validate center" v-model="password">
                    <label for="icon_password">password</label>
                  </div>
                </div>
                <div class="row">
                  <div @click="onLogin" class="btn waves-effect waves-light nav-bg">Log In</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import axios from "axios"
  import Config from '@/data/config'
export default {
  name: 'Login',
  data () {
    return {
      email:'',
      password:''
    }
  },
  computed:{
    language(){
      return this.$store.getters.language
    }
  },
  methods:{
    onLogin(){
      if(this.email==='' || this.password==='' ){
        return
      }
      const data={
        email:this.email,
        password:this.password
      }
      axios({
        method:'post',
        url:Config._ipAddress+'/clerks/login',
        data:data
      })
        .then((res)=>{
          this.$store.dispatch('login',res.data)
          if(res.data.role==='admin') {
            this.$router.push('/dashboard')
          }
          if(res.data.role==='clerk'){
            this.$router.push('/houses')
          }
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    onLanguage(state){
      if(state===0){
        this.$store.dispatch('language','en')
      }
      if(state===1){
        this.$store.dispatch('language','ch')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btn {
    width: 66.7%;
  }
  .login {
    margin-top: 10%;
  }
  i {
    margin-top: 10px;
    padding-right: 10px;
  }
  .input-field .prefix.active {
    color: #ffc107;
  }
  .input-field input[type=email]:focus {
    border-bottom: 2px solid #ffc107;
    box-shadow: 0 1px 0 0 #ffc107;
  }
  .input-field input[type=password]:focus {
    border-bottom: 2px solid #ffc107;
    box-shadow: 0 1px 0 0 #ffc107;
  }
  .input-field input[type=email]:focus + label {
    color: #ffc107;
  }
  .input-field input[type=password]:focus + label {
    color: #ffc107;
  }
  input {
    color: white;
  }
  .biaoji {
    /*background: linear-gradient(12deg,#311b92,#536dfe,#304ffe);*/
    background: #2196f3;
    font-size: 20px;
    height: 100px;
  }
  .nav-bg{
    /*background: linear-gradient(33deg,#311b92,#536dfe,#304ffe);*/
    background: #2196f3;
    border-radius: 25px;
  }
  .hello{
    background: url(https://images.pexels.com/photos/271668/pexels-photo-271668.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    padding-top: 160px;
  }
  .card-input {
     border: 1px solid #2196f3;
     padding: 40px;
    background: rgba(0,0,0,.5);
  }
  .yuyan {
    background: #ffc107;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    position: absolute;
    top:12%;
    left: 55%;
    padding-top: 50px;
    cursor: pointer;
  }
</style>
