<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header login" v-if="user">
      <div class="base-info">
        <div class="info">
          <van-image
            class="mobile-img"
            round
            :src="userInfo.photo"
            fit="cover"
          />
          <span class="text">{{userInfo.name}}</span>
        </div>
        <van-button class="btn" round>编辑资料</van-button>
      </div>
      <div class="data-stats">
        <div class="item">
          <span class="num">{{userInfo.art_count}}</span><span>头条</span>
        </div>
        <div class="item">
          <span class="num">{{userInfo.follow_count}}</span><span>关注</span>
        </div>
        <div class="item">
          <span class="num">{{userInfo.fans_count}}</span><span>粉丝</span>
        </div>
        <div class="item">
          <span class="num">{{userInfo.like_count}}</span><span>获赞</span>
        </div>
      </div>
    </div>
    <div class="header no-login" v-else>
      <div class="head" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 导航宫格 -->
    <van-grid clickable :column-num="2" class="grid-nav">
      <van-grid-item text="收藏" to="/">
        <template #icon>
          <div class="iconfont icon-shoucang"></div>
        </template>
      </van-grid-item>
      <van-grid-item text="历史" url="/vant/mobile.html">
        <template #icon>
          <div class="iconfont icon-lishi"></div>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell title="退出登录" class="logout-cell" clickable v-if="user" @click="signOut"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  computed: {
    ...mapState(['user', 'userInfo'])
  },
  methods: {
    // 退出登录
    signOut () {
      this.$store.commit('setUser', null)
      this.$store.commit('setUserInfo', null)
    },
    // 获取用户信息
    getUserInfo () {
      this.$api.user.getUser()
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    .header{
      height: 176px;
      background: url('~@/assets/banner.png');
      background-size: cover;
    }
    .no-login{
      display: flex;
      justify-content: center;
      align-items: center;
      .head{
        display: flex;
        flex-direction: column;
        align-items: center;
        .mobile-img{
          width: 66px;
        }
        .text{
          font-size: 14px;
          color: #fff;
          margin-top: 8px;
        }
      }
    }
    .login{
      .base-info{
        height: 111px;
        padding: 33px 16px 11px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .info{
          display: flex;
          align-items: center;
          .mobile-img{
            width: 66px;
            height: 66px;
            border: 4px solid #fff;
          }
          .text{
            color: #fff;
            font-size: 15px;
            margin-left: 11px;
          }
        }
        .btn{
          height: 20px;
          width: 70px;
          padding: 5px;
          font-size: 12px;
        }
      }
      .data-stats{
        height: 65px;
        display: flex;
        .item{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          .num{
            font-size: 13px;
          }
        }
      }
    }
    .grid-nav{
      margin-bottom: 5px;
      .iconfont{
        font-size: 23px;
        margin-bottom: 6px;
      }
      .icon-shoucang{
        color: #EB5253;
      }
      .icon-lishi{
        color: #FF9D1D;
      }
    }
    .logout-cell{
      text-align: center;
      color: #d86262;
      margin-top: 5px;
    }
  }
</style>
