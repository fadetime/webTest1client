<template>
  <div>
    <div v-if="!loading_flag">
      <div class="loading" style="margin-top: 100px">
        <div class="row">
          <div class="col s8 offset-s2">
            <div class="wrap hide-on-small-and-down">
              <div class="track">
                <div class="kurt">
                  <div class="loader"></div>
                </div>
              </div>
            </div>
            <div class="wrap hide-on-med-and-up">
              <div class="spinner spinner-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="room" v-show="loading_flag">
      <navbar></navbar>
      <section class="section section-room">
        <div class="container" v-if="this.language==='ch'">
          <div class="row">
            <div class="section">
              <div class="white-text center" style="padding: 10px; width: 100%; background:linear-gradient(-45deg,#311b92,#536dfe,#304ffe);">房间信息</div>
            </div>
            <div class="col s12 m5">
              <div class="row">
                <div class="col s12" v-if="checkAdmin.role==='admin'">
                  <p>
                    <span>底价(每人)：</span>
                    <input type="number" v-model="basePrice" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>可住人数：</span>
                    <input type="number" v-model="capacity" class="browser-default" style="width: 100%">
                  </p>
                  <div>
                    <span>房间类型：</span>
                    <div style="display: inline-block">
                      <input name="room_ch" type="radio" id="room1" value="0" v-model="type"/>
                      <label for="room1">主人房</label>
                    </div>
                    <div style="display: inline-block">
                      <input name="room_ch" type="radio" id="room2" value="1" v-model="type"/>
                      <label for="room2">大普通房</label>
                    </div>
                    <div style="display: inline-block">
                      <input name="room_ch" type="radio" id="room3" value="2" v-model="type"/>
                      <label for="room3">小普通房</label>
                    </div>
                    <div style="display: inline-block">
                      <input name="room_ch" type="radio" id="room4" value="3" v-model="type"/>
                      <label for="room4">普通房</label>
                    </div>
                    <div style="display: inline-block">
                      <input name="room_ch" type="radio" id="room5" value="4" v-model="type"/>
                      <label for="room5">佣人房</label>
                    </div>
                    <div style="display: inline-block">
                      <input name="room_ch" type="radio" id="room6" value="5" v-model="type"/>
                      <label for="room6">隔间</label>
                    </div>
                  </div>
                  <p>
                    <span>房间状态：</span>
                    <select class="browser-default" v-model="roomState">
                      <option value="" disabled selected>请选择...</option>
                      <option value="0">未住满</option>
                      <option value="1">至少一个月后可出租</option>
                      <option value="2">住满</option>
                    </select>
                  </p>
                </div>
                <div class="col s12" v-if="checkAdmin.role==='clerk'">
                  <p>
                    <span>底价(每人)：{{basePrice}}</span>
                  </p>
                  <p>
                    <span>可住人数：{{capacity}}</span>
                  </p>
                  <p>
                    <span>房间类型：{{roomType_ch}}</span>
                  </p>
                  <p>
                    房间状态：
                    <span v-if="roomState===0" class="green-text">未住满</span>
                    <span v-if="roomState===1" class="red-text">至少一个月后可租</span>
                    <span v-if="roomState===2" class="grey-text">住满</span>
                  </p>
                </div>
              </div>
              <div class="row" v-if="checkAdmin.role==='admin'">
                <div class="col s2">
                  <a class="btn-floating red waves-light waves-effect modal-trigger" data-target="modal1"><i class="material-icons">delete</i></a>
                  <!-- Modal Structure -->
                  <div id="modal1" class="modal">
                    <div class="modal-content">
                      <p class="orange white-text" style="height: 60px; padding: 15px;font-size: 22px;">你确定删除 ( {{roomType_ch}} ) ？</p>
                    </div>
                    <div class="modal-footer">
                      <a class="modal-action modal-close waves-effect waves-green btn green" @click="onDeleteRoom">确定</a>
                      <a class="modal-action modal-close waves-effect waves-green btn grey">取消</a>
                    </div>
                  </div>
                </div>
                <div class="col s10">
                  <p>
                    <a class="btn green waves-effect waves-light" style="width: 100%;" @click="onSaveRoom">保存</a>
                  </p>
                  <p>
                    <a class="btn grey waves-effect waves-light" style="width: 100%;" @click="onCancel">返回房屋</a>
                  </p>
                </div>
              </div>
            </div>
            <div class="col s12 m7">
              <div class="section">
                <div class="white-text center" style="padding: 10px; width: 100%; background:linear-gradient(-45deg,#311b92,#536dfe,#304ffe);">房间图片</div>
              </div>
              <div class="row" v-show="checkAdmin.role==='admin'">
                <div class="col s12 m4" v-for="(image,index) in this.images">
                  <div class="card">
                    <div class="card-image">
                      <img :src="image | imgUrlHeader" alt="" class="responsive-img materialboxed"><a class="btn-floating halfway-fab waves-effect waves-light red" @click="onDeleteImage(image)" v-if="checkAdmin.role==='admin'"><i class="material-icons">close</i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="checkAdmin.role!=='admin'">
                <div class="carousel carousel-slider">
                  <a class="carousel-item" :value="index" v-for="(image,index) in images">
                    <div class="card">
                      <div class="card-image">
                        <img :src="image | imgUrlHeader" alt="" class="responsive-img">
                      </div>
                    </div>
                  </a>
                </div>
                <div style="text-align: center;">{{page}} / {{images.length}}</div>
              </div>
              <div class="row center" v-if="checkAdmin.role==='admin'">
                <div class="file-field input-field">
                  <div class="btn indigo">
                    <span>添加图片</span>
                    <input type="file" multiple @change="getimg($event)">
                  </div>
                  <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" placeholder="Upload one or more files">
                  </div>
                </div>
                <div class="btn indigo" @click="onAddImages">
                  <span>确认上传</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="section">
              <!--<div class="white-text center" style="padding: 10px; width: 100%; background:linear-gradient(-45deg,#311b92,#536dfe,#304ffe);">住户信息</div>-->
              <div class="divider"></div>
            </div>
            <div class="row" v-show="tenants.length!==capacity && !this.house_tenant_flag && checkAdmin.role==='admin'">
              <div class="col s6 offset-s3">
                <div class="btn waves-effect waves-light modal-trigger" style="width: 100%;" data-target="modal2">办理入住</div>
                <!--新增房间窗口开始-->
                <!-- Modal Structure-create -->
                <div id="modal2" class="modal">
                  <div class="modal-content">
                    <h5>新增住户</h5>
                    <div class="row">
                      <div class="col s12 m6">
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
                          <input type="number" v-model="contractPeriod" class="browser-default" style="width: 50%">
                        </p>
                        <p>
                          <span>合约到期日期：</span>
                          <input type="text" placeholder="点击选择日期" id="contractEnd" class="center datepicker">
                        </p>
                        <p>
                          <span>上次交租日期：</span>
                          <input type="text" placeholder="点击选择日期" id="paymentTime" class="center datepicker">
                        </p>
                        <p>交租周期 ( 月 )：<input type="number" class="browser-default" v-model="cycle"></p>
                        <p>
                          <span>当前业务员：</span>
                          <select class="browser-default" v-model="clerk">
                            <option value="" disabled selected>请选择...</option>
                            <option v-for="(clerk,index) in this.clerks" :value="clerk._id">{{clerk.name_ch}}</option>
                          </select>
                        </p>
                      </div>
                      <div class="col s12 m6">
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
                        <div class="file-field input-field">
                          <div class="btn indigo">
                            <span>上传证件照</span>
                            <input type="file" @change="getTenantImage($event)" multiple>
                          </div>
                          <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" placeholder="Upload one photo">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <div class="modal-action modal-close waves-effect waves-green btn green" @click="onCreateTenant">确认</div>
                    <div class="modal-action modal-close waves-effect waves-green btn grey">取消</div>
                  </div>
                </div>
                <!--新增房间窗口结束-->
              </div>
            </div>
            <div class="row" v-for="(tenant,index) in tenants">
              <div class="section tenant-contract">
                <div class="row">
              <div class="col s12 m4" v-if="checkAdmin.role==='admin'">
                <div class="card">
                  <div class="card-image" v-for="image in tenant.images">
                    <img :src="image | imgUrlHeader">
                  </div>
                  <div class="card-content">
                    <p>姓名：{{tenant.name_ch}}</p>
                    <p>性别：{{tenant.gender_ch}}</p>
                    <p>国籍：{{tenant.citizenship_ch}}</p>
                    <p>电话：{{tenant.tel}}</p>
                  </div>
                </div>
              </div>
              <div class="col s12 m8">
                    <div class="row">
                    <div class="red white-text center" style="padding: 10px; width: 100%;">合约信息</div>
                    <p>租金：{{tenant.rentalFee}}</p>
                    <p>押金：{{tenant.deposit}}</p>
                    <p>交租周期(月)：{{tenant.cycle}}</p>
                    <p>上次交租时间：{{tenant.paymentTime | date}}</p>
                    <p>合约期：{{tenant.contractPeriod}}</p>
                    <p>合约起始日期：{{tenant.contractStart | date}}</p>
                    <p>合约结束日期：{{tenant.contractEnd | date}}</p>
                    <p>当前业务员：{{tenant.clerk.name_ch}}</p>
                    </div>
                    <div class="row" v-show="checkAdmin.role==='admin'">
                    <div class="col s12 m6 offset-m6">
                      <div class="btn waves-light waves-effect indigo" @click="onEditTenant(tenant._id)">编辑</div>
                      <a class="btn red waves-light waves-effect modal-trigger" @click="onCheckOut(tenant._id)">
                        退房
                      </a>
                    </div>
                  </div>
              </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row center" v-if="checkAdmin.role==='clerk'">
            <div class="btn waves-effect waves-light" @click="onBack">返回房屋</div>
          </div>
        </div>
        <div class="container" v-if="this.language==='en'">
          <div class="row">
            <div class="section">
              <div class="white-text center" style="padding: 10px; width: 100%; background:linear-gradient(-45deg,#311b92,#536dfe,#304ffe);">Room Information</div>
            </div>
            <div class="col s12 m5">
              <div class="row">
                <div class="col s12" v-if="checkAdmin.role==='admin'">
                  <p>
                    <span>Base Price(/person)：</span>
                    <input type="number" v-model="basePrice" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>Capacity：</span>
                    <input type="number" v-model="capacity" class="browser-default" style="width: 100%">
                  </p>
                  <div>
                    <span>Type of Room：</span>
                    <div style="display: inline-block">
                      <input name="room_en" type="radio" id="room7" value="0" v-model="type"/>
                      <label for="room7">Master Room</label>
                    </div>
                    <div style="display: inline-block">
                      <input name="room_en" type="radio" id="room8" value="1" v-model="type"/>
                      <label for="room8">Big Standard Room</label>
                    </div>
                    <div style="display: inline-block">
                      <input name="room_en" type="radio" id="room9" value="2" v-model="type"/>
                      <label for="room9">Small Standard Room</label>
                    </div>
                    <div style="display: inline-block">
                      <input name="room_en" type="radio" id="room10" value="3" v-model="type"/>
                      <label for="room10">Standard Room</label>
                    </div>
                    <div style="display: inline-block">
                      <input name="room_en" type="radio" id="room11" value="4" v-model="type"/>
                      <label for="room11">Maid Room</label>
                    </div>
                    <div style="display: inline-block">
                      <input name="room_en" type="radio" id="room12" value="5" v-model="type"/>
                      <label for="room12">Compartment</label>
                    </div>
                  </div>
                  <p>
                    <span>State：</span>
                    <select class="browser-default" v-model="roomState">
                      <option value="" disabled selected>Please select...</option>
                      <option value="0">Vancy</option>
                      <option value="1">Vancy in one month</option>
                      <option value="2">Full</option>
                    </select>
                  </p>
                </div>
                <div class="col s12" v-if="checkAdmin.role==='clerk'">
                  <p>
                    <span>Base Price(/person)：{{basePrice}}</span>
                  <p>
                    <span>Capacity：{{capacity}}</span>
                  </p>
                  <p>
                    <span>Room Type：{{roomType_en}}</span>
                  </p>
                  <p>
                    State：
                    <span v-if="roomState===0" class="green-text">Vancy</span>
                    <span v-if="roomState===1" class="red-text">Vancy in the next month</span>
                    <span v-if="roomState===2" class="grey-text">Full</span>
                  </p>
                </div>
              </div>
              <div class="row" v-if="checkAdmin.role==='admin'">
                <div class="col s2">
                  <a class="btn-floating red waves-light waves-effect modal-trigger" data-target="modal3"><i class="material-icons">delete</i></a>
                  <!-- Modal Structure -->
                  <div id="modal3" class="modal">
                    <div class="modal-content">
                      <p class="orange white-text" style="height: 60px; padding: 15px;font-size: 22px;">Are you sure removing ( {{roomType_en}} ) ？</p>
                    </div>
                    <div class="modal-footer">
                      <a class="modal-action modal-close waves-effect waves-green btn green" @click="onDeleteRoom">Confirm</a>
                      <a class="modal-action modal-close waves-effect waves-green btn grey">Cancel</a>
                    </div>
                  </div>
                </div>
                <div class="col s10">
                  <p>
                    <a class="btn green waves-effect waves-light" style="width: 100%;" @click="onSaveRoom">Save</a>
                  </p>
                  <p>
                    <a class="btn grey waves-effect waves-light" style="width: 100%;" @click="onCancel">Back to house</a>
                  </p>
                </div>
              </div>
            </div>
            <div class="col s12 m7">
              <div class="section">
                <div class="white-text center" style="padding: 10px; width: 100%; background:linear-gradient(-45deg,#311b92,#536dfe,#304ffe);">Room Photos</div>
              </div>
              <div class="row" v-show="checkAdmin.role==='admin'">
                <div class="col s12 m4" v-for="(image,index) in this.images">
                  <div class="card">
                    <div class="card-image">
                      <img :src="image | imgUrlHeader" alt="" class="responsive-img materialboxed"><a class="btn-floating halfway-fab waves-effect waves-light red" @click="onDeleteImage(image)" v-if="checkAdmin.role==='admin'"><i class="material-icons">close</i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="checkAdmin.role!=='admin'">
                <div class="carousel carousel-slider">
                  <a class="carousel-item" :value="index" v-for="(image,index) in images">
                    <div class="card">
                      <div class="card-image">
                        <img :src="image | imgUrlHeader" alt="" class="responsive-img">
                      </div>
                    </div>
                  </a>
                </div>
                <div style="text-align: center;">{{page}} / {{images.length}}</div>
              </div>
              <div class="row center" v-if="checkAdmin.role==='admin'">
                <div class="file-field input-field">
                  <div class="btn indigo">
                    <span>Adding Photo</span>
                    <input type="file" multiple @change="getimg($event)">
                  </div>
                  <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" placeholder="Upload one or more files">
                  </div>
                </div>
                <div class="btn indigo" @click="onAddImages">
                  <span>Click for Uploading</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="section">
              <!--<div class="white-text center" style="padding: 10px; width: 100%; background:linear-gradient(-45deg,#311b92,#536dfe,#304ffe);">住户信息</div>-->
              <div class="divider"></div>
            </div>
            <div class="row" v-show="tenants.length!==capacity && !this.house_tenant_flag && checkAdmin.role==='admin'">
              <div class="col s6 offset-s3">
                <div class="btn waves-effect waves-light modal-trigger" style="width: 100%;" data-target="modal4">Check-in</div>
                <!--新增房间窗口开始-->
                <!-- Modal Structure-create -->
                <div id="modal4" class="modal">
                  <div class="modal-content">
                    <h5>Create Tenant</h5>
                    <div class="row">
                      <div class="col s12 m6">
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
                          <input type="text" placeholder="click to input a date" id="contractStart" class="center datepicker">
                        </p>
                        <p>
                          <span>Contract Period(months)：</span>
                          <input type="number" v-model="contractPeriod" class="browser-default" style="width: 50%">
                        </p>
                        <p>
                          <span>Contract End Date：</span>
                          <input type="text" placeholder="click to input a date" id="contractEnd" class="center datepicker">
                        </p>
                        <p>
                          <span>Payment Time：</span>
                          <input type="text" placeholder="click to input a date" id="paymentTime" class="center datepicker">
                        </p>
                        <p>Payment Cycle ( month )：<input type="number" class="browser-default" v-model="cycle"></p>
                        <p>
                          <span>Binding Clerk：</span>
                          <select class="browser-default" v-model="clerk">
                            <option value="" disabled selected>Please select...</option>
                            <option v-for="(clerk,index) in this.clerks" :value="clerk._id">{{clerk.name_en}}</option>
                          </select>
                        </p>
                      </div>
                      <div class="col s12 m6">
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
                          <span>Tel：</span>
                          <input type="number" v-model="tel" class="browser-default" style="width: 100%">
                        </p>
                        <p>
                          <span>Citizenship(Chinese)：</span>
                          <input type="text" v-model="citizenship_ch" class="browser-default" style="width: 100%">
                        </p>
                        <p>
                          <span>Citizenship(English)：</span>
                          <input type="text" v-model="citizenship_en" class="browser-default" style="width: 100%">
                        </p>
                        <div class="file-field input-field">
                          <div class="btn indigo">
                            <span>Uploading Photo</span>
                            <input type="file" @change="getTenantImage($event)" multiple>
                          </div>
                          <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" placeholder="Upload one photo">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <div class="modal-action modal-close waves-effect waves-green btn green" @click="onCreateTenant">Confirm</div>
                    <div class="modal-action modal-close waves-effect waves-green btn grey">Cancel</div>
                  </div>
                </div>
                <!--新增房间窗口结束-->
              </div>
            </div>
            <div class="row" v-for="(tenant,index) in tenants">
              <div class="section tenant-contract">
                <div class="row">
                  <div class="col s12 m4" v-if="checkAdmin.role==='admin'">
                    <div class="card">
                      <div class="card-image" v-for="image in tenant.images">
                        <img :src="image | imgUrlHeader">
                      </div>
                      <div class="card-content">
                        <p>Name：{{tenant.name_en}}</p>
                        <p>Gender：{{tenant.gender_en}}</p>
                        <p>Citizenship：{{tenant.citizenship_en}}</p>
                        <p>Tel：{{tenant.tel}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m8">
                    <div class="row">
                      <div class="red white-text center" style="padding: 10px; width: 100%;">Contract Information</div>
                      <p>Rental Fee：{{tenant.rentalFee}}</p>
                      <p>Deposit：{{tenant.deposit}}</p>
                      <p>Payment Cycle( month )：{{tenant.cycle}}</p>
                      <p>Last Payment Time：{{tenant.paymentTime | date}}</p>
                      <p>Contract Period：{{tenant.contractPeriod}}</p>
                      <p>Contract Start Date：{{tenant.contractStart | date}}</p>
                      <p>Contract End Date：{{tenant.contractEnd | date}}</p>
                      <p>Binding Clerk：{{tenant.clerk.name_en}}</p>
                    </div>
                    <div class="row" v-show="checkAdmin.role==='admin'">
                      <div class="col s12 m6 offset-m6">
                        <div class="btn waves-light waves-effect indigo" @click="onEditTenant(tenant._id)">Edit</div>
                        <a class="btn red waves-light waves-effect modal-trigger" @click="onCheckOut(tenant._id)">
                          Check-out
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row center" v-if="checkAdmin.role==='clerk'">
            <div class="btn waves-effect waves-light" @click="onBack">Back to the house</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import navbar from "@/components/Nav"
  import init from "@/assets/js/myjs"
  import axios from "axios"
  import Config from '@/data/config'
  import timeLocalStorage from 'time-localstorage';
    export default {
        name: "room",
      components:{
        navbar
      },
      data(){
        return{
          loading_flag:false,
          type:'',
          roomType_ch:'',
          roomType_en:'',
          houseId:'',
          images:[],
          basePrice:'',
          roomState:'',
          capacity:'',
          tenants:[],
          name_ch:'',
          name_en:'',
          gender:'',
          gender_ch:'',
          gender_en:'',
          tel:'',
          image:[],
          citizenship_ch:'',
          citizenship_en:'',
          clerk:'',
          paymentTime:'',
          cycle:'',
          rentalFee:'',
          contractStart:'',
          contractEnd:'',
          contractPeriod:'',
          deposit:'',
          addImages:[],
          checkAdmin:'',
          page:1
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
      computed:{
        clerks(){
          return this.$store.getters.load_clerks
        },
        house_tenant_flag(){
          return this.$store.getters.house_tenant_flag
        },
        language(){
          return this.$store.getters.language
        }
      },
      created(){
        init.init_all()
        this.load_room()
        this.checkAdmin = timeLocalStorage.get('loginInfo')
        if(!this.checkAdmin){
          this.$router.push('/')
        }
        setTimeout(()=>{
          if(this.checkAdmin.role!='admin'){
            $('.carousel-item').on('touchend',()=>{
              setTimeout(()=>{
                for(let i=0;i<document.querySelector('.carousel').children.length;i++){
                  if(document.querySelector('.carousel').children[i].className=="carousel-item active"){
                    this.page=i+1
                  }
                }
              },500)
            })
          }
        },3000)
      },
      updated(){
        $(document).ready(function(){
          $('.materialboxed').materialbox();
        });
        setTimeout(()=>{
          if(this.checkAdmin.role!='admin'){
            $('.carousel.carousel-slider').carousel({fullWidth: true});
          }
        },2000)
      },
      methods:{
        onEditTenant(id){
          this.$router.push('/edittenant/'+id)
        },
        onDeleteRoom(){
          if(this.tenants.length!==0){
            return window.alert('无法删除房间')
          }
          const data = {
            images:this.images,
            houseId:this.houseId
          }
          axios({
            method:'delete',
            url:Config._ipAddress+'/rooms/'+this.$route.params.roomId,
            data:data
          })
            .then((res)=>{
              this.$router.push('/edithouse/'+this.houseId)
            })
            .catch((err)=>{
              console.log(err)
            })
          },
        onSaveRoom(){
          if(this.type==='0'){
            this.roomType_ch='主人房'
            this.roomType_en='Master Room'
          }
          if(this.type==='1'){
            this.roomType_ch='大普通房'
            this.roomType_en='Big Standard Room'
          }
          if(this.type==='2'){
            this.roomType_ch='小普通房'
            this.roomType_en='Small Standard Room'
          }
          if(this.type==='3'){
            this.roomType_ch='普通房'
            this.roomType_en='Standard Room'
          }
          if(this.type==='4'){
            this.roomType_ch='佣人房'
            this.roomType_en='Maid Room'
          }
          if(this.type==='5'){
            this.roomType_ch='隔间'
            this.roomType_en='Compartment'
          }
          const Room = {
            basePrice:this.basePrice,
            capacity:this.capacity,
            roomType_ch:this.roomType_ch,
            roomType_en:this.roomType_en,
            roomState:this.roomState
          }
          axios({
            method:'patch',
            url:Config._ipAddress+'/rooms/'+this.$route.params.roomId,
            data:Room
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
        onCancel(){
          this.$router.push('/edithouse/'+this.houseId)
        },
        onBack(){
          this.$router.push('/viewhouse/'+this.houseId)
        },
        getTenantImage(event){
          for(var i=0;i<event.target.files.length;i++){
            this.image[i]=event.target.files[i]
          }
        },
        getimg(event){
          for(var i=0;i<event.target.files.length;i++){
            this.addImages[i]=event.target.files[i]
          }
        },
        onAddImages(){
          const data = new FormData()
          for(var i=0;i<this.addImages.length;i++) {
            data.append('images', this.addImages[i])
          }
          axios({
            method:'post',
            url:Config._ipAddress+'/rooms/addImages/'+this.$route.params.roomId,
            data:data,
            headers:{'Content-Type':'multipart/form-data'}
          })
            .then((res)=>{
              this.load_room()
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        onDeleteImage(image){
          const data={
            image:image
          }
          axios({
            method:'post',
            url:Config._ipAddress+'/rooms/deleteImage/'+this.$route.params.roomId,
            data:data
          })
            .then((res)=>{
              this.load_room()
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        load_room(){
          axios({
            method:'get',
            url: Config._ipAddress+'/rooms/' + this.$route.params.roomId
          })
            .then((res)=>{
                    setTimeout(()=>{
                      this.loading_flag=true
                    },1000)
              if(res.data.roomType_ch==='主人房'){
                this.type='0'
              }
              if(res.data.roomType_ch==='大普通房'){
                this.type='1'
              }
              if(res.data.roomType_ch==='小普通房'){
                this.type='2'
              }
              if(res.data.roomType_ch==='普通房'){
                this.type='3'
              }
              if(res.data.roomType_ch==='佣人房'){
                this.type='4'
              }
              if(res.data.roomType_ch==='隔间'){
                this.type='5'
              }
              this.roomType_ch=res.data.roomType_ch
              this.roomType_en=res.data.roomType_en
              this.images=res.data.images
              this.basePrice=res.data.basePrice
              this.roomState=res.data.roomState
              this.capacity=res.data.capacity
              this.houseId=res.data.house._id
              this.$store.dispatch('house_tenant_flag',res.data.house.tenant)
              this.tenants=res.data.tenants
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        onCreateTenant(){
          let start=document.getElementById('contractStart').value
          let end = document.getElementById('contractEnd').value
          let paymentTime = document.getElementById('paymentTime').value
          this.contractStart=new Date(start).toISOString()
          this.contractEnd=new Date(end).toISOString()
          this.paymentTime=new Date(paymentTime).toISOString()
          const Tenant = new FormData()
          Tenant.append('name_ch',this.name_ch)
          Tenant.append('name_en',this.name_en)
          if(this.gender==='0'){
            this.gender_ch='男'
            this.gender_en='male'
          }else {
            this.gender_ch='女'
            this.gender_en='female'
          }
          Tenant.append('gender_ch',this.gender_ch)
          Tenant.append('gender_en',this.gender_en)
          Tenant.append('tel',this.tel)
          for(var i=0;i<this.image.length;i++){
            Tenant.append('images',this.image[i])
          }
          Tenant.append('citizenship_ch',this.citizenship_ch)
          Tenant.append('citizenship_en',this.citizenship_en)
          Tenant.append('paymentTime',this.paymentTime)
          Tenant.append('cycle',this.cycle)
          Tenant.append('rentalFee',this.rentalFee)
          Tenant.append('contractStart',this.contractStart)
          Tenant.append('contractEnd',this.contractEnd)
          Tenant.append('contractPeriod',this.contractPeriod)
          Tenant.append('deposit',this.deposit)
          Tenant.append('clerk',this.clerk)
          Tenant.append('room',this.$route.params.roomId)
          axios({
            method:'post',
            url:Config._ipAddress+'/tenants/create',
            data:Tenant,
            headers:{'Content-Type':'multipart/form-data'}
          })
            .then((res)=>{
              this.onRegister(res.data.payload._id)
              this.onAddPerformance(this.clerk)
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        onAddPerformance(clerk){
          axios({
            method:'get',
            url:Config._ipAddress+'/clerks/'+clerk
          })
            .then((res)=>{
              var newPerformance=res.data.performance+1
              const data={
                performance:newPerformance
              }
              axios({
                method:'patch',
                url:Config._ipAddress+'/clerks/performance/'+clerk,
                data:data
              })
                .then((res)=>{

                })
                .catch((err)=>{
                  console.log(err)
                })

            })
            .catch((err)=>{
              console.log(err)
            })
        },
        onRegister(tenant){
          axios({
            method:'get',
            url:Config._ipAddress+'/rooms/'+this.$route.params.roomId
          })
            .then((res)=>{
              const tenants = res.data.tenants
              tenants.push(tenant)
              var data=null
              const capacity = res.data.capacity
              if(capacity===tenants.length){
                data={
                  tenants:tenants,
                  roomState:2
                }
              }else{
                data={
                  tenants:tenants
                }
              }
              axios({
                method:'patch',
                url:Config._ipAddress+'/rooms/'+this.$route.params.roomId,
                data:data
              }).then((res)=>{
                this.load_room()
              }).catch((err)=>{
                console.log(err)
              })
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        onCheckOut(id){
          axios({
            method:'post',
            url:Config._ipAddress+'/rooms/checkOut/'+this.$route.params.roomId,
            data:{tenant:id}
          })
            .then(res=>{
              axios({
                method:'patch',
                url:Config._ipAddress+'/tenants/'+id,
                data:{history:true}
              })
                .then(ress=>{
                  axios({
                    method:'delete',
                    url:Config._ipAddress+'/expirings/'+id
                  })
                    .then(reee=>{
                      this.load_room()

                      let msg = '退房成功！'
                      if(this.language==='en'){
                        msg='Successfully!'
                      }
                      this.$message({
                        type: 'success',
                        message: msg
                      });
                    })
                })
                .catch((err)=>{
                  console.log(err)
                  let msg = '退房失败！'
                  if(this.language==='en'){
                    msg='failure!'
                  }
                  this.$message({
                    type: 'error',
                    message: msg
                  });
                })
            })
            .catch((err)=>{
              console.log(err)
            })
        }
      }
    }
</script>

<style scoped>
.tenant-contract{
  background-color: #e0e0e0;
  padding: 20px;
}

.wrap {
  text-align: center;
  vertical-align: middle;
}

.spinner {
  width: 100px;
  height: 100px;
  background: #eee;
  border-radius: 50%;
  position: relative;
  margin: 50px;
  display: inline-block;
}
.spinner:after, .spinner:before {
  content: "";
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.spinner-1:after {
  position: absolute;
  top: -4px;
  left: -4px;
  border: 4px solid transparent;
  border-top-color: orangered;
  border-bottom-color: orangered;
  -webkit-animation: spinny 1s linear infinite;
  animation: spinny 1s linear infinite;
}

@-webkit-keyframes spinny {
  0% {
    -webkit-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
  }
  50% {
    -webkit-transform: rotate(45deg) scale(1.2);
    transform: rotate(45deg) scale(1.2);
  }
  100% {
    -webkit-transform: rotate(360deg) scale(1);
    transform: rotate(360deg) scale(1);
  }
}

@keyframes spinny {
  0% {
    -webkit-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
  }
  50% {
    -webkit-transform: rotate(45deg) scale(1.2);
    transform: rotate(45deg) scale(1.2);
  }
  100% {
    -webkit-transform: rotate(360deg) scale(1);
    transform: rotate(360deg) scale(1);
  }
}
.track {
  width: 300px;
  height: 0px;
  position: relative;
  display: inline-block;
  border-top: 8px dotted #eee;
}
.track:before {
  content: "";
  position: absolute;
  width: 300px;
  height: 0;
  border-top: 8px solid white;
  top: -8px;
  left: 0;
  -webkit-animation: eatPoints 3s linear infinite;
  animation: eatPoints 3s linear infinite;
}

@-webkit-keyframes eatPoints {
  0% {
    left: 0;
    right: auto;
    width: 0;
  }
  49% {
    left: 0;
    right: auto;
    width: 300px;
  }
  50% {
    left: auto;
    right: 0;
    width: 0;
  }
  100% {
    left: auto;
    right: 0;
    width: 300px;
  }
}

@keyframes eatPoints {
  0% {
    left: 0;
    right: auto;
    width: 0;
  }
  49% {
    left: 0;
    right: auto;
    width: 300px;
  }
  50% {
    left: auto;
    right: 0;
    width: 0;
  }
  100% {
    left: auto;
    right: 0;
    width: 300px;
  }
}
.kurt {
  -webkit-animation: moveChomp 3s linear infinite;
  animation: moveChomp 3s linear infinite;
  background: pink;
  width: 0px;
  height: 0px;
  position: relative;
  top: -15px;
}
.kurt:before {
  content: "";
  position: absolute;
  top: -12px;
  left: 30px;
  width: 7px;
  height: 7px;
  border-radius: 7px;
  background: white;
  z-index: 5;
}

.loader {
  background: none;
  display: inline-block;
  position: relative;
}
.loader:before, .loader:after {
  content: "";
  display: block;
  height: 0px;
  width: 0px;
  border: 30px solid orangered;
  border-radius: 50%;
  border-right-color: transparent;
  border-bottom-color: transparent;
  position: absolute;
  top: 50%;
  margin-top: -34px;
  animation: topchomp 0.4s ease-in-out infinite reverse;
}
.loader:after {
  border-color: orangered;
  border-top-color: transparent;
  border-right-color: transparent;
  -webkit-animation: bottomchomp 0.4s ease-in-out infinite;
  animation: bottomchomp 0.4s ease-in-out infinite;
}

@-webkit-keyframes bottomchomp {
  0%, 100% {
    -webkit-transform: rotate(10deg);
    transform: rotate(10deg);
  }
  50% {
    -webkit-transform: rotate(-50deg);
    transform: rotate(-50deg);
  }
}

@keyframes bottomchomp {
  0%, 100% {
    -webkit-transform: rotate(10deg);
    transform: rotate(10deg);
  }
  50% {
    -webkit-transform: rotate(-50deg);
    transform: rotate(-50deg);
  }
}
@-webkit-keyframes topchomp {
  0%, 100% {
    -webkit-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
  50% {
    -webkit-transform: rotate(37deg);
    transform: rotate(37deg);
  }
}
@keyframes topchomp {
  0%, 100% {
    -webkit-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
  50% {
    -webkit-transform: rotate(37deg);
    transform: rotate(37deg);
  }
}
@-webkit-keyframes moveChomp {
  0%, 100% {
    left: 0%;
  }
  50% {
    left: 100%;
  }
  0%, 49% {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  50%, 100% {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
}
@keyframes moveChomp {
  0%, 100% {
    left: 0%;
  }
  50% {
    left: 100%;
  }
  0%, 49% {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  50%, 100% {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
}
</style>
