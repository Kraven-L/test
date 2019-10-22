<template>
  <div id="app">
    <div class="top">
        <div class="status">
            
        </div>
        <div class="header">
            <div class="left">
                <a></a>
            </div>
            <p>请假申请</p>
            <div class="right">
                <a></a>
                <a></a>
            </div>
        </div>
    </div>
    <div class="user">
        <div class="user_image">

        </div>
    </div>
    <div class="user_id">
        <p>用户ID：48382942</p>
    </div>
    <form id="form" @submit.prevent>
        <div class="section">
            <p>姓名</p>
            <p>李筱妮</p>
        </div>
        <div class="section">
            <p>院系</p>
            <div class="pull">
                <select v-model="selected" @change="change">
                    <option v-for="(area,index) in areas" :key="index" v-bind:value="area.id">{{area.name}}</option>
                </select>
            </div>
        </div>
        <div class="section">
            <p>班级</p>
            <div class="pull">
                <select v-model="selectedClass">
                    <option v-for="(e,i) in classes" :key="i" v-bind:value="e.id">{{e.name}}</option>
                </select>
            </div>
        </div>
        <div class="section">
            <p>请假类型</p>
            <div class="pull">
                <select>
                    <option v-for="(type,index) in types" :key="index">{{type.name}}</option>
                </select>
            </div>
        </div>
        <div class="section">
            <p>开始时间</p>
            <p @click="openPicker(0)">{{this.dateTime}}</p>
            <!-- <mt-datetime-picker
              v-show="'dateTimeshow'"
              type="datetime"
              ref="picker"
              year-format="{value}"
              month-format="{value}"
              date-format="{value}"
              @confirm="handleConfirm1"
              :startDate="startDate"
              >
            </mt-datetime-picker> -->
        </div>
        <div class="section">
            <p>结束时间</p>
            <p @click="openPicker(1)">{{this.endTime}}</p>
            <!-- <mt-datetime-picker
              v-show="'endTimeshow'"
              type="datetime"
              ref="picker"
              year-format="{value}"
              month-format="{value}"
              date-format="{value}"
              @confirm="handleConfirm2"
              :startDate="startDate"
              >
            </mt-datetime-picker> -->
        </div>
        <div class="section">
            <div class="date_day">
                <p>天</p>
                <p>1</p>
            </div>
            <div class="date_hour">
                <p>小时</p>
                <p>15</p>
            </div>
        </div>
        <div class="section">
            <p>内容</p>
            <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
        <!-- <router-link></router-link> -->
        <input type="submit" >
    </form>
        <date-picker v-if="dateTimeshow" @subStart="getStart"></date-picker>
        <date-picker v-if="endTimeshow" @subStart="getEnd"></date-picker>
    
  </div>
</template>

<script>
let apiLink = "http://qy.sunjee.cn:8021";
import moment from "moment";
import datePicker from "./datePicker";
export default {
  name: "App",
  components:{
    datePicker
  },
  data() {
    return {
      selected: 1,
      areas: [],
      selectedClass: 1,
      classes: [],
      types: [],
      dateTime: "",
      endTime:"",
      dateTimeshow:null,
      endTimeshow:null,
      // startDate: new Date(),
      // endDate: new Date()
    };
  },
  computed:{
  },
  mounted() {
    this.dateTime = moment(new Date()).format("YYYY-MM-DD HH:mm")
    this.endTime = moment(new Date()).format("YYYY-MM-DD HH:mm")
    this.getArea();
    this.getType();
    this.getClassInfo(this.selected);
  },
  methods: {
    change() {
      this.getClassInfo(this.selected);
    },
    getArea() {
      let url = apiLink + "/api/Leave/GetArea";
      this.$axios.get(url).then(response => {
        if (response.status == 200) {
          this.areas = response.data.msg;
        }
      });
    },
    getClassInfo(e) {
      let url = apiLink + "/api/Leave/GetClassInfo/" + e;
      this.$axios.get(url).then(response => {
        if (response.status == 200) {
          this.classes = response.data.msg;
          this.selectedClass = this.classes[0].id;
        }
      });
    },
    getType() {
      let url = apiLink + "/api/Leave/GetType";
      this.$axios.get(url).then(response => {
        if (response.status == 200) {
          this.types = response.data.msg;
        }
      });
    },
    openPicker(e) {

      if(e){
        this.endTimeshow = 1;
        console.log('end')
      }else{
        console.log('start')
        this.dateTimeshow = 1;
      }
      
    },
    // handleConfirm1(data) {
    //     console.log('start')
    //   let date = moment(data).format("YYYY-MM-DD HH:mm");
    //   this.dateTime = date;
    // },
    // handleConfirm2(data) {
    //     console.log('end')
    //   let date = moment(data).format("YYYY-MM-DD HH:mm");
    //   this.endTime = date;
    // },
    getStart(e){
      // alert(e)
      this.dateTime = e
      this.dateTimeshow =0
    },
    getEnd(e){
      this.endTime = e
        this.endTimeshow = 0;
      
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../static/css/common.less";
.user {
  margin-top: 64px;
  height: 125px;
  position: relative;
  .user_image {
    width: 90px;
    height: 90px;
    background: url(../assets/img/Avatar.png) no-repeat;
    background-size: cover;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.user_id {
  height: 50px;
  background: #f8f8f9;
  p {
    margin-left: 25px;
    line-height: 50px;
    color: #999;
  }
}
#form {
  .section {
    width: 100%;
    height: 72px;
    border-bottom: 2px #f3f3f4 solid;
    padding: 16px 0 0 25px;
    p:nth-child(1) {
      font-size: 14px;
      color: #999;
      line-height: 22px;
    }
    p:nth-child(2) {
      font-size: 14px;
      color: #333;
    }
    .pull {
      position: relative;
      select {
        border: none;
        outline: none;
        // appearance: none;
        width: 88%;
        -webkit-appearance: none;
        -moz-appearance: none;
        line-height: 22px;
        option {
          outline: none;
        }
      }
      &:after {
        content: "";
        width: 17px;
        height: 10px;
        background: url(../assets/img/pull.png) no-repeat;
        background-size: cover;
        position: absolute;
        top: 30%;
      }
    }
    .date_day {
      float: left;
      width: 45%;
      border-right: 2px #f3f3f4 solid;
      margin-right: 10px;
    }
    &:last-of-type {
      height: 100%;
      border: none;
      textarea {
        width: 325px;
        height: 90px;
        margin: 10px 0 25px 0;
        border: none;
        background: #f8f8f9;
        outline: none;
        padding: 10px;
        font-size: 14px;
      }
    }
  }
  > input {
    border: none;
    width: 100%;
    height: 44px;
    background: #6563a4;
    color: #fff;
    font-size: 16px;
    letter-spacing: 10px;
    outline: none;
  }
}
</style>
