<template>
    <div class="editclerk">
      <navbar></navbar>
      <section class="section section-editclerk">
        <div class="container" v-if="this.language==='ch'">
          <div class="row">
            <div class="col s12 m8 offset-m2">
              <div class="blue white-text center" style="padding: 10px; width: 100%;">业务员信息</div>
              <div class="card-panel">
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
                  <span>身份证号码：</span>
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
                <p>
                  <span>表现：</span>
                  <input type="number" v-model="performance" class="browser-default" style="width: 100%">
                </p>
              </div>

              <div class="row">
                <div class="col s2">
                  <a class="btn-floating red waves-light waves-effect modal-trigger" data-target="modal1"><i class="material-icons">delete</i></a>
                  <!-- Modal Structure 中文-->
                  <div id="modal1" class="modal">
                    <div class="modal-content">
                      <p class="orange white-text" style="height: 60px; padding: 15px;font-size: 22px;">你确定删除业务员 ( {{name_ch}} )？</p>
                    </div>
                    <div class="modal-footer">
                      <a @click="onDelete" class="modal-action modal-close waves-effect waves-green btn green ">确定</a>
                      <a class="modal-action modal-close waves-effect waves-green btn grey">取消</a>
                    </div>
                  </div>
                </div>
                <div class="col s10">
                  <p>
                    <a class="btn green waves-effect waves-light" style="width: 100%;" @click="onSave">保存</a>
                  </p>
                  <p>
                    <a class="btn grey waves-effect waves-light" style="width: 100%;" @click="onCancel">取消</a>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="container" v-if="this.language==='en'">
          <div class="row">
            <div class="col s12 m8 offset-m2">
              <div class="blue white-text center" style="padding: 10px; width: 100%;">Clerk Information</div>
              <div class="card-panel">
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
                  <span>Password：</span>
                  <input type="password" v-model="password" class="browser-default" style="width: 100%">
                </p>
                <p>
                  <span>Performance：</span>
                  <input type="number" v-model="performance" class="browser-default" style="width: 100%">
                </p>
              </div>

              <div class="row">
                <div class="col s2">
                  <a class="btn-floating red waves-light waves-effect modal-trigger" data-target="modal2"><i class="material-icons">delete</i></a>
                  <!-- Modal Structure 英文-->
                  <div id="modal2" class="modal">
                    <div class="modal-content">
                      <p class="orange white-text" style="height: 60px; padding: 15px;font-size: 22px;">Are you sure delete ( {{name_en}} )？</p>
                    </div>
                    <div class="modal-footer">
                      <a @click="onDelete" class="modal-action modal-close waves-effect waves-green btn green ">Confirm</a>
                      <a class="modal-action modal-close waves-effect waves-green btn grey">Cancel</a>
                    </div>
                  </div>
                </div>
                <div class="col s10">
                  <p>
                    <a class="btn green waves-effect waves-light" style="width: 100%;" @click="onSave">Save</a>
                  </p>
                  <p>
                    <a class="btn grey waves-effect waves-light" style="width: 100%;" @click="onCancel">Cancel</a>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
  import navbar from "@/components/Nav"
  import init from "@/assets/js/myjs"
  import axios from "axios"
  import Config from '@/data/config'
  import timeLocalStorage from 'time-localstorage';
    export default {
        name: "editclerk",
      data(){
          return {
            name_ch:'',
            name_en:'',
            idNumber:'',
            tel:'',
            email:'',
            password:'',
            performance:''
          }
      },
      components:{
        navbar
      },
      computed:{
        language(){
          return this.$store.getters.language
        }
      },
      created(){
          init.init_all()
          this.load_clerk()
        this.checkAdmin = timeLocalStorage.get('loginInfo')
        if(this.checkAdmin.role!=='admin'){
          this.$router.push('/')
        }
      },
      methods:{
        load_clerk(){
          axios({
            method:'get',
            url:Config._ipAddress+'/clerks/'+this.$route.params.clerkId
          })
            .then((res)=>{
              this.name_ch=res.data.name_ch
              this.name_en=res.data.name_en
              this.tel=res.data.tel
              this.idNumber=res.data.id
              this.email=res.data.email
              this.password=res.data.password
              this.performance=res.data.performance
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        onSave(){
          const updatedClerk={
            name_ch:this.name_ch,
            name_en:this.name_en,
            id:this.idNumber,
            tel:this.tel,
            email:this.email,
            password:this.password,
            performance:this.performance
          }
          axios({
            method:'patch',
            url:Config._ipAddress+'/clerks/'+this.$route.params.clerkId,
            data:updatedClerk
          })
            .then((res)=>{
              this.$router.push('/clerks')
              let msg = '保存成功！'
              if(this.language==='en'){
                msg='Successfully!'
              }
              this.$message({
                type: 'success',
                message: msg
              });
            })
            .catch((err)=>{
              console.log(err)
              let msg = '保存失败！'
              if(this.language==='en'){
                msg='failure!'
              }
              this.$message({
                type: 'error',
                message: msg
              });
            })
        },
        onCancel(){
          this.$router.push('/clerks')
        },
        onDelete(){
          axios({
            method:'delete',
            url:Config._ipAddress+'/clerks/'+this.$route.params.clerkId
          })
            .then((res)=>{
              this.$router.push('/clerks')
            })
            .catch((err)=>{
              console.log(err)
            })
        }
      }
    }
</script>

<style scoped>

</style>
