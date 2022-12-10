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
        <div v-for="(item, index) in list" :key="index">
          <ArticleItem :item="item"></ArticleItem>
        </div>
        <!-- <van-cell v-for="(item, index) in list" :key="index" :title="item.title">

        </van-cell> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
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
    width: 115px;
    height: 73px;
    flex-shrink: 0;
  }
}
</style>
