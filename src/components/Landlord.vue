<template>
  <div class="landlord">
    <navbar></navbar>
    <section class="section section-landlord">
      <div class="container" v-if="this.language==='ch'">
        <div class="row">
          <div class="col s12">
            <div class="btn indigo white-text waves-light waves-effect modal-trigger" style="border-radius: 16px" data-target="modal1">新增房东</div>
          </div>
        </div>
        <div class="row">
          <div class="col s12 m2">
          </div>
          <div class="col s12 m10">
            <div class="row">
              <table class="bordered highlight">
                <thead>
                <tr>
                  <th>房东姓名</th>
                  <th>电话</th>
                  <th>国籍</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(landlord,index) in this.landlords">
                  <td>{{landlord.name_ch}}</td>
                  <td>{{landlord.tel}}</td>
                  <td>{{landlord.citizenship_ch}}</td>
                  <td><a
                    class="btn-floating waves-effect waves-light blue"
                    @click="onEditlandlord(landlord._id)"
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
            <div class="btn indigo white-text waves-light waves-effect modal-trigger" style="border-radius: 16px" data-target="modal2">Create Landlord</div>
          </div>
        </div>
        <div class="row">
          <div class="col s12 m2">
          </div>
          <div class="col s12 m10">
            <div class="row">
              <table class="bordered highlight">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Telephone Number</th>
                  <th>Citizenship</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(landlord,index) in this.landlords">
                  <td>{{landlord.name_en}}</td>
                  <td>{{landlord.tel}}</td>
                  <td>{{landlord.citizenship_en}}</td>
                  <td><a
                    class="btn-floating waves-effect waves-light blue"
                    @click="onEditlandlord(landlord._id)"
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

      <!-- Modal Structure-create -->
      <div id="modal1" class="modal" v-if="this.language==='ch'">
        <div class="modal-content">
          <h5>新增房东</h5>
          <div class="row">
            <div class="col s12 m6 offset-m3">
              <div class="blue white-text center" style="padding: 10px; width: 100%;">房东信息</div>
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
          </div>
        </div>
        <div class="modal-footer">
          <div class="modal-action modal-close waves-effect waves-green btn green" @click="onCreateLandlord">确认</div>
          <div class="modal-action modal-close waves-effect waves-green btn grey">取消</div>
        </div>
      </div>


      <!-- Modal Structure-create -->
      <div id="modal2" class="modal" v-if="this.language==='en'">
        <div class="modal-content">
          <h5>Create Landlord</h5>
          <div class="row">
            <div class="col s12 m6 offset-m3">
              <div class="blue white-text center" style="padding: 10px; width: 100%;">Landlord Information</div>
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
                  <option value="" disabled selected>please select one...</option>
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
          </div>
        </div>
        <div class="modal-footer">
          <div class="modal-action modal-close waves-effect waves-green btn green" @click="onCreateLandlord">confirm</div>
          <div class="modal-action modal-close waves-effect waves-green btn grey">cancel</div>
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
        name: "landlord",
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
      created(){
          init.init_all()
          this.onLoad_landlords()
        this.checkAdmin = timeLocalStorage.get('loginInfo')
        if(this.checkAdmin.role!=='admin'){
          this.$router.push('/')
        }
      },
      computed:{
        language(){
          return this.$store.getters.language
        },
        landlords(){
          return this.$store.getters.load_landlords
        }
      },
      methods:{
        onLoad_landlords(){
          axios({
            method:'get',
            url:Config._ipAddress+'/landlords'
          })
            .then((res)=>{
              this.$store.dispatch('load_landlords',res.data)
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        onCreateLandlord(){
          const landlord = {
            name_ch:this.name_ch,
            name_en:this.name_en,
            tel:this.tel,
            citizenship_ch:this.citizenship_ch,
            citizenship_en:this.citizenship_en,
            accountNumber:this.accountNumber,
            accountType:this.accountType,
            id:this.id
          }
          axios({
            method:'post',
            url:Config._ipAddress+'/landlords/create',
            data:landlord
          })
            .then((res)=>{
              this.$store.dispatch('create_landlord',res.data.payload)
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        onEditlandlord(id){
          this.$router.push('/editlandlord/'+id)
        }
      }
    }
</script>

<style scoped>

</style>
