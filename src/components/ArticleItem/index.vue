<template>
  <div class="list-item">
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
    <div class="bottom">{{item.aut_name}}&nbsp;&nbsp;{{item.comm_count}}评论&nbsp;&nbsp;{{item.pubdate | relativeTime}}</div>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    item: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
