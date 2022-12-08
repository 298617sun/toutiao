<template>
  <div class="container">
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="list-item" v-for="(item, index) in list" :key="index">
          <div class="top">
            <div class="title van-multi-ellipsis--l2">{{item.title}}</div>
            <van-image
              v-if="item.cover.type === 1"
              fit="cover"
              :src="item.cover.images[0]"
            />
          </div>
          <div class="center" v-if="item.cover.type === 3">
            <van-image
              v-for="(imageItem,imageIndex) in item.cover.images"
              :key="imageIndex"
              fit="cover"
              :src="imageItem"
            />
          </div>
          <div class="bottom">{{item.aut_name}} {{item.comm_count}}评论 {{item.pubdate}}小时前</div>
        </div>
        <!-- <van-cell v-for="(item, index) in list" :key="index" :title="item.title">

        </van-cell> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    channelId: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: 0,
      isLoading: false
    }
  },
  methods: {
    // 加载数据
    async onLoad () {
      const { data } = await this.$api.article.getArticles({
        channel_id: this.channelId,
        timestamp: this.timestamp || Date.now()
      })
      this.list.push(...data.results)
      this.loading = false
      this.timestamp = data.pre_timestamp
      if (data.results.length < 10) {
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      const { data } = await this.$api.article.getArticles({
        channel_id: this.channelId,
        timestamp: Date.now()
      })
      this.list.unshift(...data.results)
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  position: fixed;
  top: 92px;
  bottom: 50px;
  overflow-y: auto;
  right: 0;
  left: 0;
  /deep/ .van-image{
    width: 116px;
    height: 73px;
    flex-shrink: 0;
  }
  .list-item{
    background: #fff;
    padding: 13px;
    margin-bottom: 1px;
    .top{
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      .title{
        color: #3A3A3A;
        margin-right: 12px;
        height: 100%;
      }
    }
    .center{
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    .bottom{
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>
