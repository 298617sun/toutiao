<template>
  <div class="container">
    <!-- 顶部 -->
    <van-nav-bar fixed>
      <template #title>
        <div class="btn"><van-icon name="search" class="search" />搜索</div>
      </template>
    </van-nav-bar>
    <!-- 分类选项 -->
    <van-tabs v-model="active" line-width="16px" color="#3296FA" class="channel-tabs" sticky offset-top="46px">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name" title-class="tabs">
        <articleList :channelId="item.id"></articleList>
      </van-tab>
      <div slot="nav-right" class="right"></div>
      <div class="hamburger-btn">
        <span class="iconfont icon-gengduo"></span>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import articleList from './components/articleList.vue'
export default {
  name: 'HomeIndex',
  components: { articleList },
  data () {
    return {
      active: 0,
      channels: [] // 频道列表
    }
  },
  mounted () {
    this.getChannel()
  },
  methods: {
    // 获取频道列表
    async getChannel () {
      const { data } = await this.$api.channel.getUserChannel()
      this.channels = data.channels
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    /deep/ .van-nav-bar__title{
      max-width: unset;
    }
    .btn{
      width: 278px;
      height: 32px;
      line-height: 32px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.2);
      font-size: 14px;
      .search{
        color: #fff;
        font-size: 16px;
        margin-right: 4px;
      }
    }
    /deep/ .channel-tabs{
      top: 46px;
      .tabs{
        min-width: 100px;
        border-right: 1px solid #EDEFF3;
      }
      .van-tabs__nav--line.van-tabs__nav--complete{
        padding: 0;
      }
      .van-tabs__line{
        bottom: 4px;
      }
      .hamburger-btn{
        height: 44px;
        line-height: 44px;
        text-align: center;
        width: 33px;
        background: rgba(255, 255, 255, 0.9);
        position: fixed;
        top: 46px;
        right: 0;
        z-index: 222;
      }
      .right{
        flex-shrink: 0;
        height: 44px;
        width: 33px;
      }
      .van-tabs__content{
        margin-bottom: 100px;
      }
    }
  }
</style>
