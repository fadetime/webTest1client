<template>
  <div class="tenant">
  <navbar></navbar>
    <section class="section section-tenant">
        <div v-if="this.language==='ch'">
          <div class="hide-on-small-and-down" style="padding: 100px;background-color:rgba(0,0,0,0.8);">
            <div class="row">
              <div class="col s12 center white-text" style="font-size: 24px;">
                租客查询
              </div>
            </div>
            <select v-model="condition" class="browser-default left" style="width: 15%;height: 50px;border-bottom-left-radius: 50px;border-top-left-radius: 50px;border:none;outline: none;">
              <option value="" disabled selected>搜索条件</option>
              <option value="1">名字</option>
              <option value="2">电话号码</option>
            </select>

            <input v-model="search_tenant" type="text" class="browser-default left" style="width: 60%;height: 50px;border:none;outline: none;padding: 0 25px;">
            <div @click="onSearchTenant" class="left center waves-effect waves-light" style="background-color: #ffc107;cursor: pointer; width: 20%; height: 50px;border:none;outline: none;padding:10px;border-radius: 0 25px 25px 0;font-size: 20px;color: white">搜索</div>
          </div>
          <div class="hide-on-med-and-up" style="padding: 50px;background-color:rgba(0,0,0,0.8);">
            <div class="row">
              <div class="col s12 center white-text" style="font-size: 18px;">
                租客查询
              </div>
            </div>
            <select v-model="condition" class="browser-default" style="margin-bottom: 20px; width: 100%;height: 50px;border:none;outline: none;">
              <option value="" disabled selected>搜索条件</option>
              <option value="1">名字</option>
              <option value="2">电话号码</option>
            </select>

            <input v-model="search_tenant" type="text" class="browser-default" style="margin-bottom: 20px; width: 100%;height: 50px;border:none;outline: none;padding: 0 25px;">
            <div @click="onSearchTenant" class="center waves-effect waves-light" style="background-color: #ffc107;cursor: pointer; width: 100%; height: 50px;border:none;outline: none;padding:10px;border-radius: 25px 25px 25px 25px;font-size: 20px;color: white">搜索</div>
          </div>
        </div>
      <div class="container" v-if="this.language==='ch'">
        <div class="row">
          <div class="col s12">
            <table class="bordered centered highlight">
              <thead>
                <tr>
                  <th>照片</th>
                  <th>姓名</th>
                  <th>电话号码</th>
                  <th>性别</th>
                  <th>当前状态</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tenant in tenants">
                  <td>
                    <img :src="tenant.images[0] | imgUrlHeader" alt="" class="circle" style="height: 120px; width: 120px;">
                  </td>
                  <td>{{tenant.name_ch}}</td>
                  <td>{{tenant.tel}}</td>
                  <td>{{tenant.gender_ch}}</td>
                  <td>
                    <span v-if="!tenant.history" class="green-text">当前在租</span>
                    <span v-if="tenant.history" class="grey-text">历史租客</span>
                  </td>
                  <td>
                    <div class="btn-floating waves-light waves-effect blue" @click="onEditTenant(tenant._id)"><i class="material-icons">edit</i></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div v-if="this.language==='en'">
        <div class="hide-on-small-and-down" style="padding: 100px;background-color:rgba(0,0,0,0.8);">
          <div class="row">
            <div class="col s12 center white-text" style="font-size: 24px;">
              Tenant Search
            </div>
          </div>
          <select v-model="condition" class="browser-default left" style="width: 15%;height: 50px;border-bottom-left-radius: 50px;border-top-left-radius: 50px;border:none;outline: none;">
            <option value="" disabled selected>Condition</option>
            <option value="1">Name</option>
            <option value="2">Telephone</option>
          </select>

          <input v-model="search_tenant" type="text" class="browser-default left" style="width: 60%;height: 50px;border:none;outline: none;padding: 0 25px;">
          <div @click="onSearchTenant" class="left center waves-effect waves-light" style="background-color: #ffc107;cursor: pointer; width: 20%; height: 50px;border:none;outline: none;padding:10px;border-radius: 0 25px 25px 0;font-size: 20px;color: white">Search</div>
        </div>
        <div class="hide-on-med-and-up" style="padding: 50px;background-color:rgba(0,0,0,0.8);">
          <div class="row">
            <div class="col s12 center white-text" style="font-size: 18px;">
              Tenant Search
            </div>
          </div>
          <select v-model="condition" class="browser-default" style="margin-bottom: 20px; width: 100%;height: 50px;border:none;outline: none;">
            <option value="" disabled selected>Condition</option>
            <option value="1">Name</option>
            <option value="2">Telephone</option>
          </select>

          <input v-model="search_tenant" type="text" class="browser-default" style="margin-bottom: 20px; width: 100%;height: 50px;border:none;outline: none;padding: 0 25px;">
          <div @click="onSearchTenant" class="center waves-effect waves-light" style="background-color: #ffc107;cursor: pointer; width: 100%; height: 50px;border:none;outline: none;padding:10px;border-radius: 25px 25px 25px 25px;font-size: 20px;color: white">Search</div>
        </div>
      </div>
      <div class="container" v-if="this.language==='en'">
        <div class="row">
          <div class="col s12">
            <table class="bordered centered highlight">
              <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Telephone</th>
                <th>Gender</th>
                <th>State</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="tenant in tenants">
                <td>
                  <img :src="tenant.images[0] | imgUrlHeader" alt="" class="circle" style="height: 120px; width: 120px;">
                </td>
                <td>{{tenant.name_en}}</td>
                <td>{{tenant.tel}}</td>
                <td>{{tenant.gender_en}}</td>
                <td>
                  <span v-if="!tenant.history" class="green-text">is tenant</span>
                  <span v-if="tenant.history" class="grey-text">was tenant</span>
                </td>
                <td>
                  <div class="btn-floating waves-light waves-effect blue" @click="onEditTenant(tenant._id)"><i class="material-icons">edit</i></div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

  import init from "@/assets/js/myjs"
  import navbar from "@/components/Nav"
  import axios from 'axios';
  import Config from '@/data/config'
  import timeLocalStorage from 'time-localstorage';
    export default {
        name: "tenant",
      components:{
        navbar
      },
      created(){
        init.init_all()
        this.checkAdmin = timeLocalStorage.get('loginInfo')
        if(this.checkAdmin.role!=='admin'){
          this.$router.push('/')
        }
      },
      computed:{
        language(){
          return this.$store.getters.language
        }
      },
      data(){
        return {
          condition:'',
          search_tenant:'',
          tenants:[]
        }
      },
      methods:{
          onSearchTenant(){
            if(!this.condition){
              let msg='请选择搜索条件'
              if(this.language==='en'){
                msg = 'please set a condition'
              }
              return Materialize.toast(msg, 3000, 'rounded red')
            }
            if(!this.search_tenant){
              this.tenants=[]
              let msg='请输入搜索关键字'
              if(this.language==='en'){
                msg = 'please input the keywords'
              }
              return Materialize.toast(msg, 3000, 'rounded red')
            }
            var data={}
            if(this.condition==='1'){
              data={
                condition:'name'
              }
            }
            if(this.condition==='2'){
              data={
                condition:'tel'
              }
            }
            axios({
              method:'post',
              url:Config._ipAddress+'/tenants/search/'+this.search_tenant,
              data:data
            })
              .then((res)=>{
                this.tenants=res.data
              })
          },
        onEditTenant(id){
            this.$router.push('/edittenant/'+id)
        }
      }
    }
</script>

<style scoped>

</style>
