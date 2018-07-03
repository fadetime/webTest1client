<template>
  <div class="clerk">
  <navbar></navbar>
    <section class="section section-clerk">
      <div class="container" v-if="this.language==='ch'">
        <div class="row">
          <div class="col s12">
            <div class="btn indigo white-text waves-light waves-effect modal-trigger" style="border-radius: 16px" data-target="modal1">新增业务员</div>
            <!-- Modal Structure-create -->
            <div id="modal1" class="modal">
              <div class="modal-content">
                <h5>新增业务员</h5>
                <div class="row">
                  <div class="col s12 m6 offset-m3">
                    <div class="blue white-text center" style="padding: 10px; width: 100%;">业务员信息</div>
                    <p>
                      <span>中文名字：</span>
                      <input type="text" v-model="name_ch" class="browser-default" style="width: 100%">
                    </p>
                    <p>
                      <span>英文名字：</span>
                      <input type="text" v-model="name_en" class="browser-default" style="width: 100%">
                    </p>
                    <p>
                      <span>电话号码：</span>
                      <input type="number" v-model="tel" class="browser-default" style="width: 100%">
                    </p>
                    <p>
                      <span>身份证号：</span>
                      <input type="text" v-model="idNumber" class="browser-default" style="width: 100%">
                    </p>
                    <p>
                      <span>邮箱账号：</span>
                      <input type="email" v-model="email" class="browser-default" style="width: 100%">
                    </p>
                    <p>
                      <span>密码：</span>
                      <input type="password" v-model="password" class="browser-default" style="width: 100%">
                    </p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <div class="modal-action modal-close waves-effect waves-green btn green" @click="onCreateClerk">确认</div>
                <div class="modal-action modal-close waves-effect waves-green btn grey">取消</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s12 m2">
          </div>
          <div class="col s12 m10">
            <div class="row">
              <table class="bordered highlight centered">
                <thead>
                <tr>
                  <th>姓名</th>
                  <th>电话</th>
                  <th>身份证号</th>
                  <th>邮箱账号</th>
                  <th>加入时间</th>
                  <th>表现</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(clerk,index) in this.clerks">
                  <td>{{clerk.name_ch}}</td>
                  <td>{{clerk.tel}}</td>
                  <td>{{clerk.id}}</td>
                  <td>{{clerk.email}}</td>
                  <td>{{clerk.createdDate | date}}</td>
                  <td>{{clerk.performance}}</td>
                  <td><a
                    class="btn-floating waves-effect waves-light blue"
                    @click="onEditclerk(clerk._id)"
                  >
                    <i class="material-icons">edit</i>
                  </a></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-if="this.language==='en'">
        <div class="row">
          <div class="col s12">
            <div class="btn indigo white-text waves-light waves-effect modal-trigger" style="border-radius: 16px" data-target="modal2">Create Clerk</div>
            <!-- Modal Structure-create -->
            <div id="modal2" class="modal">
              <div class="modal-content">
                <h5>Create Clerk</h5>
                <div class="row">
                  <div class="col s12 m6 offset-m3">
                    <div class="blue white-text center" style="padding: 10px; width: 100%;">Clerk Information</div>
                    <p>
                      <span>Chinese Name：</span>
                      <input type="text" v-model="name_ch" class="browser-default" style="width: 100%">
                    </p>
                    <p>
                      <span>English Name：</span>
                      <input type="text" v-model="name_en" class="browser-default" style="width: 100%">
                    </p>
                    <p>
                      <span>Telephone Number：</span>
                      <input type="number" v-model="tel" class="browser-default" style="width: 100%">
                    </p>
                    <p>
                      <span>ID Number：</span>
                      <input type="text" v-model="idNumber" class="browser-default" style="width: 100%">
                    </p>
                    <p>
                      <span>Email：</span>
                      <input type="email" v-model="email" class="browser-default" style="width: 100%">
                    </p>
                    <p>
                      <span>password：</span>
                      <input type="password" v-model="password" class="browser-default" style="width: 100%">
                    </p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <div class="modal-action modal-close waves-effect waves-green btn green" @click="onCreateClerk">Confirm</div>
                <div class="modal-action modal-close waves-effect waves-green btn grey">Cancel</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s12 m2">
          </div>
          <div class="col s12 m10">
            <div class="row">
              <table class="bordered highlight centered">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Tel</th>
                  <th>ID Number</th>
                  <th>Email</th>
                  <th>Entry Date</th>
                  <th>Performance</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(clerk,index) in this.clerks">
                  <td>{{clerk.name_en}}</td>
                  <td>{{clerk.tel}}</td>
                  <td>{{clerk.id}}</td>
                  <td>{{clerk.email}}</td>
                  <td>{{clerk.createdDate | date}}</td>
                  <td>{{clerk.performance}}</td>
                  <td><a
                    class="btn-floating waves-effect waves-light blue"
                    @click="onEditclerk(clerk._id)"
                  >
                    <i class="material-icons">edit</i>
                  </a></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Config from '@/data/config'
  import navbar from "@/components/Nav"
  import init from "@/assets/js/myjs"
  import axios from "axios"
  import timeLocalStorage from 'time-localstorage';
    export default {
        name: "clerk",
      components:{
        navbar
      },
      data(){
          return {
            name_ch:'',
            name_en:'',
            tel:'',
            idNumber:'',
            email:'',
            password:''
          }
      },
      computed:{
        language(){
          return this.$store.getters.language
        },
        clerks(){
          return this.$store.getters.load_clerks
        }
      },
      created(){
        init.init_all()
        this.onLoad_clerks()
        this.checkAdmin = timeLocalStorage.get('loginInfo')
        if(this.checkAdmin.role!=='admin'){
          this.$router.push('/')
        }
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
        },
          onCreateClerk(){
            const clerk = {
              name_ch:this.name_ch,
              name_en:this.name_en,
              id:this.idNumber,
              tel:this.tel,
              email:this.email,
              password:this.password
            }
            axios({
              method:'post',
              url:Config._ipAddress+'/clerks/create',
              data:clerk
            })
              .then((res)=>{
                this.$store.dispatch('create_clerk',res.data.payload)
              })
              .catch((err)=>{
                console.log(err)
              })
          },
        onEditclerk(id){
          this.$router.push('/editclerk/'+id)
        }
      }
    }
</script>

<style scoped>

</style>
