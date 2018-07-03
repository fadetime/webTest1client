<template>
  <div class="house">
    <navbar></navbar>
    <section class="section section-house">
      <div v-if="this.language==='ch'">
        <div class="hide-on-small-and-down" style="padding: 100px;background-color:rgba(0,0,0,0.8);">
          <div class="row">
            <div class="col s12 center white-text" style="font-size: 24px;">
              房屋查询
            </div>
          </div>
            <select v-model="condition" class="browser-default left" style="width: 15%;height: 50px;border-bottom-left-radius: 50px;border-top-left-radius: 50px;border:none;outline: none;">
              <option value="" disabled selected>搜索条件</option>
              <option value="1">区域</option>
              <option value="2">邮编</option>
            </select>

            <input v-model="search_houses" type="text" class="browser-default left" style="width: 60%;height: 50px;border:none;outline: none;padding: 0 25px;">
            <div @click="onSearchHouses(true)" class="left center waves-light waves-effect" style="background-color: #ffc107;cursor: pointer; width: 20%; height: 50px;border:none;outline: none;padding:10px;border-radius: 0 25px 25px 0;font-size: 20px;color: white">搜索</div>
        </div>
        <div class="hide-on-med-and-up" style="padding: 50px;background-color:rgba(0,0,0,0.8);">
          <div class="row">
            <div class="col s12 center white-text" style="font-size: 18px;">
              房屋查询
            </div>
          </div>
          <select v-model="condition" class="browser-default" style="width: 100%;height: 50px;border:none;outline: none; margin-bottom: 20px;">
            <option value="" disabled selected>搜索条件</option>
            <option value="1">区域</option>
            <option value="2">邮编</option>
          </select>

          <input v-model="search_houses" type="text" class="browser-default" style="width: 100%;height: 50px;border:none;outline: none;padding: 0 25px;margin-bottom: 20px;">
          <div @click="onSearchHouses(true)" class="center waves-light waves-effect" style="background-color: #ffc107;cursor: pointer; width: 100%; height: 50px;border:none;outline: none;padding:10px;border-radius: 25px 25px 25px 25px;font-size: 20px;color: white">搜索</div>
        </div>
      </div>
      <div class="container" v-if="this.language==='ch'">
        <div class="row">
          <div class="col s12" v-if="this.isAdmin.role==='admin'">
            <div class="btn indigo white-text waves-light waves-effect modal-trigger" style="border-radius: 50px" data-target="modal1">新增房屋</div>
          </div>
        </div>

        <div class="row" v-show="flag">
          <div class="col s12">
            <div class="left" style="padding: 10px 10px 10px 0;font-size: 18px;">价格排序：</div>
              <div class="btn-floating red waves-light waves-effect" @click="onSort(true)"><i class="material-icons">arrow_upward</i></div>
              <div class="btn-floating red waves-light waves-effect" @click="onSort(false)"><i class="material-icons">arrow_downward</i></div>
          </div>
        </div>

        <div class="row">
          <div class="col s12">
            <div class="row">
              <table class="bordered highlight">
                <thead>
                <tr>
                  <th>房屋名字</th>
                  <th>
                    <span v-if="isAdmin.role==='admin'">房屋地址</span>
                    <span v-if="isAdmin.role!=='admin'">区域</span>
                  </th>
                  <th>房屋类型</th>
                  <th>房屋价格</th>
                  <th>状态(房东)</th>
                  <th>状态(租客)</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(house,index) in houses">
                  <td>{{house.name_ch}}</td>
                  <td>
                    <span v-show="isAdmin.role==='admin'">{{house.address_ch}}</span>
                    <span v-show="isAdmin.role!=='admin'">{{house.area_ch}}</span>
                  </td>
                  <td>{{house.houseType_ch}}</td>
                  <td>{{house.price}}</td>
                  <td>
                    <span v-if="house.state_landlord===0" class="green-text">可用</span>
                    <span v-if="house.state_landlord===1" class="red-text">一个月后到期</span>
                    <span v-if="house.state_landlord===2" class="grey-text">已到期</span>
                  </td>
                  <td>
                    <span v-if="house.state_tenant===0" class="green-text">马上入住</span>
                    <span v-if="house.state_tenant===1" class="green-text">有空房出租</span>
                    <span v-if="house.state_tenant===2" class="red-text">一个月后马上入住</span>
                    <span v-if="house.state_tenant===3" class="red-text">至少一个月后有空房出租</span>
                    <span v-if="house.state_tenant===4" class="grey-text">住满</span>
                  </td>
                  <td v-if="checkAdmin.role==='admin'">
                    <a
                    class="btn-floating waves-effect waves-light blue"
                    @click="onEdithouse(house._id)"
                  >
                    <i class="material-icons">edit</i>
                  </a>
                  </td>
                  <td v-if="checkAdmin.role==='clerk'">
                    <a
                      class="btn-floating waves-effect waves-light blue"
                      @click="onViewhouse(house._id)"
                    >
                      <i class="material-icons">remove_red_eye</i>
                    </a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


      <div v-if="this.language==='en'">
        <div class="hide-on-small-and-down" style="padding: 100px;background-color:rgba(0,0,0,0.8);">
          <div class="row">
            <div class="col s12 center white-text" style="font-size: 24px;">
              House Search
            </div>
          </div>
          <select v-model="condition" class="browser-default left" style="width: 15%;height: 50px;border-bottom-left-radius: 50px;border-top-left-radius: 50px;border:none;outline: none;">
            <option value="" disabled selected>Condition</option>
            <option value="1">Area</option>
            <option value="2">Postcode</option>
          </select>

          <input v-model="search_houses" type="text" class="browser-default left" style="width: 60%;height: 50px;border:none;outline: none;padding: 0 25px;">
          <div @click="onSearchHouses(true)" class="left center waves-light waves-effect" style="background-color: #ffc107;cursor: pointer; width: 20%; height: 50px;border:none;outline: none;padding:10px;border-radius: 0 25px 25px 0;font-size: 20px;color: white">Search</div>
        </div>
        <div class="hide-on-med-and-up" style="padding: 50px;background-color:rgba(0,0,0,0.8);">
          <div class="row">
            <div class="col s12 center white-text" style="font-size: 18px;">
              House Search
            </div>
          </div>
          <select v-model="condition" class="browser-default" style="width: 100%;height: 50px;border:none;outline: none; margin-bottom: 20px;">
            <option value="" disabled selected>Condition</option>
            <option value="1">Area</option>
            <option value="2">Postcode</option>
          </select>

          <input v-model="search_houses" type="text" class="browser-default" style="width: 100%;height: 50px;border:none;outline: none;padding: 0 25px;margin-bottom: 20px;">
          <div @click="onSearchHouses(true)" class="center waves-light waves-effect" style="background-color: #ffc107;cursor: pointer; width: 100%; height: 50px;border:none;outline: none;padding:10px;border-radius: 25px 25px 25px 25px;font-size: 20px;color: white">Search</div>
        </div>
      </div>
      <div class="container" v-if="this.language==='en'">
        <div class="row">
          <div class="col s12" v-if="this.isAdmin.role==='admin'">
            <div class="btn indigo white-text waves-light waves-effect modal-trigger" style="border-radius: 16px" data-target="modal2">Create House</div>
          </div>
        </div>

        <div class="row" v-show="flag">
          <div class="col s12">
            <div class="left" style="padding: 10px 10px 10px 0;font-size: 18px;">Pricing sort：</div>
            <div class="btn-floating red waves-light waves-effect" @click="onSort(true)"><i class="material-icons">arrow_upward</i></div>
            <div class="btn-floating red waves-light waves-effect" @click="onSort(false)"><i class="material-icons">arrow_downward</i></div>
          </div>
        </div>

        <div class="row">
          <div class="col s12">
            <div class="row">
              <table class="bordered highlight">
                <thead>
                <tr>
                  <th>House Name</th>
                  <th>
                    <span v-if="isAdmin.role==='admin'">Address</span>
                    <span v-if="isAdmin.role!=='admin'">District</span>
                  </th>
                  <th>House Type</th>
                  <th>Price</th>
                  <th>State (Landlord)</th>
                  <th>State (Tenant)</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(house,index) in houses">
                  <td>{{house.name_en}}</td>
                  <td>
                    <span v-show="isAdmin.role==='admin'">{{house.address_en}}</span>
                    <span v-show="isAdmin.role!=='admin'">{{house.area_en}}</span>
                  </td>
                  <td>{{house.houseType_en}}</td>
                  <td>{{house.price}}</td>
                  <td>
                    <span v-if="house.state_landlord===0" class="green-text">Available</span>
                    <span v-if="house.state_landlord===1" class="red-text">Expiring in the next month</span>
                    <span v-if="house.state_landlord===2" class="grey-text">Unavailable</span>
                  </td>
                  <td>
                    <span v-if="house.state_tenant===0" class="green-text">Vancy</span>
                    <span v-if="house.state_tenant===1" class="green-text">Room Available</span>
                    <span v-if="house.state_tenant===2" class="red-text">Vancy after at least 30 days </span>
                    <span v-if="house.state_tenant===3" class="red-text">Room Available after at least 30 days </span>
                    <span v-if="house.state_tenant===4" class="grey-text">Full</span>
                  </td>
                  <td v-if="checkAdmin.role==='admin'">
                    <a
                      class="btn-floating waves-effect waves-light blue"
                      @click="onEdithouse(house._id)"
                    >
                      <i class="material-icons">edit</i>
                    </a>
                  </td>
                  <td v-if="checkAdmin.role==='clerk'">
                    <a
                      class="btn-floating waves-effect waves-light blue"
                      @click="onViewhouse(house._id)"
                    >
                      <i class="material-icons">remove_red_eye</i>
                    </a>
                  </td>
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
          <h5>新增房屋</h5>
          <div class="row">
            <div class="col s12 m4">
              <div class="red white-text center" style="padding: 10px; width: 100%;">合约信息</div>
              <p>
                <span>底价：</span>
                <input type="number" v-model="basePrice" class="browser-default default-custom" style="width: 100%">
              </p>
              <p>
                <span>押金：</span>
                <input type="number" v-model="deposit" class="browser-default" style="width: 100%">
              </p>
              <div class="grey lighten-2" style="padding: 10px;">
                <span>房东：</span>
                <div class="row">
                  <input v-model="search_landlord" type="text" class="browser-default" style="padding: 4px; width: 68%;border: 1px solid white; border-top-left-radius: 20px;border-bottom-left-radius: 20px;">
                  <a @click="onSearchLandlord" class="waves-effect waves-light orange white-text" style="cursor: pointer;padding: 3px;width: 30%; border-top-right-radius: 17px;border-bottom-right-radius: 17px;"><i class="material-icons left">search</i>搜索</a>
                  <div class="row" v-if="search_landlord_result.length!==0 && search_flag===true && !landlord">
                    <div class="divider white" style="margin:10px 0;"></div>
                    搜索结果：
                    <div class="col s12" v-for="(result,index) in search_landlord_result">
                      <a class="waves-effect waves-light white-text blue center right" style="cursor: pointer;padding: 3px;width: 30%;border-radius: 17px;" @click="onSelect(result._id)">选取</a>
                      <span style="padding: 4px; width: 68%;" class="right">房东姓名：{{result.name_ch}} / {{result.name_en}}</span>
                    </div>
                  </div>
                     <p v-if="search_landlord_result.length===0 && search_flag===true && !landlord">
                       搜索结果：
                    <span class="red-text">没有该房东</span>
                     </p>
                </div>
                <select class="browser-default" v-model="landlord">
                  <option value="" disabled selected>请选择...</option>
                  <option v-for="(landlord,index) in this.landlords" :value="landlord._id">{{landlord.name_ch}}</option>
                </select>
              </div>
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
                <span>上次交租时间：</span>
                <input type="text" placeholder="点击选择日期" id="paymentTime" class="center datepicker">
              </p>


            </div>
            <div class="col s12 m8">
              <div class="blue white-text center" style="padding: 10px; width: 100%;">房屋信息</div>
              <div class="row">
                <div class="col s6">
                  <p>
                    <span>价格：</span>
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
                </div>
                <div class="col s6">
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


                  <div class="file-field input-field">
                    <div class="btn indigo">
                      <span>上传图片</span>
                      <input type="file" multiple @change="getimg($event)">
                    </div>
                    <div class="file-path-wrapper">
                      <input class="file-path validate" type="text" placeholder="Upload one or more files">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="modal-action modal-close waves-effect waves-green btn green" @click="onCreateHouse">确认</div>
          <div class="modal-action modal-close waves-effect waves-green btn grey">取消</div>
        </div>
      </div>

      <!-- Modal Structure-create -->
      <div id="modal2" class="modal" v-if="this.language==='en'">
        <div class="modal-content">
          <h5>Create House</h5>
          <div class="row">
            <div class="col s12 m4">
              <div class="red white-text center" style="padding: 10px; width: 100%;">Contract Information</div>
              <p>
                <span>Base Price：</span>
                <input type="number" v-model="basePrice" class="browser-default" style="width: 100%">
              </p>
              <p>
                <span>Deposit：</span>
                <input type="number" v-model="deposit" class="browser-default" style="width: 100%">
              </p>
              <div class="grey lighten-2" style="padding: 10px">
                <span>Landlord：</span>
                <div class="row">
                  <input v-model="search_landlord" type="text" class="browser-default" style="padding: 4px; width: 68%;border: 1px solid white; border-top-left-radius: 20px;border-bottom-left-radius: 20px;">
                  <a @click="onSearchLandlord" class="waves-effect waves-light orange white-text" style="cursor: pointer;padding: 3px;width: 30%; border-top-right-radius: 17px;border-bottom-right-radius: 17px;"><i class="material-icons left">search</i>Search</a>
                  <div class="row" v-if="search_landlord_result.length!==0 && search_flag===true && !landlord">
                    <div class="divider white" style="margin:10px 0;"></div>
                    Result：
                    <div class="col s12" v-for="(result,index) in search_landlord_result">
                      <a class="waves-effect waves-light white-text blue center right" style="cursor: pointer;padding: 3px;width: 30%;border-radius: 17px;" @click="onSelect(result._id)">Pick</a>
                      <span style="padding: 4px; width: 68%;" class="right">Landlord：{{result.name_ch}} / {{result.name_en}}</span>
                    </div>
                  </div>
                  <p v-if="search_landlord_result.length===0 && search_flag===true && !landlord">
                    Result：
                    <span class="red-text">Cannot Find Such Landlords</span>
                  </p>
                </div>
                <select class="browser-default" v-model="landlord">
                  <option value="" disabled selected>please select...</option>
                  <option v-for="(landlord,index) in this.landlords" :value="landlord._id">{{landlord.name_en}}</option>
                </select>
              </div>
              <p>
                <span>Contract Start Time：</span>
                <input type="text" placeholder="click for selecting date" id="contractStart" class="center datepicker">
              </p>
              <p>
                <span>Contract Period (months)：</span>
                <input type="number" v-model="contractPeriod" class="browser-default" style="width: 50%">
              </p>
              <p>
                <span>Contract End Time：</span>
                <input type="text" placeholder="click for selecting date" id="contractEnd" class="center datepicker">
              </p>
              <p>
                <span>Last Payment Time：</span>
                <input type="text" placeholder="click for selecting date" id="paymentTime" class="center datepicker">
              </p>


            </div>
            <div class="col s12 m8">
              <div class="blue white-text center" style="padding: 10px; width: 100%;">House Information</div>
              <div class="row">
                <div class="col s6">
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
                    <span>Chinese Address：</span>
                    <input type="text" v-model="address_ch" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>English Address：</span>
                    <input type="text" v-model="address_en" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>Total Number of People：</span>
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
                </div>
                <div class="col s6">
                  <p>
                    <span>Post Code：</span>
                    <input type="number" v-model="postCode" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>Area (Chinese)：</span>
                    <input type="text" v-model="area_ch" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>Area (English)：</span>
                    <input type="text" v-model="area_en" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>WIFI Name：</span>
                    <input type="text" v-model="wifiName" class="browser-default" style="width: 100%">
                  </p>
                  <p>
                    <span>House state (for landlord)：</span>
                    <select class="browser-default" v-model="state_landlord">
                      <option value="" disabled selected>please select...</option>
                      <option value="0">Available</option>
                      <option value="1">Expires in one month</option>
                      <option value="2">Expired</option>
                    </select>
                  </p>
                  <p>
                    <span>House state (for tenant)：</span>
                    <select class="browser-default" v-model="state_tenant">
                      <option value="" disabled selected>please select...</option>
                      <option value="0">Vancy</option>
                      <option value="1">One or More Rooms Available</option>
                      <option value="2">Vancy in the next month</option>
                      <option value="3">At least one month room available</option>
                      <option value="4">Full</option>
                    </select>
                  </p>


                  <div class="file-field input-field">
                    <div class="btn indigo">
                      <span>Upload images</span>
                      <input type="file" multiple @change="getimg($event)">
                    </div>
                    <div class="file-path-wrapper">
                      <input class="file-path validate" type="text" placeholder="Upload one or more files">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="modal-action modal-close waves-effect waves-green btn green" @click="onCreateHouse">Confirm</div>
          <div class="modal-action modal-close waves-effect waves-green btn grey">cancel</div>
        </div>
      </div>

      <div class="container center" style="overflow: auto;margin-bottom: 100px">
        <ul class="pagination" style="float: left">
          <li v-show="current != 1" @click="current-- && goto(current)">
            <a href="#">上一页</a>
          </li>
          <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
            <a href="#">{{index}}</a>
          </li>
          <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)">
            <a href="#">下一页</a>
          </li>
        </ul>
        <div style="float: right">
          <div style="padding: 10px">每页最多{{pageSize}}条数据，总共有 {{totalHouses}} 条数据，当前第 - {{current}} - 页</div>
          <div>跳转到第 <input type="text" class="browser-default" style="width: 60px;text-align: center" v-model="targetPage"> 页，<div class="btn blue" @click="goto(targetPage)">确认</div></div>
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
        name: "house",
      components:{
          navbar
      },
      data(){
          return {
            targetPage:'',
            totalHouses:'',
            flag:false,
            search_landlord:'',
            search_houses:'',
            condition:'',
            search_landlord_result:[],
            search_flag:false,
            deposit:'',
            contractPeriod:'',
            contractStart:'',
            contractEnd:'',
            paymentTime:'',
            price:'',
            name_ch:'',
            name_en:'',
            address_ch:'',
            address_en:'',
            totalPeople:'',
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
            state_landlord:'',
            state_tenant:'',
            images:[],
            busy:false,
            page:1,
            pageSize:10,
            loadingFlag:true,
            price_sort:true,
            search_flag:false,
            checkAdmin:{},
            current: 1, // 当前页码
            showItem: 5, // 最少显示5个页码
            allpage: 1 // 总共的
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
        pages: function () {
          var pag = [];
          if (this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
            //总页数和要显示的条数那个大就显示多少条
            var i = Math.min(this.showItem, this.allpage);
            while (i) {
              pag.unshift(i--);
            }
          } else { //当前页数大于显示页数了
            var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
              i = this.showItem;
            if (middle > (this.allpage - this.showItem)) {
              middle = (this.allpage - this.showItem) + 1
            }
            while (i--) {
              pag.push(middle++);
            }
          }
          return pag
        },
          language(){
            return this.$store.getters.language
          },
          landlords(){
            return this.$store.getters.load_landlords
          },
          houses(){
            if(this.price_sort){
              return this.$store.getters.load_houses_list
            }
            if(!this.price_sort){
              return this.$store.getters.load_houses_list
            }
          },
          isAdmin(){
            return this.$store.getters.loginInfo
          }
      },
      created(){
          init.init_all()
          this.onLoad_landlords()
          this.load_houses_list(true)
          this.checkAdmin = timeLocalStorage.get('loginInfo')
        if(!this.checkAdmin){
            this.$router.push('/')
        }
      },
      methods:{
        goto: function (index) {
          if (index == this.current) return;
          this.current = index;
          let flag = true
          if(this.current!==1){
            flag = false
          }
          //这里可以发送ajax请求
          if(this.search_flag){
            this.onSearchHouses(flag)
          }else{
            this.load_houses_list(flag)
          }
        },
          onSort(flag){
            this.price_sort=flag
          },
        //   loadMore: function() {
        //   this.busy = true;
        //   this.loadingFlag=true
        //   setTimeout(() => {
        //     this.page ++;
        //     if(this.search_flag){
        //       this.onSearchHouses(false)
        //     }else{
        //       this.load_houses_list(false)
        //     }
        //   }, 1000);
        // },
          onSelect(landlord){
            this.landlord=landlord
          },
          onSearchLandlord(){
            this.landlord=''
            if(!this.search_landlord)
            {
              return this.search_flag=false
            }
            const data = {
              keyword:this.search_landlord
            }
            axios({
              method:'post',
              url:Config._ipAddress+'/landlords/search',
              data:data
            })
              .then((res)=>{
                this.search_landlord_result=res.data
                this.search_flag=true
                this.search_landlord=''
              })
              .catch((err)=>{
                console.log(err)
              })
          },
          load_houses_list(flag){
            axios({
              method:'post',
              url:Config._ipAddress+'/houses/list/'+this.current+'/'+this.pageSize,
            })
              .then((res)=>{
                this.loadingFlag=false
                if(res.data.length===0){
                  this.busy=true
                }else{
                  this.busy=false
                }
                const payload={
                  data:res.data.payload,
                  flag:flag
                }
                this.allpage=Math.ceil(res.data.total/this.pageSize)
                this.totalHouses = res.data.total
                this.$store.dispatch('load_houses_list',payload)
              })
              .catch((err)=>{
                console.log(err)
              })
          },
          getimg(event){
            for(var i=0;i<event.target.files.length;i++){
              this.images[i]=event.target.files[i]
            }
          },
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
          onCreateHouse(){
            let start=document.getElementById('contractStart').value
            let end = document.getElementById('contractEnd').value
            let paymentTime = document.getElementById('paymentTime').value
            this.contractStart=new Date(start).toISOString()
            this.contractEnd=new Date(end).toISOString()
            this.paymentTime=new Date(paymentTime).toISOString()
            const House = new FormData()
            House.append('price',this.price)
            House.append('name_ch',this.name_ch)
            House.append('name_en',this.name_en)
            House.append('address_ch',this.address_ch)
            House.append('address_en',this.address_en)
            House.append('totalPeople',this.totalPeople)
            House.append('state_landlord',this.state_landlord)
            House.append('state_tenant',this.state_tenant)
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
            House.append('houseType_ch',this.houseType_ch)
            House.append('houseType_en',this.houseType_en)
            for(var i=0;i<this.images.length;i++){
              House.append('images',this.images[i])
            }
            House.append('basePrice',this.basePrice)
            House.append('landlord',this.landlord)
            House.append('facilities_ch',this.facilities_ch)
            House.append('facilities_en',this.facilities_en)
            House.append('postCode',this.postCode)
            House.append('area_ch',this.area_ch)
            House.append('area_en',this.area_en)
            House.append('deposit',this.deposit)
            House.append('contractPeriod',this.contractPeriod)
            House.append('contractStart',this.contractStart)
            House.append('contractEnd',this.contractEnd)
            House.append('wifiName',this.wifiName)
            House.append('paymentTime',this.paymentTime)
            axios({
              method:'post',
              url:Config._ipAddress+'/houses/create',
              data:House,
              headers:{'Content-Type':'multipart/form-data'}
            })
              .then((res)=>{
                this.onRegister(res.data.payload._id)
                this.$store.dispatch('create_house',res.data.payload)
              })
          },
          onRegister(house){
            axios({
              method:'get',
              url:Config._ipAddress+'/landlords/'+this.landlord
            })
              .then((res)=>{
                const houses = res.data.houses
                 houses.push(house)
                axios({
                  method:'patch',
                  url:Config._ipAddress+'/landlords/'+this.landlord,
                  data:{houses:houses}
                }).then((res)=>{
                      this.load_houses_list(true)
                }).catch((err)=>{
                  console.log(err)
                })
              })
              .catch((err)=>{
                console.log(err)
              })
          },
          onEdithouse(id){
            this.$router.push('/edithouse/'+id)
          },
          onSearchHouses(flag){
          if(!this.condition){
            let msg='请选择搜索条件'
            if(this.language==='en'){
              msg = 'please set a condition'
            }
            return Materialize.toast(msg, 3000, 'rounded red')
          }
            if(!this.search_houses){
              // this.page=1
              // this.search_flag=false
              // this.load_houses_list(true)
              let msg='请输入搜索关键字'
              if(this.language==='en'){
                msg = 'please input the keywords'
              }
              return Materialize.toast(msg, 3000, 'rounded red')
            }
            if(flag){
              this.page=1
            }
            if(!this.search_flag){
              this.search_flag=true
              this.page=1
            }
            this.search_flag=true
            var data={}
            if(this.condition==='1') {
               data = {
                condition: 'area'
              }
            }
            if(this.condition==='2') {
               data = {
                condition: 'postCode'
              }
            }
              axios({
                method:'post',
                url:Config._ipAddress+'/houses/search/'+this.search_houses+'/'+this.page+'/'+this.pageSize,
                data:data
              })
                .then((res)=>{
                  this.loadingFlag=false
                  if(res.data.length===0){
                    this.busy=true
                  }else{
                    this.busy=false
                  }
                  const payload={
                    data:res.data,
                    flag:flag
                  }
                  this.$store.dispatch('load_houses_list',payload)
                })
                .catch((err)=>{
                  console.log(err)
                })

          },
        onViewhouse(id){
          this.$router.push('/viewhouse/'+id)
        }
      }
    }
</script>

<style scoped>
/*.default-custom{*/
  /*border: none;*/
  /*border-radius: 5px;*/
  /*border:1px solid grey;*/
  /*padding: 5px;*/
  /*transition: 1s;*/
/*}*/
  /*.default-custom:focus {*/
    /*border-color: #82b1ff;*/
  /*}*/

li {
  list-style: none;
}
a {
  text-decoration: none;
}
.pagination {
  position: relative;
}
.pagination li {
  display: inline-block;
  margin: 0 5px;
}
.pagination li a {
  padding: .5rem 1rem;
  display: inline-block;
  border: 1px solid #ddd;
  background: #fff;
  color: #0E90D2;
}
.pagination li a:hover {
  background: #eee;
}
.pagination li.active a {
  background: #0E90D2;
  color: #fff;
}
</style>
