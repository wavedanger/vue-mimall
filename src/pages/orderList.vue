<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>点击未支付可再次支付</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <Loading v-if="loading"></Loading>
        <div class="order-box">
          <div
            class="order"
            v-for="(order,index) in list"
            :key="index"
          >
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div
                  class="good-list"
                  v-for="(item,i) in order.orderItemVoList"
                  :key="i"
                >
                  <div class="good-img">
                    <img
                      v-lazy="item.productImage"
                      alt=""
                    >
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div
                class="good-state fr"
                v-if="order.status == 20"
              >
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
              <div
                class="good-state fr"
                v-else
              >
                <a
                  href="javascript:;"
                  @click="goPay(order.orderNo)"
                >{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
          <el-pagination
            class="pagination"
            v-if="list.length>0"
            background
            layout="prev, pager, next"
            :total="total"
            :pageSize="pageSize"
            @current-change="handleChange"
          >
          </el-pagination>
          <div
            class="load-more"
            v-if="showNextPage&&list.length>0&&false"
          >
            <el-button
              type="primary"
              :loading="loading"
              @click="loadmore"
            >加载更多</el-button>
          </div>
          <div
            class="scroll-more"
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="410"
            v-if="false"
          >
            <img
              src="/imgs/loading-svg/loading-spinning-bubbles.svg"
              alt=""
              v-show="loading && list.length>0"
            >
          </div>
        </div>
        <no-data v-if="!loading && list.length==0"></no-data>
      </div>
    </div>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import Loading from './../components/Loading'
import NoData from './../components/NoData'
import { Pagination,Button } from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  name:'list',
   directives: { infiniteScroll },
  data(){
    return{
      list:[],
      loading:false,
      pageNum:1,
      pageSize:10,
      total:0,
      showNextPage:true,//加载更多：是否显示按钮
      busy:false,//滚动加载，是否触发
    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    getOrderList(){
      this.loading=true
      this.busy=true
      this.axios.get('/orders',{
        params:{
          pageSize:10,
          pageNum:this.pageNum
        }
      }).then((res)=>{
        //分页器
        this.list=res.list
        // 加载按钮
        // this.list=this.list.concat(res.list)
        // this.showNextPage = res.hasNextPage;
        this.busy = false;
        this.total=res.total
        this.loading=false
      }).catch(()=>{
        this.loading=false
      })
    },
    goPay(orderNo){
      this.$router.push({
        path:'/order/pay',
        query:{
          orderNo
        }
      })
    },
    // 第一种分布器
    handleChange(pageNum){
      this.pageNum=pageNum
      this.getOrderList()
    },
    //第二种加载按钮
    loadmore(){
      this.pageNum++
      this.getOrderList()
    },
    // 第三种方法：滚动加载，通过npm插件实现
      scrollMore(){
        this.busy = true;
        setTimeout(()=>{
          this.pageNum++;
          this.getList();
        },500);
      },
       getList(){
        this.loading = true;
        this.axios.get('/orders',{
          params:{
            pageSize:10,
            pageNum:this.pageNum
          }
        }).then((res)=>{
          this.list = this.list.concat(res.list);
          this.loading = false;
          if(res.hasNextPage){
            this.busy=false;
          }else{
            this.busy=true;
          }
        });
      }
  },
  components:{
    OrderHeader,
    Loading,
    NoData,
    [Pagination.name]:Pagination,
    [Button.name]:Button
  }
}
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      .pagination {
        text-align: right;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
      .el-button--primary {
        background-color: #ff6600;
        border-color: #ff6600;
      }
      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>