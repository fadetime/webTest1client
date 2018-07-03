<template>
    <div>
      <div v-if="!loading_flag">
        <div class="loading" style="margin-top: 200px">
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
      <div class="edithouse" v-show="loading_flag">
        <navbar></navbar>
        <section class="section section-edithouse">
          <div style="width: 120px;height: 120px;position: fixed;padding-top: 50px;bottom: 50%" class="oneBtn red white-text center darken-3" @click="callOneBtn" v-if="oneBtnFlag">
            <span v-if="this.language==='ch'">一键交租</span>
            <span v-if="this.language==='en'">Payment</span>
          </div>
          <div class="container" v-if="this.language==='ch'">
            <div class="row">
              <div class="col s12 m5">
                <div class="card-panel">
                  <div class="red white-text center" style="padding: 10px; width: 100%;">合约信息</div>
                  <p>
                    <span>底价：</span>
                    <input type="number" v-model="basePrice" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>押金：</span>
                    <input type="number" v-model="deposit" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>房东：</span>
                    <span>{{landlord}}</span>
                  </p>
                  <p>
                    <span>合约起始日期：</span>
                    <input type="text" placeholder="点击选择日期" id="contractStart" class="center datepicker">
                  </p>
                  <p>
                    <span>合约期(单位:月)：</span>
                    <input type="number" v-model="contractPeriod" class="browser-default" style="width: 30%">
                  </p>
                  <p>
                    <span>合约到期日期：</span>
                    <input type="text" placeholder="点击选择日期" id="contractEnd" class="center datepicker">
                  </p>
                  <p>
                    <span>上次交租时间：</span>
                    <input type="text" placeholder="点击选择日期" id="paymentTime" class="center datepicker">
                  </p>
                  <div class="blue white-text center" style="padding: 10px; width: 100%;">房屋信息</div>
                  <p>
                    <span>房屋价格：</span>
                    <input type="text" v-model="price" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>中文名字：</span>
                    <input type="text" v-model="name_ch" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>英文名字：</span>
                    <input type="text" v-model="name_en" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>中文地址：</span>
                    <input type="text" v-model="address_ch" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>英文地址：</span>
                    <input type="text" v-model="address_en" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>总人数：</span>
                    <input type="number" v-model="totalPeople" class="browser-default" style="width: 100%">
                  </p>
                  <div>
                    <span>房屋类型：</span>
                    <div style="display: inline-block">
                      <input name="group_ch" type="radio" id="test_tp_1" value="0" v-model="type"/>
                      <label for="test_tp_1">公寓</label>
                    </div>
                    <div style="display: inline-block">
                      <input name="group_ch" type="radio" id="test_tp_2" value="1" v-model="type"/>
                      <label for="test_tp_2">组屋</label>
                    </div>
                    <div style="display: inline-block">
                      <input name="group_ch" type="radio" id="test_tp_3" value="2" v-model="type"/>
                      <label for="test_tp_3">洋房</label>
                    </div>
                  </div>
                  <p>
                    <span>配套设施(中文描述)：</span>
                    <input type="text" v-model="facilities_ch" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>配套设施(英文描述)：</span>
                    <input type="text" v-model="facilities_en" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>邮编号码：</span>
                    <input type="number" v-model="postCode" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>区域(中文)：</span>
                    <input type="text" v-model="area_ch" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>区域(英文)：</span>
                    <input type="text" v-model="area_en" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>WIFI名：</span>
                    <input type="text" v-model="wifiName" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>房屋状态(房东)：</span>
                    <select class="browser-default" v-model="state_landlord">
                      <option value="" disabled selected>请选择...</option>
                      <option value="0">可用</option>
                      <option value="1">一个月后到期</option>
                      <option value="2">已到期</option>
                    </select>
                  </p>
                  <p>
                    <span>房屋状态(租客)：</span>
                    <select class="browser-default" v-model="state_tenant">
                      <option value="" disabled selected>请选择...</option>
                      <option value="0">马上入住</option>
                      <option value="1">有空房出租</option>
                      <option value="2">一个月后马上入住</option>
                      <option value="3">至少一个月后有空房出租</option>
                      <option value="4">住满</option>
                    </select>
                  </p>


                  <div class="row">
                    <div class="col s2">
                      <a class="btn-floating red waves-light waves-effect modal-trigger" data-target="modal1"><i class="material-icons">delete</i></a>
                      <!-- Modal Structure -->
                      <div id="modal1" class="modal">
                        <div class="modal-content">
                          <p class="orange white-text" style="height: 60px; padding: 15px;font-size: 22px;">你确定删除房屋 ( {{name_ch}} ) ？</p>
                        </div>
                        <div class="modal-footer">
                          <a class="modal-action modal-close waves-effect waves-green btn green" @click="onDeleteHouse">确定</a>
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
              <div class="col s12 m7">
                <div class="divider"></div>
                <div class="section">
                  <div class="white-text center" style="padding: 10px; width: 100%; background:linear-gradient(-45deg,#311b92,#536dfe,#304ffe);">房屋图片</div>
                </div>
                <div class="row">
                  <div class="col s12 m4" v-for="(image,index) in this.images">
                    <div class="card">
                      <div class="card-image">
                        <img :src="image | imgUrlHeader" alt="" class="responsive-img materialboxed"><a class="btn-floating halfway-fab waves-effect waves-light red" @click="onDeleteImage(image)"><i class="material-icons">close</i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row center">
                  <div class="file-field input-field">
                    <div class="btn indigo">
                      <span>添加图片</span>
                      <input id="imagesInput" type="file" multiple @change="getimg($event)">
                    </div>
                    <div class="file-path-wrapper">
                      <input id="imagesInputPath" class="file-path validate" type="text" placeholder="Upload one or more files">
                    </div>
                  </div>
                  <div class="btn indigo waves-light waves-effect" @click="onAddImages">
                    <span>确认上传</span>
                  </div>
                </div>
                <div class="divider" style="margin-bottom: 10px;"></div>
                <div class="section">
                  <div class="white-text center" style="padding: 10px; width: 100%; background:linear-gradient(-45deg,#311b92,#536dfe,#304ffe);">房间管理</div>
                </div>
                <div class="row">
                  <div class="col s12">
                    <div class="btn indigo white-text waves-light waves-effect modal-trigger" style="border-radius: 16px" data-target="modal2">新增房间</div>
                    <!--新增房间窗口开始-->
                    <!-- Modal Structure-create -->
                    <div id="modal2" class="modal">
                      <div class="modal-content">
                        <h5>新增房间</h5>
                        <div class="row">
                          <div class="col s12 m6 offset-m3">
                            <div class="blue white-text center" style="padding: 10px; width: 100%;">房屋信息</div>
                            <p>
                              <span>底价(每人)：</span>
                              <input type="number" v-model="room_basePrice" class="browser-default" style="width: 100%">
                            </p>
                            <p>
                              <span>可住人数：</span>
                              <input type="number" v-model="capacity" class="browser-default" style="width: 100%">
                            </p>
                            <div>
                              <span>房间类型：</span>
                              <div style="display: inline-block">
                                <input name="room_ch" type="radio" id="room1" value="0" v-model="roomType"/>
                                <label for="room1">主人房</label>
                              </div>
                              <div style="display: inline-block">
                                <input name="room_ch" type="radio" id="room2" value="1" v-model="roomType"/>
                                <label for="room2">大普通房</label>
                              </div>
                              <div style="display: inline-block">
                                <input name="room_ch" type="radio" id="room3" value="2" v-model="roomType"/>
                                <label for="room3">小普通房</label>
                              </div>
                              <div style="display: inline-block">
                                <input name="room_ch" type="radio" id="room4" value="3" v-model="roomType"/>
                                <label for="room4">普通房</label>
                              </div>
                              <div style="display: inline-block">
                                <input name="room_ch" type="radio" id="room5" value="4" v-model="roomType"/>
                                <label for="room5">佣人房</label>
                              </div>
                              <div style="display: inline-block">
                                <input name="room_ch" type="radio" id="room6" value="5" v-model="roomType"/>
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


                            <div class="file-field input-field">
                              <div class="btn indigo">
                                <span>上传图片</span>
                                <input type="file" multiple @change="getRoomImages($event)">
                              </div>
                              <div class="file-path-wrapper">
                                <input class="file-path validate" type="text" placeholder="Upload one or more files">
                              </div>
                            </div>


                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <div class="modal-action modal-close waves-effect waves-green btn green" @click="onCreateRoom">确认</div>
                        <div class="modal-action modal-close waves-effect waves-green btn grey">取消</div>
                      </div>
                    </div>
                    <!--新增房间窗口结束-->
                  </div>
                </div>
                <table class="bordered highlight centered">
                  <thead>
                  <tr>
                    <th>房间类型</th>
                    <th>房间容量</th>
                    <th>价格(每人)</th>
                    <th>当前状态 <a @click="onCheckDateRooms" class="btn-floating indigo waves-light waves-effect"><i class="material-icons">refresh</i></a></th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(room,index) in rooms">
                    <td>{{room.roomType_ch}}</td>
                    <td>{{room.capacity}}</td>
                    <td>{{room.basePrice}}</td>
                    <td>
                      <span v-if="room.roomState===0 && DaysLeft[index]" class="green-text">未住满(当前：{{room.tenants.length}}人，剩余：{{DaysLeft[index]}}天)</span>
                      <span v-if="room.roomState===0 && !DaysLeft[index]" class="green-text">未住满(当前：{{room.tenants.length}}人)</span>
                      <span v-if="room.roomState===1 && DaysLeft[index]" class="red-text">至少一个月后可出租(剩余:{{DaysLeft[index]}}天)</span>
                      <span v-if="room.roomState===1 && !DaysLeft[index]" class="red-text">至少一个月后可出租</span>
                      <span v-if="room.roomState===2" class="grey-text">住满</span>
                    </td>
                    <td><a
                      class="btn-floating waves-effect waves-light blue"
                      @click="onEditRoom(room._id)"
                    >
                      <i class="material-icons">edit</i>
                    </a></td>
                  </tr>
                  </tbody>
                </table>
                <div class="divider" style="margin:20px 0 10px 0;"></div>
                <div class="section" v-if="!tenant && state_tenant===0">
                  <div class="white-text center blue waves-effect waves-light modal-trigger z-depth-5" data-target="modal3" style="padding: 10px; width: 100%;cursor: pointer;border-radius: 20px;">办理整套出租</div>
                  <!--整套出租modal-->
                  <div id="modal3" class="modal">
                    <div class="modal-content">
                      <h5>新增住户</h5>
                      <div class="row">
                        <div class="col s12 m6">
                          <div class="red white-text center" style="padding: 10px; width: 100%;">合约信息</div>
                          <p>
                            <span>租金：</span>
                            <input type="number" v-model="allRoom_rentalFee" class="browser-default" style="width: 100%">
                          </p>
                          <p>
                            <span>押金：</span>
                            <input type="number" v-model="allRoom_deposit" class="browser-default" style="width: 100%">
                          </p>
                          <p>
                            <span>合约起始日期：</span>
                            <input type="text" placeholder="点击选择日期" id="allRoom_contractStart" class="center datepicker">
                          </p>
                          <p>
                            <span>合约期(单位:月)：</span>
                            <input type="number" v-model="allRoom_contractPeriod" class="browser-default" style="width: 50%">
                          </p>
                          <p>
                            <span>合约到期日期：</span>
                            <input type="text" placeholder="点击选择日期" id="allRoom_contractEnd" class="center datepicker">
                          </p>
                          <p>
                            <span>交付租金时间：</span>
                            <input type="text" placeholder="点击选择日期" id="allRoom_paymentTime" class="center datepicker">
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
                            <input type="text" v-model="allRoom_name_ch" class="browser-default" style="width: 100%">
                          </p>
                          <p>
                            <span>英文名字：</span>
                            <input type="text" v-model="allRoom_name_en" class="browser-default" style="width: 100%">
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
                            <input type="number" v-model="allRoom_tel" class="browser-default" style="width: 100%">
                          </p>
                          <p>
                            <span>国籍(中文描述)：</span>
                            <input type="text" v-model="allRoom_citizenship_ch" class="browser-default" style="width: 100%">
                          </p>
                          <p>
                            <span>国籍(英文描述)：</span>
                            <input type="text" v-model="allRoom_citizenship_en" class="browser-default" style="width: 100%">
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
                  <!--整套出租End-->
                </div>
                <div class="row" v-if="tenant">
                  <div class="section tenant-contract">
                    <div class="row">
                      <div class="col s12">
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
                      <div class="col s12">
                        <div class="row">
                          <div class="red white-text center" style="padding: 10px; width: 100%;">合约信息</div>
                          <p>租金：{{tenant.rentalFee}}</p>
                          <p>押金：{{tenant.deposit}}</p>
                          <p>上次交租时间：{{tenant.paymentTime | date}}</p>
                          <p>合约期：{{tenant.contractPeriod}}</p>
                          <p>合约起始日期：{{tenant.contractStart | date}}</p>
                          <p>合约结束日期：{{tenant.contractEnd | date}}</p>
                          <p>当前业务员：{{tenant.clerk.name_ch}}</p>
                        </div>
                        <div class="row">
                          <div class="col s12 m6 offset-m6">
                            <div class="btn waves-light waves-effect indigo" @click="onEditTenant(tenant._id)">编辑</div>
                            <a class="btn red waves-light waves-effect modal-trigger" @click="onCheckOut">
                              退房
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container" v-if="this.language==='en'">
            <div class="row">
              <div class="col s12 m5">
                <div class="card-panel">
                  <div class="red white-text center" style="padding: 10px; width: 100%;">Contract Information</div>
                  <p>
                    <span>Base Price：</span>
                    <input type="number" v-model="basePrice" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>Deposit：</span>
                    <input type="number" v-model="deposit" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>Landlord：</span>
                    <span>{{landlord}}</span>
                  </p>
                  <p>
                    <span>Contract Start Date：</span>
                    <input type="text" placeholder="click to input date" id="contractStart" class="center datepicker">
                  </p>
                  <p>
                    <span>Contract Period(months)：</span>
                    <input type="number" v-model="contractPeriod" class="browser-default" style="width: 30%">
                  </p>
                  <p>
                    <span>Contract End Date：</span>
                    <input type="text" placeholder="click to input date" id="contractEnd" class="center datepicker">
                  </p>
                  <p>
                    <span>Last Payment Time：</span>
                    <input type="text" placeholder="click to input date" id="paymentTime" class="center datepicker">
                  </p>
                  <div class="blue white-text center" style="padding: 10px; width: 100%;">House Information</div>
                  <p>
                    <span>Price：</span>
                    <input type="text" v-model="price" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>Chinese Name：</span>
                    <input type="text" v-model="name_ch" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>English Name：</span>
                    <input type="text" v-model="name_en" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>Address(Chinese)：</span>
                    <input type="text" v-model="address_ch" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>Address(English)：</span>
                    <input type="text" v-model="address_en" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>Total People：</span>
                    <input type="number" v-model="totalPeople" class="browser-default" style="width: 100%">
                  </p>
                  <div>
                    <span>Type of house：</span>
                    <div style="display: inline-block">
                      <input name="group_en" type="radio" id="test_tp_4" value="0" v-model="type"/>
                      <label for="test_tp_4">Apartment</label>
                    </div>
                    <div style="display: inline-block">
                      <input name="group_en" type="radio" id="test_tp_5" value="1" v-model="type"/>
                      <label for="test_tp_5">Group</label>
                    </div>
                    <div style="display: inline-block">
                      <input name="group_en" type="radio" id="test_tp_6" value="2" v-model="type"/>
                      <label for="test_tp_6">Bungalow</label>
                    </div>
                  </div>
                  <p>
                    <span>Facilities (Chinese)：</span>
                    <input type="text" v-model="facilities_ch" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>Facilities (English)：</span>
                    <input type="text" v-model="facilities_en" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>Post Code：</span>
                    <input type="number" v-model="postCode" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>Area(Chinese)：</span>
                    <input type="text" v-model="area_ch" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>Area(English)：</span>
                    <input type="text" v-model="area_en" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>WIFI Name：</span>
                    <input type="text" v-model="wifiName" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>House State (Landlord)：</span>
                    <select class="browser-default" v-model="state_landlord">
                      <option value="" disabled selected>please select...</option>
                      <option value="0">Available</option>
                      <option value="1">Expires in one month</option>
                      <option value="2">Unavailable</option>
                    </select>
                  </p>
                  <p>
                    <span>House State (Tenant)：</span>
                    <select class="browser-default" v-model="state_tenant">
                      <option value="" disabled selected>please select...</option>
                      <option value="0">Vancy</option>
                      <option value="1">One or More Rooms Available</option>
                      <option value="2">Vancy in the next month</option>
                      <option value="3">At least one month room available</option>
                      <option value="4">Full</option>
                    </select>
                  </p>


                  <div class="row">
                    <div class="col s2">
                      <a class="btn-floating red waves-light waves-effect modal-trigger" data-target="modal4"><i class="material-icons">delete</i></a>
                      <!-- Modal Structure -->
                      <div id="modal4" class="modal">
                        <div class="modal-content">
                          <p class="orange white-text" style="height: 60px; padding: 15px;font-size: 22px;">Are you sure removing ( {{name_en}} ) ？</p>
                        </div>
                        <div class="modal-footer">
                          <a class="modal-action modal-close waves-effect waves-green btn green" @click="onDeleteHouse">Confirm</a>
                          <a class="modal-action modal-close waves-effect waves-green btn grey">Cancel</a>
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
              <div class="col s12 m7">
                <div class="divider"></div>
                <div class="section">
                  <div class="white-text center" style="padding: 10px; width: 100%; background:linear-gradient(-45deg,#311b92,#536dfe,#304ffe);">House Photos</div>
                </div>
                <div class="row">
                  <div class="col s12 m4" v-for="(image,index) in this.images">
                    <div class="card">
                      <div class="card-image">
                        <img :src="image | imgUrlHeader" alt="" class="responsive-img materialboxed"><a class="btn-floating halfway-fab waves-effect waves-light red" @click="onDeleteImage(image)"><i class="material-icons">close</i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row center">
                  <div class="file-field input-field">
                    <div class="btn indigo">
                      <span>Adding Photos</span>
                      <input id="imagesInput" type="file" multiple @change="getimg($event)">
                    </div>
                    <div class="file-path-wrapper">
                      <input id="imagesInputPath" class="file-path validate" type="text" placeholder="Upload one or more files">
                    </div>
                  </div>
                  <div class="btn indigo waves-light waves-effect" @click="onAddImages">
                    <span>Click here for uploading</span>
                  </div>
                </div>
                <div class="divider" style="margin-bottom: 10px;"></div>
                <div class="section">
                  <div class="white-text center" style="padding: 10px; width: 100%; background:linear-gradient(-45deg,#311b92,#536dfe,#304ffe);">Room Management</div>
                </div>
                <div class="row">
                  <div class="col s12">
                    <div class="btn indigo white-text waves-light waves-effect modal-trigger" style="border-radius: 16px" data-target="modal5">Create Room</div>
                    <!--新增房间窗口开始-->
                    <!-- Modal Structure-create -->
                    <div id="modal5" class="modal">
                      <div class="modal-content">
                        <h5>Create Room</h5>
                        <div class="row">
                          <div class="col s12 m6 offset-m3">
                            <div class="blue white-text center" style="padding: 10px; width: 100%;">Room Information</div>
                            <p>
                              <span>Base Price (/person)：</span>
                              <input type="number" v-model="room_basePrice" class="browser-default" style="width: 100%">
                            </p>
                            <p>
                              <span>Capacity：</span>
                              <input type="number" v-model="capacity" class="browser-default" style="width: 100%">
                            </p>
                            <div>
                              <span>Type of Room：</span>
                              <div style="display: inline-block">
                                <input name="room_en" type="radio" id="room7" value="0" v-model="roomType"/>
                                <label for="room7">Master Room</label>
                              </div>
                              <div style="display: inline-block">
                                <input name="room_en" type="radio" id="room8" value="1" v-model="roomType"/>
                                <label for="room8">Big Standard Room</label>
                              </div>
                              <div style="display: inline-block">
                                <input name="room_en" type="radio" id="room9" value="2" v-model="roomType"/>
                                <label for="room9">Small Standard Room</label>
                              </div>
                              <div style="display: inline-block">
                                <input name="room_en" type="radio" id="room10" value="3" v-model="roomType"/>
                                <label for="room10">Standard Room</label>
                              </div>
                              <div style="display: inline-block">
                                <input name="room_en" type="radio" id="room11" value="4" v-model="roomType"/>
                                <label for="room11">Maid Room</label>
                              </div>
                              <div style="display: inline-block">
                                <input name="room_en" type="radio" id="room12" value="5" v-model="roomType"/>
                                <label for="room12">Compartment</label>
                              </div>
                            </div>
                            <p>
                              <span>Room State：</span>
                              <select class="browser-default" v-model="roomState">
                                <option value="" disabled selected>Please select...</option>
                                <option value="0">Vancy</option>
                                <option value="1">Expires in one month</option>
                                <option value="2">Full</option>
                              </select>
                            </p>


                            <div class="file-field input-field">
                              <div class="btn indigo">
                                <span>Uploading Images</span>
                                <input type="file" multiple @change="getRoomImages($event)">
                              </div>
                              <div class="file-path-wrapper">
                                <input class="file-path validate" type="text" placeholder="Upload one or more files">
                              </div>
                            </div>


                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <div class="modal-action modal-close waves-effect waves-green btn green" @click="onCreateRoom">Confirm</div>
                        <div class="modal-action modal-close waves-effect waves-green btn grey">cancel</div>
                      </div>
                    </div>
                    <!--新增房间窗口结束-->
                  </div>
                </div>
                <table class="bordered highlight centered">
                  <thead>
                  <tr>
                    <th>Room Type</th>
                    <th>Capacity</th>
                    <th>Price(/person)</th>
                    <th>State <a @click="onCheckDateRooms" class="btn-floating indigo waves-light waves-effect"><i class="material-icons">refresh</i></a>
                    </th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(room,index) in rooms">
                    <td>{{room.roomType_en}}</td>
                    <td>{{room.capacity}}</td>
                    <td>{{room.basePrice}}</td>
                    <td>
                      <span v-if="room.roomState===0 && DaysLeft[index]" class="green-text">Available({{room.tenants.length}} People here，{{DaysLeft[index]}} days left)</span>
                      <span v-if="room.roomState===0 && !DaysLeft[index]" class="green-text">Available({{room.tenants.length}} People here)</span>
                      <span v-if="room.roomState===1 && DaysLeft[index]" class="red-text">Available in the next month({{DaysLeft[index]}} days left)</span>
                      <span v-if="room.roomState===1 && !DaysLeft[index]" class="red-text">Available in the next month</span>
                      <span v-if="room.roomState===2" class="grey-text">Unavailable</span>
                    </td>
                    <td><a
                      class="btn-floating waves-effect waves-light blue"
                      @click="onEditRoom(room._id)"
                    >
                      <i class="material-icons">edit</i>
                    </a></td>
                  </tr>
                  </tbody>
                </table>
                <div class="divider" style="margin:20px 0 10px 0;"></div>
                <div class="section" v-if="!tenant && state_tenant===0">
                  <div class="white-text center blue waves-effect waves-light modal-trigger z-depth-5" data-target="modal6" style="padding: 10px; width: 100%;cursor: pointer;border-radius: 20px;">Check-in for the entire house</div>
                  <!--整套出租modal-->
                  <div id="modal6" class="modal">
                    <div class="modal-content">
                      <h5>Create Tenant</h5>
                      <div class="row">
                        <div class="col s12 m6">
                          <div class="red white-text center" style="padding: 10px; width: 100%;">Contract Information</div>
                          <p>
                            <span>Rental Fee：</span>
                            <input type="number" v-model="allRoom_rentalFee" class="browser-default" style="width: 100%">
                          </p>
                          <p>
                            <span>Deposit：</span>
                            <input type="number" v-model="allRoom_deposit" class="browser-default" style="width: 100%">
                          </p>
                          <p>
                            <span>Contract Start Date：</span>
                            <input type="text" placeholder="click to input a date" id="allRoom_contractStart" class="center datepicker">
                          </p>
                          <p>
                            <span>Contract Period (month)：</span>
                            <input type="number" v-model="allRoom_contractPeriod" class="browser-default" style="width: 50%">
                          </p>
                          <p>
                            <span>Contract End Date：</span>
                            <input type="text" placeholder="click to input a date" id="allRoom_contractEnd" class="center datepicker">
                          </p>
                          <p>
                            <span>Payment Time：</span>
                            <input type="text" placeholder="click to input a date" id="allRoom_paymentTime" class="center datepicker">
                          </p>
                          <p>Payment Cycle ( month )：<input type="number" class="browser-default" v-model="cycle"></p>
                          <p>
                            <span>Binding Clerk：</span>
                            <select class="browser-default" v-model="clerk">
                              <option value="" disabled selected>please select...</option>
                              <option v-for="(clerk,index) in this.clerks" :value="clerk._id">{{clerk.name_en}}</option>
                            </select>
                          </p>
                        </div>
                        <div class="col s12 m6">
                          <div class="blue white-text center" style="padding: 10px; width: 100%;">Tenant Information</div>
                          <p>
                            <span>Chinese Name：</span>
                            <input type="text" v-model="allRoom_name_ch" class="browser-default" style="width: 100%">
                          </p>
                          <p>
                            <span>English Name：</span>
                            <input type="text" v-model="allRoom_name_en" class="browser-default" style="width: 100%">
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
                            <input type="number" v-model="allRoom_tel" class="browser-default" style="width: 100%">
                          </p>
                          <p>
                            <span>Citizenship (Chinese)：</span>
                            <input type="text" v-model="allRoom_citizenship_ch" class="browser-default" style="width: 100%">
                          </p>
                          <p>
                            <span>Citizenship (English)：</span>
                            <input type="text" v-model="allRoom_citizenship_en" class="browser-default" style="width: 100%">
                          </p>
                          <div class="file-field input-field">
                            <div class="btn indigo">
                              <span>Uploading one photo</span>
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
                      <div class="modal-action modal-close waves-effect waves-green btn green" @click="onCreateTenant">confirm</div>
                      <div class="modal-action modal-close waves-effect waves-green btn grey">cancel</div>
                    </div>
                  </div>
                  <!--整套出租End-->
                </div>
                <div class="row" v-if="tenant">
                  <div class="section tenant-contract">
                    <div class="row">
                      <div class="col s12">
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
                      <div class="col s12">
                        <div class="row">
                          <div class="red white-text center" style="padding: 10px; width: 100%;">Contract Information</div>
                          <p>Rental Fee：{{tenant.rentalFee}}</p>
                          <p>Deposit：{{tenant.deposit}}</p>
                          <p>Last Payment Time：{{tenant.paymentTime | date}}</p>
                          <p>Contract Period：{{tenant.contractPeriod}}</p>
                          <p>Contract Start Date：{{tenant.contractStart | date}}</p>
                          <p>Contract End Date：{{tenant.contractEnd | date}}</p>
                          <p>Binding Clerk：{{tenant.clerk.name_en}}</p>
                        </div>
                        <div class="row">
                          <div class="col s12 m8 offset-m4">
                            <a class="btn waves-light waves-effect indigo" @click="onEditTenant(tenant._id)">Edit</a>
                            <a class="btn red waves-light waves-effect modal-trigger" @click="onCheckOut">
                              Check-out
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
        name: "edithouse",
      components:{
        navbar
      },
      data(){
        return {
          loading_flag:false,
          DaysLeft:[],
          deposit:'',
          contractPeriod:'',
          contractStart:'',
          contractEnd:'',
          paymentTime:'',
          cycle:'',
          price:'',
          name_ch:'',
          name_en:'',
          address_ch:'',
          address_en:'',
          totalPeople:'',
          rooms:'',
          tenant:'',
          type:'',
          houseType_ch:'',
          houseType_en:'',
          facilities_ch:'',
          facilities_en:'',
          postCode:'',
          area_ch:'',
          area_en:'',
          wifiName:'',
          basePrice:'',
          landlord:'',
          landlordId:'',
          state_landlord:'',
          state_tenant:0,
          images:[],
          addImages:[],
          room_basePrice:'',
          roomType:'',
          roomType_ch:'',
          roomType_en:'',
          room_images:[],
          roomState:'',
          capacity:'',
          image:[],
          clerk:'',
          allRoom_name_ch:'',
          allRoom_name_en:'',
          gender:'',
          allRoom_gender_ch:'',
          allRoom_gender_en:'',
          allRoom_tel:'',
          allRoom_citizenship_ch:'',
          allRoom_citizenship_en:'',
          allRoom_paymentTime:'',
          allRoom_rentalFee:'',
          allRoom_contractStart:'',
          allRoom_contractEnd:'',
          allRoom_contractPeriod:'',
          allRoom_deposit:'',
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
        },
        allRoom_contractPeriod(){
          if(document.getElementById('allRoom_contractStart').value&&this.allRoom_contractPeriod){
            let start = document.getElementById('allRoom_contractStart').value
            let startYear = new Date(start).getFullYear()
            let startMonth = new Date(start).getMonth()+1
            let startDay = new Date(start).getDate()
            let totalMonth = parseInt(startMonth)+parseInt(this.allRoom_contractPeriod)
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
            document.getElementById('allRoom_contractEnd').value=end
          }
          if(!this.allRoom_contractPeriod){
            document.getElementById('allRoom_contractEnd').value=''
          }
        }
      },
      computed:{
        language(){
          return this.$store.getters.language
        },
        clerks(){
          return this.$store.getters.load_clerks
        },
        oneBtnFlag(){
          let flag = false
          let dateNow = new Date()
          let nowMonth = dateNow.getMonth()+1
          let datePayment = new Date(this.paymentTime)
          let paymentMonth = datePayment.getMonth()+1
          if(nowMonth > paymentMonth){
            flag=true
          }
          return flag
        }
      },
      created(){
        init.init_all()
        this.load_house()
        this.checkAdmin = timeLocalStorage.get('loginInfo')
        if(this.checkAdmin.role!=='admin'){
          this.$router.push('/')
        }
      },
      updated(){
        $(document).ready(function(){
          $('.materialboxed').materialbox();
        });
      },
      methods: {
        onEditTenant(id){
          this.$router.push('/edittenant/'+id)
        },
        onEditRoom(id){
          this.$router.push('/rooms/'+id)
        },
        getTenantImage(event){
          for(var i=0;i<event.target.files.length;i++){
            this.image[i]=event.target.files[i]
          }
        },
        onCreateTenant(){
          let start=document.getElementById('allRoom_contractStart').value
          let end = document.getElementById('allRoom_contractEnd').value
          let payment = document.getElementById('allRoom_paymentTime').value
          this.allRoom_contractStart=new Date(start).toISOString()
          this.allRoom_contractEnd=new Date(end).toISOString()
          this.allRoom_paymentTime=new Date(payment).toISOString()
          const Tenant = new FormData()
          Tenant.append('name_ch',this.allRoom_name_ch)
          Tenant.append('name_en',this.allRoom_name_en)
          if(this.gender==='0'){
            this.allRoom_gender_ch='男'
            this.allRoom_gender_en='male'
          }else {
            this.allRoom_gender_ch='女'
            this.allRoom_gender_en='female'
          }
          Tenant.append('gender_ch',this.allRoom_gender_ch)
          Tenant.append('gender_en',this.allRoom_gender_en)
          Tenant.append('tel',this.allRoom_tel)
          for(var i=0;i<this.image.length;i++){
            Tenant.append('images',this.image[i])
          }
          Tenant.append('citizenship_ch',this.allRoom_citizenship_ch)
          Tenant.append('citizenship_en',this.allRoom_citizenship_en)
          Tenant.append('paymentTime',this.allRoom_paymentTime)
          Tenant.append('cycle',this.cycle)
          Tenant.append('rentalFee',this.allRoom_rentalFee)
          Tenant.append('contractStart',this.allRoom_contractStart)
          Tenant.append('contractEnd',this.allRoom_contractEnd)
          Tenant.append('contractPeriod',this.allRoom_contractPeriod)
          Tenant.append('deposit',this.allRoom_deposit)
          Tenant.append('clerk',this.clerk)
          Tenant.append('house',this.$route.params.houseId)
          axios({
            method:'post',
            url:Config._ipAddress+'/Tenants/create',
            data:Tenant,
            headers:{'Content-Type':'multipart/form-data'}
          })
            .then((res)=>{
              this.onRegister_tenant(res.data.payload._id)
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
        onRegister_tenant(tenant){
              axios({
                method:'patch',
                url:Config._ipAddress+'/houses/'+this.$route.params.houseId,
                data:{tenant:tenant,state_tenant:4}
              }).then((res)=>{
                this.load_house()
              }).catch((err)=>{
                console.log(err)
              })
        },
        getimg(event){
          for(var i=0;i<event.target.files.length;i++){
            this.addImages[i]=event.target.files[i]
          }
        },
        getRoomImages(event){
          for(var i=0;i<event.target.files.length;i++){
            this.room_images[i]=event.target.files[i]
          }
        },
        onAddImages(){
          if(this.addImages.length===0){
            return
          }
          const data = new FormData()
          for(var i=0;i<this.addImages.length;i++) {
            data.append('images', this.addImages[i])
          }
          axios({
            method:'post',
            url:Config._ipAddress+'/houses/addImages/'+this.$route.params.houseId,
            data:data,
            headers:{'Content-Type':'multipart/form-data'}
          })
            .then((res)=>{
              document.getElementById('imagesInputPath').value=null
              this.load_house()
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
            url:Config._ipAddress+'/houses/deleteImage/'+this.$route.params.houseId,
            data:data
          })
            .then((res)=>{
              this.load_house()
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        load_house() {
          axios({
            method: 'get',
            url: Config._ipAddress+'/houses/' + this.$route.params.houseId
          })
            .then((res) => {
                  setTimeout(()=>{
                    this.loading_flag=true
                  },1000)
              this.price=res.data.price
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
              this.paymentTime=new Date(res.data.paymentTime).toLocaleDateString()
              this.paymentTime=this.paymentTime.split('/')
              if(this.paymentTime[0]<1000){
                this.paymentTime=this.paymentTime[2]+'/'+this.paymentTime[1]+'/'+this.paymentTime[0]
              }else{
                this.paymentTime=this.paymentTime[0]+'/'+this.paymentTime[1]+'/'+this.paymentTime[2]
              }
              document.getElementById('paymentTime').value=this.paymentTime
              this.name_ch=res.data.name_ch
              this.name_en=res.data.name_en
              this.address_ch=res.data.address_ch
              this.address_en=res.data.address_en
              this.totalPeople=res.data.totalPeople
              this.rooms=res.data.rooms
              if(res.data.houseType_ch==='公寓'){
                    this.type='0'
              }
              if(res.data.houseType_ch==='组屋'){
                this.type='1'
              }
              if(res.data.houseType_ch==='洋房'){
                this.type='2'
              }
              this.facilities_ch=res.data.facilities_ch
              this.facilities_en=res.data.facilities_en
              this.postCode=res.data.postCode
              this.area_ch=res.data.area_ch
              this.area_en=res.data.area_en
              this.wifiName=res.data.wifiName
              this.basePrice=res.data.basePrice
              this.landlordId=res.data.landlord._id
              this.tenant=res.data.tenant
              this.$store.dispatch('house_tenant_flag',this.tenant)
              if(this.language==='ch'){
                this.landlord=res.data.landlord.name_ch
              }
              if(this.language==='en'){
                this.landlord=res.data.landlord.name_en
              }
              this.state_landlord=res.data.state_landlord
              this.state_tenant=res.data.state_tenant
              this.images=res.data.images
            })
            .catch((err) => {
              console.log(err)
            })
        },
        onCancel(){
          this.$router.push('/houses')
        },
        onSave(){
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
          if(timeSpan>30) {
            axios({
              method: 'delete',
              url: Config._ipAddress+'/houseExpirings/' + this.$route.params.houseId
            })
              .then(res => {
              })
              .catch((err) => {
                console.log(err)
              })
          }
          if(this.type==='0'){
            this.houseType_ch='公寓'
            this.houseType_en='Apartment'
          }
          if(this.type==='1'){
            this.houseType_ch='组屋'
            this.houseType_en='Group'
          }
          if(this.type==='2'){
            this.houseType_ch='洋房'
            this.houseType_en='Bungalow'
          }

          const House = {
            name_ch:this.name_ch,
            name_en:this.name_en,
            address_ch:this.address_ch,
            address_en:this.address_en,
            totalPeople:this.totalPeople,
            state_landlord:this.state_landlord,
            state_tenant:this.state_tenant,
            houseType_ch:this.houseType_ch,
            houseType_en:this.houseType_en,
            basePrice:this.basePrice,
            price:this.price,
            facilities_ch:this.facilities_ch,
            facilities_en:this.facilities_en,
            postCode:this.postCode,
            area_ch:this.area_ch,
            area_en:this.area_en,
            deposit:this.deposit,
            contractPeriod:this.contractPeriod,
            contractStart:this.contractStart,
            contractEnd:this.contractEnd,
            wifiName:this.wifiName,
            paymentTime:this.paymentTime
          }

          axios({
            method:'patch',
            url:Config._ipAddress+'/houses/'+this.$route.params.houseId,
            data:House
          })
            .then((res)=>{
              this.$router.push('/houses')
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
        onDeleteHouse(){
          if(this.tenant || this.rooms.length!==0){
            console.log(this.tenant)
            console.log(this.rooms)
            return window.alert('无法删除房屋')
          }
          const data = {
            images:this.images,
            landlordId:this.landlordId
          }
          axios({
            method:'delete',
            url:Config._ipAddress+'/houses/'+this.$route.params.houseId,
            data:data
          })
            .then((res)=>{
              axios({
                method:'delete',
                url:Config._ipAddress+'/houseExpirings/'+this.$route.params.houseId
              })
                .then(rrr=>{
                  this.$router.push('/houses')
                  let msg = '删除成功！'
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
              let msg = '删除失败！'
              if(this.language==='en'){
                msg='failure!'
              }
              this.$message({
                type: 'error',
                message: msg
              });
            })
        },
        onCreateRoom(){
          const Room = new FormData()
          Room.append('roomState',this.roomState)
          if(this.roomType==='0'){
            this.roomType_ch='主人房'
            this.roomType_en='Master Room'
          }
          if(this.roomType==='1'){
            this.roomType_ch='大普通房'
            this.roomType_en='Big Standard Room'
          }
          if(this.roomType==='2'){
            this.roomType_ch='小普通房'
            this.roomType_en='Small Standard Room'
          }
          if(this.roomType==='3'){
            this.roomType_ch='普通房'
            this.roomType_en='Standard Room'
          }
          if(this.roomType==='4'){
            this.roomType_ch='佣人房'
            this.roomType_en='Maid Room'
          }
          if(this.roomType==='5'){
            this.roomType_ch='隔间'
            this.roomType_en='Compartment'
          }
          Room.append('roomType_ch',this.roomType_ch)
          Room.append('roomType_en',this.roomType_en)
          Room.append('basePrice',this.room_basePrice)
          Room.append('capacity',this.capacity)
          Room.append('house',this.$route.params.houseId)
          for(var i=0;i<this.room_images.length;i++){
            Room.append('images',this.room_images[i])
          }
          axios({
            method:'post',
            url:Config._ipAddress+'/rooms/create',
            data:Room,
            headers:{'Content-Type':'multipart/form-data'}
          })
            .then((res)=>{
              this.onRegister(res.data.payload._id)
            })
        },
        onRegister(room){
          axios({
            method:'get',
            url:Config._ipAddress+'/houses/'+this.$route.params.houseId
          })
            .then((res)=>{
              const rooms = res.data.rooms
              rooms.push(room)
              axios({
                method:'patch',
                url:Config._ipAddress+'/houses/'+this.$route.params.houseId,
                data:{rooms:rooms}
              }).then((res)=>{
                this.load_house()
                let msg = '创建成功！'
                if(this.language==='en'){
                  msg='Successfully!'
                }
                this.$message({
                  type: 'success',
                  message: msg
                });
              }).catch((err)=>{
                console.log(err)
                let msg = '创建失败！'
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
        },
        onCheckOut(){
          axios({
            method:'patch',
            url:Config._ipAddress+'/houses/'+this.$route.params.houseId,
            data:{tenant:null,state_tenant:0}
          })
            .then(res=>{
              axios({
                method:'patch',
                url:Config._ipAddress+'/tenants/'+this.tenant._id,
                data:{history:true}
              })
                .then(res=>{
                  axios({
                    method:'delete',
                    url:Config._ipAddress+'/expirings/'+this.tenant._id
                  })
                    .then(reee=>{
                      this.load_house()

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
        },
        onCheckDateRooms(){
          axios({
            method:'get',
            url:Config._ipAddress+'/houses/checkDateRooms/'+this.$route.params.houseId
          })
            .then(res=>{
              var timeSpan=new Array()
              for(var i=0;i<res.data.rooms.length;i++){
                timeSpan[i] = new Array()
              }
              for(var i=0;i<res.data.rooms.length;i++){
                for(var j=0;j<res.data.rooms[i].tenants.length;j++){
                  if(res.data.rooms[i].tenants[j].contractEnd){
                    timeSpan[i][j] =( Date.parse(res.data.rooms[i].tenants[j].contractEnd) - Date.now() )/(1000*60*60*24)
                  }
                }
              }
              var minTimeSpan=new Array()
              for(var i=0;i<timeSpan.length;i++){
                minTimeSpan[i]=Math.min.apply(Math,timeSpan[i])
              }
              minTimeSpan=minTimeSpan.map(item=>{if(item===Infinity){return item=null}else{return item=item}})
              for(var i=0;i<minTimeSpan.length;i++){
                if(minTimeSpan[i]===null || minTimeSpan[i]>30){
                  this.DaysLeft[i]=null
                }else{
                  this.DaysLeft[i]=Math.floor(minTimeSpan[i])
                  if(this.rooms[i].roomState!==0){
                    axios({
                      method:'patch',
                      url:Config._ipAddress+'/rooms/'+this.rooms[i]._id,
                      data:{roomState:1}
                    }).then((res)=>{
                      this.load_house()
                    }).catch((err)=>{
                      console.log(err)
                    })
                  }
                }
              }
              console.log(this.DaysLeft)
              this.load_house()
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        callOneBtn(){
          let data = {
            paymentTime:new Date().toISOString()
          }
          axios({
            method:'post',
            url:Config._ipAddress+'/houses/payment/'+this.$route.params.houseId,
            data:data
          })
            .then(res=>{
              console.log(res.data)
              if(res.data.status===0){
                this.$router.go(-1)
                let msg = '交租成功'
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
  .tenant-contract{
    background-color: #e0e0e0;
    padding: 20px;
  }

  .oneBtn{
    transition: 0.5s;
    cursor: pointer;
  }
  .oneBtn:hover{
    opacity: 0.7;
    transition: 0.5s;
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
