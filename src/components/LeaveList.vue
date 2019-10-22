<template>
  <div class="list">
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
    <div class="leaveList">
        <ul>
            <li v-for="(list,index) in leaveLists" :key="index" >
                <ul>
                    <li><span>姓名：</span>{{list.name}}</li>
                    <li><span>院系：</span>{{list.area.name}}</li> 
                    <li><span>班级：</span>{{list.classinfo.name}}</li> 
                    <li><span>请假类型：</span>{{list.leavetype.name}}</li> 
                    <li><span>请假时间：</span>{{list.starttime}}-{{list.endtime}}</li>
                </ul>
            </li>
        </ul>
    </div>
    <p>没有更多</p>
  </div>
</template>
<script>
let apiLink = 'http://qy.sunjee.cn:8021';

export default {
  data() {
    return {
      key: 2,
      rows: 10,
      page: 1,
      leaveLists: [],
    };
  },
  mounted() {
    this.getLeavaInfo();
  },
  methods: {
    getLeavaInfo() {
      var url =
        apiLink +
        '/api/Leave/GetList/?key=' +
        this.key +
        '&rows=' +
        this.rows +
        '&page=' +
        this.page;
      this.$axios.get(url).then(response => {
        if (response.status == 200) {
          this.leaveLists = response.data.msg;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../static/css/common.less';
.list {
  background: #f5f5f5;
  .leaveList {
    margin-top: 64px;
    > ul {
      font-size: 14px;
      > li {
        width: 100%;
        height: 129px;
        border-top: 2px #f3f3f4 solid;
        background: #fff;
        padding: 7px 0 0 15px;
        position: relative;
        ul {
          li {
            list-style: none;
            line-height: 23px;
            span {
              color: #999;
            }
          }
        }
        &::after {
          position: absolute;
          display: block;
          background: #6563a4;
          right: 228px;
          top: 24px;
        }
      }
    }
  }
  > p {
    padding: 20px 0;
    font-size: 12px;
    text-align: center;
    color: #6563a4;
  }
}
</style>
