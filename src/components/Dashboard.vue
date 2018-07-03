<template>
    <div class="dashboard">
      <navbar></navbar>
      <section class="section section-dashboard">
        <div class="container" v-show="this.language==='ch'">
          <div class="row">
            <div class="col s12">
                <div class="row" style="margin-top: 30px">
                  <div class="col 12 m3 center">
                    <div class="yuan1 waves-effect waves-light" @click="onOpenHouseExpiringList">
                      <i class="material-icons white-text medium" style="position: absolute;top: 21%;left: 21%;">email</i>
                      <div class="xiaoyuan center">
                        <p class="shuzi">{{expiringHouses.length}}</p>
                      </div>
                    </div>
                    <p>房屋到期</p>
                  </div>
                  <div class="col 12 m3 center">
                    <div class="yuan1 waves-effect waves-light" @click="onOpenHousePaymentRecall">
                      <i class="material-icons white-text medium" style="position: absolute;top: 21%;left: 21%;">email</i>
                      <div class="xiaoyuan center">
                        <p class="shuzi">{{housePaymentRecall.length}}</p>
                      </div>
                    </div>
                    <p>交租提醒</p>
                  </div>
                  <div class="col 12 m3 center">
                    <div class="yuan waves-light waves-effect" @click="onOpenExpiringList">
                      <i class="material-icons white-text medium" style="position: absolute;top: 21%;left: 21%;">email</i>
                      <div class="xiaoyuan center">
                        <p class="shuzi">{{expiringTenants.length}}</p>
                      </div>
                    </div>
                    <p>租客到期</p>
                  </div>
                  <div class="col 12 m3 center">
                    <div class="yuan waves-effect waves-light" @click="onOpenPaymentRecall">
                      <i class="material-icons white-text medium" style="position: absolute;top: 21%;left: 21%;">email</i>
                      <div class="xiaoyuan center">
                        <p class="shuzi">{{paymentRecall.length}}</p>
                      </div>
                    </div>
                    <p>收租提醒</p>
                  </div>
                </div>
                <div class="row">
                  <section class="section section-houseContract" v-if="expiringHousesFlag">
                    <p class="center blue white-text" style="padding: 20px;">合约即将到期的房屋列表</p>
                    <ul class="collection">
                      <li class="collection-item avatar" v-for="house in expiringHouses">
                        <img :src="house.house.images[0] | imgUrlHeader" alt="" class="circle">
                        <span class="title red-text">剩余 {{house.daysLeft}} 天合约到期</span>
                        <p>房屋名称：{{house.house.name_ch}}</p>
                        <p>房屋地址：{{house.house.address_ch}}</p>
                        <a class="secondary-content btn-floating blue" @click="onEditHouse(house.house._id)"><i class="material-icons">edit</i></a>
                      </li>
                    </ul>
                  </section>
                  <section class="section section-paymentRecall" v-show="housePaymentRecallFlag">
                    <p class="center blue white-text" style="padding: 20px;">房屋月租未交清单</p>
                    <ul class="collection">
                      <li class="collection-item avatar" v-for="house in this.housePaymentRecall">
                        <img :src="house.images[0] | imgUrlHeader" alt="" class="circle">
                        <span class="title red-text">上次交租时间：{{house.paymentTime | date}}</span>
                        <p>房屋名称：{{house.name_ch}}</p>
                        <p>房屋地址：{{house.address_ch}}</p>
                        <div class="secondary-content">
                          <div class="btn red waves-light waves-effect darken-3" @click="callisJiaozu(house)">一键交租</div>
                          <a class="btn-floating blue" @click="onEditHouse(house._id)"><i class="material-icons">edit</i></a>
                        </div>
                      </li>
                    </ul>
                  </section>
                  <section class="section section-tenantsContract" v-if="expiringTenantsFlag">
                    <p class="center blue white-text" style="padding: 20px;">合约即将到期的租客列表</p>
                    <ul class="collection">
                      <li class="collection-item avatar" v-for="tenant in expiringTenants">
                        <img :src="tenant.tenant.images[0] | imgUrlHeader" alt="" class="circle">
                        <span class="title red-text">剩余 {{tenant.daysLeft}} 天合约到期</span>
                        <p>姓名：{{tenant.tenant.name_ch}}</p>
                        <p>电话：{{tenant.tenant.tel}}</p>
                        <a class="secondary-content btn-floating blue" @click="onEdit(tenant.tenant._id)"><i class="material-icons">edit</i></a>
                      </li>
                    </ul>
                  </section>
                  <section class="section section-paymentRecall" v-show="paymentRecallFlag">
                    <p class="center blue white-text" style="padding: 20px;">当月未交租的租客列表</p>
                    <ul class="collection">
                      <li class="collection-item avatar" v-for="tenant in this.paymentRecall">
                        <img :src="tenant.images[0] | imgUrlHeader" alt="" class="circle">
                        <span class="title red-text">上次交租时间：{{tenant.paymentTime | date}}</span>
                        <p>姓名：{{tenant.name_ch}}</p>
                        <p>电话：{{tenant.tel}}</p>
                        <div class="secondary-content">
                          <div class="btn blue waves-light waves-effect darken-3" @click="callisShouzu(tenant)">一键收租</div>
                          <a class="btn-floating blue" @click="onEdit(tenant._id)"><i class="material-icons">edit</i></a>
                        </div>
                      </li>
                    </ul>
                  </section>
                </div>
            </div>
          </div>
        </div>
        <div class="container" v-show="this.language==='en'">
          <div class="row">
            <div class="col s12">
              <div class="row" style="margin-top: 30px">
                <div class="col 12 m3 center">
                  <div class="yuan1 waves-effect waves-light" @click="onOpenHouseExpiringList">
                    <i class="material-icons white-text medium" style="position: absolute;top: 21%;left: 21%;">email</i>
                    <div class="xiaoyuan center">
                      <p class="shuzi">{{expiringHouses.length}}</p>
                    </div>
                  </div>
                  <p>House Expiring</p>
                </div>
                <div class="col 12 m3 center">
                  <div class="yuan1 waves-effect waves-light" @click="onOpenHousePaymentRecall">
                    <i class="material-icons white-text medium" style="position: absolute;top: 21%;left: 21%;">email</i>
                    <div class="xiaoyuan center">
                      <p class="shuzi">{{housePaymentRecall.length}}</p>
                    </div>
                  </div>
                  <p>Pay Rental Reminding</p>
                </div>
                <div class="col 12 m3 center">
                  <div class="yuan waves-light waves-effect" @click="onOpenExpiringList">
                    <i class="material-icons white-text medium" style="position: absolute;top: 21%;left: 21%;">email</i>
                    <div class="xiaoyuan center">
                      <p class="shuzi">{{expiringTenants.length}}</p>
                    </div>
                  </div>
                  <p>Tenant Expiring</p>
                </div>
                <div class="col 12 m3 center">
                  <div class="yuan waves-effect waves-light" @click="onOpenPaymentRecall">
                    <i class="material-icons white-text medium" style="position: absolute;top: 21%;left: 21%;">email</i>
                    <div class="xiaoyuan center">
                      <p class="shuzi">{{paymentRecall.length}}</p>
                    </div>
                  </div>
                  <p>Rental Collection Reminding</p>
                </div>
              </div>
              <div class="row">
                <section class="section section-houseContract" v-if="expiringHousesFlag">
                  <p class="center blue white-text" style="padding: 20px;">(House Expiring)House List</p>
                  <ul class="collection">
                    <li class="collection-item avatar" v-for="house in expiringHouses">
                      <img :src="house.house.images[0] | imgUrlHeader" alt="" class="circle">
                      <span class="title red-text"> {{house.daysLeft}} Days Left</span>
                      <p>Name：{{house.house.name_en}}</p>
                      <p>Address：{{house.house.address_en}}</p>
                      <a class="secondary-content btn-floating blue" @click="onEditHouse(house.house._id)"><i class="material-icons">edit</i></a>
                    </li>
                  </ul>
                </section>
                <section class="section section-paymentRecall" v-show="housePaymentRecallFlag">
                  <p class="center blue white-text" style="padding: 20px;">House List</p>
                  <ul class="collection">
                    <li class="collection-item avatar" v-for="house in this.housePaymentRecall">
                      <img :src="house.images[0] | imgUrlHeader" alt="" class="circle">
                      <span class="title red-text">Last Time：{{house.paymentTime | date}}</span>
                      <p>Name：{{house.name_en}}</p>
                      <p>Address：{{house.address_en}}</p>
                      <div class="secondary-content">
                        <div class="btn red waves-light waves-effect darken-3" @click="callisJiaozu(house)">Payment</div>
                        <a class="btn-floating blue" @click="onEditHouse(house._id)"><i class="material-icons">edit</i></a>
                      </div>

                    </li>
                  </ul>
                </section>
                <section class="section section-tenantsContract" v-if="expiringTenantsFlag">
                  <p class="center blue white-text" style="padding: 20px;">Tenant List</p>
                  <ul class="collection">
                    <li class="collection-item avatar" v-for="tenant in expiringTenants">
                      <img :src="tenant.tenant.images[0] | imgUrlHeader" alt="" class="circle">
                      <span class="title red-text"> {{tenant.daysLeft}} Days Left</span>
                      <p>Name：{{tenant.tenant.name_en}}</p>
                      <p>Telephone：{{tenant.tenant.tel}}</p>
                      <a class="secondary-content btn-floating blue" @click="onEdit(tenant.tenant._id)"><i class="material-icons">edit</i></a>
                    </li>
                  </ul>
                </section>
                <section class="section section-paymentRecall" v-show="paymentRecallFlag">
                  <p class="center blue white-text" style="padding: 20px;">Tenant List</p>
                  <ul class="collection">
                    <li class="collection-item avatar" v-for="(tenant) in this.paymentRecall">
                      <img :src="tenant.images[0] | imgUrlHeader" alt="" class="circle">
                      <span class="title red-text">Last Time：{{tenant.paymentTime | date}}</span>
                      <p>Name：{{tenant.name_en}}</p>
                      <p>Tel：{{tenant.tel}}</p>
                      <div class="secondary-content">
                        <div class="btn blue waves-light waves-effect darken-3" @click="callisShouzu(tenant)">Payment</div>
                        <a class="btn-floating blue" @click="onEdit(tenant._id)"><i class="material-icons">edit</i></a>
                      </div>
                    </li>
                  </ul>
                </section>
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
        name: "dashboard",
      data(){
        return {
          expiringTenants:[],
          expiringHouses:[],
          expiringTenantsFlag:false,
          expiringHousesFlag:false,
          paymentRecallFlag:false,
          housePaymentRecallFlag:false
        }
      },
      components:{
        navbar
      },
      computed:{
          language(){
          return this.$store.getters.language
        },
          paymentRecall(){
            return this.$store.getters.load_tenants_payment_recall
          },
          housePaymentRecall(){
            return this.$store.getters.load_houses_payment_recall
          }
      },
      created(){
        init.init_all()
        this.onLoad_tenants()
        this.onLoad_allHouses()
        this.onLoad_expiring_list()
        this.onLoad_houseExpiring_list()
        this.checkAdmin = timeLocalStorage.get('loginInfo')
        if(this.checkAdmin.role!=='admin'){
          this.$router.push('/')
        }
      },
      methods:{
          onLoad_allHouses(){
            axios({
              method:'get',
              url:Config._ipAddress+'/houses/list/allHouses'
            })
              .then((res)=>{
                const payload = {
                  data:res.data.payload
                }
                this.$store.dispatch('load_houses_list',payload)
              })
              .catch((err)=>{
                console.log(err)
              })
          },
        onLoad_tenants(){
          axios({
            method:'get',
            url:Config._ipAddress+'/tenants'
          })
            .then((res)=>{
              this.$store.dispatch('load_tenants',res.data)
            })
            .catch((err)=>{
              console.log(err)
            })
        },
          onLoad_expiring_list(){
            axios({
              method:'get',
              url:Config._ipAddress+'/expirings'
            })
              .then((res)=>{
                this.expiringTenants=res.data
              })
              .catch((err)=>{
                console.log(err)
              })
          },
        onLoad_houseExpiring_list(){
          axios({
            method:'get',
            url:Config._ipAddress+'/houseExpirings'
          })
            .then((res)=>{
              this.expiringHouses=res.data
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        onEdit(id){
            this.$router.push('/edittenant/'+id)
        },
        onEditHouse(id){
            this.$router.push('/edithouse/'+id)
        },
        onOpenHouseExpiringList(){
          this.expiringHousesFlag=true
          this.expiringTenantsFlag=false
          this.paymentRecallFlag=false
          this.housePaymentRecallFlag=false
        },
        onOpenExpiringList(){
          this.expiringHousesFlag=false
          this.expiringTenantsFlag=true
          this.paymentRecallFlag=false
          this.housePaymentRecallFlag=false
        },
        onOpenPaymentRecall(){
          this.expiringHousesFlag=false
          this.expiringTenantsFlag=false
          this.paymentRecallFlag=true
          this.housePaymentRecallFlag=false
        },
        onOpenHousePaymentRecall(){
          this.expiringHousesFlag=false
          this.expiringTenantsFlag=false
          this.paymentRecallFlag=false
          this.housePaymentRecallFlag=true
        },
        callisShouzu(tenant){
            let message
          if(this.language==='ch'){
            message='是否对 '+tenant.name_ch+' 收租? 金额为：'+tenant.rentalFee*tenant.cycle
          }else {
              message = 'Are you sure making payment for '+tenant.name_en+' ? The rental fees：'+tenant.rentalFee*tenant.cycle
          }
          this.$confirm(message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.callShouzu(tenant._id)
          }).catch(() => {
            let ms = '已取消操作'
            if(this.language==='en'){
              ms='cancel'
            }
            this.$message({
              type: 'info',
              message: ms
            });
          });
        },
        callShouzu(id){
          let data = {
            paymentTime:new Date().toISOString()
          }
          axios({
            method:'post',
            url:Config._ipAddress+'/tenants/payment/'+id,
            data:data
          })
            .then(res=>{
              console.log(res.data)
              if(res.data.status===0){
                this.onLoad_tenants()
                let msg = '收租成功'
                if(this.language==='en'){
                  msg='Successfully'
                }
                this.$message({
                  type: 'success',
                  message: msg
                });
              }
            })
        },
        callisJiaozu(house){
          let message
          if(this.language==='ch'){
            message='是否对 '+house.name_ch+' 交租? 金额为：'+house.price
          }else {
            message = 'Are you sure making payment for '+house.name_en+' ? The rental fees：'+house.price
          }
          this.$confirm(message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.callJiaozu(house._id)
          }).catch(() => {
            let ms = '已取消操作'
            if(this.language==='en'){
              ms='cancel'
            }
            this.$message({
              type: 'info',
              message: ms
            });
          });
        },
        callJiaozu(id){
          let data = {
            paymentTime:new Date().toISOString()
          }
          axios({
            method:'post',
            url:Config._ipAddress+'/houses/payment/'+id,
            data:data
          })
            .then(res=>{
              console.log(res.data)
              if(res.data.status===0){
                this.onLoad_allHouses()
                let msg = '交租成功'
                if(this.language==='en'){
                  msg='Successfully'
                }
                this.$message({
                  type: 'success',
                  message: msg
                });
              }
            })
        }
      }
    }
</script>

<style scoped>
.yuan {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(33deg,#32ffff,#3333ff);
  position: relative;
  overflow:visible;
}
.yuan1 {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #4caf50;
  position: relative;
  overflow:visible;
}
  .xiaoyuan{
    width: 40px;
    height: 40px;
    border:2px solid white;
    border-radius: 50%;
    background: red;
    position: absolute;
    right: -10px;
    top:2px;
  }
  .shuzi{
    color: white;
    margin-top: 8px;
  }
  .wenzi{
    color: white;
    position: absolute;
    top: 45%;
    left: 18%;
    font-size: 16px;
  }
</style>
