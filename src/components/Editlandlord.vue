<template>
<div class="editlandlord">
  <navbar></navbar>
  <section class="section section-editlandlord">
    <div class="container" v-if="this.language==='ch'">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="blue white-text center" style="padding: 10px; width: 100%;">房东信息</div>
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
              <span>身份证：</span>
              <input type="text" v-model="id" class="browser-default" style="width: 100%">
            </p>
            <p>
              <span>国籍(中文描述)：</span>
              <input type="text" v-model="citizenship_ch" class="browser-default" style="width: 100%">
            </p>
            <p>
              <span>国籍(英文描述)：</span>
              <input type="text" v-model="citizenship_en" class="browser-default" style="width: 100%">
            </p>
            <p>
              <span>银行账户类型：</span>
              <select class="browser-default" v-model="accountType">
                <option value="" disabled selected>请选择...</option>
                <option>POSB</option>
                <option>UOB</option>
                <option>DBS</option>
                <option>OCBC</option>
                <option>HSBC</option>
                <option>CITY</option>
                <option>MAYBANK</option>
                <option>STANDARD CHARTERED</option>
              </select>
            </p>
            <p>
              <span>银行账户：</span>
              <input type="text" v-model="accountNumber" class="browser-default" style="width: 100%">
            </p>
          </div>

          <div class="row">
            <div class="col s2">
                <a class="btn-floating red waves-light waves-effect modal-trigger" data-target="modal1"><i class="material-icons">delete</i></a>
                <!-- Modal Structure 中文-->
              <div id="modal1" class="modal">
              <div class="modal-content">
                  <p class="orange white-text" style="height: 60px; padding: 15px;font-size: 22px;">你确定删除房东 ( {{name_ch}} )？</p>
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
          <div class="blue white-text center" style="padding: 10px; width: 100%;">Landlord Information</div>
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
              <input type="text" v-model="id" class="browser-default" style="width: 100%">
            </p>
            <p>
              <span>Citizenship(Chinese)：</span>
              <input type="text" v-model="citizenship_ch" class="browser-default" style="width: 100%">
            </p>
            <p>
              <span>Citizenship(English)：</span>
              <input type="text" v-model="citizenship_en" class="browser-default" style="width: 100%">
            </p>
            <p>
              <span>Account Type：</span>
              <select class="browser-default" v-model="accountType">
                <option value="" disabled selected>请选择...</option>
                <option>POSB</option>
                <option>UOB</option>
                <option>DBS</option>
                <option>OCBC</option>
                <option>HSBC</option>
                <option>CITY</option>
                <option>MAYBANK</option>
                <option>STANDARD CHARTERED</option>
              </select>
            </p>
            <p>
              <span>Account：</span>
              <input type="text" v-model="accountNumber" class="browser-default" style="width: 100%">
            </p>
          </div>

          <div class="row">
            <div class="col s2">
                <a class="btn-floating red waves-light waves-effect modal-trigger" data-target="modal2"><i class="material-icons">delete</i></a>
                <!-- Modal Structure  English-->
              <div id="modal2" class="modal">
              <div class="modal-content">
                  <p class="orange white-text" style="height: 60px; padding: 15px;font-size: 22px;">Are you sure the landlord  ( {{name_en}} ) will be removed ？</p>
              </div>
              <div class="modal-footer">
                <a @click="onDelete" class="modal-action modal-close waves-effect waves-green btn green ">confirm</a>
                <a class="modal-action modal-close waves-effect waves-green btn grey">cancel</a>
              </div>
              </div>
            </div>
            <div class="col s10">
              <p>
                <a class="btn green waves-effect waves-light" style="width: 100%;" @click="onSave">Save</a>
              </p>
              <p>
                <a class="btn grey waves-effect waves-light" style="width: 100%;" @click="onCancel">cancel</a>
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
        name: "editlandlord",
      data(){
        return{
          name_ch:'',
          name_en:'',
          tel:'',
          citizenship_ch:'',
          citizenship_en:'',
          accountType:'',
          id:'',
          accountNumber:''
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
          this.load_landlord()
        this.checkAdmin = timeLocalStorage.get('loginInfo')
        if(this.checkAdmin.role!=='admin'){
          this.$router.push('/')
        }
      },
      methods:{
          load_landlord(){
            axios({
              method:'get',
              url:Config._ipAddress+'/landlords/'+this.$route.params.landlordId
            })
              .then((res)=>{
                this.name_ch=res.data.name_ch
                this.name_en=res.data.name_en
                this.tel=res.data.tel
                this.accountType=res.data.accountType
                this.accountNumber=res.data.accountNumber
                this.citizenship_ch=res.data.citizenship_ch
                this.citizenship_en=res.data.citizenship_en
                this.id=res.data.id
              })
              .catch((err)=>{
                console.log(err)
              })
          },
          onSave(){
            const updatedLandlord={
              name_ch:this.name_ch,
              name_en:this.name_en,
              id:this.id,
              accountNumber:this.accountNumber,
              accountType:this.accountType,
              tel:this.tel,
              citizenship_en:this.citizenship_en,
              citizenship_ch:this.citizenship_ch
            }
            axios({
              method:'patch',
              url:Config._ipAddress+'/landlords/'+this.$route.params.landlordId,
              data:updatedLandlord
            })
              .then((res)=>{
                this.$router.push('/landlords')
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
            this.$router.push('/landlords')
          },
          onDelete(){
            axios({
              method:'delete',
              url:Config._ipAddress+'/landlords/'+this.$route.params.landlordId
            })
              .then((res)=>{
                this.$router.push('/landlords')
                let msg = '删除成功！'
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
                let msg = '删除失败！'
                if(this.language==='en'){
                  msg='failure!'
                }
                this.$message({
                  type: 'error',
                  message: msg
                });
              })
          }
      }
    }
</script>

<style scoped>

</style>
