<template>
<div class="edittenant">
  <navbar></navbar>
  <section class="section section-edittenant">
    <div style="width: 120px;height: 120px;position: fixed;padding-top: 50px;bottom: 50%" class="oneBtn blue white-text center darken-3" @click="callOneBtn" v-if="oneBtnFlag">
      <span v-if="this.language==='ch'">一键收租</span>
      <span v-if="this.language==='en'">Payment</span>
    </div>
      <div class="container" v-if="this.language==='ch'">
        <div class="row">
          <div class="col s12 m4">
            <div class="card">
              <div class="card-image" v-for="img in image">
                <img :src="img | imgUrlHeader">
              </div>
              <div class="card-content">
                <div class="file-field input-field">
                  <div class="btn indigo">
                    <span>上传证件照</span>
                    <input type="file" @change="getTenantImage($event)" multiple>
                  </div>
                  <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" placeholder="Upload one photo">
                  </div>
                </div>
                <div class="row">
                  <div class="card-image">
                    <img :src="updateImagePreview" alt="" class="responsive-img">
                  </div>
                </div>
                <div class="row center">
                <a class="btn indigo" @click="onUpdateImage" :class="{disabled:isReady}">
                  <span>更新</span>
                </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col s12 m8">
            <div class="row">
              <div class="red white-text center" style="padding: 10px; width: 100%;">合约信息</div>
              <p>
                <span>租金：</span>
                <input type="number" v-model="rentalFee" class="browser-default" style="width: 100%">
              </p>
              <p>
                <span>押金：</span>
                <input type="number" v-model="deposit" class="browser-default" style="width: 100%">
              </p>
              <p>
                <span>合约起始日期：</span>
                <input type="text" placeholder="点击选择日期" id="contractStart" class="center datepicker">
              </p>
              <p>
                <span>合约期(单位:月)：</span>
                <input type="number" v-model="contractPeriod" class="browser-default" style="width: 100%">
              </p>
              <p>
                <span>合约到期日期：</span>
                <input type="text" placeholder="点击选择日期" id="contractEnd" class="center datepicker">
              </p>
              <p>
                <span>上次交租时间：</span>
                <input type="text" placeholder="点击选择日期" id="paymentTime" class="center datepicker">
              </p>
              <p>交租周期(月)：<input type="number" class="browser-default" v-model="cycle"></p>
              <p>
                <span>当前业务员：</span>
                <select class="browser-default" v-model="clerk">
                  <option value="" disabled selected>请选择...</option>
                  <option v-for="(clerk,index) in this.clerks" :value="clerk._id">{{clerk.name_ch}}</option>
                </select>
              </p>
              <div class="blue white-text center" style="padding: 10px; width: 100%;">租客信息</div>
              <p>
                <span>中文名字：</span>
                <input type="text" v-model="name_ch" class="browser-default" style="width: 100%">
              </p>
              <p>
                <span>英文名字：</span>
                <input type="text" v-model="name_en" class="browser-default" style="width: 100%">
              </p>
              <div>
                <span>性别：</span>
                <div style="display: inline-block">
                  <input name="group1" type="radio" id="test1" value="0" v-model="gender"/>
                  <label for="test1">男</label>
                </div>
                <div style="display: inline-block">
                  <input name="group1" type="radio" id="test2" value="1" v-model="gender"/>
                  <label for="test2">女</label>
                </div>
              </div>
              <p>
                <span>电话号码：</span>
                <input type="number" v-model="tel" class="browser-default" style="width: 100%">
              </p>
              <p>
                <span>国籍(中文描述)：</span>
                <input type="text" v-model="citizenship_ch" class="browser-default" style="width: 100%">
              </p>
              <p>
                <span>国籍(英文描述)：</span>
                <input type="text" v-model="citizenship_en" class="browser-default" style="width: 100%">
              </p>
            </div>
            <div class="row">
              <div class="col s12 m6 offset-m6 center">
                <div class="btn waves-light waves-effect green" @click="onSaveTenant">保存</div>
                <div v-if="room" class="btn grey waves-light waves-effect" @click="onCancel(true)">返回房间</div>
                <div v-if="house" class="btn grey waves-light waves-effect" @click="onCancel(false)">返回房屋</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-if="this.language==='en'">
      <div class="row">
        <div class="col s12 m4">
          <div class="card">
            <div class="card-image" v-for="img in image">
              <img :src="img | imgUrlHeader">
            </div>
            <div class="card-content">
              <div class="file-field input-field">
                <div class="btn indigo">
                  <span>Uploading photo</span>
                  <input type="file" @change="getTenantImage($event)" multiple>
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text" placeholder="Upload one photo">
                </div>
              </div>
              <div class="row">
                <div class="card-image">
                  <img :src="updateImagePreview" alt="" class="responsive-img">
                </div>
              </div>
              <div class="row center">
                <a class="btn indigo" @click="onUpdateImage" :class="{disabled:isReady}">
                  <span>Update</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col s12 m8">
          <div class="row">
            <div class="red white-text center" style="padding: 10px; width: 100%;">Contract Information</div>
            <p>
              <span>Rental Fee：</span>
              <input type="number" v-model="rentalFee" class="browser-default" style="width: 100%">
            </p>
            <p>
              <span>Deposit：</span>
              <input type="number" v-model="deposit" class="browser-default" style="width: 100%">
            </p>
            <p>
              <span>Contract Start Date：</span>
              <input type="text" placeholder="click to input date" id="contractStart" class="center datepicker">
            </p>
            <p>
              <span>Contract Period(months)：</span>
              <input type="number" v-model="contractPeriod" class="browser-default" style="width: 100%">
            </p>
            <p>
              <span>Contract End Date：</span>
              <input type="text" placeholder="click to input date" id="contractEnd" class="center datepicker">
            </p>
            <p>
              <span>Last Payment Time：</span>
              <input type="text" placeholder="click to input date" id="paymentTime" class="center datepicker">
            </p>
            <p>Payment Cycle( month )：<input type="number" class="browser-default" v-model="cycle"></p>
            <p>
              <span>Binding Clerk：</span>
              <select class="browser-default" v-model="clerk">
                <option value="" disabled selected>Please select...</option>
                <option v-for="(clerk,index) in this.clerks" :value="clerk._id">{{clerk.name_en}}</option>
              </select>
            </p>
            <div class="blue white-text center" style="padding: 10px; width: 100%;">Tenant Information</div>
            <p>
              <span>Chinese Name：</span>
              <input type="text" v-model="name_ch" class="browser-default" style="width: 100%">
            </p>
            <p>
              <span>English Name：</span>
              <input type="text" v-model="name_en" class="browser-default" style="width: 100%">
            </p>
            <div>
              <span>Gender：</span>
              <div style="display: inline-block">
                <input name="group2" type="radio" id="test3" value="0" v-model="gender"/>
                <label for="test3">Male</label>
              </div>
              <div style="display: inline-block">
                <input name="group2" type="radio" id="test4" value="1" v-model="gender"/>
                <label for="test4">Female</label>
              </div>
            </div>
            <p>
              <span>Telephone Number：</span>
              <input type="number" v-model="tel" class="browser-default" style="width: 100%">
            </p>
            <p>
              <span>Citizenship (Chinese)：</span>
              <input type="text" v-model="citizenship_ch" class="browser-default" style="width: 100%">
            </p>
            <p>
              <span>Citizenship (English)：</span>
              <input type="text" v-model="citizenship_en" class="browser-default" style="width: 100%">
            </p>
          </div>
          <div class="row">
            <div class="col s12 m6 offset-m6 center">
              <div class="btn waves-light waves-effect green" @click="onSaveTenant">Save</div>
              <div v-if="room" class="btn grey waves-light waves-effect" @click="onCancel(true)">Back to Room</div>
              <div v-if="house" class="btn grey waves-light waves-effect" @click="onCancel(false)">Back to House</div>
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
        name: "edittenant",
      data(){
          return {
            cycle:'',
            isReady:true,
            name_ch:'',
            name_en:'',
            gender_ch:'',
            gender_en:'',
            tel:'',
            image:[],
            new_image:[],
            updateImagePreview:'',
            citizenship_ch:'',
            citizenship_en:'',
            room:'',
            house:'',
            paymentTime:'',
            rentalFee:'',
            deposit:'',
            contractPeriod:'',
            contractStart:'',
            contractEnd:'',
            clerk:'',
            gender:''
          }
      },
      watch:{
        contractPeriod(){
          if(document.getElementById('contractStart').value&&this.contractPeriod){
            let start = document.getElementById('contractStart').value
            let startYear = new Date(start).getFullYear()
            let startMonth = new Date(start).getMonth()+1
            let startDay = new Date(start).getDate()
            let totalMonth = parseInt(startMonth)+parseInt(this.contractPeriod)
            let shang = Math.floor(totalMonth/12)
            let yu = totalMonth%12
            let end
            if(shang==0){
              let startYearYu = (parseInt(startYear))%4
              if(startYearYu==0&&startDay>29&&yu==2){
                startDay=29
              }
              if(startYearYu!=0&&startDay>28&&yu==2){
                startDay=28
              }
              end = startYear+'/'+yu+'/'+startDay
            }else if(yu==0){
              end = (parseInt(startYear)+parseInt(shang)-1)+'/12/'+startDay
            }else {
              let endYearYu = (parseInt(startYear)+parseInt(shang))%4
              if(endYearYu==0&&startDay>29&&yu==2){
                startDay=29
              }
              if(endYearYu!=0&&startDay>28&&yu==2){
                startDay=28
              }
              end = (parseInt(startYear)+parseInt(shang))+'/'+yu+'/'+startDay
            }
            document.getElementById('contractEnd').value=end
          }
          if(!this.contractPeriod){
            document.getElementById('contractEnd').value=''
          }
        }
      },
      components:{
        navbar
      },
      computed:{
        clerks(){
          return this.$store.getters.load_clerks
        },
        language(){
          return this.$store.getters.language
        },
        oneBtnFlag(){
         let flag = false
          let dateNow = new Date()
          let nowMonth = dateNow.getMonth()+1
          let datePayment = new Date(this.paymentTime)
          let paymentMonth = datePayment.getMonth()+1
          if(nowMonth > paymentMonth + this.cycle - 1){
           flag=true
          }
          return flag
        }
      },
      created(){
          init.init_all()
          this.load_tenant()
        this.checkAdmin = timeLocalStorage.get('loginInfo')
        if(this.checkAdmin.role!=='admin'){
          this.$router.push('/')
        }
      },
      methods:{
        getTenantImage(event){
          this.isReady=false
          for(var i=0;i<event.target.files.length;i++){
            this.new_image[i]=event.target.files[i]
          }
          this.updateImagePreview=window.URL.createObjectURL(event.target.files[0])
        },
        onUpdateImage(){
          this.isReady=true
          const data = new FormData()
          for(var i=0;i<this.new_image.length;i++) {
            data.append('images', this.new_image[i])
          }
          for(var i=0;i<this.image.length;i++) {
            data.append('deleteImage', this.image[i])
          }
          axios({
            method:'patch',
            url:Config._ipAddress+'/tenants/updateImage/'+this.$route.params.tenantId,
            data:data,
            headers:{'Content-Type':'multipart/form-data'}
          })
            .then((res)=>{
              this.load_tenant()
              this.updateImagePreview=null
            })
            .catch((err)=>{
              console.log(err)
            })
        },
          load_tenant(){
            axios({
              method:'get',
              url: Config._ipAddress+'/tenants/' + this.$route.params.tenantId
            })
              .then((res)=>{
                this.name_ch=res.data.name_ch
                this.name_en=res.data.name_en
                if(res.data.gender_en==='male'){
                  this.gender='0'
                }else {
                  this.gender='1'
                }
                this.tel=res.data.tel
                this.image=res.data.images
                this.citizenship_ch=res.data.citizenship_ch
                this.citizenship_en=res.data.citizenship_en
                this.room=res.data.room
                this.house=res.data.house
                this.cycle=res.data.cycle
                this.paymentTime=new Date(res.data.paymentTime).toLocaleDateString()
                this.paymentTime=this.paymentTime.split('/')
                if(this.paymentTime[0]<1000){
                this.paymentTime=this.paymentTime[2]+'/'+this.paymentTime[1]+'/'+this.paymentTime[0]
                }else{
                this.paymentTime=this.paymentTime[0]+'/'+this.paymentTime[1]+'/'+this.paymentTime[2]
                }
                document.getElementById('paymentTime').value=this.paymentTime
                this.rentalFee=res.data.rentalFee
                this.deposit=res.data.deposit
                this.contractPeriod=res.data.contractPeriod
                this.contractStart=new Date(res.data.contractStart).toLocaleDateString()
                this.contractStart=this.contractStart.split('/')
                if(this.contractStart[0]<1000){
                this.contractStart=this.contractStart[2]+'/'+this.contractStart[1]+'/'+this.contractStart[0]
                }else{
                this.contractStart=this.contractStart[0]+'/'+this.contractStart[1]+'/'+this.contractStart[2]
                }
                this.contractEnd=new Date(res.data.contractEnd).toLocaleDateString()
                this.contractEnd=this.contractEnd.split('/')
                if(this.contractEnd[0]<1000){
                this.contractEnd=this.contractEnd[2]+'/'+this.contractEnd[1]+'/'+this.contractEnd[0]
                }else{
                this.contractEnd=this.contractEnd[0]+'/'+this.contractEnd[1]+'/'+this.contractEnd[2]
                }
                document.getElementById('contractStart').value=this.contractStart
                document.getElementById('contractEnd').value=this.contractEnd
                this.clerk=res.data.clerk._id
              })
              .catch((err)=>{
                console.log(err)
              })
          },
        onSaveTenant(){
          let start=document.getElementById('contractStart').value
          let end = document.getElementById('contractEnd').value
          let paymentTime = document.getElementById('paymentTime').value
          if(start===this.contractStart){
            start = start.split(' ')
            this.contractStart=new Date(start[0]).toISOString()
          }else{
            this.contractStart=new Date(start).toISOString()
          }

          if(end===this.contractEnd){
            end = end.split(' ')
            this.contractEnd=new Date(end[0]).toISOString()
          }else{
            this.contractEnd=new Date(end).toISOString()
          }

          if(paymentTime===this.paymentTime){
            paymentTime = paymentTime.split(' ')
            this.paymentTime=new Date(paymentTime[0]).toISOString()
          }else{
            this.paymentTime=new Date(paymentTime).toISOString()
          }


            let timeSpan=Math.floor(
              (Date.parse(this.contractEnd) - Date.now()) / (1000 * 60 * 60 * 24)
            );
          if(timeSpan>30){
            axios({
              method:'delete',
              url:Config._ipAddress+'/expirings/'+this.$route.params.tenantId
            })
              .then(res=>{
              })
              .catch((err)=>{
                console.log(err)
              })



            if(this.house){
              axios({
                method:'patch',
                url:Config._ipAddress+'/houses/'+this.house._id,
                data:{state_tenant:4}
              })
                .then(res=>{
                })
                .catch((err)=>{
                  console.log(err)
                })
            } else if(this.room.roomState===1){
              axios({
                method:'patch',
                url:Config._ipAddress+'/rooms/'+this.room._id,
                data:{roomState:2}
              })
                .then(res=>{
                })
                .catch((err)=>{
                  console.log(err)
                })
            }
          }

          if(this.gender==='0'){
            this.gender_ch='男'
            this.gender_en='male'
          }else {
            this.gender_ch='女'
            this.gender_en='female'
          }
          const Tenant = {
            name_ch:this.name_ch,
            name_en:this.name_en,
            gender_ch:this.gender_ch,
            gender_en:this.gender_en,
            tel:this.tel,
            cycle:this.cycle,
            citizenship_ch:this.citizenship_ch,
            citizenship_en:this.citizenship_en,
            paymentTime:this.paymentTime,
            rentalFee:this.rentalFee,
            deposit:this.deposit,
            contractPeriod:this.contractPeriod,
            contractStart:this.contractStart,
            contractEnd:this.contractEnd,
            clerk:this.clerk
          }
          axios({
            method:'patch',
            url:Config._ipAddress+'/tenants/'+this.$route.params.tenantId,
            data:Tenant
          })
            .then((res)=>{
              let msg = '保存成功！'
              if(this.language==='en'){
                msg='Successfully!'
              }
              this.$message({
                type: 'success',
                message: msg
              });
              setTimeout(()=>{
                window.location.reload();
              },1500)
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
        onCancel(flag){
          if(flag){
            this.$router.push('/rooms/'+this.room._id)
          }else{
            this.$router.push('/edithouse/'+this.house._id)
          }
        },
        callOneBtn(){
          let data = {
            paymentTime:new Date().toISOString()
          }
          axios({
            method:'post',
            url:Config._ipAddress+'/tenants/payment/'+this.$route.params.tenantId,
            data:data
          })
            .then(res=>{
              console.log(res.data)
              if(res.data.status===0){
                this.$router.go(-1)
                let msg = '收租成功'
                if(this.language==='en'){
                  msg='Successfully'
                }
                Materialize.toast(msg, 3000, 'rounded')
              }
            })
        }
      }
    }
</script>

<style scoped>
  .oneBtn{
    transition: 0.5s;
    cursor: pointer;
  }
.oneBtn:hover{
  opacity: 0.7;
  transition: 0.5s;
}
</style>
