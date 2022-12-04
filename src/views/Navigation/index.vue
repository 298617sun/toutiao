<template>
  <div class="container">
    <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/home">
        <template #icon>
          <span class="iconfont icon-shouye"></span>
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="iconfont icon-wenda"></span>
        </template>
        问答
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="iconfont icon-shipin"></span>
        </template>
        视频
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon>
          <span class="iconfont icon-wode"></span>
        </template>
        未登录
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'NavigationIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    .iconfont{
      font-size: 20px;
    }
  }
</style>
